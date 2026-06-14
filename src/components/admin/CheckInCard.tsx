"use client";

import { useState, useTransition } from "react";
import type { Rsvp } from "@/lib/types";
import { setCheckedIn, recordGift } from "@/app/admin/data-actions";

export function CheckInCard({ rsvp }: { rsvp: Rsvp }) {
  const [giftReceived, setGiftReceived] = useState(rsvp.gift_received);
  const [giftNotes, setGiftNotes] = useState(rsvp.gift_notes ?? "");
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
        rsvp.checked_in ? "border-emerald-400" : "border-emerald-100"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl text-emerald-900">
            {rsvp.full_name}
          </h3>
          <p className="text-sm text-emerald-700/70">{rsvp.phone}</p>
        </div>
        {rsvp.checked_in ? (
          <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            ✔ Checked In
          </span>
        ) : (
          <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold-800">
            Awaiting
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-emerald-50/60 p-3 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/60">
            Attending
          </p>
          <p className="text-emerald-900">{rsvp.attending ? "Yes" : "No"}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/60">
            Guest count
          </p>
          <p className="text-emerald-900">
            {rsvp.attending ? rsvp.guest_count : "—"}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/60">
            Guest names
          </p>
          <p className="text-emerald-900">{rsvp.guest_names || "—"}</p>
        </div>
      </div>

      {/* gift / blessing */}
      <div className="mt-4">
        <label className="flex items-center gap-2 text-sm font-medium text-emerald-900">
          <input
            type="checkbox"
            checked={giftReceived}
            onChange={(e) => setGiftReceived(e.target.checked)}
            className="h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-gold-300"
          />
          Gift / blessing received
        </label>
        <input
          type="text"
          value={giftNotes}
          onChange={(e) => setGiftNotes(e.target.value)}
          placeholder="Optional note (e.g. blessing box, gift table)"
          className="mt-2 w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-300/40"
        />
        <button
          disabled={isPending}
          onClick={() =>
            startTransition(() =>
              recordGift(rsvp.id, giftReceived, giftNotes),
            )
          }
          className="mt-2 rounded-lg border border-gold-400 bg-gold-50 px-3 py-1.5 text-sm font-semibold text-gold-800 transition hover:bg-gold-100 disabled:opacity-40"
        >
          Save gift info
        </button>
      </div>

      {/* check-in action */}
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(() => setCheckedIn(rsvp.id, !rsvp.checked_in))
        }
        className={`mt-4 w-full rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide transition ${
          rsvp.checked_in
            ? "border border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-50"
            : "bg-emerald-600 text-white hover:bg-emerald-700"
        }`}
      >
        {isPending
          ? "Saving…"
          : rsvp.checked_in
            ? "Undo check-in"
            : "Mark as checked in"}
      </button>
    </div>
  );
}
