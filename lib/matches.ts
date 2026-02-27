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
    slug: "ucl-madrid-vs-barca",
    title: "Real Madrid vs Barcelona",
    competition: "UEFA Champions League",
    thumbnail: "https://images.pexels.com/photos/3991874/pexels-photo-3991874.jpeg",
    streamType: "hls",
    streamUrl: "https://test-streams.mux.dev/ptsVOD.m3u8",
  },
  {
    id: 3,
    slug: "ucl-bayern-vs-liverpool",
    title: "Bayern Munich vs Liverpool",
    competition: "UEFA Champions League",
    thumbnail: "https://images.pexels.com/photos/3991876/pexels-photo-3991876.jpeg",
    streamType: "hls",
    streamUrl: "https://test-streams.mux.dev/sintel/index.m3u8",
  },
  {
    id: 4,
    slug: "seriea-inter-vs-juventus",
    title: "Inter Milan vs Juventus",
    competition: "Serie A",
    thumbnail: "https://images.pexels.com/photos/3991872/pexels-photo-3991872.jpeg",
    streamType: "embed",
    // ใส่ได้ทั้ง URL ของ iframe หรือแปะ <iframe> ทั้งก้อน
    streamUrl:
      '<iframe id="player" marginheight="0" marginwidth="0" src="https://pooembed.eu/embed/willow-cricket" scrolling="no" allowfullscreen="yes" allow="encrypted-media; picture-in-picture;" width="100%" height="100%" frameborder="0" style="position:absolute; inset:0;"></iframe>',
  },
  {
    id: 5,
    slug: "laliga-atletico-vs-sevilla",
    title: "Atletico Madrid vs Sevilla",
    competition: "LaLiga",
    thumbnail: "https://images.pexels.com/photos/3991973/pexels-photo-3991973.jpeg",
    streamType: "embed",
    streamUrl: "https://www.youtube.com/embed/5qap5aO4i9A",
  },
];

export function getMatchBySlug(slug: string): Match | undefined {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return matches.find((match) => match.slug.trim().toLowerCase() === normalized);
}

