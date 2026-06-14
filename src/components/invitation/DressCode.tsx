import { event } from "@/config/event";
import { Section, Bilingual } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function DressCode() {
  return (
    <Section
      id="dress-code"
      eyebrow="Attire"
      title="Dress Code"
      tone="dark"
      className="bg-emerald-radial"
    >
      <Reveal className="rounded-3xl border border-gold-300/30 bg-emerald-950/30 p-7 text-center backdrop-blur-sm sm:p-10">
        <div className="mx-auto mb-6 flex items-center justify-center gap-3">
          <span className="h-4 w-4 rounded-full bg-gold-400 ring-2 ring-gold-200/40" />
          <span className="text-xs uppercase tracking-[0.3em] text-gold-200">
            Formal · Emerald & Gold
          </span>
          <span className="h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-emerald-300/40" />
        </div>
        <Bilingual
          en={event.dressCode.en}
          es={event.dressCode.es}
          className="text-lg"
          enClassName="text-cream"
          esClassName="!text-gold-100/80"
        />
      </Reveal>
    </Section>
  );
}
