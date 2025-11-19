import styles from "./CreatePost.module.css";

import { useState, useRef } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import JoditEditor from "jodit-react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");   // agora HTML
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const editor = useRef(null);

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image
    try {
      new URL(image);
    } catch (error) {
      return setFormError("A imagem precisa ser uma URL válida.");
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !body || !tags) {
      return setFormError("Por favor, preencha todos os campos!");
    }

    insertDocument({
      title,
      image,
      body, // sai como HTML
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que deseja compartilhar!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Título do seu post"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>URL da imagem</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Ex: https://suaimagem.com"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Conteúdo</span>

          <JoditEditor
            ref={editor}
            value={body}
            onChange={(newContent) => setBody(newContent)}
            className={styles.editor}
          />
        </label>

        <label>
          <span>#Tags</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>

        {!response.loading && <button className="btn">Criar post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}

        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
