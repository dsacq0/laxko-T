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
  const resolvedParams = await params;
  const match = getMatchBySlug(resolvedParams.slug);

  if (!match) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-10">
        <p className="text-sm text-muted-foreground">
          ไม่พบช่องหรือคู่ที่คุณต้องการ
        </p>
        <div className="text-xs text-muted-foreground">
          <p>ค้นหา: {resolvedParams.slug}</p>
          <p>ช่องที่มี: {matches.map(m => m.slug).join(", ")}</p>
        </div>
        <Link
          href="/"
          className="inline-flex h-8 items-center rounded-full border border-border bg-background px-3 text-xs font-medium text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground"
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
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
        </div>
        <Link
          href="/"
          className="inline-flex h-8 items-center rounded-full border border-border bg-background px-3 text-xs font-medium text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground"
        >
          ← กลับหน้า Live TV
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-black">
        <div className="aspect-video w-full">
          {match.streamType === "hls" ? (
            <HlsPlayer src={match.streamUrl} autoPlay />
          ) : (
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              {isEmbedHtml ? (
                <div
                  className="absolute inset-0"
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