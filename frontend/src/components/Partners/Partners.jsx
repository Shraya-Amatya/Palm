import React from "react";
import styles from './index.module.scss'
import arrow from './../../assets/arrow.svg';
import image from './../../assets/Grey.png';

const Partners = ({ heading, paragraph, paragraph2, reverse }) => {
  return (
    <div className={`${styles.container} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.partners}>
        <img src={image} className={styles.grey} alt="image" />
        <div className={styles.content}>
          <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.paragraph}>{paragraph}</p>
          <p className={styles.paragraph2}>{paragraph2}</p>
          <div className={styles.view}>READ MORE<img src={arrow} alt="arrow" /></div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
