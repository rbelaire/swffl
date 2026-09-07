import Link from "next/link";
import {
  getManagers,
  getRecords,
  getRosterPlayers,
  getSeasons,
  getTeams,
  isSupabaseConfigured,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const configured = isSupabaseConfigured();

  const [managers, seasons, teams, players, records] = await Promise.all([
    getManagers(),
    getSeasons(),
    getTeams(),
    getRosterPlayers(),
    getRecords(),
  ]);

  const cards = [
    { href: "/admin/managers", label: "Managers", count: managers.length },
    { href: "/admin/seasons", label: "Seasons", count: seasons.length },
    { href: "/admin/teams", label: "Teams", count: teams.length },
    { href: "/admin/rosters", label: "Roster Players", count: players.length },
    { href: "/admin/records", label: "Records", count: records.length },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-700 text-navy-950">Dashboard</h1>
      <p className="mt-1 text-sm text-navy-900/60">
        Manage everything on the site from here. Changes save straight to
        Supabase and appear live.
      </p>

      {!configured && (
        <div className="mt-6 rounded-xl border border-gold/40 bg-gold/10 p-5 text-sm text-[#7a611b]">
          <p className="font-semibold">Supabase isn&apos;t connected yet</p>
          <p className="mt-1 leading-relaxed">
            Add your project keys to <code>.env.local</code> and run{" "}
            <code>supabase/schema.sql</code> to enable saving. See the README for
            step-by-step setup.
          </p>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="card group p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
              {c.label}
            </p>
            <p className="mt-2 font-display text-3xl font-700 text-navy-950">
              {c.count}
            </p>
            <p className="mt-3 text-sm font-semibold text-navy-600 group-hover:text-navy-800">
              Manage →
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 card p-6">
        <h2 className="font-display text-lg font-700 text-navy-950">
          Editing tips
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-navy-900/75">
          <li>
            • Add <strong>Managers</strong> first, then create a{" "}
            <strong>Season</strong> and its <strong>Teams</strong>.
          </li>
          <li>
            • All-time stats on the public site are calculated automatically from
            season results — no manual totals needed.
          </li>
          <li>
            • Use <strong>Site Content</strong> to edit the About, Rules and
            Payouts blurbs shown on the home and history pages.
          </li>
        </ul>
      </div>
    </div>
  );
}
