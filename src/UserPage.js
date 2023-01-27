import { Link,useParams } from "react-router-dom";
import {useState,useEffect} from 'react';
import settingImg from './sprites/settings.png';
import welcomeBookImg from'./sprites/book4.png';
import bookShelfImg from './sprites/Librarybutton1.png';
import tempImg from './sprites/painting.png';
import newBook from './sprites/NewBook.png';
import ink from './sprites/ink2.png';
import axios from 'axios';
const UserPage =()=>{
  const { username } = useParams();

  const [user,setUser]= useState();

  useEffect(()=>{
  const getLoggedInUser = async()=>{
    const res = await axios.get(`/users/${username}`);
    console.log(res);
    if(res.data.username){
      setUser(res.data);
    }
    else{
      setUser(null);
    }

  }
  getLoggedInUser();
  },[])




return <>{user? <>
<img id="bookShelfImg" src={bookShelfImg} alt="bookshelf"/>
<img id="welcomeBookImg" src={welcomeBookImg} alt="book"/>
<img id="settingImg" src={settingImg} alt="paper"/>
<img id="newBook" src={newBook} alt="new Book"/>
<img id="ink" src={ink} alt="ink"/>

<div className="UserPage_1">
  <h2>Autobiography</h2>

</div>
<div className="UserPage_2">
<img id="settingImg" src={tempImg} alt="profile pic"/>
</div>

<Link end to={"/new/library"}>New Library</Link>
<Link end to={"/new/book"}>New Book</Link>
<Link end to={"/user/settings"}>Settings</Link>

<h1>{username}</h1>
<h2>{user.first_name}</h2>
<h2>{user.last_name}</h2>
</> :
<h1>loading...</h1>
}
</>

}
export default UserPage;
