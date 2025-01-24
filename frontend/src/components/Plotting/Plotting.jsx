import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Plotting.module.scss";
import locationimg from "../../assets/location.svg";
import houseimg from "../../assets/house.svg";
import roadimg from "../../assets/road.svg";
import tape from "../../assets/tape.svg";
import drainimg from "../../assets/drainage.svg";

const Plotting = () => {
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/plots")
      .then((response) => {
        setPlots(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div>
      {plots.map((plot) => (
        <div key={plot.id} className={styles.box}>
          <div className={styles.image}></div>
          <div className={styles.content}>
            <h3>{plot.heading}</h3>
            <p className={styles.available}>
              <span className={styles.popins}>{plot.plot}</span>
              {plot.showAvailable && (
                <span className={styles.green}>{plot.available}</span>
              )}
              {plot.showSold !==undefined && (
                <span className={styles.red}>
                  {plot.showSold? plot.Sold : ""}</span>
              )}
            </p>
            <p>
              <span className={styles.img}>
                <img src={locationimg} alt="location" />
              </span>
              <span className={styles.location}>{plot.location}</span>
            </p>
            <p className={styles.gap}>
              <img src={houseimg} className={styles.img} alt="house" />
              {plot.house && <span className={styles.location}>Yes</span>}
              <img src={roadimg} className={styles.img2} alt="road" />
              <span className={styles.location}>{plot.road2}</span>
              <img src={drainimg} className={styles.img3} alt="drainage" />
              {plot.drain !== undefined && (
                <span className={styles.location}>
                  {plot.drain ? "Yes" : "No"}
                </span>
              )}

              <img src={tape} className={styles.img4} alt="tape" />
              {plot.ft !== undefined && (
                <span className={styles.location}>
                  {plot.ft ? plot.measurement : "No"}
                </span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Plotting;
