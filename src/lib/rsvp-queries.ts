import "server-only";
import { getAdminSupabase } from "@/lib/supabase/admin";
import type { Rsvp } from "@/lib/types";

export interface RsvpStats {
  totalSubmissions: number;
  totalAttendingGuests: number;
  totalNotAttending: number;
  totalCheckedIn: number;
}

/** Aggregate counts for the dashboard. */
export async function getStats(): Promise<RsvpStats> {
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from("rsvps")
    .select("attending, guest_count, checked_in");

  if (error) throw new Error(error.message);

  const rows = data ?? [];
  return {
    totalSubmissions: rows.length,
    totalAttendingGuests: rows
      .filter((r) => r.attending)
      .reduce((sum, r) => sum + (r.guest_count || 0), 0),
    totalNotAttending: rows.filter((r) => !r.attending).length,
    totalCheckedIn: rows.filter((r) => r.checked_in).length,
  };
}

/**
 * List RSVPs, optionally filtered by a name/phone search term.
 * Returns the most recent first.
 */
export async function listRsvps(search?: string): Promise<Rsvp[]> {
  const supabase = getAdminSupabase();
  let query = supabase
    .from("rsvps")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (search && search.trim()) {
    const term = search.trim().replace(/[%,]/g, " ");
    query = query.or(`full_name.ilike.%${term}%,phone.ilike.%${term}%`);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Rsvp[];
}
