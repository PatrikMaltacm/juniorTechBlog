import styles from "./Profile.module.css";
import { useAuthValue } from "../../context/AuthContext";

const Profile = () => {
    const { user } = useAuthValue();

    if (!user) return <p>Carregando...</p>;

    return (
        <div className={styles.profile_container}>
            <h1>Meu Perfil</h1>
            <div className={styles.profile_header}>
                <div className={styles.avatar}>
                    {user.displayName.charAt(0).toUpperCase()}
                </div>
                <div className={styles.info}>
                    <h2>{user.displayName}</h2>
                    <p>{user.email}</p>
                    {user.emailVerified ? (
                        <span className={styles.verified}>✓ E-mail verificado</span>
                    ) : (
                        <span className={styles.not_verified}>⚠ E-mail não verificado</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
