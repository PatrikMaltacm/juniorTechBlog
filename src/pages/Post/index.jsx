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
  const { document: post, loading } = useFetchDocument("posts", id);

  const getDescription = (html) => {
    if (!html) return "";
    const cleanText = html.replace(/<[^>]*>?/gm, " ");
    return cleanText.length > 155 ? cleanText.substring(0, 152) + "..." : cleanText;
  };

  const pageTitle = post?.title || "Carregando artigo...";
  const pageDescription = post?.body ? getDescription(post.body) : "Lendo conteúdo do DevJunior TechBlog...";
  const pageImage = post?.image || "https://devjuniortech.blog/logo-padrao.png"; 

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        image={pageImage}
        url={`/posts/${id}`}
      />
      
      <div className={styles.post_container}>
        {loading && <p className={styles.loading}>Carregando post...</p>}
        
        {post && (
          <>
            <h1>{post.title}</h1>
            <LikeButton post={post} />
            <img src={post.image} alt={post.title} />

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