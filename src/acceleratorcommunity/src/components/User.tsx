import styles from '../assets/searchUser.module.css';
const User = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <div className={styles.userImage}>
            <img src="https://www.agu.org/-/media/Feature/Common/Agu/Images/Admin-Images/defaultimg.svg" />
          </div>
          <div>
            <div>Anmol Chawla</div>
            <div>5 mutual friends</div>
          </div>
        </div>
        <div>
          <button className={styles.btn}>Add Friend</button>
        </div>
      </div>
    </>
  );
};

export default User;
