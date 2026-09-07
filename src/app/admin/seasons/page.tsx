"use client";

import { AdminTable } from "@/components/admin/AdminTable";

export default function AdminSeasons() {
  return (
    <AdminTable
      table="seasons"
      title="Seasons"
      description="One row per year. Set the champion, runner-up and more."
      orderBy={{ column: "year", ascending: false }}
      references={[
        {
          table: "managers",
          orderBy: { column: "name" },
          label: (m) => m.name,
        },
      ]}
      fields={[
        { key: "year", label: "Year", type: "number", required: true },
        { key: "champion_id", label: "Champion", type: "ref", refTable: "managers" },
        { key: "runner_up_id", label: "Runner-Up", type: "ref", refTable: "managers" },
        { key: "regular_season_id", label: "Reg. Season #1", type: "ref", refTable: "managers", hideInTable: true },
        { key: "last_place_id", label: "Last Place", type: "ref", refTable: "managers", hideInTable: true },
        { key: "notes", label: "Notes", type: "textarea", hideInTable: true },
      ]}
    />
  );
}
