import bookThemes from '../data/bookThemes.js';
import Book from "../books/Book";
import NoteBook from "../notes/NoteBook";
import CharacterBook from "../notes/CharacterBook";
import PlaceBook from "../notes/PlaceBook";
import "../css/WritingPage.css";
import useToggle from "../hooks/useToggle";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";

//show the page for writing a book
//shows btns to show the character, place, and note books
const WritingPage = () => {
  const { id } = useParams();

  const [reqBook, book] = useAxios(null);

  //gets the book
  useEffect(() => {
    reqBook("get", `/books/${id}`, "book");
  }, []);

  const [isOpen, toggleIsOpen] = useToggle(false);
  const [isPlaces, toggleIsPlaces] = useToggle(false);
  const [isNotes, toggleIsNotes] = useToggle(false);
  const [isChars, toggleIsChars] = useToggle(false);

  return (
    <>

      {book?
        isOpen? (
        <Book bookId={id} areReading={false} cover_color={book.cover_color} theme={bookThemes[book.theme]}/>
      ) : (
        <>

        <h1 className="WritingPage_title" style={{color:book.text_color}} >{book.title}</h1>
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
      {book ? (
        <>
          <button
            type="button"
            onClick={toggleIsChars}
            className="WritingPage_charBook"
          >
            Characters
          </button>
          <button
            type="button"
            onClick={toggleIsPlaces}
            className="WritingPage_placeBook"
          >
            Places
          </button>
          <button
            type="button"
            onClick={toggleIsNotes}
            className="WritingPage_noteBook"
          >
            Notes
          </button>
        </>
      ) : null}

      {isPlaces ? <PlaceBook bookId={id} username={book.username} /> : null}

      {isChars ? <CharacterBook bookId={id} username={book.username} /> : null}
      {isNotes ? <NoteBook bookId={id} username={book.username} /> : null}
    </>
  );
};
export default WritingPage;
