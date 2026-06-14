import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { eventConfig } from "./eventConfig";
import { isSupabaseConfigured, supabase } from "./supabaseClient";
import "./styles.css";

const emptyRsvp = {
  full_name: "",
  phone: "",
  attending: "yes",
  guest_count: "1",
  guest_names: "",
  message_for_jaylah: "",
};

function App() {
  const path = window.location.pathname;

  if (path === "/admin") return <ProtectedPage page="admin" />;
  if (path === "/check-in") return <ProtectedPage page="check-in" />;
  return <InvitationPage />;
}

function InvitationPage() {
  return (
    <main className="site-shell">
      <Hero />
      <InvitationMessage />
      <InfoSections />
      <RsvpSection />
      <Blessings />
      <Gallery />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-ornament" aria-hidden="true">
        <span>XV</span>
      </div>
      <p className="eyebrow">A royal celebration</p>
      <h1>{eventConfig.displayName}</h1>
      <p className="hero-title">{eventConfig.eventTitle}</p>
      <div className="hero-details">
        <span>{eventConfig.eventDate}</span>
        <span>RSVP by {eventConfig.rsvpDeadline}</span>
        <span>{eventConfig.venue}</span>
      </div>
      <div className="hero-actions">
        <a className="button button-primary" href="#rsvp">
          RSVP Now
        </a>
        <a className="button button-secondary" href={eventConfig.mapsUrl} target="_blank" rel="noreferrer">
          View Location
        </a>
      </div>
      <div className="scroll-hint">Familia, amor y celebración</div>
    </section>
  );
}

function InvitationMessage() {
  return (
    <section className="section centered">
      <div className="crown-mark" aria-hidden="true">♕</div>
      <h2>With love and joy</h2>
      <p>
        Frank Carbajal & Andrea Badillo invite you to celebrate the quinceañera of their
        daughter, Jaylah María Badillo.
      </p>
      <p className="spanish">
        Frank Carbajal y Andrea Badillo tienen el honor de invitarlos a celebrar los quince
        años de su hija, Jaylah María Badillo.
      </p>
    </section>
  );
}

function InfoSections() {
  const cards = [
    {
      title: "Ceremony",
      body: "Church details will be updated later.",
      spanish: "Los detalles de la ceremonia religiosa serán actualizados próximamente.",
    },
    {
      title: "Reception",
      body: `${eventConfig.venue}\n${eventConfig.address}\nGuest arrival: ${eventConfig.arrivalTime}\n${eventConfig.locationNote}`,
      spanish: `${eventConfig.venue}\n${eventConfig.address}\nLlegada de invitados: ${eventConfig.arrivalTime}\n${eventConfig.locationNoteSpanish}`,
    },
    {
      title: "Dress Code",
      body:
        "Formal attire requested. Please do not wear emerald green, as this color is reserved for the quinceañera. Gold accents are welcome.",
      spanish:
        "Se pide vestimenta formal. Favor de no vestir color verde esmeralda, ya que este color está reservado para la quinceañera. Detalles en dorado son bienvenidos.",
    },
  ];

  return (
    <section className="section info-grid">
      {cards.map((card) => (
        <article className="detail-card" key={card.title}>
          <p className="card-kicker">Jaylah XV</p>
          <h2>{card.title}</h2>
          <p>{card.body}</p>
          <p className="spanish">{card.spanish}</p>
        </article>
      ))}
    </section>
  );
}

