import styles from "./Post.module.css";

import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />

          {/* AQUI EXIBE O HTML DO EDITOR */}
          <div
            className={styles.post_body}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <h3>Este post trata sobre:</h3>

          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
