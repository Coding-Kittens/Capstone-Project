import useToggle from '../hooks/useToggle';
import {useNavigate} from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../context/context";
import '../css/LibraryBook.css';
const LibraryBook=({book,deleteBook,editBook,btnText='Remove from library'})=>{
    const currentUser = useContext(UserContext);
const navigate = useNavigate();
const [bookCard,toggleBookCard] = useToggle(false);

  return <>
  <div className='LibraryBook' onClick={toggleBookCard}>
<h4>{book.title}</h4>
<h4>{book.author}</h4>
{bookCard && currentUser.username===book.username?
<>
<button type="button" onClick={()=>navigate(`/edit/book/${book.id}`)} name="editBtn">Edit</button>
<button type="button" onClick={()=>navigate(`/write/book/${book.id}`)} name="writeBtn">Write</button>
<button type="button" onClick={()=>navigate(`/book/${book.id}`)} name="readBtn">Read</button>
</>
:null
}

  </div>

{currentUser.username===book.username?
  <button type="button" onClick={()=>deleteBook(book.id)} name="button">{btnText}</button>
  :null
}

  </>
}

export default LibraryBook;
