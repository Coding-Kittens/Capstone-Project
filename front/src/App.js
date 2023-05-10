import {Route,Routes,useNavigate} from 'react-router-dom';
import NavBar from './pieces/NavBar'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import PageNotFound from './pages/PageNotFound'
import LoginForm from './forms/LoginForm'
import SignUpForm from './forms/SignUpForm'
import NewBookForm from './forms/NewBookForm'
import NewLibraryForm from './forms/NewLibraryForm'
import Search from './pages/Search'
import UserLibraries from './pages/UserLibraries'
import UserBooks from './pages/UserBooks'
import Settings from './pages/Settings'
import WritingPage from './pages/WritingPage'
import ReadingPage from './pages/ReadingPage'
import Library from './libraries/Library'
import Message from './pieces/Message'
import useAxios from './hooks/useAxios';
import {useState,useEffect} from 'react';
import axios from 'axios';
import themes from './data/themes';
import {ThemeContext,MessageContext,UserContext} from './context/context';
import './css/App.css';
import './fonts.css';


//makes the routs for the site
function App() {
  const baseURL = process.env.REACT_APP_BASE_URL
// const baseURL = 'http://localhost:5000';
  const changeTheme=(idx)=>{
    setTheme({...themes[idx],changeTheme});
  }

  const navigate = useNavigate();
  const [message, setMessage]= useState(null);
  const [reqUser,currentUser,setUser]= useAxios(null);
  const [theme,setTheme]= useState({...themes[0],changeTheme});

  useEffect(()=>{
    reqUser('get','/logged-in-user','user');
    if (localStorage.theme !== undefined) {
      changeTheme(JSON.parse(localStorage.theme));
    }
  },[])




const signIn = async(data,url,msg)=>{
  let res = await reqUser('post',url,'user',data);
  if(res.data){
    setMessage(()=> ({text:`${msg} ${res.data.username}`,color:'green'}));
    navigate(`/`);
  }
  else if(res.message){
      setMessage(()=> ({text: res.message,color:'orange'}));
  }
}


const newBook=async(data)=>{
  let res = await axios.post(`${baseURL}/users/${currentUser.username}/books`,{...data,username:currentUser.username},{withCredentials: true, xsrfCookieName:'session'});
  if(res.data.book){
    navigate(`/write/book/${res.data.book.id}`);
  }
}

const editBook=async(data,bookId)=>{
  let res = await axios.patch(`${baseURL}/users/${currentUser.username}/books/${bookId}`,{...data},{withCredentials: true, xsrfCookieName:'session'});
  if(res.data.book){
    navigate(`/write/book/${res.data.book.id}`);
  }
}

const newLibrary=async(data)=>{
  let res = await axios.post(`${baseURL}/users/${currentUser.username}/libraries`,data,{withCredentials: true, xsrfCookieName:'session'});
  if(res.data.library){
    navigate(`/library/${res.data.library.id}`);
  }
}

const editLibrary=async(data,libraryId)=>{
  let res = await axios.patch(`${baseURL}/libraries/${libraryId}`,data,{withCredentials: true, xsrfCookieName:'session'});
  if(res.data.library){
    navigate(`/library/${res.data.library.id}`);
  }
}

const logOut = async(event)=>{
  event.preventDefault();
  await axios.get(`${baseURL}/logout`,{withCredentials: true, xsrfCookieName:'session'});
  setUser(null);
}

const deleteUser =async(data)=>{
  await reqUser('post',`/users/${currentUser.username}/delete`,'',data);
  setUser(null);
  navigate('/');
}


const removeMessage=()=>{
  setMessage(null);
}

  return (
    <>
  <UserContext.Provider value={currentUser}>
    <ThemeContext.Provider value={theme}>
    <MessageContext.Provider value={{message, setMessage}}>
    <div style={{backgroundColor:theme.backgroundColor} } className="BackgroundPage"/>
      <NavBar logOut={logOut}/>
      {message? <Message text={message.text} color={message.color} handleClick={removeMessage}/>:null}
      <Routes>
          <Route exact="true" path='/' element={<HomePage/>}/>
          <Route exact="true" path='/login' element={<LoginForm login={(data)=>signIn(data,'/login','Welcome back')}/>}/>
          <Route exact="true" path='/signUp' element={<SignUpForm signUp={(data)=>signIn(data,'/register','Welcome')}/>}/>

          <Route exact="true" path='/search/books' element={<Search title="Books"/>}/>
          <Route exact="true" path='/search/libraries' element={<Search title="Libraries" searchFor={1}/>}/>
          <Route exact="true" path='/explore' element={<Search title="Books and Libraries" searchFor={2}/>}/>
          <Route exact="true" path='/search/users' element={<Search title="Writers" searchFor={3}/>}/>

          <Route exact="true" path='/user/:username' element={<UserPage/>}/>
          <Route exact="true" path='/user/:username/libraries' element={<UserLibraries/>}/>
          <Route exact="true" path='/user/:username/books' element={<UserBooks/>}/>

          <Route exact="true" path='/library/:id' element={<Library/>}/>
          <Route exact="true" path='/new/library' element={<NewLibraryForm addLibrary={newLibrary}/>}/>
          <Route exact="true" path='/edit/library/:id' element={<NewLibraryForm addLibrary={editLibrary}/>}/>

          <Route exact="true" path='/new/book' element={<NewBookForm addBook={newBook}/>}/>
          <Route exact="true" path='/edit/book/:id' element={<NewBookForm addBook={editBook}/>}/>
          <Route exact="true" path='/book/:id' element={<ReadingPage/>}/>
          <Route exact="true" path='/write/book/:id' element={<WritingPage/>}/>
          <Route exact="true" path='/settings' element={<Settings deleteUser={deleteUser}/>}/>

          <Route path="*" element={<PageNotFound/>} />
      </Routes>
      </MessageContext.Provider>
      </ThemeContext.Provider>
      </UserContext.Provider>
  </>
  );
}

export default App;
