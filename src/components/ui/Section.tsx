import { Reveal } from "./Reveal";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
  tone = "light",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className={`relative px-5 py-16 sm:px-8 sm:py-24 ${
        dark ? "text-cream" : "text-ink"
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-3xl">
        {(eyebrow || title) && (
          <Reveal className="mb-10 text-center">
            {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
            {title && (
              <>
                <h2
                  className={`mt-3 text-3xl font-semibold sm:text-4xl heading-serif ${
                    dark ? "!text-cream" : ""
                  }`}
                >
                  {title}
                </h2>
                <div className="gold-divider mt-5">
                  <span className="text-base">✦</span>
                </div>
              </>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/** Renders English text with the Spanish translation beneath it. */
export function Bilingual({
  en,
  es,
  className = "",
  enClassName = "",
  esClassName = "",
}: {
  en: string;
  es: string;
  className?: string;
  enClassName?: string;
  esClassName?: string;
}) {
  return (
    <div className={className}>
      <p className={`leading-relaxed ${enClassName}`}>{en}</p>
      <p
        className={`mt-3 italic leading-relaxed text-emerald-700/80 ${esClassName}`}
      >
        {es}
      </p>
    </div>
  );
}
