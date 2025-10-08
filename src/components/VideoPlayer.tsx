interface VideoPlayerProps {
  frameUrl: string;
  frameId: number;
}

export function VideoPlayer({ frameUrl, frameId }: VideoPlayerProps) {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden aspect-video flex items-center justify-center relative border border-border">
      <img
        key={frameUrl}
        src={frameUrl}
        alt={`Frame ${frameId}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
