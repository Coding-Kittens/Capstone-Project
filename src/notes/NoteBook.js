import PopUpForm from "../forms/PopUpForm";
import { useState, useEffect } from "react";
import useToggle from "../hooks/useToggle";
import noteBook from "../sprites/notes1.png";
import axios from "axios";
import "../css/CharacterBook.css";
import NotePage from "./NotePage";

const NoteBook = ({ bookId, username }) => {
  const [notes, setNotes] = useState([]);
  const [currNote, setCurrNote] = useState(null);
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [addExistingForm, setAddExistingForm] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      const res = await axios.get(`/books/${bookId}/notes`);
      if (res.data.notes.length > 0) {
        setNotes((n) => (n = res.data.notes));
      }
    };
    getNotes();
  }, []);

  const showContents = () => {
    setCurrNote(null);
  };

  const changeNote = (num) => {
    let newNote = currNote ? currNote + num : num;
    if (newNote < 0) newNote = null;
    if (newNote > notes.length) newNote = 0;
    setCurrNote(newNote);
  };

  const addNote = async (data) => {
    const res = await axios.post(`/books/${bookId}/notes`, data);
    if (res.data.notes) {
      setNotes((n) => (n = [...notes, res.data.notes]));
    }
  };

  const deleteNote = async (noteId) => {
    const res = await axios.delete(`/books/${bookId}/notes/${noteId}`);
    console.log(res);
    if (res.data.message === "Deleted!") {
      if (currNote) {
        if (notes[currNote-1].id === noteId) {
          changeNote(-1);
        }
      }
      let updatedNotes = notes.map((note) => {
        if (note.id != noteId) return note;
      });
      if (!updatedNotes[0]) updatedNotes = [];
      setNotes((n) => (n = updatedNotes));
    }
  };

  const editNote = async (data) => {
    const noteId = notes[currNote-1].id;
    const res = await axios.patch(`/notes/${noteId}`, data);
    if (res.data.notes) {
      setNotes(
        (n) =>
          (n = notes.map((note) => (note.id != noteId ? note : res.data.notes)))
      );
    }
  };

  return (
    <>
      <img className="CharacterBook_Image" src={noteBook} alt="NoteBook" />

      {editForm ? (
        <PopUpForm
          closeForm={() => setEditForm(false)}
          submit={editNote}
          inputs={[
            { title: "title", name: "title" },
            { title: "text", name: "text" },
          ]}
          initData={{
            title: "",
            text: "",
          }}
          submitText="Edit Note"
        />
      ) : null}

      <div className="CharacterBook">
        {currNote ? null : <h3>Table of Contents</h3>}

        {currNote && notes.length > 0 ? (
          <NotePage
            handleClick={() => setEditForm(true)}
            note={notes[currNote-1]}
            deleteNote={deleteNote}
          />
        ) : (
          notes.map((note, inx) => (
            <div className="CharLink" key={note.id}>
              <button
                type="button"
                onClick={() => changeNote(inx+1)}
                name="button"
              >
                {note.title}
              </button>
              <button
                type="button"
                onClick={() => deleteNote(note.id)}
                name="button"
              >
                X
              </button>
            </div>
          ))
        )}
      </div>

      {addForm ? (
        <PopUpForm
          closeForm={() => setAddForm(false)}
          submit={addNote}
          inputs={[
            { title: "title", name: "title" },
            { title: "text", name: "text" },
          ]}
          initData={{
            title: "",
            text: "",
          }}
          submitText="Add Note"
        />
      ) : (
        <>
          <button
            type="button"
            className="CharacterBook_button"
            onClick={() => setAddForm(true)}
            name="button"
          >
            New note
          </button>
        </>
      )}


      <div className ='CharacterBook_Back' onClick ={()=>changeNote(-1)}></div>
      <div className ='CharacterBook_Next' onClick ={()=>changeNote(1)}></div>
    </>
  );
};
export default NoteBook;
