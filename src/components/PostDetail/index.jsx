import { Link } from "react-router-dom";
import styles from "./PostDetail.module.css";
import { useRef, useEffect, useState } from "react";

const PostDetail = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const titleRef = useRef();

  useEffect(() => {
    if (titleRef.current) {
      const el = titleRef.current;
      if (el.scrollHeight > el.clientHeight) {
        setExpanded(true);     // Aumenta altura do card automaticamente
      }
    }
  }, []);

  return (
    <div className={`${styles.card} ${expanded ? styles.expanded : ""}`}>
      
      <div className={styles.content}>
        <p className={styles.date}>
          {post.createdAt?.toDate().toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        <h2 ref={titleRef}>{post.title}</h2>

        <p className={styles.createdby}>por {post.createdBy}</p>

        <div className={styles.tags}>
          {post.tagsArray.map(tag => (
            <p key={tag}>
              <span>#</span>
              {tag}
            </p>
          ))}
        </div>

        <div className={styles.stats}>
          <p>❤️ {post.likes ? post.likes.length : 0}</p>
          <p>💬 {post.commentsCount || 0}</p>
        </div>

        <Link to={`/posts/${post.id}`} className="btn btn-outline">
          Ler
        </Link>
      </div>

      <div className={styles.thumb}>
        <img src={post.image} alt={post.title} />
      </div>
    </div>
  );
};

export default PostDetail;
