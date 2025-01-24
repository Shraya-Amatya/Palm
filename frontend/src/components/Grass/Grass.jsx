import React from 'react'
import styles from './Grass.module.scss'
import image from './../../assets/Grass.png'
import button from '../../assets/button.svg'
const Grass = () => {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.Grass}>
        <img src={image} alt="Grass" />
      </div>
      <div className={styles.content}>
        <h1 className={styles.head}> Real Estate Journey!</h1>
    <p className={styles.para}>Many desktop publishing packages and web page editors now use Lorem Ipsum.</p>
    <img src={button} className={styles.btn} alt="blue-button" />   
      </div>
      </div>
    </>
  )
}

export default Grass
