// import { useParams } from "react-router-dom";
import useFields from "../hooks/useFields";
import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import axios from "axios";
const NewLibraryBook = ({ addBook, username, title, isBooks = true, bookId = null, msg = "No books to add!"}) => {
  const [reqItems, items] = useAxios([]);

  useEffect(() => {
    if (isBooks) {
      reqItems("get", `/users/${username}/books`, "books");
    } else {
      reqItems("get", `/users/${username}/libraries/`, "libraries");
    }
  }, []);

  const initData = items
    ? items.reduce((obj, items) => {
        obj[items.id] = false;
        return obj;
      }, {})
    : null;


  const [formData, handleChange, resetFormData] = useFields({ ...initData });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = bookId ? { bookId, libraries: formData } : formData;
    addBook(data);
    resetFormData();
  };

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      {items.length>0?
        items.map((items) =>
          <label key={items.id}>
            {items[title]}
            <input
              type="checkBox"
              name={items.id}
              value={formData[items.id]}
              onChange={handleChange}
            />
          </label>
        )
       :
        <h2>{msg}</h2>
      }

      <button type="submit" name="button">
        Save
      </button>
    </form>
  );

  // const [books,setBooks]= useState(null);
  //
  // useEffect(()=>{
  // const getLoggedInUser = async()=>{
  //   const res = await axios.get(`/users/${username}/books`);
  //   if(res.data.books){
  //     console.log(res.data);
  //     setBooks(res.data.books);
  //   }
  //   else{
  //     setBooks(null);
  //   }
  //
  // }
  // getLoggedInUser();
  // },[])
  //

  //   const initData = books?
  //   books.reduce((obj,book) =>
  //   {
  //   obj[book.id]=false;
  //   return obj;
  //   },{})
  //   :null;
  //
  //
  //
  // console.log('init',initData);
  //
  // const[formData,handleChange,resetFormData] = useFields({...initData});
  //
  //
  // const handleSubmit=(event)=>{
  //   event.preventDefault();
  //   addBook(formData);
  //   resetFormData();
  // }
  //
  // return <form className="LoginForm"  onSubmit={handleSubmit}>
  // {books?
  // books.map(book => <label key={book.id} >{book.title}<input type="checkBox" name={book.id} value={formData[book.id]} onChange={handleChange}/></label>)
  // :<h2>No books to add!</h2>}
  // <button type="submit" name="button">Save</button>
  // </form>
  //
};
export default NewLibraryBook;
