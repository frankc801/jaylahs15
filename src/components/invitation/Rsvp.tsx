"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { event } from "@/config/event";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { submitRsvp, type RsvpActionState } from "@/app/actions/rsvp";
import { Confetti } from "@/components/ui/Confetti";
import { AddToCalendar } from "@/components/ui/AddToCalendar";

const initialState: RsvpActionState = { ok: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-gold w-full">
      {pending ? "Sending…" : "Submit RSVP"}
    </button>
  );
}

export function Rsvp() {
  const [state, formAction] = useFormState(submitRsvp, initialState);
  const [attending, setAttending] = useState<"yes" | "no" | "">("");

  if (state.ok) {
    return (
      <Section id="rsvp" eyebrow="RSVP" title="Thank You">
        <Confetti />
        <Reveal className="card-luxe text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-3xl">
            💌
          </div>
          <p className="font-serif text-xl text-emerald-900">
            Thank you. Your RSVP has been received.
          </p>
          <p className="mt-2 italic text-emerald-700/80">
            Gracias. Hemos recibido su confirmación.
          </p>
          <div className="mt-7">
            <AddToCalendar
              className="btn-gold"
              label="Add to Calendar"
            />
            <p className="mt-3 text-xs text-emerald-700/60">
              Save the date so you don&apos;t miss the celebration!
            </p>
          </div>
        </Reveal>
      </Section>
    );
  }

  return (
    <Section id="rsvp" eyebrow="RSVP" title="Will You Join Us?">
      <Reveal className="mb-8 text-center">
        <p className="text-emerald-900">
          Kindly respond by{" "}
          <span className="font-semibold text-gold-700">
            {event.rsvp.deadlineLabel}
          </span>
          .
        </p>
        <p className="mt-1 text-sm italic text-emerald-700/80">
          Favor de confirmar antes del {event.rsvp.deadlineLabelEs}.
        </p>
        <p className="mt-4 text-sm text-emerald-800">
          Prefer to text? Reach us at{" "}
          <a
            href={`sms:${event.rsvp.phone.replace(/[^0-9]/g, "")}`}
            className="font-semibold text-gold-700 underline-offset-2 hover:underline"
          >
            {event.rsvp.phone}
          </a>{" "}
          <span className="text-emerald-700/70">
            ({event.rsvp.phoneNote.toLowerCase()})
          </span>
        </p>
      </Reveal>

      <Reveal delay={100}>
        <form action={formAction} className="card-luxe space-y-5">
          <div>
            <label htmlFor="full_name" className="field-label">
              Full Name <span className="text-gold-600">*</span>
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              autoComplete="name"
              className="field-input"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="phone" className="field-label">
              Phone Number <span className="text-gold-600">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="field-input"
              placeholder="801-000-0000"
            />
          </div>

          <div>
            <span className="field-label">
              Will you be attending? <span className="text-gold-600">*</span>
            </span>
            <div className="mt-1 grid grid-cols-2 gap-3">
              {(["yes", "no"] as const).map((value) => (
                <label
                  key={value}
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                    attending === value
                      ? "border-gold-400 bg-gold-50 text-emerald-900 shadow-sm"
                      : "border-emerald-200 bg-white/70 text-emerald-700 hover:border-gold-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value={value}
                    required
                    className="sr-only"
                    checked={attending === value}
                    onChange={() => setAttending(value)}
                  />
                  {value === "yes" ? "Yes, joyfully" : "No, regretfully"}
                </label>
              ))}
            </div>
          </div>

          {attending !== "no" && (
            <>
              <div>
                <label htmlFor="guest_count" className="field-label">
                  Number of Guests (including you)
                </label>
                <input
                  id="guest_count"
                  name="guest_count"
                  type="number"
                  min={1}
                  max={20}
                  defaultValue={1}
                  className="field-input"
                />
              </div>

              <div>
                <label htmlFor="guest_names" className="field-label">
                  Guest Names
                </label>
                <textarea
                  id="guest_names"
                  name="guest_names"
                  rows={2}
                  className="field-input"
                  placeholder="Names of guests attending with you"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="message_for_jaylah" className="field-label">
              A Message for Jaylah{" "}
              <span className="font-normal text-emerald-700/60">(optional)</span>
            </label>
            <textarea
              id="message_for_jaylah"
              name="message_for_jaylah"
              rows={3}
              className="field-input"
              placeholder="Share your well wishes…"
            />
          </div>

          {state.error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <p>{state.error}</p>
              {state.errorEs && (
                <p className="mt-1 italic text-red-600/80">{state.errorEs}</p>
              )}
            </div>
          )}

          <SubmitButton />

          <p className="text-center text-xs text-emerald-700/60">
            Please respond by {event.rsvp.deadlineLabel} ·{" "}
            {event.rsvp.deadlineLabelEs}
          </p>
        </form>
      </Reveal>
    </Section>
  );
}
