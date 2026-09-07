import {
  getManagers,
  getSeasons,
  getSiteContent,
} from "@/lib/data";
import { EmptyState, PageHeader } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "History" };

export default async function HistoryPage() {
  const [managers, seasons, content] = await Promise.all([
    getManagers(),
    getSeasons(),
    getSiteContent(),
  ]);

  const nameOf = (id: string | null) =>
    managers.find((m) => m.id === id)?.name ?? "—";

  return (
    <>
      <PageHeader
        eyebrow="14 Seasons Deep"
        title="League History"
        intro="Every champion, every heartbreak. Scroll through the story of So Whopped FFL."
      />

      <div className="container-content py-12">
        {/* Editable content blocks */}
        {content.length > 0 && (
          <div className="mb-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.map((c) => (
              <div key={c.key} className="card p-6">
                <h2 className="font-display text-lg font-700 text-navy-950">
                  {c.title}
                </h2>
                <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-navy-900/75">
                  {c.body}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Champions timeline */}
        <h2 className="mb-6 font-display text-2xl font-700 text-navy-950">
          Champions Timeline
        </h2>

        {seasons.length === 0 ? (
          <EmptyState
            title="No seasons recorded"
            message="Add seasons in the admin area to build out the timeline."
          />
        ) : (
          <ol className="relative border-l-2 border-navy-900/10 pl-6">
            {seasons.map((s) => (
              <li key={s.id} className="relative mb-8 last:mb-0">
                <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-navy bg-white" />
                <div className="card p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-2xl font-700 text-navy-950">
                      {s.year}
                    </span>
                    <span className="badge-gold">
                      🏆 {nameOf(s.champion_id)}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                    <Fact label="Champion" value={nameOf(s.champion_id)} />
                    <Fact label="Runner-Up" value={nameOf(s.runner_up_id)} />
                    <Fact
                      label="Reg. Season #1"
                      value={nameOf(s.regular_season_id)}
                    />
                  </div>
                  {s.notes && (
                    <p className="mt-4 border-t border-navy-900/[0.06] pt-4 text-sm italic leading-relaxed text-navy-900/70">
                      {s.notes}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
        {label}
      </p>
      <p className="mt-0.5 font-medium text-navy-950">{value}</p>
    </div>
  );
}
