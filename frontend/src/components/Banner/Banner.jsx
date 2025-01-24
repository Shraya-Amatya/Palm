import React from "react";
import styles from "./index.module.scss";

const Banner = ({ image }) => {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.content}>
          <h1>Ready To Find Your Dream Plot?</h1>
          <p>
            Log in to your account to manage your plots, view exclusive offers,
            and stay updated with the latest developments in our community.
          </p>
          <div className={styles.contact}>
            <button className={styles.btn}>Register</button>
          </div>
        </div>
        <img src={image} alt="image" className={styles.image} />
      </div>
    </>
  );
};

export default Banner;
