import {Route,Routes,useNavigate} from 'react-router-dom';
import NavBar from './NavBar'
import HomePage from './HomePage'
import UserPage from './UserPage'
import PageNotFound from './PageNotFound'
import LoginForm from './forms/LoginForm'
import SignUpForm from './forms/SignUpForm'
import NewBookForm from './forms/NewBookForm'
import NewLibraryForm from './forms/NewLibraryForm'
import UserSettingsForm from './forms/UserSettingsForm'
import Search from './Search'
import UserLibraries from './UserLibraries'
import Settings from './Settings'
import WritingPage from './WritingPage'
import ReadingPage from './ReadingPage'
import Library from './Library'
import NewLibraryBook from './forms/NewLibraryBook';

import {useState,useEffect} from 'react';
import axios from 'axios';
// import AddImageForm from '/.AddImageForm.js'
import './css/App.css';
import './fonts.css';



function App() {


  const navigate = useNavigate();
  const [currentUser,setUser]= useState(null);
  const [message, setMessage]= useState(null);



  useEffect(()=>{
  const getLoggedInUser = async()=>{
    const res = await axios.get('/logged-in-user');
    if(res.data.username){
      setUser(res.data);
    }
    else{
      setUser(null);
    }

  }
  getLoggedInUser();
  },[])



const signUp = async(data)=>{
  let res = await axios.post('/register',{...data,is_pro_user: true});
  console.log(res);
  navigate(`/`);
}

const login = async(data)=>{
  let res = await axios.post('/login',data);
  console.log(res);
  setUser(res.data);
  navigate(`/`);
}

const newBook=async(data)=>{
  let res = await axios.post(`/users/${currentUser.username}/books/create`,{...data,is_public:true,username:currentUser.username});
  console.log(res);
  if(res.data){
    navigate(`/write/book/${res.data.id}`);
  }
}

const newLibrary=async(data)=>{
  let res = await axios.post(`/users/${currentUser.username}/libraries`,data);
  console.log(res);
  if(res.data){
    navigate(`/library/${res.data.id}`);
  }
}

const logOut = async(event)=>{
  event.preventDefault();
  const res = await axios.get('/logout');
  console.log(res);
  setUser(null);
  navigate(`/`);
}

  return (
    <>
      <NavBar logOut={logOut}/>
      <Routes>
          <Route exact="true" path='/' element={<HomePage currentUser={currentUser}/>}/>
          <Route exact="true" path='/login' element={<LoginForm login={login}/>}/>
          <Route exact="true" path='/signUp' element={<SignUpForm signUp={signUp}/>}/>

          <Route exact="true" path='/search/books' element={<Search/>}/>
          <Route exact="true" path='/search/libraries' element={<Search searchFor={1}/>}/>
          <Route exact="true" path='/explore' element={<Search searchFor={2}/>}/>

          <Route exact="true" path='/user/:username' element={<UserPage/>}/>
          <Route exact="true" path='/user/:username/libraries' element={<UserLibraries/>}/>

          <Route exact="true" path='/library/:id' element={<Library/>}/>
          <Route exact="true" path='/new/library' element={<NewLibraryForm addLibrary={newLibrary}/>}/>

          <Route exact="true" path='/new/library_book/:id' element={<NewLibraryBook/>}/>

          <Route exact="true" path='/new/book' element={<NewBookForm addBook={newBook}/>}/>
          <Route exact="true" path='/book/:id' element={<ReadingPage/>}/>
          <Route exact="true" path='/write/book/:id' element={<WritingPage/>}/>

          <Route exact="true" path='/settings' element={<Settings/>}/>
          <Route exact="true" path='/user/settings' element={<UserSettingsForm/>}/>

          <Route path="*" element={<PageNotFound/>} />
      </Routes>
  </>
  );
}

export default App;
