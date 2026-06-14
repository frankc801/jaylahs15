import { event } from "@/config/event";
import { Section, Bilingual } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Ceremony() {
  return (
    <Section eyebrow="The Ceremony" title="Religious Ceremony">
      <Reveal className="card-luxe text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-2xl text-gold-600">
          ⛪
        </div>
        <Bilingual
          en={event.ceremony.en}
          es={event.ceremony.es}
          className="text-lg"
          enClassName="text-emerald-900"
        />
      </Reveal>
    </Section>
  );
}
