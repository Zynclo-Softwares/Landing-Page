import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock, RefreshCw, Trash2, Mail, Inbox, LogOut } from "lucide-react";
import ThemeToggle from "../components/theme/ThemeToggle";
import {
  STATUSES,
  adminClient,
  deleteTicket,
  listTickets,
  setTicketStatus,
  unlock,
} from "@/lib/tickets";

const SESSION_KEY = "zynclo_tickets_token";

const STATUS_STYLES = {
  "On hold":
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30",
  "In progress":
    "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30",
  Completed:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
};

function formatDate(iso) {
  if (!iso) return "Unknown date";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function Header({ onLogout }) {
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-2 py-1 -mx-2 rounded"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </Link>
        <span className="text-slate-200 dark:text-slate-700">|</span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Support tickets</span>
        <div className="ml-auto flex items-center gap-2">
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2 py-1 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Lock</span>
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const token = await unlock(password);
    setBusy(false);
    if (token) onUnlock(token);
    else setError("Wrong password.");
  };

  return (
    <div className="max-w-sm mx-auto px-6 py-24">
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-5">
          <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">Tickets</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Enter the password to manage support tickets.</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/10"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={busy || !password}
            className="w-full py-3 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            {busy ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}

function TicketCard({ ticket, onStatus, onDelete, busy }) {
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
      <div className="flex flex-wrap items-start gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900 dark:text-slate-50 truncate">{ticket.name || "No name"}</p>
          <a
            href={`mailto:${ticket.email}`}
            className="inline-flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:underline break-all"
          >
            <Mail className="w-3.5 h-3.5 shrink-0" />
            {ticket.email || "No email"}
          </a>
        </div>
        <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${STATUS_STYLES[ticket.status]}`}>
          {ticket.status}
        </span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap break-words mb-4">{ticket.message}</p>
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs text-slate-400 dark:text-slate-500 mr-auto">{formatDate(ticket.submitted_at)}</span>
        <select
          value={ticket.status}
          disabled={busy}
          onChange={(e) => onStatus(ticket, e.target.value)}
          aria-label="Ticket status"
          className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none focus:border-indigo-400 disabled:opacity-50"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {confirming ? (
          <span className="inline-flex items-center gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => onDelete(ticket)}
              className="text-sm px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="text-sm px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
          </span>
        ) : (
          <button
            type="button"
            disabled={busy}
            onClick={() => setConfirming(true)}
            aria-label="Delete ticket"
            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 disabled:opacity-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Tickets() {
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_KEY));
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [busyKey, setBusyKey] = useState(null);
  const [filter, setFilter] = useState("All");

  const redis = useMemo(() => (token ? adminClient(token) : null), [token]);

  useEffect(() => {
    document.title = "Tickets · Zynclo";
    return () => {
      document.title = "Zynclo";
    };
  }, []);

  const load = useCallback(async () => {
    if (!redis) return;
    setLoading(true);
    setError("");
    try {
      setTickets(await listTickets(redis));
    } catch (err) {
      console.error(err);
      setError("Couldn't load tickets. The ticket store refused the request or is unreachable.");
    } finally {
      setLoading(false);
    }
  }, [redis]);

  useEffect(() => {
    load();
  }, [load]);

  const handleUnlock = (t) => {
    sessionStorage.setItem(SESSION_KEY, t);
    setToken(t);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setToken(null);
    setTickets([]);
  };

  const handleStatus = async (ticket, status) => {
    setBusyKey(ticket.key);
    try {
      const updated = await setTicketStatus(redis, ticket, status);
      setTickets((prev) => prev.map((t) => (t.key === ticket.key ? updated : t)));
    } catch (err) {
      console.error(err);
      setError("Couldn't update that ticket.");
    } finally {
      setBusyKey(null);
    }
  };

  const handleDelete = async (ticket) => {
    setBusyKey(ticket.key);
    try {
      await deleteTicket(redis, ticket);
      setTickets((prev) => prev.filter((t) => t.key !== ticket.key));
    } catch (err) {
      console.error(err);
      setError("Couldn't delete that ticket.");
    } finally {
      setBusyKey(null);
    }
  };

  const counts = useMemo(() => {
    const c = { All: tickets.length };
    STATUSES.forEach((s) => (c[s] = tickets.filter((t) => t.status === s).length));
    return c;
  }, [tickets]);

  const visible = filter === "All" ? tickets : tickets.filter((t) => t.status === filter);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950">
      <Header onLogout={token ? handleLogout : null} />
      {!token ? (
        <PasswordGate onUnlock={handleUnlock} />
      ) : (
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-wrap items-end gap-4 mb-8">
            <div className="mr-auto">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                Support tickets
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                Messages sent through the Get In Touch form, newest first.
              </p>
            </div>
            <button
              type="button"
              onClick={load}
              disabled={loading}
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {["All", ...STATUSES].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  filter === s
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-indigo-600 dark:border-indigo-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                }`}
              >
                {s} <span className="opacity-60">{counts[s]}</span>
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          {loading && tickets.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading tickets…</p>
          ) : visible.length === 0 ? (
            <div className="py-20 text-center">
              <Inbox className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-slate-500 dark:text-slate-400">
                {tickets.length === 0 ? "No tickets yet." : `No tickets marked ${filter}.`}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {visible.map((t) => (
                <TicketCard
                  key={t.key}
                  ticket={t}
                  busy={busyKey === t.key}
                  onStatus={handleStatus}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
