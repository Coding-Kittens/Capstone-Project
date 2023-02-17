import { Link } from "react-router-dom";
import settingImg from '../sprites/settings.png';
import welcomeBookImg from'../sprites/book4.png';
import bookShelfImg from '../sprites/Librarybutton1.png';
import '../css/LoggedOutPage.css'
import {useContext} from 'react';
import {ThemeContext} from '../context/context';

const LoggedOutPage =()=>{
const theme = useContext(ThemeContext);

return <>

<img id="bookShelfImg" src={bookShelfImg} alt="bookshelf"/>

<div className="LoggedOutPage">

  <h1>Welcome</h1>

<img id="welcomeBookImg" src={welcomeBookImg} alt="book"/>
  <p>Here you can write your books in an atmoshere that makes it easier to be creative!
    Choose what theme you want to write in and the theme of your books!
</p>
<p>Pluss your books will actualy look like books instead of just text blocks!
Keep track of places, characters, and notes for your stories and add bookmarks. You can also read others books or share yours!</p>

</div>

<img id="settingImg" src={settingImg} alt="paper"/>
<Link id='signup_btn' end='true' to={"/signUp"}>Sign UP!</Link>


</>
}
export default LoggedOutPage;
