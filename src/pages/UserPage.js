import { Link, useParams } from "react-router-dom";
import {useState,useEffect,useContext} from 'react';
import settingImg from '../sprites/settings.png';
import bookImg from'../sprites/book4.png';
import bookShelfImg from '../sprites/Librarybutton1.png';
import tempImg from '../sprites/painting.png';
import newBook from '../sprites/NewBook.png';
import ink from '../sprites/ink2.png';
import axios from 'axios';
import '../css/UserPage.css';
import { UserContext } from "../context/context";
const UserPage =()=>{
  const currentUser = useContext(UserContext);
  const { username } = useParams();

  const [user,setUser]= useState();

  useEffect(()=>{
  const getUser = async()=>{
    const res = await axios.get(`/users/${username}`);
    // console.log(res);
    if(res.data.user){
      setUser(res.data.user);
    }
    else{
      setUser(null);
    }

  }
  getUser();
  },[])




return <>{user? <div className="UserPage">
 <img id="BookImg" src={bookImg} alt="book"/>
<div className="UserPage_1">
  <h1>Autobiography</h1>
  <h2>Username: {username}</h2>
  <h2>Full Name: {user.name}</h2>
  {user.bio?
    <p>{user.bio}</p>:
    <p>{currentUser.username === username? 'No bio! Click on the ink and quil, to edit your Autobiography.':null}</p>
  }
</div>

<div className="UserPage_2">
<img id="profileImg" src={tempImg} alt="profile pic"/>
{currentUser.username === username? <img id="ink" src={ink} alt="ink"/>:null}
</div>

{currentUser.username === username?

<>
<div className='UserPage_Library'>
<img src={bookShelfImg} alt="bookshelf"/>
<Link end to={"/new/library"}>New Library</Link>
</div>

<div className='UserPage_Book'>
 <img src={newBook} alt="new Book"/>
<Link end to={"/new/book"}>New Book</Link>
</div>

<div className='UserPage_Settings'>
<img src={settingImg} alt="paper"/>
<Link end to={"/settings"}>Settings</Link>
</div>
</>

:<>
<div className='UserPage_Library'>
<img src={bookShelfImg} alt="bookshelf"/>
<Link end to={`/user/${username}/libraries`}>{`${username}'s Libraries`}</Link>
</div>

<div className='UserPage_Book'>
 <img src={newBook} alt="new Book"/>
<Link end to={`/user/${username}/books`}>{`${username}'s Books`}</Link>
</div>
</>
}




</div> :
<h1>loading...</h1>
}
</>

}
export default UserPage;
