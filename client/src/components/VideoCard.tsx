interface VideoProps {
  video: {
    id: number;
    title: string;
    link: string;
    genre: string;
  };
}
export default function VideoCard({ video }: VideoProps) {
  return (
    <div className="video-card">
      <h1>{video.title}</h1>
      <iframe
        className="short-movie"
        width="100%"
        height="auto"
        src={video.link}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
