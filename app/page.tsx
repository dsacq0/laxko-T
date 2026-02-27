"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { matches } from "@/lib/matches";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return matches;
    return matches.filter((m) => m.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full max-w-xs">
          <Input
            type="search"
            placeholder="ค้นหาช่องหรือคู่ที่ต้องการ..."
            className="h-9 text-[11px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" id="channels">
        {filtered.map((match) => (
          <Link
            key={match.id}
            href={`/live/${match.slug}`}
            className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-500 hover:shadow-md dark:border-zinc-700 dark:bg-white"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
              <img
                src={match.thumbnail}
                alt={match.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-[1.08]"
                referrerPolicy="no-referrer"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-3 bottom-2 flex flex-col gap-1 text-xs">
                <p className="text-[9px] font-medium uppercase tracking-[0.03em] text-zinc-100">
                  {match.competition}
                </p>
                <p className="text-[14px] font-semibold text-white line-clamp-2">
                  {match.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
