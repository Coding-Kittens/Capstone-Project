//shows a book to read
import bookThemes from '../data/bookThemes.js';
import Book from "../books/Book";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import useToggle from "../hooks/useToggle";
const ReadingPage = () => {
  const { id } = useParams();
  const [reqBook, book] = useAxios(null);

  //gets the book
  useEffect(() => {
    reqBook("get", `/books/${id}`, "book");
  }, []);


    const [isOpen, toggleIsOpen] = useToggle(false);

  return <>  {book?
      isOpen? (
      <Book bookId={id} areReading={true} cover_color={book.cover_color} theme={bookThemes[book.theme]}/>
    ) : (
      <>

      <h1 style={{color:book.text_color}} >{book.title}</h1>
      <img
        className="WritingPage_closedBook"
        src={bookThemes[book.theme].closedBookImg}
        alt="closedBook"
        onClick={toggleIsOpen}
      />
      <img
        style={{ backgroundColor: book.cover_color}}
        className="WritingPage_closedBook  image_color"
        src={bookThemes[book.theme].overClosedImg}
        alt="closedBook"
        onClick={toggleIsOpen}
      />
      </>
    ):null
  }

</>




};
export default ReadingPage;
