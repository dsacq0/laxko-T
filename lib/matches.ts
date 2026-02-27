export type StreamType = "hls" | "embed";

export type Match = {
  id: number;
  slug: string;
  title: string;
  competition: string;
  thumbnail: string;
  streamType: StreamType;
  streamUrl: string;
};

export const matches: Match[] = [
  {
    id: 1,
    slug: "mono-29",
    title: "Mono 29",
    competition: "OHTHER",
    thumbnail: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fe/68/f7/fe68f728-1a17-beed-cdc8-393c641a4fc2/AppIcon-0-0-1x_U007emarketing-0-11-0-0-85-220.png/1200x630wa.jpg",
    streamType: "hls",
    // ตัวอย่าง HLS เดโม เปลี่ยนเป็นลิ้งของคุณเองได้
    streamUrl: "https://monomax-uiripn.cdn.byteark.com/plain/th/1080p/index.m3u8",
  },
  {
    id: 2,
    slug: "Wolverhampton Wanderers vs. Aston Villa",
    title: "Wolverhampton Wanderers vs Aston Villa",
    competition: "Primier League",
    thumbnail: "https://api.ppv.to/assets/thumb/c4497d216929356df9deddc221779f3c-thumbnail.jpg",
    streamType: "embed",
    streamUrl: 
      '<iframe id="player" marginheight="0" marginwidth="0" src="https://pooembed.eu/embed/premierleague/2026-02-27/wol-avl" scrolling="no" allowfullscreen="yes" allow="encrypted-media; picture-in-picture;" width="100%" height="100%" frameborder="0" style="position:absolute;"></iframe>',
  },
  {
    id: 3,
    slug: "Burnley vs Brentford",
    title: "Burnley vs Brentford",
    competition: "Primier League",
    thumbnail: "https://api.ppv.to/assets/thumb/eda6dacf84d21d1dba9adfec78d65e5a-thumbnail.jpg",
    streamType: "hls",
    streamUrl: "https://test-streams.mux.dev/sintel/index.m3u8",
  },
  {
    id: 4,
    slug: "Liverpool vs West Ham United",
    title: "Liverpool vs. West Ham United",
    competition: "Primier League",
    thumbnail: "https://api.ppv.to/assets/thumb/52141789d1add7e8aaff04fa304c00f8-thumbnail.jpg",
    streamType: "embed",
    streamUrl:
      '<iframe id="player" marginheight="0" marginwidth="0" src="https://pooembed.eu/embed/premierleague/2026-02-27/wol-avl" scrolling="no" allowfullscreen="yes" allow="encrypted-media; picture-in-picture;" width="100%" height="100%" frameborder="0" style="position:absolute;"></iframe>',
  },
  {
    id: 5,
    slug: "Newcastle United vs Everton",
    title: "AtNewcastle United vs Everton",
    competition: "Primier League",
    thumbnail: "https://api.ppv.to/assets/thumb/bfe26e3f4cf2b729a72060f38172ebb4-thumbnail.jpg",
    streamType: "embed",
    streamUrl: "https://www.youtube.com/embed/5qap5aO4i9A",
  },
];

export function getMatchBySlug(slug: string): Match | undefined {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return matches.find((match) => match.slug.trim().toLowerCase() === normalized);
}

