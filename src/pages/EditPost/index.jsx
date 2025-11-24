import styles from "./EditPost.module.css";

import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const editor = useRef(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { updateDocument, response } = useUpdateDocument("posts");

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Escreva aqui...',
      height: 600,
      statusbar: false,
      toolbarAdaptive: false,
      buttons: [
        'bold', 'italic', '|',
        'ul', 'ol', '|',
        'paragraph', '|',
        'align', '|',
        'image', 'link', '|',
        'hr'
      ],
      extraStyle: `
        pre {
          background-color: #1e1e1e;
          color: #d4d4d4;
          padding: 15px;
          border-radius: 6px;
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          overflow-x: auto;
          border: 1px solid #333;
          margin: 10px 0;
        }
      `,
      askBeforePasteFromWord: false,
      askBeforePasteHTML: false,
    }),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch (error) {
      return setFormError("A imagem precisa ser uma URL válida.");
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !body || !tags) {
      return setFormError("Por favor, preencha todos os campos!");
    }

    const data = {
      title,
      image,
      body: DOMPurify.sanitize(body),
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>

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

            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />

            <label>
              <span>Conteúdo</span>
              <JoditEditor
                ref={editor}
                value={body}
                config={editorConfig}
                tabIndex={1}
                onBlur={(newContent) => setBody(newContent)}
                onChange={() => { }}
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

            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}

            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;