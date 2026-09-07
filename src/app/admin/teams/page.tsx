"use client";

import { AdminTable } from "@/components/admin/AdminTable";

export default function AdminTeams() {
  return (
    <AdminTable
      table="teams"
      title="Teams"
      description="A manager's team for a given season, with record and points."
      orderBy={{ column: "created_at", ascending: false }}
      references={[
        {
          table: "seasons",
          orderBy: { column: "year", ascending: false },
          label: (s) => String(s.year),
        },
        {
          table: "managers",
          orderBy: { column: "name" },
          label: (m) => m.name,
        },
      ]}
      fields={[
        { key: "season_id", label: "Season", type: "ref", refTable: "seasons", required: true },
        { key: "manager_id", label: "Manager", type: "ref", refTable: "managers", required: true },
        { key: "team_name", label: "Team Name" },
        { key: "wins", label: "W", type: "number", default: 0 },
        { key: "losses", label: "L", type: "number", default: 0 },
        { key: "ties", label: "T", type: "number", default: 0 },
        { key: "points_for", label: "PF", type: "number", default: 0 },
        { key: "points_against", label: "PA", type: "number", default: 0, hideInTable: true },
        { key: "regular_season_rank", label: "Reg. Rank", type: "number", hideInTable: true },
        { key: "playoff_finish", label: "Finish", type: "number" },
      ]}
    />
  );
}
