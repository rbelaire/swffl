import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl font-700 text-navy-950">404</p>
      <p className="mt-3 text-lg text-navy-900/70">
        This play doesn&apos;t exist. Must have been a busted route.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to the home field
      </Link>
    </div>
  );
}
