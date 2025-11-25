import styles from "./Search.module.css";
import { Link } from "react-router-dom";

//hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

//components
import PostDetail from "../../components/PostDetail";
import SEOHead from "../../components/SEOHead";

function Search() {
  const query = useQuery();

  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <>
      <SEOHead
        title={`Resultados para: ${search}`}
        description={`Resultados da busca por "${search}" no Junior Tech Blog.`}
        url={`/search?q=${search}`}
      />
      <div className={styles.search_container}>
        <h2>Busca</h2>
        <div>
          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <p>Nennhum post encontrado para: {search}</p>
              <Link to={"/"} className="btn">
                Voltar
              </Link>
            </div>
          )}
          {posts &&
            posts.map((post) => <PostDetail key={post.id} post={post} />)}
        </div>
      </div>
    </>
  );
}

export default Search;