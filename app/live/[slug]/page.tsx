import Link from "next/link";
import { matches, getMatchBySlug } from "@/lib/matches";
import { HlsPlayer } from "@/components/hls-player";

type MatchPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return matches.map((match) => ({ slug: match.slug }));
}

export default async function MatchPage({ params }: MatchPageProps) {
  // Await the params since it's a Promise in Next.js 15+
  const resolvedParams = await params;
  
  // Debug: Check what params we receive
  console.log("Full params object:", resolvedParams);
  console.log("Slug value:", resolvedParams.slug);
  console.log("Slug type:", typeof resolvedParams.slug);
  
  const match = getMatchBySlug(resolvedParams.slug);

  if (!match) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-10">
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          ไม่พบช่องหรือคู่ที่คุณต้องการ
        </p>
        <div className="text-xs text-zinc-500">
          <p>ค้นหา: {resolvedParams.slug}</p>
          <p>ช่องที่มี: {matches.map(m => m.slug).join(", ")}</p>
        </div>
        <Link
          href="/"
          className="inline-flex h-8 items-center rounded-full border border-zinc-200 px-3 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          ← กลับหน้า Live TV
        </Link>
      </div>
    );
  }

  const title = match.title;
  const isEmbedHtml =
    match.streamType === "embed" &&
    match.streamUrl.trim().toLowerCase().startsWith("<iframe");

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
            {title}
          </h1>
        </div>
        <Link
          href="/"
          className="inline-flex h-8 items-center rounded-full border border-zinc-200 px-3 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          ← กลับหน้า Live TV
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-700 dark:bg-white sm:p-3">
        <div className="rounded-xl bg-black p-1 sm:p-2">
          {match.streamType === "hls" ? (
            <HlsPlayer src={match.streamUrl} autoPlay />
          ) : (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-black shadow-lg">
              {isEmbedHtml ? (
                <div
                  className="absolute inset-0"
                  // ผู้ใช้เป็นคนใส่ embed เองใน matches.ts
                  dangerouslySetInnerHTML={{ __html: match.streamUrl }}
                />
              ) : (
                <iframe
                  src={match.streamUrl}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  title={title}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

