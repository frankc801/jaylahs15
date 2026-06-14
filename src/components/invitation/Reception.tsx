import { event } from "@/config/event";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

function Detail({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-emerald-50 text-xl text-gold-600">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          {label}
        </p>
        <div className="mt-1 text-emerald-900">{children}</div>
      </div>
    </div>
  );
}

export function Reception() {
  return (
    <Section eyebrow="The Reception" title="La Recepción">
      <Reveal className="card-luxe">
        <h3 className="text-center font-serif text-2xl text-emerald-900">
          {event.venue.name}
        </h3>
        <div className="gold-divider my-6">
          <span className="text-sm">✦</span>
        </div>

        <div className="mx-auto grid max-w-md gap-6">
          <Detail icon="📍" label="Address · Dirección">
            <p>{event.venue.address}</p>
            <p className="mt-1 text-sm italic text-emerald-700/80">
              {event.venue.locationNote} · {event.venue.locationNoteEs}
            </p>
          </Detail>

          <Detail icon="🕓" label="Guest Arrival · Llegada de Invitados">
            <p>{event.venue.guestArrival}</p>
          </Detail>
        </div>

        <div className="mt-8 text-center">
          <a
            href={event.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            View Location
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
