"use client";

import { event } from "@/config/event";

/** Format a local datetime string as an ICS floating local timestamp. */
function toIcsLocal(local: string): string {
  // "2026-08-01T16:00:00" -> "20260801T160000"
  return local.replace(/[-:]/g, "").replace(/\.\d+/, "");
}

function buildIcs(): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jaylah XV//Digital Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:jaylah-xv-${event.date.iso}@quinceanera`,
    `DTSTAMP:${toIcsLocal(new Date().toISOString().slice(0, 19))}`,
    `DTSTART:${toIcsLocal(event.date.startLocal)}`,
    `DTEND:${toIcsLocal(event.date.endLocal)}`,
    `SUMMARY:${event.quinceanera.fullName} · ${event.celebration.title}`,
    `LOCATION:${event.venue.name}\\, ${event.venue.address}`,
    `DESCRIPTION:${event.invitationMessage.en} Guest arrival ${event.venue.guestArrival}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function AddToCalendar({
  className = "btn-outline",
  label = "Add to Calendar",
}: {
  className?: string;
  label?: string;
}) {
  const handleClick = () => {
    const blob = new Blob([buildIcs()], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jaylah-xv.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      <span aria-hidden="true">📅</span> {label}
    </button>
  );
}
