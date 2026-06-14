"use server";

import { revalidatePath } from "next/cache";
import { getAdminSupabase } from "@/lib/supabase/admin";
import { isAuthenticated } from "@/lib/auth";
import type { RsvpStatus } from "@/lib/types";

const STATUSES: RsvpStatus[] = ["pending", "confirmed", "declined", "waitlist"];

function ensureAuth() {
  if (!isAuthenticated()) {
    throw new Error("Unauthorized");
  }
}

export async function updateRsvpStatus(id: string, status: string) {
  ensureAuth();
  if (!STATUSES.includes(status as RsvpStatus)) {
    throw new Error("Invalid status");
  }
  const supabase = getAdminSupabase();
  const { error } = await supabase
    .from("rsvps")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

export async function updateInternalNotes(id: string, notes: string) {
  ensureAuth();
  const supabase = getAdminSupabase();
  const { error } = await supabase
    .from("rsvps")
    .update({ internal_notes: notes || null })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

export async function setCheckedIn(id: string, checkedIn: boolean) {
  ensureAuth();
  const supabase = getAdminSupabase();
  const { error } = await supabase
    .from("rsvps")
    .update({ checked_in: checkedIn })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/check-in");
}

export async function recordGift(
  id: string,
  giftReceived: boolean,
  giftNotes: string,
) {
  ensureAuth();
  const supabase = getAdminSupabase();
  const { error } = await supabase
    .from("rsvps")
    .update({ gift_received: giftReceived, gift_notes: giftNotes || null })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/check-in");
}
