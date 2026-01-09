import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";

// MUI Components
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  CircularProgress,
  Stack
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";

// Hooks e Config
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import { supabase } from '../../supabase/index';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");
  const [uploading, setUploading] = useState(false);

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { insertDocument, response } = useInsertDocument("posts");

  const editor = useRef(null);

  const editorConfig = useMemo(() => ({
    readonly: false,
    placeholder: 'Escreva o conteúdo do post aqui...',
    height: 400,
    statusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    language: 'pt_br',
    buttons: ['bold', 'italic', '|', 'ul', 'ol', '|', 'paragraph', '|', 'align', '|', 'link', '|', 'hr'],
  }), []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setFormError("Por favor, selecione apenas arquivos de imagem.");
      return;
    }
    setFile(selectedFile);
    setFormError("");
  };

  const uploadImageToBucket = async () => {
    setUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}-${user.uid}`;
      const { data, error } = await supabase.storage.from('img').upload(fileName, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage.from('img').getPublicUrl(data.path);
      return publicUrlData.publicUrl;
    } catch (error) {
      setFormError("Erro ao fazer upload da imagem. Tente novamente.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!title || !body || !tags || !file) {
      setFormError("Por favor, preencha todos os campos e selecione uma imagem!");
      return;
    }

    const uploadedUrl = await uploadImageToBucket();

    if (uploadedUrl) {
      const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

      await insertDocument({
        title,
        image: uploadedUrl,
        body: DOMPurify.sanitize(body),
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
      });

      if (!response.error) navigate("/");
    }
  };

  return (
    <Container maxWidth={false} sx={{ mt: { xs: 2, md: 4 }, mb: 4, px: { xs: 1, md: 4 }}}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 }, 
          borderRadius: { xs: 0, md: 2 }, 
          width: '100%',
          mx: 'auto'
        }}
      >
        <Box textAlign="center" mb={4} >
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Criar novo post
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Preencha os detalhes abaixo para publicar sua ideia.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{width: "100%"}}>
          <Stack spacing={4}>

            {/* Título - Ocupa 100% */}
            <TextField
              label="Título do Post"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              inputProps={{ style: { fontSize: '1.2rem' } }} 
            />

            {/* Upload de Imagem - Ocupa 100% */}
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{
                height: '70px',
                borderStyle: 'dashed',
                borderWidth: 2,
                fontSize: '1rem'
              }}
            >
              {file ? `Selecionado: ${file.name}` : "Upload da Imagem de Capa"}
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>

            <Box sx={{ width: '100%' }}>
              <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
                Conteúdo do Post *
              </Typography>
              <JoditEditor
                ref={editor}
                value={body}
                config={editorConfig}
                onBlur={(newContent) => setBody(newContent)}
              />
            </Box>

            <TextField
              label="Tags (separadas por vírgula)"
              placeholder="ex: react, javascript, mui"
              variant="outlined"
              fullWidth
              required
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            {/* Erros */}
            {(formError || response.error) && (
              <Alert severity="error" sx={{ width: '100%' }}>
                {formError || response.error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={uploading || response.loading}
              startIcon={(uploading || response.loading) ? <CircularProgress size={24} /> : <SendIcon />}
              sx={{
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: 3
              }}
              fullWidth
            >
              {uploading ? "Fazendo Upload..." : response.loading ? "Salvando Post..." : "Publicar Post"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePost;