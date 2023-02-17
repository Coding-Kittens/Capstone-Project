import PopUpForm from "../forms/PopUpForm";
import { useState, useEffect } from "react";
import useToggle from "../hooks/useToggle";
import bookmark from "../sprites/bookMark.png";
import axios from "axios";
import "../css/CharacterBook.css";
import NotePage from "../notes/NotePage";
import Tab from "./Tab";

///shows all the bookmarks for a book and lets you add a new one
const BookMark = ({ bookId, username, currPageId, changePage }) => {
  const [notes, setNotes] = useState([]);
  const [currNote, setCurrNote] = useState(1);
  const [addForm, setAddForm] = useState(false);

  const [addExistingForm, setAddExistingForm] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      const res = await axios.get(`/bookmarks/${bookId}`);
      if (res.data.bookmarks.length > 0) {
        setNotes((n) => (n = res.data.bookmarks));
      }
    };
    getNotes();
  }, []);


  const addNote = async (data, pageId) => {
    const res = await axios.post(`/bookmarks/${bookId}/${pageId}`, data);
    if (res.data.bookmark) {
      setNotes((n) => (n = [...notes, res.data.bookmark]));
    }
  };

  const deleteNote = async (pageId) => {
    const res = await axios.delete(`/bookmarks/${bookId}/${pageId}`);
    if (res.data.message === "Deleted!") {
      let updatedNotes = notes.map((note) => {
        if (note.id != pageId) return note;
      });
      if (!updatedNotes[0]) updatedNotes = [];
      setNotes((n) => (n = updatedNotes));
    }
  };

  const editNote = async (data, pageId) => {
    const res = await axios.patch(`/bookmarks/${bookId}/${pageId}`, {
      ...data,
      page_id: currPageId,
      book_id: bookId,
    });
    if (res.data.bookmark) {
      setNotes(
        (n) =>
          (n = notes.map((note) =>
            note.id != pageId ? note : res.data.bookmark
          ))
      );
    }
  };

  return (
    <>
      <img className="CharacterBook_Image" src={bookmark} alt="bookmark" />

      <div className="CharacterBook">
        {notes.length > 0 && currPageId
          ? notes.map((note) => (
              <Tab
                info={note}
                page_id={currPageId}
                handleClick={() => changePage(note.page_num)}
                editTab={editNote}
                deleteTab={deleteNote}
              />
            ))
          : null}
      </div>

      {addForm ? (
        <PopUpForm
          closeForm={() => setAddForm(false)}
          submit={(data) => addNote(data, currPageId)}
          inputs={[{name:'text',title:'Note'}]}
          initData={{
            text: "",
          }}
          submitText="Add"
        />
      ) : (
        <>
          <button
            type="button"
            className="CharacterBook_button"
            onClick={() => setAddForm(true)}
            name="button"
          >
            New Bookmark
          </button>
        </>
      )}
    </>
  );
};
export default BookMark;
