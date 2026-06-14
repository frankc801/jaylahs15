"use server";

import { getPublicSupabase } from "@/lib/supabase/public";

export interface RsvpActionState {
  ok: boolean;
  error?: string;
  errorEs?: string;
}

function str(form: FormData, key: string): string {
  return (form.get(key) ?? "").toString().trim();
}

/**
 * Public RSVP submission. Validates required fields server-side and inserts
 * via the anon Supabase client (RLS allows insert only).
 */
export async function submitRsvp(
  _prev: RsvpActionState,
  formData: FormData,
): Promise<RsvpActionState> {
  const fullName = str(formData, "full_name");
  const phone = str(formData, "phone");
  const attendingRaw = str(formData, "attending");
  const guestCountRaw = str(formData, "guest_count");
  const guestNames = str(formData, "guest_names");
  const message = str(formData, "message_for_jaylah");

  // --- Validation: prevent empty required fields ---
  if (!fullName) {
    return {
      ok: false,
      error: "Please enter your full name.",
      errorEs: "Por favor ingrese su nombre completo.",
    };
  }
  if (!phone) {
    return {
      ok: false,
      error: "Please enter your phone number.",
      errorEs: "Por favor ingrese su número de teléfono.",
    };
  }
  if (attendingRaw !== "yes" && attendingRaw !== "no") {
    return {
      ok: false,
      error: "Please let us know if you will be attending.",
      errorEs: "Por favor indíquenos si podrá asistir.",
    };
  }

  const attending = attendingRaw === "yes";
  let guestCount = attending ? parseInt(guestCountRaw, 10) : 0;
  if (Number.isNaN(guestCount) || guestCount < 0) guestCount = attending ? 1 : 0;

  try {
    const supabase = getPublicSupabase();
    // NOTE: status defaults to "submitted" and gift/notes fields are left unset
    // to satisfy the anonymous-insert Row Level Security policy.
    const { error } = await supabase.from("rsvps").insert({
      full_name: fullName,
      phone,
      attending,
      guest_count: guestCount,
      guest_names: guestNames || null,
      message_for_jaylah: message || null,
      status: "submitted",
    });

    if (error) {
      console.error("RSVP insert error:", error.message);
      return {
        ok: false,
        error: "Something went wrong. Please try again or text us.",
        errorEs:
          "Algo salió mal. Por favor intente de nuevo o envíenos un mensaje.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("RSVP submission failed:", err);
    return {
      ok: false,
      error: "Something went wrong. Please try again or text us.",
      errorEs:
        "Algo salió mal. Por favor intente de nuevo o envíenos un mensaje.",
    };
  }
}
