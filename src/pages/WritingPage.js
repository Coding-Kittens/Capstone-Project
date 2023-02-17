import Book from '../books/Book';
import NoteBook from '../notes/NoteBook';
import ImageBtn from '../pieces/ImageBtn';
import CharacterBook from '../notes/CharacterBook';
import PlaceBook from '../notes/PlaceBook'
import '../css/WritingPage.css';
import useToggle from '../hooks/useToggle';
import { useParams } from "react-router-dom";
import {useState,useEffect} from 'react';
import closedBook from '../sprites/BookMedival.png'
import axios from 'axios';
const WritingPage =()=>{
const { id } = useParams();

const [book,setBook] = useState();

useEffect(()=>{
const getBook = async()=>{
  const res = await axios.get(`/books/${id}`);
  if(res.data.book){
    setBook((n)=> n= res.data.book);
  }

}
getBook();
},[])



const [isOpen,toggleIsOpen] = useToggle(false);
const [isPlaces,toggleIsPlaces] = useToggle(false);
const [isNotes,toggleIsNotes] = useToggle(false);
const [isChars,toggleIsChars] = useToggle(false);



  return <>
  {
    isOpen? <Book bookId={id} areReading={false}/> :<ImageBtn nameClass='WritingPage_closedBook' image={closedBook} handleClick={toggleIsOpen}/>
  }
{
  book?
  <>
  <button type="button" onClick={toggleIsChars} className='WritingPage_charBook'>Characters</button>
  <button type="button" onClick={toggleIsPlaces} className='WritingPage_placeBook' >Places</button>
  <button type="button" onClick={toggleIsNotes} className='WritingPage_noteBook'>Notes</button>
  </>
  :null
}


{
  isPlaces?
  <PlaceBook bookId={id} username={book.username}/>
  :null
}

{
  isChars?
  <CharacterBook bookId={id} username={book.username}/>
:null

}
{
  isNotes?
  <NoteBook bookId={id} username={book.username}/>
  :null
}

  </>



}
export default WritingPage;

// {
//   book? <NoteBook bookId={id} username={book.username}/>:null
// }
//
// {
//   book? <CharacterBook bookId={id} username={book.username}/>:null
// }
