import styles from "./Post.module.css";

import DOMPurify from "dompurify";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams } from "react-router-dom";
import SEOHead from "../../components/SEOHead";
import CommentForm from "../../components/CommentForm";
import CommentList from "../../components/CommentList";
import LikeButton from "../../components/LikeButton";

const Post = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  // Remove HTML tags and limit description length
  const getDescription = (html) => {
    if (!html) return "";
    const cleanText = html.replace(/<[^>]*>?/gm, " ");
    return cleanText.length > 155 ? cleanText.substring(0, 152) + "..." : cleanText;
  };

  return (
    <>
      {post && (
        <SEOHead
          title={post.title}
          description={getDescription(post.body)}
          image={post.image}
          url={`/posts/${id}`}
        />
      )}
      <div className={styles.post_container}>
        {post && (
          <>
            <h1>{post.title}</h1>
            <LikeButton post={post} />
            <img src={post.image} alt={post.title} />

            {/* AQUI EXIBE O HTML DO EDITOR */}
            <div
              className={styles.post_body}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }}
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

            <CommentForm postId={post.id} />
            <CommentList postId={post.id} />
          </>
        )}
      </div>
    </>
  );
};

export default Post;
