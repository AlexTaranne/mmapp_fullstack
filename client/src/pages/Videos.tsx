import "../styles/videos.css";

export default function Videos() {
  return (
    <>
      <h2 className="odds-title">Hall of fame fights</h2>
      <div className="all-vids">
        <div className="vid-card">
          <h3>Gaethje vs Fiziev</h3>
          <iframe
            className="complete-movie"
            height="315"
            src="https://www.youtube.com/embed/3fQlGWI5Im8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="vid-card">
          <h3>Lawler vs McDonald 2</h3>
          <iframe
            className="complete-movie"
            height="315"
            src="https://www.youtube.com/embed/ocsu8P4-GS4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="vid-card">
          <h3>Nurmagomedov vs McGregor</h3>
          <iframe
            className="complete-movie"
            height="315"
            src="https://www.youtube.com/embed/JuBBIJ7adjM"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="vid-card">
          <h3>Jones vs Gustafsson</h3>
          <iframe
            className="complete-movie"
            height="315"
            src="https://www.youtube.com/embed/y3UOguhWDek"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}
