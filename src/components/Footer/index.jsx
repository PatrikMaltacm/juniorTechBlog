import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.brand}>
          <h3>DevJunior <span>TechBlog</span></h3>
          <p>Compartilhe seu conhecimento com o mundo!</p>
        </div>
        <div className={styles.links}>
          <h4>Links Úteis</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">Sobre</a></li>
            <li><a href="/register">Cadastrar</a></li>
          </ul>
        </div>
        <div className={styles.social}>
          <h4>Redes Sociais</h4>
          <p>Siga-nos nas redes sociais para novidades.</p>
          {/* Placeholder for icons */}
          <div className={styles.social_icons}>
            <span>Instagram</span>
            <span>Twitter</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Junior TechBlog &copy; 2025 - Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer