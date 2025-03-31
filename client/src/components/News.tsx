import { Link } from "react-router-dom";
interface News {
  title: string;
  link: string;
}

interface NewsListProps {
  news: News;
}
export default function News({ news }: NewsListProps) {
  return (
    <section className="cardnews">
      <img src="/arrow.png" alt="" />
      <Link to={news.link} className="horizontal-scroll-item">
        <h3 className="titlenews">{news.title} </h3>
      </Link>
    </section>
  );
}
