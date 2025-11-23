import styles from "./CommentForm.module.css";
import { useState } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { increment } from "firebase/firestore";

const CommentForm = ({ postId }) => {
    const [comment, setComment] = useState("");
    const { insertDocument, response } = useInsertDocument("comments");
    const { updateDocument } = useUpdateDocument("posts");
    const { user } = useAuthValue();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!postId) {
            console.error("Erro: postId está indefinido!");
            return;
        }

        console.log("Enviando comentário...", { comment, postId, uid: user.uid });

        insertDocument({
            comment,
            postId,
            uid: user.uid,
            createdBy: user.displayName,
        });

        // Increment comments count
        updateDocument(postId, {
            commentsCount: increment(1)
        });

        setComment("");
    };

    if (!user) return null;

    return (
        <div className={styles.comment_form}>
            <h3>Deixe um comentário:</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Escreva seu comentário..."
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                {!response.loading && <button className="btn">Comentar</button>}
                {response.loading && (
                    <button className="btn" disabled>
                        Aguarde...
                    </button>
                )}
                {response.error && <p className="error">{response.error}</p>}
                {response.error && console.error("Erro ao comentar:", response.error)}
            </form>
        </div>
    );
};

export default CommentForm;
