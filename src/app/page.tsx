import Image from "next/image";
import Link from "next/link";
import {
  computeCareerStats,
  getManagers,
  getRecords,
  getSeasons,
  getSiteContent,
  getTeams,
  isSupabaseConfigured,
} from "@/lib/data";
import { SectionHeading, StatTile } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [managers, seasons, teams, records, content] = await Promise.all([
    getManagers(),
    getSeasons(),
    getTeams(),
    getRecords(),
    getSiteContent(),
  ]);

  const nameOf = (id: string | null) =>
    managers.find((m) => m.id === id)?.name ?? "—";

  const careers = computeCareerStats(managers, seasons, teams);
  const latest = seasons[0];
  const totalGames = teams.reduce(
    (n, t) => n + t.wins + t.losses + t.ties,
    0,
  );
  const totalPoints = teams.reduce((n, t) => n + Number(t.points_for), 0);
  const activeManagers = managers.filter((m) => m.active).length;
  const seasonsPlayed = seasons.length;
  const topChamp = careers.find((c) => c.championships > 0);

  const about = content.find((c) => c.key === "about");
  const rules = content.find((c) => c.key === "rules");

  const earliestYear = seasons.length
    ? Math.min(...seasons.map((s) => s.year))
    : 2012;

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container-content relative grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="animate-fade-up">
            <span className="badge-gold">Est. {earliestYear} · 14 Seasons</span>
            <h1 className="mt-5 font-display text-5xl font-700 leading-[1.05] tracking-tight sm:text-6xl">
              So Whopped{" "}
              <span className="text-gold-soft">FFL</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Fourteen years of fantasy football glory, heartbreak, and
              trash talk. Every champion, every record, every roster —
              all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/standings" className="btn-primary bg-white text-navy-950 hover:bg-white/90">
                View Standings
              </Link>
              <Link href="/history" className="btn-ghost border-white/25 bg-transparent text-white hover:bg-white/10">
                League History
              </Link>
            </div>
          </div>

          <div className="hidden justify-self-center lg:block">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
              <Image
                src="/logo-white.png"
                alt="So Whopped FFL crest"
                width={200}
                height={300}
                className="h-56 w-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Stat row */}
      <section className="container-content -mt-10 relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Seasons Played" value={seasonsPlayed || 14} />
          <StatTile label="Active Managers" value={activeManagers || "—"} />
          <StatTile label="Games Played" value={totalGames || "—"} />
          <StatTile
            label="Points Scored"
            value={totalPoints ? Math.round(totalPoints).toLocaleString() : "—"}
          />
        </div>
      </section>

      {/* ----------------------------------------------- Reigning champion card */}
      {latest && (
        <section className="container-content mt-20">
          <div className="card overflow-hidden">
            <div className="grid md:grid-cols-[1fr_1.4fr]">
              <div className="flex flex-col justify-center gap-3 bg-navy p-8 text-white sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                  Reigning Champion
                </p>
                <p className="font-display text-4xl font-700 leading-tight">
                  {nameOf(latest.champion_id)}
                </p>
                <p className="text-white/60">{latest.year} Season Champion 🏆</p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-navy-900/10 sm:grid-cols-3">
                {[
                  { label: "Season", value: latest.year },
                  { label: "Runner-Up", value: nameOf(latest.runner_up_id) },
                  { label: "Reg. Season #1", value: nameOf(latest.regular_season_id) },
                ].map((c) => (
                  <div key={c.label} className="bg-white p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                      {c.label}
                    </p>
                    <p className="mt-1.5 font-display text-lg font-600 text-navy-950">
                      {c.value}
                    </p>
                  </div>
                ))}
                {latest.notes && (
                  <div className="col-span-2 bg-white p-6 sm:col-span-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                      Season Notes
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-900/80">
                      {latest.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------- All-time leaders */}
      {careers.length > 0 && (
        <section className="container-content mt-20">
          <SectionHeading
            eyebrow="Hall of Fame"
            title="All-Time Leaders"
            action={{ href: "/stats", label: "Full standings" }}
          />
          <div className="mt-6 overflow-x-auto">
            <table className="stat-table">
              <thead>
                <tr>
                  <th className="w-10">#</th>
                  <th>Manager</th>
                  <th className="text-center">Titles</th>
                  <th className="text-center">Seasons</th>
                  <th className="text-center">W–L–T</th>
                  <th className="text-right">Win %</th>
                </tr>
              </thead>
              <tbody>
                {careers.slice(0, 6).map((c, i) => (
                  <tr key={c.manager.id}>
                    <td className="font-semibold text-navy-500">{i + 1}</td>
                    <td>
                      <span className="font-semibold text-navy-950">
                        {c.manager.name}
                      </span>
                    </td>
                    <td className="text-center">
                      {c.championships > 0 ? (
                        <span className="badge-gold">🏆 {c.championships}</span>
                      ) : (
                        <span className="text-navy-900/40">—</span>
                      )}
                    </td>
                    <td className="text-center">{c.seasons}</td>
                    <td className="text-center tabular-nums">
                      {c.wins}–{c.losses}
                      {c.ties ? `–${c.ties}` : ""}
                    </td>
                    <td className="text-right tabular-nums font-semibold">
                      {(c.winPct * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- About / Rules */}
      {(about || rules) && (
        <section className="container-content mt-20 grid gap-6 lg:grid-cols-2">
          {about && (
            <div id="about" className="card p-8 scroll-mt-24">
              <p className="eyebrow">The League</p>
              <h2 className="mt-1.5 font-display text-2xl font-700 text-navy-950">
                {about.title}
              </h2>
              <div className="mt-4 space-y-3 whitespace-pre-line text-sm leading-relaxed text-navy-900/80">
                {about.body}
              </div>
            </div>
          )}
          {rules && (
            <div id="rules" className="card p-8 scroll-mt-24">
              <p className="eyebrow">Play Nice</p>
              <h2 className="mt-1.5 font-display text-2xl font-700 text-navy-950">
                {rules.title}
              </h2>
              <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-navy-900/80">
                {rules.body}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ------------------------------------------------------------- Records */}
      {records.length > 0 && (
        <section className="container-content mt-20">
          <SectionHeading
            eyebrow="For the Books"
            title="League Records"
            action={{ href: "/records", label: "All records" }}
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {records.slice(0, 4).map((r) => (
              <div key={r.id} className="card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                  {r.title}
                </p>
                <p className="mt-2 font-display text-2xl font-700 text-navy-950">
                  {r.value}
                </p>
                <p className="mt-1 text-sm text-navy-900/70">
                  {r.holder}
                  {r.season_year ? ` · ${r.season_year}` : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- Not configured */}
      {!isSupabaseConfigured() && (
        <section className="container-content mt-20">
          <div className="rounded-xl border border-navy-900/10 bg-white p-8 text-center shadow-card">
            <h3 className="font-display text-xl font-700 text-navy-950">
              You&apos;re seeing placeholder content
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-navy-900/70">
              Connect a Supabase project and run the included schema to bring the
              site to life with your real league data. Full instructions are in
              the README.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
