import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import Homepagedetails from "../components/HomepageDetails";
import News from "../components/News";
import { useAuth } from "../services/AuthContext";

import "../styles/homepage.css";

interface Fighter {
  id: number;
  name: string;
}

interface NewsTypes {
  article_id: number;
  title: string;
  link: string;
  categoryName: string;
  rank: string;
  fighters: Fighter[];
}

interface EventTypes {
  EventId: number;
  name: string;
}

export default function Homepage() {
  const { data, news, rankings } = useLoaderData() as {
    data: EventTypes;
    news: NewsTypes[];
    rankings: NewsTypes[];
  };

  const events = Array.isArray(data) ? data.slice(11).slice(0, -3) : [];
  const someNews = Array.isArray(news) ? news.slice(0, -1) : [];
  const rank = rankings.length > 0 ? rankings[0] : null;
  const rankPound = rank ? rank.fighters : [];
  const uniqueNews = someNews.filter(
    (newsItem, index, self) =>
      index === self.findIndex((n) => n.title === newsItem.title),
  );

  const rankwomen = rankings.length > 0 ? rankings[9] : null;
  const rankPoundWomen = rankwomen ? rankwomen.fighters : [];

  const { role } = useAuth();

  return (
    <>
      <header className="header-img">
        <h3 className="header-title">Welcome in the Octagon</h3>
        {role === "anonymous" ? (
          <Link to="/signup" className="link-join">
            Join Us
          </Link>
        ) : null}
      </header>
      <section className="homepage-components">
        <div className="news-div">
          <h2>LATEST NEWS</h2>

          {uniqueNews.map((news) => (
            <News key={news.article_id} news={news} />
          ))}
          <Link to="/news">More News</Link>
        </div>

        <div className="eventhomepage">
          <h2>UPCOMING EVENTS</h2>
          {events.map((event) => (
            <Link to={`/event/${event.EventId}`} key={event.EventId}>
              <Homepagedetails event={event} />
            </Link>
          ))}
        </div>
      </section>
      {rank?.categoryName && (
        <h2 className="rank-title">{rank.categoryName}</h2>
      )}
      <section className="homepage-rank">
        {rankPound.map((rank) => (
          <div key={rank.id} className="rank-fighter">
            <Link to={`/fighterdetails/${rank.id}`} className="fight">
              <h4>{rank.name}</h4>
            </Link>
            <img
              src={`https://www.octagon-api.com/fighters/${rank.id}.webp`}
              alt="pics of champions"
              key={rank.id}
            />
          </div>
        ))}
      </section>
      {rankwomen?.categoryName && (
        <h2 className="rank-title-women">{rankwomen.categoryName}</h2>
      )}
      <section className="homepage-rank">
        {rankPoundWomen.map((rank) => (
          <div key={rank.id} className="rank-fighter">
            <Link to={`/fighterdetails/${rank.id}`} className="fight">
              <h4>{rank.name}</h4>
            </Link>
            <img
              src={`https://www.octagon-api.com/fighters/${rank.id}.webp`}
              alt="pics of champions"
              key={rank.id}
            />
          </div>
        ))}
      </section>
    </>
  );
}
