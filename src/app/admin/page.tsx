import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { getStats, listRsvps } from "@/lib/rsvp-queries";
import { logout } from "./auth-actions";
import { LoginForm } from "@/components/admin/LoginForm";
import { RsvpRow } from "@/components/admin/RsvpRow";
import { event } from "@/config/event";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  accent = "emerald",
}: {
  label: string;
  value: number | string;
  accent?: "emerald" | "gold" | "red" | "slate";
}) {
  const accents = {
    emerald: "from-emerald-600 to-emerald-800",
    gold: "from-gold-500 to-gold-700",
    red: "from-red-500 to-red-700",
    slate: "from-slate-500 to-slate-700",
  };
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <p
        className={`bg-gradient-to-br ${accents[accent]} bg-clip-text text-4xl font-bold text-transparent`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-emerald-700/70">
        {label}
      </p>
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  if (!isAuthenticated()) {
    return (
      <LoginForm
        title="Admin Dashboard"
        subtitle="Jaylah XV · enter the password to continue."
      />
    );
  }

  const search = searchParams.q?.trim() ?? "";
  const [stats, rsvps] = await Promise.all([getStats(), listRsvps(search)]);

  return (
    <main className="min-h-[100svh] bg-cream px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-eyebrow">Admin Dashboard</p>
            <h1 className="font-serif text-3xl text-emerald-900">
              {event.quinceanera.firstName}&apos;s RSVPs
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/check-in"
              className="rounded-full border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Check-in
            </Link>
            <a
              href="/admin/export"
              className="rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-gold-400"
            >
              Export CSV
            </a>
            <form action={logout}>
              <button className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
                Log out
              </button>
            </form>
          </div>
        </div>

        {/* stats */}
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Submissions" value={stats.totalSubmissions} />
          <StatCard
            label="Attending Guests"
            value={stats.totalAttendingGuests}
            accent="gold"
          />
          <StatCard
            label="Not Attending"
            value={stats.totalNotAttending}
            accent="red"
          />
          <StatCard
            label="Checked In"
            value={stats.totalCheckedIn}
            accent="slate"
          />
        </div>

        {/* search */}
        <form method="GET" className="mt-7 flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={search}
            placeholder="Search by name or phone number…"
            className="field-input flex-1"
          />
          <button className="btn-gold !px-5 !py-2.5">Search</button>
          {search && (
            <Link
              href="/admin"
              className="flex items-center rounded-full border border-emerald-200 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Clear
            </Link>
          )}
        </form>

        {/* list */}
        <div className="mt-5">
          <p className="mb-3 text-sm text-emerald-700/70">
            {search
              ? `${rsvps.length} result(s) for “${search}”`
              : `Latest RSVPs (${rsvps.length})`}
          </p>
          <div className="space-y-3">
            {rsvps.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-emerald-200 bg-white/60 p-10 text-center text-emerald-700/70">
                No RSVPs found.
              </div>
            ) : (
              rsvps.map((rsvp) => <RsvpRow key={rsvp.id} rsvp={rsvp} />)
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
