import { Link } from "react-router-dom";
import styles from "./About.module.css";

import SEOHead from "../../components/SEOHead";

function About() {
  return (
    <>
      <SEOHead
        title="Sobre o DraftDev"
        description="Saiba mais sobre o DraftDev, um projeto para estudo de React e Firebase."
        url="/about"
      />
      <div className={styles.about}>
        <h2>
          Sobre o Draft<span>DEV</span>
        </h2>
        <p>
          Esse projeto consiste em um blog feito pelo desenvolvedor Patrik Malta
          para estudo de React Js e Firebase
        </p>
        <Link to={"/posts/create"} className="btn">
          Criar Post
        </Link>
      </div>
    </>
  );
}

export default About;