import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Viewall from "../../components/Viewall/Viewall";
import Plotting from "../../components/Plotting/Plotting";
import styles from "./index.module.scss";
import plotData from "../../components/Plotting/plotData";
import Partners from "../../components/Partners/Partners";
import partnersData from "../../components/Partners/partnersData";
import Banner from "../../components/Banner/Banner";
import image from "../../assets/Banner2.png";
import Grass from '../../components/Grass/Grass'
const Home = () => {
  return (
    <>
      

      {/* <Navbar/> 
      <Viewall/> */}
      <div>
        <div className="container">
         
          <Plotting className={styles.plotting}/>
          
        </div>
        <h2 className={styles.heading}>Our Associated Partners</h2>
        {partnersData.map((data, index) => (
          <Partners key={index} {...data}/>
        ))}
      </div>
      
    </>
  );
};

export default Home;
