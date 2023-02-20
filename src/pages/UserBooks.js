import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useAxios from "../hooks/useAxios";
import LibraryBook from '../libraries/LibraryBook';
import Card from "../pieces/Card";
import { UserContext } from "../context/context";

const UserBooks = () => {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();
  const { username } = useParams();

  const [reqBooks, books, setBooks] = useAxios(null);

  useEffect(() => {
    reqBooks("get", `/users/${username}/books`, "books");
  }, []);



  const deleteBook=async(bookId)=>{
  const res = await reqBooks('delete',`/users/${username}/books/${bookId}`);
  console.log(res);
  if(res.message === 'Deleted!')setBooks((n)=>n= books.filter(book=> book.id !=bookId));
  }


  return (
    <div className='ListPage'>
      <h1>{`${username}'s Books`}</h1>
      {books
        ? books.map((book) => (
            <LibraryBook book={book} deleteBook={deleteBook} btnText='X'/>
          ))
        : null}
    </div>
  );
};
export default UserBooks;
