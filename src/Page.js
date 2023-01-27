
const Page =({pageNum,text,changePage})=>{

return <div className ='Page'>
<p>text</p>
<div className ='ChangePage' onClick ={changePage}></div>
</div>
}

export default Page;

// import {useState,useEffect} from 'react';
// import axios from 'axios';


// const [users,setUsers]= useState([]);
//
// useEffect(()=>{
// const getUsers = async()=>{
//   const res = await axios.get('/users');
//   // await axios.post('/register',{username:'testUser12312',password:'123',is_pro_user:false,first_name:'first',last_name:'last'});
//    await axios.post('/login',{username:'testUser12312',password:'123'});
//   setUsers(res.data.map(u=>u.username));
// }
// getUsers();
// },[])
//
//
// return <div>
// <h1>Users</h1>
// <ul>
// {users.map(u=> <li>{u}</li>)}
// </ul>
//
// </div>
