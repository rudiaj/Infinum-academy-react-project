import React, {useCallback, useState} from 'react';
import { useLocalStorage } from 'react-use';
import { observer } from 'mobx-react';
import { AppContext } from '../state/AppContext';
import { toJS } from 'mobx';
import styles from './EditProfile.module.css';
import { useDropzone } from 'react-dropzone';
import useForm from 'react-hook-form';
import { uploadPhoto } from '../services/uploadPhoto';
import { editUser } from '../services/editUser';
 function EditProfile(props) {

  const { appState } = React.useContext(AppContext);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  const { register, handleSubmit, errors } = useForm({
    // defaultValues: {
    //   'fullName': `${fname}`,
    // },
  });

  const [imgUrl, setImgUrl] = useState('');
  const [file, setFile] = useState(null);
  const [name, setName] = useLocalStorage('name','');

  function onDrop(files) {
    setFile(files[0]);
    setImgUrl(URL.createObjectURL(files[0]));
  }
  

   function closeModal() {
    props.history.push(`/profile/${props.match.params.id}`);
  }


  async function submitChange(submitData) {
    const image = await uploadPhoto(file);
    console.log(image.imageUrl);
    const newUserData = await editUser(`users/${props.match.params.id}`,
    submitData.email,
    submitData.fullName,
    submitData.password,
    image.imageUrl);
    console.log(newUserData);
    const fNameArray = submitData.fullName.split(' ');
    newUserData && setName(fNameArray[0]);
  }
  
   return (
    
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <h1>Edit profile</h1>
            <div className={styles.dropzone} {...getRootProps()}>
            <input {...getInputProps()} />
              {file && <img className={styles.profileImg} src={imgUrl}></img>}
              <div className={styles.dragDrop}>{
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop, or click to select files</p>
              }</div>
            </div>
            
            <form onSubmit={handleSubmit(submitChange)}>
            <div className={styles.form}>
            <input type="text" name="fullName" ref={register({
              required: 'Full name required!',
            })} placeholder="Full name" />
            <div><p>{errors['fullName'] && errors['fullName'].message}</p></div>
            </div>
            <div>
            <input type="email" name="email" ref={register({
              required: 'Email required!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i,
                message: 'This is not an email format!',
              },
            })}  placeholder="Email" />
            </div>
            <div><p>{errors['email'] && errors['email'].message}</p></div>
            <div>
            <input type="password" name="password" ref={register({
              validate: (value) => value.length > 3 || 'Use a stronger password!',
            })} placeholder="New Password" />
            </div>
            <div><p>{errors['password'] && errors['password'].message}</p></div>
            <button type="submit" className={styles.button} >Save changes</button>
            </form>
              
            <button className={styles.button} onClick={closeModal} >Close</button>
        </div>
      </div>
  );
}

export default observer(EditProfile);