import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "../styles/videos.css";
import VideoCard from "../components/VideoCard";

interface VideoTypes {
  id: number;
  title: string;
  link: string;
  genre: string;
}

export default function Videos() {
  const { videos } = useLoaderData() as { videos: VideoTypes[] };
  const [filteredVideos, setFilteredVideos] = useState(videos);

  const showFights = () => {
    setFilteredVideos(videos.filter((video) => video.genre.includes("Fight")));
  };

  const showInterviews = () => {
    setFilteredVideos(
      videos.filter((video) => video.genre.includes("Interview")),
    );
  };

  return (
    <section className="all-videos">
      <h2>Videos</h2>
      <div className="button-videos">
        <button type="button" onClick={showFights}>
          Fights
        </button>
        <button type="button" onClick={showInterviews}>
          Interviews
        </button>
      </div>
      {filteredVideos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </section>
  );
}
