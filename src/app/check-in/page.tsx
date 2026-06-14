import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { listRsvps, getStats } from "@/lib/rsvp-queries";
import { logout } from "@/app/admin/auth-actions";
import { LoginForm } from "@/components/admin/LoginForm";
import { CheckInCard } from "@/components/admin/CheckInCard";
import { event } from "@/config/event";

export const dynamic = "force-dynamic";

export default async function CheckInPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  if (!isAuthenticated()) {
    return (
      <LoginForm
        title="Guest Check-In"
        subtitle="Jaylah XV · enter the password to continue."
      />
    );
  }

  const search = searchParams.q?.trim() ?? "";
  const [stats, rsvps] = await Promise.all([
    getStats(),
    // Only query the list when a search term is present, to keep the screen focused.
    search ? listRsvps(search) : Promise.resolve([]),
  ]);

  return (
    <main className="min-h-[100svh] bg-cream px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-xl">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-eyebrow">Guest Check-In</p>
            <h1 className="font-serif text-3xl text-emerald-900">
              {event.celebration.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="rounded-full border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Dashboard
            </Link>
            <form action={logout}>
              <button className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
                Log out
              </button>
            </form>
          </div>
        </div>

        {/* quick stat */}
        <div className="mt-5 rounded-2xl border border-emerald-100 bg-white p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-emerald-700">
            {stats.totalCheckedIn}
            <span className="text-lg font-normal text-emerald-700/50">
              {" "}
              / {stats.totalSubmissions} parties
            </span>
          </p>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/60">
            Checked in
          </p>
        </div>

        {/* search */}
        <form method="GET" className="mt-5 flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={search}
            autoFocus
            placeholder="Search guest by name or phone…"
            className="field-input flex-1"
          />
          <button className="btn-gold !px-5 !py-2.5">Search</button>
        </form>

        {/* results */}
        <div className="mt-5 space-y-4">
          {!search ? (
            <div className="rounded-2xl border border-dashed border-emerald-200 bg-white/60 p-10 text-center text-emerald-700/70">
              Search for a guest to begin check-in.
            </div>
          ) : rsvps.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-emerald-200 bg-white/60 p-10 text-center text-emerald-700/70">
              No guests found for “{search}”.
            </div>
          ) : (
            rsvps.map((rsvp) => <CheckInCard key={rsvp.id} rsvp={rsvp} />)
          )}
        </div>
      </div>
    </main>
  );
}
