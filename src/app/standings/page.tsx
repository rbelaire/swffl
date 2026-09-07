import Link from "next/link";
import { getManagers, getSeasons, getTeams } from "@/lib/data";
import { EmptyState, PageHeader } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Standings" };

export default async function StandingsPage({
  searchParams,
}: {
  searchParams: { year?: string };
}) {
  const [managers, seasons, teams] = await Promise.all([
    getManagers(),
    getSeasons(),
    getTeams(),
  ]);

  const nameOf = (id: string) =>
    managers.find((m) => m.id === id)?.name ?? "Unknown";

  const selectedYear =
    searchParams.year && seasons.some((s) => String(s.year) === searchParams.year)
      ? Number(searchParams.year)
      : seasons[0]?.year;

  const season = seasons.find((s) => s.year === selectedYear);
  const rows = teams
    .filter((t) => t.season_id === season?.id)
    .sort((a, b) => {
      // final finish first if present, else regular-season rank, else wins
      const fa = a.playoff_finish ?? a.regular_season_rank ?? 99;
      const fb = b.playoff_finish ?? b.regular_season_rank ?? 99;
      if (fa !== fb) return fa - fb;
      return b.wins - a.wins || Number(b.points_for) - Number(a.points_for);
    });

  return (
    <>
      <PageHeader
        eyebrow="Season by Season"
        title="Standings"
        intro="Final records and finishes for every team, one season at a time."
      />

      <div className="container-content py-12">
        {seasons.length === 0 ? (
          <EmptyState
            title="No seasons yet"
            message="Once seasons and teams are added in the admin area, standings will appear here."
          />
        ) : (
          <>
            {/* Season picker */}
            <div className="mb-8 flex flex-wrap gap-2">
              {seasons.map((s) => (
                <Link
                  key={s.id}
                  href={`/standings?year=${s.year}`}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    s.year === selectedYear
                      ? "bg-navy text-white"
                      : "border border-navy-900/15 bg-white text-navy-900 hover:border-navy-900/30"
                  }`}
                >
                  {s.year}
                </Link>
              ))}
            </div>

            {season?.notes && (
              <p className="mb-6 max-w-3xl text-sm italic leading-relaxed text-navy-900/70">
                “{season.notes}”
              </p>
            )}

            {rows.length === 0 ? (
              <EmptyState
                title={`No teams for ${selectedYear}`}
                message="Add teams to this season in the admin area to populate the table."
              />
            ) : (
              <div className="card overflow-x-auto">
                <table className="stat-table">
                  <thead>
                    <tr>
                      <th className="w-12">Rk</th>
                      <th>Team</th>
                      <th>Manager</th>
                      <th className="text-center">W</th>
                      <th className="text-center">L</th>
                      <th className="text-center">T</th>
                      <th className="text-right">PF</th>
                      <th className="text-right">PA</th>
                      <th className="text-right">Finish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((t, i) => {
                      const finish = t.playoff_finish;
                      return (
                        <tr key={t.id}>
                          <td className="font-semibold text-navy-500">{i + 1}</td>
                          <td className="font-semibold text-navy-950">
                            {t.team_name || "—"}
                            {finish === 1 && <span className="ml-2">🏆</span>}
                          </td>
                          <td>{nameOf(t.manager_id)}</td>
                          <td className="text-center tabular-nums">{t.wins}</td>
                          <td className="text-center tabular-nums">{t.losses}</td>
                          <td className="text-center tabular-nums">{t.ties}</td>
                          <td className="text-right tabular-nums">
                            {Number(t.points_for).toFixed(1)}
                          </td>
                          <td className="text-right tabular-nums text-navy-900/70">
                            {Number(t.points_against).toFixed(1)}
                          </td>
                          <td className="text-right">
                            {finish ? (
                              <span
                                className={
                                  finish <= 3 ? "badge-gold" : "badge-navy"
                                }
                              >
                                {ordinal(finish)}
                              </span>
                            ) : (
                              <span className="text-navy-900/40">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
