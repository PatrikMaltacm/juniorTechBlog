import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.brand}>
          <h3>Draft<span>DEV</span></h3>
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
            <span><a href="https://www.instagram.com/draft_dev?igsh=MW9ka3Izb2l5NjhwYQ==" target="blank">Instagram</a></span>
            {/* <span>Twitter</span> */}
            <span><a href="https://www.linkedin.com/in/patrik-malta-1160552b6/" target="blank">Linkedin</a></span>
          </div>
        </div>
      </div>
      {/* <NewsletterForm /> */}
      <div className={styles.copyright}>
        <p>DraftDev &copy; 2025 - Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer