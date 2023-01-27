import { useParams } from "react-router-dom";
import {useState,useEffect} from 'react';
import axios from 'axios';
import LibraryBook from './LibraryBook';
import Card from './Card';
const Library =()=>{
const { id } = useParams();

const [books,setBooks]=useState();
const [library,setLibrary]=useState();

useEffect(()=>{
const getBooks = async()=>{
  const res = await axios.get(`/libraries/${id}/books`);
  const libraryRes = await axios.get(`/libraries/${id}`);
  if(res.data.books){
    setBooks((n)=> n= res.data.books);
  }
  if(libraryRes.data.library){
    setLibrary((n)=> n=libraryRes.data.library);
  }
}
getBooks();
},[])


const addBook=()=>{


}



  return<>
  {library?
    <div className='Library'>
    <h1>{library.name}</h1>
  <p>{library.description}, this library is {library.is_public? 'public': "not public"}. </p>
  </div>
  :
  null
}
{books?
  <ol>
    {books.map(book => <li><LibraryBook book={book}/></li>)}
  </ol>
:
null
}

<Card title='Add book' handleClick={addBook}/>
  </>
}
export default Library;
