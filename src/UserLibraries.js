import { useParams,useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react';
import Card from './Card';
import axios from 'axios';
const UserLibraries =()=>{

const navigate = useNavigate();
const { username } = useParams();
  const [libraries,setLibraries]= useState(null);

  useEffect(()=>{
  const getLoggedInUser = async()=>{
    const res = await axios.get(`/users/${username}/libraries/`);
    if(res.data){
      console.log(res.data);
      setLibraries(res.data);
    }
    else{
      setLibraries(null);
    }

  }
  getLoggedInUser();
  },[])


const viewLibrary =(id)=>{
  navigate(`/library/${id}`);
}


  return <>
  <h1>{`${username}'s Libraries`}</h1>
  {
    libraries?
    libraries.map(library => <Card key={library.id} prop={library.id} title={library.name} texts={[library.description,`${library.is_public? 'public':'private'}`]} handleClick={viewLibrary}/>)
    :null
  }
  </>
}
export default UserLibraries;
