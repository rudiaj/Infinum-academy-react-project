import React from 'react';
import { observer } from 'mobx-react';

import {formatTime} from '../services';

import styles from './FlightInfo.module.css';

const FlightInfo = ({info}) => (info ? (
  <div className={styles.wrapper}>
    <h1>{info.name}</h1>
    <div className={styles.main}>
      <div className={styles.box1}>
        <p>Company:</p>
        <p>
          <span>{info.company_name}</span>
        </p>
      </div>
      <div className={styles.box2}><p>Available seats:</p><p><span>{info.no_of_seats}</span></p></div>
      <div className={styles.box3}><p>Departed:</p><p><span>{formatTime(info.flys_at)}</span></p></div>
      <div className={styles.box4}><p>Lands at:</p><p><span>{formatTime(info.lands_at)}</span></p></div>
      <div className={styles.box5}><p>Base price:</p><p><span>{info.base_price}$</span></p></div>
      <div className={styles.box6}><p>Current price:</p><p><span>{info.current_price}</span></p></div>
      <div className={styles.box7}><p>Wireless internet</p></div>
      <div className={styles.box8}><p>Kids friendly</p></div>
      <div className={styles.box9}><p>TV available</p></div>
      <div className={styles.box10}><p>Meal included</p></div>
      <div className={styles.picture}><img src="https://source.unsplash.com/1600x900/?airplane,flight" alt="airplane" height="300px" width="100%" /></div>
    </div>
  </div>
) : null);
export default observer(FlightInfo);
