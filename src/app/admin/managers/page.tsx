"use client";

import { AdminTable } from "@/components/admin/AdminTable";

export default function AdminManagers() {
  return (
    <AdminTable
      table="managers"
      title="Managers"
      description="The league members. Add everyone who has ever played."
      orderBy={{ column: "name", ascending: true }}
      fields={[
        { key: "name", label: "Name", required: true },
        { key: "slug", label: "Slug", placeholder: "e.g. the-dynasty", hideInTable: true },
        { key: "joined_year", label: "Joined", type: "number" },
        { key: "active", label: "Active", type: "boolean", default: true, placeholder: "Currently in the league" },
        { key: "bio", label: "Bio", type: "textarea", hideInTable: true },
      ]}
    />
  );
}
