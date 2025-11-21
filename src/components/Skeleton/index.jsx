import styles from "./Skeleton.module.css";

const Skeleton = () => {
  return (
    <div className={styles.skeleton_post}>
      <div className={`${styles.skeleton} ${styles.skeleton_title}`}></div>
      <div className={`${styles.skeleton} ${styles.skeleton_author}`}></div>
      <div className={styles.skeleton_tags}>
        <div className={`${styles.skeleton} ${styles.skeleton_tag}`}></div>
        <div className={`${styles.skeleton} ${styles.skeleton_tag}`}></div>
        <div className={`${styles.skeleton} ${styles.skeleton_tag}`}></div>
      </div>
      <div className={`${styles.skeleton} ${styles.skeleton_button}`}></div>
    </div>
  );
};

export default Skeleton;
