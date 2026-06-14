import Link from "next/link";
import { event } from "@/config/event";
import { Crown } from "@/components/ui/Crown";

export function Hero() {
  return (
    <header className="relative isolate overflow-hidden bg-emerald-radial">
      {/* decorative gold glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-72 w-72 -translate-x-1/2 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-10%] h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* drifting gold sparkles */}
        {[
          { left: "12%", top: "22%", size: "text-sm", delay: "0s" },
          { left: "82%", top: "30%", size: "text-base", delay: "1.2s" },
          { left: "20%", top: "70%", size: "text-xs", delay: "2.1s" },
          { left: "70%", top: "75%", size: "text-sm", delay: "0.6s" },
          { left: "50%", top: "15%", size: "text-xs", delay: "1.8s" },
          { left: "88%", top: "60%", size: "text-xs", delay: "2.6s" },
        ].map((s, i) => (
          <span
            key={i}
            className={`absolute animate-float text-gold-300/60 ${s.size}`}
            style={{ left: s.left, top: s.top, animationDelay: s.delay }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <Crown className="mb-6 h-14 w-20 animate-float drop-shadow-[0_6px_16px_rgba(212,175,55,0.4)]" />

        <p className="animate-fade-in text-sm font-medium uppercase tracking-[0.4em] text-gold-200">
          {event.celebration.title}
        </p>

        <h1 className="mt-5 animate-fade-up font-serif text-5xl font-bold leading-[1.05] text-cream sm:text-7xl">
          <span className="block text-foil">Jaylah</span>
          <span className="mt-1 block text-3xl font-medium text-cream/90 sm:text-4xl">
            María Badillo
          </span>
        </h1>

        <div className="gold-divider mt-8 text-gold-300">
          <span>✦</span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-1 text-cream/90">
          <p className="font-serif text-2xl tracking-wide sm:text-3xl">
            {event.date.label}
          </p>
          <p className="text-sm uppercase tracking-[0.25em] text-gold-200/90">
            {event.venue.name}
          </p>
        </div>

        <p className="mt-6 rounded-full border border-gold-300/40 bg-emerald-950/40 px-5 py-2 text-xs uppercase tracking-[0.25em] text-gold-100 backdrop-blur-sm">
          RSVP by {event.rsvp.deadlineLabel}
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Link href="#rsvp" className="btn-gold w-full sm:w-auto">
            RSVP Now
          </Link>
          <a
            href={event.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline w-full sm:w-auto"
          >
            View Location
          </a>
        </div>
      </div>

      {/* soft fade into the page */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-cream" />
    </header>
  );
}
