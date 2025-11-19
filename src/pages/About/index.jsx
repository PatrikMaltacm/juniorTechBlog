import { Link } from "react-router-dom"
import styles from "./About.module.css"

function About() {
  return (
    <div className={styles.about}>
        <h2>Sobre o Junior <span>TechBlog</span></h2>
        <p>Esse projeto consiste em um blog feito pelo desenvolvedor Patrik Malta para estudo de React Js e Firebase</p>
        <Link to={'/posts/create'} className="btn">Criar Post</Link>
    </div>
  )
}

export default About