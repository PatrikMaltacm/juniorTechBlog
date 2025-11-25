import styles from "./Profile.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Profile = () => {
    const { user } = useAuthValue();
    const { documents: posts, loading: loadingPosts } = useFetchDocuments("posts", null, user.uid);

    if (loadingPosts) {
        return <p>Carregando...</p>;
    }

    const postCount = posts ? posts.length : 0;
    const likeCount = posts ? posts.reduce((acc, post) => acc + (post.likes ? post.likes.length : 0), 0) : 0;
    const commentCount = posts ? posts.reduce((acc, post) => acc + (post.commentsCount || 0), 0) : 0;

    return (
        <div className={styles.profile_container}>
            <div className={styles.profile_header}>
                <div className={styles.avatar}>
                    {user.displayName.charAt(0).toUpperCase()}
                </div>
                <div className={styles.info}>
                    <h2>{user.displayName}</h2>
                    <p>{user.email}</p>
                    {user.emailVerified ? (
                        <span className={styles.verified}>✓ E-mail verificado</span>
                    ) : (
                        <span className={styles.not_verified}>⚠ E-mail não verificado</span>
                    )}
                </div>
            </div>

            <div className={styles.stats_container}>
                <div className={styles.stat_card}>
                    <h3>Posts</h3>
                    <p>{postCount}</p>
                </div>
                <div className={styles.stat_card}>
                    <h3>Likes Recebidos</h3>
                    <p>{likeCount}</p>
                </div>
                <div className={styles.stat_card}>
                    <h3>Comentários Recebidos</h3>
                    <p>{commentCount}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
