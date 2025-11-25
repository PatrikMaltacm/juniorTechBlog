import styles from "./Settings.module.css";
import { useTheme } from "../../context/ThemeContext";

const Settings = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.settings_container}>
            <h1>Configurações</h1>
            <div className={styles.setting_item}>
                <div className={styles.setting_info}>
                    <h3>Tema</h3>
                    <p>Alternar entre modo claro e escuro</p>
                </div>
                <label className={styles.switch}>
                    <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={toggleTheme}
                    />
                    <span className={styles.slider}></span>
                </label>
            </div>
        </div>
    );
};

export default Settings;
