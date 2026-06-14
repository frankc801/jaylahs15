import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { listRsvps } from "@/lib/rsvp-queries";
import type { Rsvp } from "@/lib/types";

function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  // Escape quotes and wrap fields containing special characters.
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const COLUMNS: { key: keyof Rsvp; label: string }[] = [
  { key: "full_name", label: "Full Name" },
  { key: "phone", label: "Phone" },
  { key: "attending", label: "Attending" },
  { key: "guest_count", label: "Guest Count" },
  { key: "guest_names", label: "Guest Names" },
  { key: "message_for_jaylah", label: "Message for Jaylah" },
  { key: "status", label: "Status" },
  { key: "checked_in", label: "Checked In" },
  { key: "gift_received", label: "Gift Received" },
  { key: "gift_notes", label: "Gift Notes" },
  { key: "internal_notes", label: "Internal Notes" },
  { key: "submitted_at", label: "Submitted At" },
  { key: "updated_at", label: "Updated At" },
];

export async function GET() {
  if (!isAuthenticated()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const rows = await listRsvps();

  const header = COLUMNS.map((c) => csvCell(c.label)).join(",");
  const body = rows
    .map((row) => COLUMNS.map((c) => csvCell(row[c.key])).join(","))
    .join("\n");
  const csv = `﻿${header}\n${body}`; // BOM for Excel UTF-8 support

  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="jaylah-xv-rsvps-${date}.csv"`,
    },
  });
}
