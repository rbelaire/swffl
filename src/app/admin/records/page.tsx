"use client";

import { AdminTable } from "@/components/admin/AdminTable";

export default function AdminRecords() {
  return (
    <AdminTable
      table="records"
      title="Records"
      description="Notable league records shown on the Records page, grouped by category."
      orderBy={{ column: "sort_order", ascending: true }}
      fields={[
        { key: "title", label: "Title", required: true, placeholder: "Most points in a game" },
        { key: "value", label: "Value", placeholder: "187.4" },
        { key: "holder", label: "Holder", placeholder: "Manager or team" },
        { key: "season_year", label: "Year", type: "number" },
        { key: "category", label: "Category", default: "General", placeholder: "Scoring, Streaks, Titles…" },
        { key: "description", label: "Description", type: "textarea", hideInTable: true },
        { key: "sort_order", label: "Order", type: "number", default: 0, hideInTable: true },
      ]}
    />
  );
}
