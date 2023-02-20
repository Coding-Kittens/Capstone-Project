import PopUpForm from "../forms/PopUpForm";
import { useState, useEffect } from "react";
import useToggle from "../hooks/useToggle";
import bookmark from "../sprites/bookMark.png";
import useAxios from "../hooks/useAxios";
import "../css/CharacterBook.css";
import NotePage from "../notes/NotePage";
import Tab from "./Tab";
import '../css/BookMark.css';

///shows all the bookmarks for a book and lets you add a new one
const BookMark = ({ bookId, username, currPageId, changePage }) => {
  const [reqNotes,notes, setNotes] = useAxios([],true);
  const [currNote, setCurrNote] = useState(1);
  const [addForm, setAddForm] = useState(false);

  const [addExistingForm, setAddExistingForm] = useState(false);

  useEffect(() => {
    reqNotes('get',`/bookmarks/${bookId}`,'bookmarks');
  }, []);


  const addNote = (data, pageId) => {
    reqNotes('post',`/bookmarks/${bookId}/${pageId}`,'bookmark',data);
  };

  const deleteNote = async (pageId) => {
    const res = await reqNotes('delete',`/bookmarks/${bookId}/${pageId}`)
    if (res.message === "Deleted!") {
      let updatedNotes = notes.filter((note) => {
        if (note.page_id !== pageId) return note;
      });
      if (!updatedNotes[0]) updatedNotes = [];
      setNotes((n) => (n = updatedNotes));
    }
  };

  const editNote = (data, pageId) => {
    reqNotes('patch',`/bookmarks/${bookId}/${pageId}`,'bookmark',{
      ...data,
      page_id: currPageId,
      book_id: bookId,
    })
  };

  return (
    <>
      <img className="BookMark_Image" src={bookmark} alt="bookmark" />

      <div className="BookMark">
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
