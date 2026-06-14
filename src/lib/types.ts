export type RsvpStatus =
  | "submitted"
  | "pending"
  | "confirmed"
  | "declined"
  | "waitlist";

export interface Rsvp {
  id: string;
  full_name: string;
  phone: string;
  attending: boolean;
  guest_count: number;
  guest_names: string | null;
  message_for_jaylah: string | null;
  status: RsvpStatus;
  checked_in: boolean;
  gift_received: boolean;
  gift_notes: string | null;
  internal_notes: string | null;
  submitted_at: string;
  updated_at: string;
}

export interface RsvpInput {
  full_name: string;
  phone: string;
  attending: boolean;
  guest_count: number;
  guest_names?: string | null;
  message_for_jaylah?: string | null;
}
