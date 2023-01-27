import {useState,useEffect} from 'react';
import axios from 'axios';

const Search =({searchFor=0})=>{
//searches for books 0, libraries 1, or both 2

const [results,setResults]= useState(null);

  useEffect(()=>{
  const getLoggedInUser = async()=>{
    let res =[];
    if(searchFor ===0 || searchFor ===2){
      const books = await axios.get('/books');
      console.log(books.data);
      res =[...res,...books.data];
    }
    if(searchFor > 0){
      const libraries = await axios.get('/libraries/public/0');
      console.log(libraries.data);
        res =[...res,...libraries.data];
    }

    if(res){
      setResults(res);
    }
    else{
      setResults(null);
    }

  }
  getLoggedInUser();
  },[])

return <h1>searching for {searchFor}</h1>


}
export default Search;
