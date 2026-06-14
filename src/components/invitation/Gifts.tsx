import { event } from "@/config/event";
import { Section, Bilingual } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Gifts() {
  return (
    <Section eyebrow="Gifts & Blessings" title="Regalos y Bendiciones">
      <Reveal className="card-luxe text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-2xl">
          🎁
        </div>
        <Bilingual
          en={event.gifts.en}
          es={event.gifts.es}
          className="text-lg"
          enClassName="text-emerald-900"
        />
      </Reveal>
    </Section>
  );
}
