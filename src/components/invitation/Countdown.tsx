import { event } from "@/config/event";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { AddToCalendar } from "@/components/ui/AddToCalendar";
import { Reveal } from "@/components/ui/Reveal";

export function Countdown() {
  return (
    <section className="relative overflow-hidden bg-emerald-radial px-5 py-16 text-center sm:py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-2xl">
        <Reveal>
          <p className="section-eyebrow !text-gold-300">Counting Down</p>
          <h2 className="mt-3 font-serif text-3xl text-cream sm:text-4xl">
            Until We Celebrate
          </h2>
          <p className="mt-2 text-sm italic text-gold-100/70">
            La cuenta regresiva para los XV de Jaylah
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <CountdownTimer targetLocal={event.date.startLocal} />
        </Reveal>

        <Reveal delay={220} className="mt-10">
          <AddToCalendar />
        </Reveal>
      </div>
    </section>
  );
}
