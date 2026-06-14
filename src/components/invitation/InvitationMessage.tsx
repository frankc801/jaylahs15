import { event } from "@/config/event";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function InvitationMessage() {
  return (
    <Section eyebrow="You Are Invited" title="A Celebration of Love & Family">
      <Reveal className="card-luxe text-center">
        <p className="font-serif text-xl leading-relaxed text-emerald-900 sm:text-2xl">
          “{event.invitationMessage.en}”
        </p>
        <div className="gold-divider my-6">
          <span className="text-sm">✦</span>
        </div>
        <p className="font-serif text-lg italic leading-relaxed text-emerald-700/90 sm:text-xl">
          “{event.invitationMessage.es}”
        </p>
        <p className="mt-8 text-sm uppercase tracking-[0.3em] text-gold-600">
          {event.parents.combined}
        </p>
      </Reveal>
    </Section>
  );
}
