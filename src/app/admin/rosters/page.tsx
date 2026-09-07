"use client";

import { AdminTable } from "@/components/admin/AdminTable";

export default function AdminRosters() {
  return (
    <AdminTable
      table="roster_players"
      title="Roster Players"
      description="Players belonging to a team. Pick the team, then add each player."
      orderBy={{ column: "sort_order", ascending: true }}
      references={[
        { table: "seasons", orderBy: { column: "year", ascending: false }, label: (s) => String(s.year) },
        { table: "managers", orderBy: { column: "name" }, label: (m) => m.name },
        {
          table: "teams",
          orderBy: { column: "created_at", ascending: false },
          label: (t, refs) => {
            const season = refs.seasons?.find((s) => s.id === t.season_id);
            const mgr = refs.managers?.find((m) => m.id === t.manager_id);
            const parts = [season?.year, t.team_name || mgr?.name || "Team"].filter(
              Boolean,
            );
            return parts.join(" · ");
          },
        },
      ]}
      fields={[
        { key: "team_id", label: "Team", type: "ref", refTable: "teams", required: true },
        { key: "player_name", label: "Player", required: true },
        {
          key: "position",
          label: "Pos",
          type: "select",
          options: ["QB", "RB", "WR", "TE", "FLEX", "K", "DEF"].map((p) => ({
            value: p,
            label: p,
          })),
        },
        { key: "nfl_team", label: "NFL Team", placeholder: "e.g. KC" },
        {
          key: "slot",
          label: "Slot",
          type: "select",
          default: "STARTER",
          options: ["STARTER", "BENCH", "IR"].map((s) => ({ value: s, label: s })),
        },
        { key: "sort_order", label: "Order", type: "number", default: 0, hideInTable: true },
      ]}
    />
  );
}
