import ThemeForm from '../forms/ThemeForm';
import ChangePasswordform from '../forms/ChangePasswordform';
import PopUpForm from '../forms/PopUpForm';
import {useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { UserContext, MessageContext } from "../context/context";
import useAxios from '../hooks/useAxios';
import '../css/Settings.css';

const Settings =({deleteUser})=>{
  const currentUser = useContext(UserContext);
  const {message,setMessage} = useContext(MessageContext);
const [deleteForm,setDeleteForm]=useState(false);
  const navigate = useNavigate();

const [reqUser,user] = useAxios(currentUser);

const changePassword =(data)=>{
  reqUser('patch',`/users/${currentUser.username}/change_password`,'user',data);
}

const showDeleteForm=()=>{
  setDeleteForm(true);
  setMessage({text: 'Are you sure you want to delete your account all of your information like, books, libraries, characters, notes, extra… will be deleted. Make sure you have a copy of the information you want to keep first!',color:'#BF504A'});
}

  return <div className="Settings">
  <ThemeForm/>
  <ChangePasswordform changePassword={changePassword}/>

  <button className="DeleteForm" type="button" onClick={showDeleteForm} >Delete Account</button>

  {deleteForm?
    <PopUpForm
    closeForm={()=>setDeleteForm(false)}
      submit={deleteUser}
      inputs={[
        { title: "Password", name: "password" },
      ]}
      initData={{
        password: '',
      }}
      submitText="Im sure, Delete Account!"
    />:null
  }

  </div>

}
export default Settings;
