import React, { useEffect, Fragment } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import styles from './Profile.module.css';

import Header from '../components/Header';
import { AppContext } from '../state/AppContext';
import { getData } from '../services';
import MyBookings from '../components/MyBookings';

function Profile(props) {
  const { appState } = React.useContext(AppContext);

  if (!localStorage.getItem('token')) {
    props.history.push('/');
  }
  useEffect(() => {
    const run = async() => {
      appState.userData = await getData(`users/${props.match.params.id}`);
    };
    run();
  }, []);

  const details = toJS(appState.userData.user);

  function openModal() {
    props.history.push(`/profile/${props.match.params.id}/edit`);
  }

  if (details) {
    return (
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.profile}>
          <div><img className={styles.profileImg} src={details.image_url} /></div>
          <div><h2>{details.first_name} {details.last_name}</h2>
            <div>{details.email}</div>
            <button className={styles.edit} onClick={openModal}>Edit</button>
          </div>
        </div>
        <MyBookings booking={details.bookings} />
      </div>
    );
  }
  return (
    <Fragment>
      <Header />
      <div className={styles.profile}><img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" /><h1>Loading user details.</h1></div>
    </Fragment>
  );

}

export default observer(Profile);