function RsvpSection() {
  const [form, setForm] = useState(emptyRsvp);
  const [state, setState] = useState({ type: "idle", message: "" });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submitRsvp(event) {
    event.preventDefault();
    setState({ type: "idle", message: "" });

    const guestCount = Number(form.guest_count);
    if (!form.full_name.trim() || !form.phone.trim() || Number.isNaN(guestCount) || guestCount < 0) {
      setState({ type: "error", message: "Please complete all required fields before submitting." });
      return;
    }

    if (!isSupabaseConfigured) {
      setState({
        type: "error",
        message: "RSVP storage is not configured yet. Please add Supabase environment variables.",
      });
      return;
    }

    const payload = {
      full_name: form.full_name.trim(),
      phone: form.phone.trim(),
      attending: form.attending === "yes",
      guest_count: form.attending === "yes" ? guestCount : 0,
      guest_names: form.guest_names.trim(),
      message_for_jaylah: form.message_for_jaylah.trim(),
      status: "submitted",
    };

    const { error } = await supabase.from("rsvps").insert(payload);
    if (error) {
      setState({ type: "error", message: "We could not submit your RSVP. Please try again." });
      return;
    }

    setForm(emptyRsvp);
    setState({
      type: "success",
      message: "Thank you. Your RSVP has been received. Gracias. Hemos recibido su confirmación.",
    });
  }

  return (
    <section className="section rsvp-band" id="rsvp">
      <div className="rsvp-intro">
        <p className="eyebrow">RSVP</p>
        <h2>Confirm by {eventConfig.rsvpDeadline}</h2>
        <p>
          Text-only RSVP phone: <a href="sms:8012058959">{eventConfig.rsvpPhone}</a>
        </p>
      </div>
      <form className="rsvp-form" onSubmit={submitRsvp}>
        <label>
          Full name
          <input name="full_name" value={form.full_name} onChange={updateField} required />
        </label>
        <label>
          Phone number
          <input name="phone" value={form.phone} onChange={updateField} inputMode="tel" required />
        </label>
        <fieldset>
          <legend>Attending?</legend>
          <div className="segmented">
            <label>
              <input
                type="radio"
                name="attending"
                value="yes"
                checked={form.attending === "yes"}
                onChange={updateField}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="attending"
                value="no"
                checked={form.attending === "no"}
                onChange={updateField}
              />
              No
            </label>
          </div>
        </fieldset>
        <label>
          Number of guests
          <input
            name="guest_count"
            value={form.guest_count}
            onChange={updateField}
            type="number"
            min="0"
            required
          />
        </label>
        <label className="span-2">
          Guest names
          <textarea name="guest_names" value={form.guest_names} onChange={updateField} rows="3" />
        </label>
        <label className="span-2">
          Optional message for Jaylah
          <textarea
            name="message_for_jaylah"
            value={form.message_for_jaylah}
            onChange={updateField}
            rows="4"
          />
        </label>
        {state.message && <p className={`form-message ${state.type}`}>{state.message}</p>}
        <button className="button button-primary span-2" type="submit">
          Submit RSVP
        </button>
      </form>
    </section>
  );
}

function Blessings() {
  return (
    <section className="section centered blessings">
      <h2>Gifts and Blessings</h2>
      <p>
        Your presence means so much to our family. Gifts or monetary blessings are appreciated as
        we celebrate this special day with Jaylah. A gift table and blessing box will be available
        at the entrance.
      </p>
      <p className="spanish">
        Su presencia significa mucho para nuestra familia. Regalos o bendiciones monetarias serán
        agradecidos mientras celebramos este día tan especial con Jaylah. Habrá una mesa de regalos
        y caja de bendiciones en la entrada.
      </p>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section gallery">
      <div>
        <p className="eyebrow">Save the date</p>
        <h2>Photo Gallery</h2>
        <p>Professional save-the-date photos will be added here soon.</p>
      </div>
      <div className="photo-grid" aria-label="Photo placeholders">
        <div />
        <div />
        <div />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>With love, the family of Jaylah María Badillo.</p>
      <p>Con cariño, la familia de Jaylah María Badillo.</p>
    </footer>
  );
}

function ProtectedPage({ page }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) return <ConfigMissing />;
  if (loading) return <div className="admin-shell">Loading...</div>;
  if (!session) return <Login />;

  return page === "admin" ? <AdminDashboard /> : <CheckInPage />;
}

