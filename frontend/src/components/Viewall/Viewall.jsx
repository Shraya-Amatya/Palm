import React from 'react'
import styles from './Viewall.module.scss' 
import arrow from './../../assets/arrow.svg'; 
const Viewall = () => {
  return (
    <div>
      <ul>
        <li><h1>Our Featured Listings</h1></li>
        <li className={styles.view}>VIEW ALL <img src={arrow} alt="arrow" /></li>
      </ul>
    </div>
  )
}

export default Viewall
