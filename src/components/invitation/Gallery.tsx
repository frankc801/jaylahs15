import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Gallery() {
  // Placeholder tiles until professional save-the-date photos are ready.
  const tiles = [
    { span: "sm:col-span-2 sm:row-span-2", emoji: "👑" },
    { span: "", emoji: "✨" },
    { span: "", emoji: "💛" },
    { span: "", emoji: "📸" },
    { span: "", emoji: "🌿" },
  ];

  return (
    <Section eyebrow="Memories" title="Photo Gallery">
      <Reveal className="text-center">
        <p className="mx-auto mb-8 max-w-xl text-emerald-800">
          Professional save-the-date photos are coming soon.
          <span className="mt-1 block italic text-emerald-700/80">
            Las fotos profesionales estarán disponibles próximamente.
          </span>
        </p>
      </Reveal>

      <Reveal
        delay={120}
        className="grid auto-rows-[120px] grid-cols-2 gap-3 sm:auto-rows-[150px] sm:grid-cols-3"
      >
        {tiles.map((tile, i) => (
          <div
            key={i}
            className={`group flex items-center justify-center overflow-hidden rounded-2xl border border-gold-200/70 bg-gradient-to-br from-emerald-50 to-gold-50 shadow-sm transition hover:shadow-luxe ${tile.span}`}
          >
            <span className="text-3xl opacity-50 transition group-hover:scale-110 group-hover:opacity-80 sm:text-4xl">
              {tile.emoji}
            </span>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
