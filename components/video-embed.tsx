function toEmbedUrl(url: string): string {
  if (url.includes("youtube.com/embed/")) return url;

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch?.[1]) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch?.[1]) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  return url;
}

type VideoEmbedProps = {
  youtubeUrl: string;
  title: string;
};

export function VideoEmbed({ youtubeUrl, title }: VideoEmbedProps) {
  const embedUrl = toEmbedUrl(youtubeUrl);

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-black shadow-xl">
      <div className="relative w-full pb-[56.25%]">
        <iframe
          title={title}
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
