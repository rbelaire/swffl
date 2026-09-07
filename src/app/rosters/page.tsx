import Link from "next/link";
import {
  getManagers,
  getRosterPlayers,
  getSeasons,
  getTeams,
} from "@/lib/data";
import { EmptyState, PageHeader } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Rosters" };

const POS_ORDER = ["QB", "RB", "WR", "TE", "FLEX", "K", "DEF", "DST"];

export default async function RostersPage({
  searchParams,
}: {
  searchParams: { year?: string; team?: string };
}) {
  const [managers, seasons, teams, players] = await Promise.all([
    getManagers(),
    getSeasons(),
    getTeams(),
    getRosterPlayers(),
  ]);

  const nameOf = (id: string) =>
    managers.find((m) => m.id === id)?.name ?? "Unknown";

  const selectedYear =
    searchParams.year && seasons.some((s) => String(s.year) === searchParams.year)
      ? Number(searchParams.year)
      : seasons[0]?.year;
  const season = seasons.find((s) => s.year === selectedYear);

  const seasonTeams = teams
    .filter((t) => t.season_id === season?.id)
    .sort((a, b) => (a.team_name || "").localeCompare(b.team_name || ""));

  const selectedTeam =
    seasonTeams.find((t) => t.id === searchParams.team) ?? seasonTeams[0];

  const roster = players
    .filter((p) => p.team_id === selectedTeam?.id)
    .sort(
      (a, b) =>
        a.sort_order - b.sort_order ||
        posRank(a.position) - posRank(b.position),
    );

  const starters = roster.filter(
    (p) => (p.slot || "").toUpperCase() !== "BENCH" && (p.slot || "").toUpperCase() !== "IR",
  );
  const bench = roster.filter(
    (p) => (p.slot || "").toUpperCase() === "BENCH" || (p.slot || "").toUpperCase() === "IR",
  );

  return (
    <>
      <PageHeader
        eyebrow="Who Drafted Whom"
        title="Rosters"
        intro="Browse the roster behind every team, for every season on record."
      />

      <div className="container-content py-12">
        {seasons.length === 0 ? (
          <EmptyState
            title="No rosters yet"
            message="Add seasons, teams, and their players in the admin area to browse rosters here."
          />
        ) : (
          <>
            {/* Season picker */}
            <div className="mb-6 flex flex-wrap gap-2">
              {seasons.map((s) => (
                <Link
                  key={s.id}
                  href={`/rosters?year=${s.year}`}
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

            {seasonTeams.length === 0 ? (
              <EmptyState
                title={`No teams for ${selectedYear}`}
                message="Add teams to this season in the admin area."
              />
            ) : (
              <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
                {/* Team list */}
                <aside className="flex flex-col gap-1.5">
                  {seasonTeams.map((t) => (
                    <Link
                      key={t.id}
                      href={`/rosters?year=${selectedYear}&team=${t.id}`}
                      className={`rounded-lg border px-4 py-3 text-sm transition ${
                        t.id === selectedTeam?.id
                          ? "border-navy bg-navy text-white"
                          : "border-navy-900/10 bg-white text-navy-900 hover:border-navy-900/25"
                      }`}
                    >
                      <span className="block font-semibold">
                        {t.team_name || "Unnamed Team"}
                      </span>
                      <span
                        className={`text-xs ${
                          t.id === selectedTeam?.id
                            ? "text-white/60"
                            : "text-navy-900/55"
                        }`}
                      >
                        {nameOf(t.manager_id)} · {t.wins}–{t.losses}
                      </span>
                    </Link>
                  ))}
                </aside>

                {/* Selected roster */}
                <div className="card p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-navy-900/10 pb-4">
                    <div>
                      <h2 className="font-display text-2xl font-700 text-navy-950">
                        {selectedTeam?.team_name || "Unnamed Team"}
                      </h2>
                      <p className="text-sm text-navy-900/60">
                        {nameOf(selectedTeam!.manager_id)} · {selectedYear}
                      </p>
                    </div>
                    <span className="badge-navy">
                      {selectedTeam?.wins}–{selectedTeam?.losses}
                      {selectedTeam?.ties ? `–${selectedTeam.ties}` : ""}
                    </span>
                  </div>

                  {roster.length === 0 ? (
                    <p className="py-10 text-center text-sm text-navy-900/55">
                      No players recorded for this team yet.
                    </p>
                  ) : (
                    <div className="mt-6 space-y-8">
                      <RosterList title="Starters" players={starters} />
                      {bench.length > 0 && (
                        <RosterList title="Bench" players={bench} muted />
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

function RosterList({
  title,
  players,
  muted,
}: {
  title: string;
  players: { id: string; player_name: string; position: string | null; nfl_team: string | null; slot: string | null }[];
  muted?: boolean;
}) {
  if (players.length === 0) return null;
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <div className="divide-y divide-navy-900/[0.06]">
        {players.map((p) => (
          <div
            key={p.id}
            className={`flex items-center gap-4 py-2.5 ${muted ? "opacity-80" : ""}`}
          >
            <span className="flex h-8 w-11 shrink-0 items-center justify-center rounded-md bg-navy-900/[0.06] text-xs font-bold text-navy-700">
              {p.position || "—"}
            </span>
            <span className="flex-1 font-medium text-navy-950">
              {p.player_name}
            </span>
            {p.nfl_team && (
              <span className="text-xs font-semibold uppercase tracking-wide text-navy-900/50">
                {p.nfl_team}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function posRank(pos: string | null) {
  const i = POS_ORDER.indexOf((pos || "").toUpperCase());
  return i === -1 ? 99 : i;
}
