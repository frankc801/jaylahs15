"use client";

import { useState, useTransition } from "react";
import type { Rsvp, RsvpStatus } from "@/lib/types";
import {
  updateRsvpStatus,
  updateInternalNotes,
  setCheckedIn,
} from "@/app/admin/data-actions";

const STATUS_OPTIONS: RsvpStatus[] = [
  "submitted",
  "pending",
  "confirmed",
  "declined",
  "waitlist",
];

const STATUS_STYLES: Record<RsvpStatus, string> = {
  submitted: "bg-gold-100 text-gold-800 border-gold-300",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-300",
  pending: "bg-gold-100 text-gold-800 border-gold-300",
  declined: "bg-red-100 text-red-700 border-red-300",
  waitlist: "bg-slate-100 text-slate-700 border-slate-300",
};

export function RsvpRow({ rsvp }: { rsvp: Rsvp }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(rsvp.internal_notes ?? "");
  const [savedNotes, setSavedNotes] = useState(rsvp.internal_notes ?? "");
  const [isPending, startTransition] = useTransition();

  const submittedDate = new Date(rsvp.submitted_at).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white shadow-sm">
      {/* summary row */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold text-emerald-900">
              {rsvp.full_name}
            </p>
            {rsvp.checked_in && (
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                In
              </span>
            )}
          </div>
          <p className="truncate text-sm text-emerald-700/70">
            {rsvp.phone} · {rsvp.attending ? `${rsvp.guest_count} guest(s)` : "Not attending"}
          </p>
        </div>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[rsvp.status]}`}
        >
          {rsvp.status}
        </span>
        <span className="text-emerald-400">{open ? "▲" : "▼"}</span>
      </button>

      {/* expanded detail / editor */}
      {open && (
        <div className="space-y-4 border-t border-emerald-50 px-4 py-4 text-sm">
          <div className="grid gap-2 sm:grid-cols-2">
            <Detail label="Submitted">{submittedDate}</Detail>
            <Detail label="Guest count">
              {rsvp.attending ? rsvp.guest_count : "—"}
            </Detail>
            <Detail label="Guest names" full>
              {rsvp.guest_names || "—"}
            </Detail>
            <Detail label="Message for Jaylah" full>
              {rsvp.message_for_jaylah || "—"}
            </Detail>
            {rsvp.gift_received && (
              <Detail label="Gift / blessing" full>
                ✔ Received{rsvp.gift_notes ? ` — ${rsvp.gift_notes}` : ""}
              </Detail>
            )}
          </div>

          {/* status editor */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700/70">
              Status
            </span>
            <select
              defaultValue={rsvp.status}
              disabled={isPending}
              onChange={(e) =>
                startTransition(() =>
                  updateRsvpStatus(rsvp.id, e.target.value),
                )
              }
              className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-sm capitalize focus:border-gold-400 focus:outline-none"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s}
                </option>
              ))}
            </select>

            <button
              disabled={isPending}
              onClick={() =>
                startTransition(() =>
                  setCheckedIn(rsvp.id, !rsvp.checked_in),
                )
              }
              className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
                rsvp.checked_in
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                  : "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {rsvp.checked_in ? "Undo check-in" : "Mark checked in"}
            </button>
          </div>

          {/* internal notes */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-700/70">
              Internal notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-300/40"
              placeholder="Private notes (table assignment, dietary needs, etc.)"
            />
            <div className="mt-1.5 flex items-center gap-3">
              <button
                disabled={isPending || notes === savedNotes}
                onClick={() =>
                  startTransition(async () => {
                    await updateInternalNotes(rsvp.id, notes);
                    setSavedNotes(notes);
                  })
                }
                className="rounded-lg bg-gold-500 px-3 py-1.5 text-sm font-semibold text-emerald-950 transition hover:bg-gold-400 disabled:opacity-40"
              >
                {notes === savedNotes ? "Saved" : "Save notes"}
              </button>
              {isPending && (
                <span className="text-xs text-emerald-600">Saving…</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  children,
  full = false,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/60">
        {label}
      </p>
      <p className="text-emerald-900">{children}</p>
    </div>
  );
}
