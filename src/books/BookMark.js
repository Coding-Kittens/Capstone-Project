import PopUpForm from "../forms/PopUpForm";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import bookmark from "../sprites/bookMark.png";
import useAxios from "../hooks/useAxios";
import "../css/CharacterBook.css";

import Tab from "./Tab";
import "../css/BookMark.css";

///shows all the bookmarks for a book and lets you add a new one
//takes:
//the id of the book you are on
//the current page id
//a function to go to a page whe you click on a bookmark that is not on the current page
//
// I use the variable name of note because it is shorter
///and bookmarks are kinda like notes but for one page instead of the book
const BookMark = ({ bookId, currPageId, changePage }) => {
  const [reqNotes, notes, setNotes] = useAxios([], true);
  const [addForm, setAddForm] = useState(false);

  //gets all the bookmarks for a book
  useEffect(() => {
    reqNotes("get", `/bookmarks/${bookId}`, "bookmarks");
  }, []);

  //adds a bookmark
  const addNote = (data, pageId) => {
    reqNotes("post", `/bookmarks/${bookId}/${pageId}`, "bookmark", data);
  };

  //deletes a bookmark
  const deleteNote = async (pageId) => {
    const res = await reqNotes("delete", `/bookmarks/${bookId}/${pageId}`);
    if (res.message === "Deleted!") {
      let updatedNotes = notes.filter((note) => {
        if (note.page_id !== pageId) return note;
      });
      if (!updatedNotes[0]) updatedNotes = [];
      setNotes(() => updatedNotes);
    }
  };

  //edits a bookmark
  const editNote = (data, pageId) => {
    reqNotes("patch", `/bookmarks/${bookId}/${pageId}`, "bookmark", {
      ...data,
      page_id: currPageId,
      book_id: bookId,
    });
  };

  return (
    <>
      <img className="BookMark_Image" src={bookmark} alt="bookmark" />

      <div className="BookMark">
        {notes.length > 0 && currPageId
          ? notes.map((note) => (
              <Tab
                key={uuidv4()}
                info={note}
                page_id={currPageId}
                handleClick={() => changePage(note.page_num)}
                editTab={editNote}
                deleteTab={deleteNote}
              />
            ))
          : null}

        {addForm ? (
          <PopUpForm
            closeForm={() => setAddForm(false)}
            submit={(data) => addNote(data, currPageId)}
            inputs={[{ name: "text", title: "Note" }]}
            initData={{
              text: "",
            }}
            submitText="Add"
          />
        ) : (
          <>
            <button
              type="button"
              className="BookMark_button"
              onClick={() => setAddForm(true)}
              name="button"
            >
              New Bookmark
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default BookMark;