function ConfigMissing() {
  return (
    <main className="admin-shell">
      <section className="auth-panel">
        <h1>Supabase setup needed</h1>
        <p>Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.</p>
      </section>
    </main>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function signIn(event) {
    event.preventDefault();
    setError("");
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError("Unable to sign in. Check the email and password.");
  }

  return (
    <main className="admin-shell">
      <form className="auth-panel" onSubmit={signIn}>
        <p className="eyebrow">Private access</p>
        <h1>Jaylah XV Admin</h1>
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {error && <p className="form-message error">{error}</p>}
        <button className="button button-primary" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
}

function AdminDashboard() {
  const [rsvps, setRsvps] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadRsvps() {
    setLoading(true);
    const { data, error } = await supabase.from("rsvps").select("*").order("submitted_at", { ascending: false });
    if (!error) setRsvps(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadRsvps();
  }, []);

  const filtered = useMemo(() => filterRsvps(rsvps, query), [rsvps, query]);
  const totals = useMemo(() => getTotals(rsvps), [rsvps]);

  async function updateRsvp(id, values) {
    const { error } = await supabase.from("rsvps").update(values).eq("id", id);
    if (!error) {
      setRsvps((current) => current.map((rsvp) => (rsvp.id === id ? { ...rsvp, ...values } : rsvp)));
    }
  }

  return (
    <main className="admin-shell">
      <AdminHeader title="RSVP Dashboard" />
      <section className="stats-grid">
        <Stat label="Total RSVPs" value={totals.total} />
        <Stat label="Attending guests" value={totals.attendingGuests} />
        <Stat label="Not attending" value={totals.notAttending} />
      </section>
      <section className="admin-tools">
        <input
          aria-label="Search RSVPs"
          placeholder="Search by guest name or phone"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="button button-secondary" onClick={() => exportCsv(rsvps)} type="button">
          Export CSV
        </button>
      </section>
      <section className="admin-list">
        <h2>Latest RSVPs</h2>
        {loading ? <p>Loading RSVPs...</p> : null}
        {!loading && filtered.length === 0 ? <p>No RSVPs found.</p> : null}
        {filtered.map((rsvp) => (
          <RsvpAdminCard key={rsvp.id} rsvp={rsvp} onUpdate={updateRsvp} />
        ))}
      </section>
    </main>
  );
}

function CheckInPage() {
  const [query, setQuery] = useState("");
  const [allRsvps, setAllRsvps] = useState([]);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [giftNotes, setGiftNotes] = useState("");

  useEffect(() => {
    supabase
      .from("rsvps")
      .select("*")
      .order("submitted_at", { ascending: false })
      .then(({ data }) => setAllRsvps(data || []));
  }, []);

  async function search(event) {
    event.preventDefault();
    const matches = filterRsvps(allRsvps, query);
    setResults(matches);
    setSelected(matches[0] || null);
    setGiftNotes(matches[0]?.gift_notes || "");
  }

  async function markCheckedIn() {
    if (!selected) return;
    const values = {
      checked_in: true,
      gift_received: Boolean(giftNotes.trim()),
      gift_notes: giftNotes.trim(),
    };
    const { error } = await supabase.from("rsvps").update(values).eq("id", selected.id);
    if (!error) {
      const updated = { ...selected, ...values };
      setSelected(updated);
      setResults((current) => current.map((item) => (item.id === selected.id ? updated : item)));
      setAllRsvps((current) => current.map((item) => (item.id === selected.id ? updated : item)));
    }
  }

  return (
    <main className="admin-shell">
      <AdminHeader title="Guest Check-In" />
      <form className="admin-tools" onSubmit={search}>
        <input
          placeholder="Search guest by name or phone"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          required
        />
        <button className="button button-primary" type="submit">
          Search
        </button>
      </form>
      <section className="checkin-layout">
        <div className="admin-list">
          {results.map((rsvp) => (
            <button
              className={`result-row ${selected?.id === rsvp.id ? "active" : ""}`}
              key={rsvp.id}
              onClick={() => {
                setSelected(rsvp);
                setGiftNotes(rsvp.gift_notes || "");
              }}
              type="button"
            >
              <span>{rsvp.full_name}</span>
              <small>{rsvp.phone}</small>
            </button>
          ))}
        </div>
        <div className="checkin-card">
          {selected ? (
            <>
              <p className="eyebrow">{selected.checked_in ? "Checked in" : "Awaiting check-in"}</p>
              <h2>{selected.full_name}</h2>
              <p>{selected.phone}</p>
              <dl>
                <div>
                  <dt>Attending</dt>
                  <dd>{selected.attending ? "Yes" : "No"}</dd>
                </div>
                <div>
                  <dt>Guest count</dt>
                  <dd>{selected.guest_count}</dd>
                </div>
                <div>
                  <dt>Guest names</dt>
                  <dd>{selected.guest_names || "None listed"}</dd>
                </div>
              </dl>
              <label>
                Gift/blessing received
                <textarea value={giftNotes} onChange={(event) => setGiftNotes(event.target.value)} rows="3" />
              </label>
              <button className="button button-primary" onClick={markCheckedIn} type="button">
                Mark as checked in
              </button>
            </>
          ) : (
            <p>Search for a guest to view RSVP details.</p>
          )}
        </div>
      </section>
    </main>
  );
}

function AdminHeader({ title }) {
  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <header className="admin-header">
      <div>
        <p className="eyebrow">Jaylah XV</p>
        <h1>{title}</h1>
      </div>
      <nav>
        <a href="/admin">Admin</a>
        <a href="/check-in">Check-In</a>
        <button onClick={signOut} type="button">Sign out</button>
      </nav>
    </header>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function RsvpAdminCard({ rsvp, onUpdate }) {
  const [notes, setNotes] = useState(rsvp.internal_notes || "");

  return (
    <article className="rsvp-admin-card">
      <div>
        <h3>{rsvp.full_name}</h3>
        <p>{rsvp.phone}</p>
        <p>{rsvp.guest_names || "No guest names listed"}</p>
      </div>
      <div className="admin-controls">
        <label>
          Status
          <select value={rsvp.status} onChange={(event) => onUpdate(rsvp.id, { status: event.target.value })}>
            <option value="submitted">Submitted</option>
            <option value="confirmed">Confirmed</option>
            <option value="declined">Declined</option>
            <option value="needs_follow_up">Needs follow-up</option>
          </select>
        </label>
        <label className="check-label">
          <input
            type="checkbox"
            checked={rsvp.checked_in}
            onChange={(event) => onUpdate(rsvp.id, { checked_in: event.target.checked })}
          />
          Checked in
        </label>
        <label>
          Internal notes
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows="2" />
        </label>
        <button className="button button-secondary" onClick={() => onUpdate(rsvp.id, { internal_notes: notes })}>
          Save notes
        </button>
      </div>
    </article>
  );
}

function filterRsvps(rsvps, query) {
  const term = query.trim().toLowerCase();
  if (!term) return rsvps;
  return rsvps.filter((rsvp) => {
    return (
      rsvp.full_name?.toLowerCase().includes(term) ||
      rsvp.phone?.toLowerCase().includes(term) ||
      rsvp.guest_names?.toLowerCase().includes(term)
    );
  });
}

function getTotals(rsvps) {
  return {
    total: rsvps.length,
    attendingGuests: rsvps
      .filter((rsvp) => rsvp.attending)
      .reduce((sum, rsvp) => sum + Number(rsvp.guest_count || 0), 0),
    notAttending: rsvps.filter((rsvp) => !rsvp.attending).length,
  };
}

function exportCsv(rsvps) {
  const headers = [
    "full_name",
    "phone",
    "attending",
    "guest_count",
    "guest_names",
    "message_for_jaylah",
    "status",
    "checked_in",
    "gift_received",
    "gift_notes",
    "internal_notes",
    "submitted_at",
  ];
  const rows = rsvps.map((rsvp) => headers.map((header) => csvCell(rsvp[header])).join(","));
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "jaylah-xv-rsvps.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

createRoot(document.getElementById("root")).render(<App />);
