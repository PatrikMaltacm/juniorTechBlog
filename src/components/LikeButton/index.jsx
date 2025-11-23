import styles from "./LikeButton.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useState, useEffect } from "react";

const LikeButton = ({ post }) => {
    const { user } = useAuthValue();
    const { updateDocument } = useUpdateDocument("posts");
    const [error, setError] = useState("");

    const likes = post.likes || [];
    const isLiked = user && likes.includes(user.uid);

    const handleLike = async () => {
        if (!user) {
            setError("Você precisa estar logado para curtir!");
            return;
        }

        let updatedLikes;

        if (isLiked) {
            updatedLikes = likes.filter((id) => id !== user.uid);
        } else {
            updatedLikes = [...likes, user.uid];
        }

        await updateDocument(post.id, { likes: updatedLikes });
    };

    return (
        <>
            <button
                className={`${styles.like_btn} ${isLiked ? styles.liked : ""}`}
                onClick={handleLike}
            >
                {isLiked ? "❤️" : "🤍"} {likes.length}
            </button>
            {error && <p className="error">{error}</p>}
        </>
    );
};

export default LikeButton;
