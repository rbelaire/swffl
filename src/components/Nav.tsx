"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/standings", label: "Standings" },
  { href: "/stats", label: "Stats" },
  { href: "/rosters", label: "Rosters" },
  { href: "/records", label: "Records" },
  { href: "/history", label: "History" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/10 bg-white/85 backdrop-blur">
      <nav className="container-content flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/logo-dark.png"
            alt="So Whopped FFL"
            width={34}
            height={52}
            className="h-8 w-auto"
            priority
          />
          <span className="hidden font-display text-lg font-700 tracking-tight text-navy-950 sm:block">
            So Whopped <span className="text-navy-500">FFL</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(l.href)
                  ? "bg-navy-900/[0.06] text-navy-950"
                  : "text-navy-900/70 hover:bg-navy-900/[0.04] hover:text-navy-950"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/admin" className="btn-primary ml-2 py-2">
            Admin
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-navy-900 hover:bg-navy-900/[0.05] md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-navy-900/10 bg-white md:hidden">
          <div className="container-content flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(l.href)
                    ? "bg-navy-900/[0.06] text-navy-950"
                    : "text-navy-900/75"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
