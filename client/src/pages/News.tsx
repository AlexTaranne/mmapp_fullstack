import { Link, useLoaderData } from "react-router-dom";
import "../styles/news.css";
interface News {
  id: number;
  firstName: string;
  lastName: string;
  weightClass: string;
  category_name: string;
  link: string;
  title: string;
  image_url: string;
}
export default function News() {
  const news = useLoaderData() as News[];

  return (
    <section className="news-cards">
      <h2>Breaking News</h2>
      {news.map((news) => (
        <div key={news.id} className="card-news">
          <Link to={news.link}>
            <h3>{news.title}</h3>
          </Link>
          <img src={news.image_url} alt="news-pic" />
        </div>
      ))}
    </section>
  );
}
