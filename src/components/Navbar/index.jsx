import { useState } from "react";
import styles from "./Navbar.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.brand} to={"/"}>
        DevJunior <span>TechBlog</span>
      </NavLink>
      <div className={styles.menu_toggle} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`${styles.links_list} ${menuOpen ? styles.open : ""}`}>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setMenuOpen(false)}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/register"}
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setMenuOpen(false)}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to={"/posts/create"}
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setMenuOpen(false)}
              >
                Criar Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to={"/about"}
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => setMenuOpen(false)}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <>
            <li className={styles.welcome_message}>
              Olá, {user.displayName}!
            </li>
            <li>
              <button onClick={logout}>Sair</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
