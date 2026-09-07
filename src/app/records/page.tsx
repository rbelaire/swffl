import { getRecords } from "@/lib/data";
import { EmptyState, PageHeader } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Records" };

export default async function RecordsPage() {
  const records = await getRecords();

  const categories = Array.from(
    new Set(records.map((r) => r.category || "General")),
  );

  return (
    <>
      <PageHeader
        eyebrow="Etched in Stone"
        title="League Records"
        intro="The high-water marks of 14 seasons — the numbers everyone is chasing."
      />

      <div className="container-content py-12">
        {records.length === 0 ? (
          <EmptyState
            title="No records yet"
            message="Add memorable league records in the admin area and they'll show up here."
          />
        ) : (
          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat}>
                <h2 className="mb-5 font-display text-xl font-700 text-navy-950">
                  {cat}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {records
                    .filter((r) => (r.category || "General") === cat)
                    .map((r) => (
                      <div key={r.id} className="card p-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                          {r.title}
                        </p>
                        <p className="mt-2 font-display text-3xl font-700 text-navy-950">
                          {r.value}
                        </p>
                        <p className="mt-1 text-sm font-medium text-navy-900/80">
                          {r.holder}
                          {r.season_year ? (
                            <span className="text-navy-900/50">
                              {" "}
                              · {r.season_year}
                            </span>
                          ) : null}
                        </p>
                        {r.description && (
                          <p className="mt-3 text-sm leading-relaxed text-navy-900/60">
                            {r.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
