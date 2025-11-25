import styles from "./CommentList.module.css";
import { useFetchComments } from "../../hooks/useFetchComments";
import { useAuthValue } from "../../context/AuthContext";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useState } from "react";
import { increment } from "firebase/firestore";

const CommentList = ({ postId }) => {
    const { comments } = useFetchComments(postId);
    const { user } = useAuthValue();
    const { deleteDocument } = useDeleteDocument("comments");
    const { updateDocument } = useUpdateDocument("comments");
    const { updateDocument: updatePostDocument } = useUpdateDocument("posts");

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este comentário?")) {
            await deleteDocument(id);

            // Decrement comments count
            updatePostDocument(postId, {
                commentsCount: increment(-1)
            });
        }
    };

    const handleEdit = (comment) => {
        setEditId(comment.id);
        setEditText(comment.comment);
    };

    const handleSaveEdit = async () => {
        await updateDocument(editId, { comment: editText });
        setEditId(null);
        setEditText("");
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEditText("");
    };

    if (!comments || comments.length === 0) {
        return (
            <div className={styles.comment_list}>
                <p>Não há comentários ainda.</p>
            </div>
        );
    }

    return (
        <div className={styles.comment_list}>
            <h3>Comentários:</h3>
            {comments.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                    <p className={styles.author}>{comment.createdBy}:</p>

                    {editId === comment.id ? (
                        <div className={styles.edit_form}>
                            <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                            <div className={styles.actions}>
                                <button className="btn btn-outline" onClick={handleCancelEdit}>Cancelar</button>
                                <button className="btn" onClick={handleSaveEdit}>Salvar</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p>{comment.comment}</p>
                            {user && user.uid === comment.uid && (
                                <div className={styles.actions}>
                                    <button onClick={() => handleEdit(comment)}>Editar</button>
                                    <button onClick={() => handleDelete(comment.id)}>Excluir</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentList;
