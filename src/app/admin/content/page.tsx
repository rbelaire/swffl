"use client";

import { AdminTable } from "@/components/admin/AdminTable";

export default function AdminContent() {
  return (
    <AdminTable
      table="site_content"
      title="Site Content"
      description="Editable text blocks — About, Rules, Payouts and any others. The Key must be unique and lowercase (used in code)."
      orderBy={{ column: "sort_order", ascending: true }}
      idField="key"
      fields={[
        { key: "key", label: "Key", required: true, placeholder: "about, rules, payouts…" },
        { key: "title", label: "Title", required: true },
        { key: "body", label: "Body", type: "textarea", hideInTable: true },
        { key: "sort_order", label: "Order", type: "number", default: 0, hideInTable: true },
      ]}
    />
  );
}
