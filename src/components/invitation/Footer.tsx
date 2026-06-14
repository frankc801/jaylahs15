import { event } from "@/config/event";
import { Crown } from "@/components/ui/Crown";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-emerald-radial px-6 py-16 text-center text-cream">
      <div className="mx-auto max-w-2xl">
        <Crown className="mx-auto mb-6 h-10 w-16 opacity-90" />
        <p className="font-script text-4xl text-foil sm:text-5xl">Jaylah</p>
        <div className="gold-divider my-6 text-gold-300">
          <span>✦</span>
        </div>
        <p className="text-lg text-cream/90">{event.footer.en}</p>
        <p className="mt-2 text-base italic text-gold-100/80">
          {event.footer.es}
        </p>
        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-gold-200/70">
          {event.celebration.title} · {event.date.label}
        </p>
      </div>
    </footer>
  );
}
