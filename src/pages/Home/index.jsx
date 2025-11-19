import styles from "./Home.module.css"

// Hooks 
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import PostDetail from "../../componets/PostDetail"

// Components


function Home() {
  const [query, setQuery] = useState("")
  const { documents: posts, loading} = useFetchDocuments("posts")

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styles.home}>
      <h1>Ultimos posts</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Busca por tags"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>

      <div>
        {loading && <p>Carregando posts...</p>}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to={'/posts/crete'} className="btn">Seja o primeiro a criar uma postagem</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home