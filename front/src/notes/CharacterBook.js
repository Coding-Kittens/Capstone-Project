import Character from "./Character";
import PopUpForm from "../forms/PopUpForm";

import { useState, useEffect } from "react";

import noteBook from "../sprites/notes1.png";
import useAxios from "../hooks/useAxios";
import "../css/CharacterBook.css";

//shows all the characters for a book
//lets you look at just one character
//you can flip between characters
//you can add edit or delete a character
const CharacterBook = ({ bookId }) => {
  const [reqChars, chars, setChars] = useAxios([], true);
  const [currChar, setCurrChar] = useState(null);
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  //gets all the characters for a book
  useEffect(() => {
    reqChars("get", `/books/${bookId}/characters`, "characters");
  }, []);

  //changes the current character
  const changeCharacter = (num) => {
    let newChar = currChar ? currChar + num : num;
    if (newChar < 0) newChar = null;
    if (newChar > chars.length) newChar = 0;
    setCurrChar(newChar);
  };

  //adds a character
  const addCharacter = (data) => {
    reqChars("post", `/books/${bookId}/characters`, "character", data);
  };

  //deletes a character
  const deleteCharacter = async (characterId) => {
    const res = await reqChars(
      "delete",
      `/books/${bookId}/characters/${characterId}`
    );

    if (res.message === "Deleted!") {
      //if you are on that character page it changes it to the character before the current one
      if (currChar) {
        if (chars[currChar - 1].id === characterId) {
          changeCharacter(-1);
        }
      }
      let updatedChars = chars.filter((char) => {
        if (char.id !== characterId) return char;
      });
      if (!updatedChars[0]) updatedChars = [];
      setChars(() => (updatedChars));
    }
  };

  //edits a character
  const editCharacter = (data) => {
    const characterId = chars[currChar - 1].id;
    reqChars(
      "patch",
      `/books/${bookId}/characters/${characterId}`,
      "character",
      data
    );
  };

  return (
    <>
      <img className="CharacterBook_Image" src={noteBook} alt="NoteBook" />

      {currChar && editForm ? (
        <PopUpForm
          closeForm={() => setEditForm(false)}
          submit={editCharacter}
          inputs={[
            { title: "Name", name: "name" },
            { title: "Birthday", name: "birthday" },
            { title: "Description", name: "description" },
            { title: "Extra info", name: "extra_info" },
            { title: "Backstory", name: "story" },
            { title: "Public", name: "is_public", type: "checkbox" },
          ]}
          initData={{
            name: chars[currChar - 1].name,
            birthday: chars[currChar - 1].birthday,
            description: chars[currChar - 1].description,
            extra_info: chars[currChar - 1].extra_info,
            story: chars[currChar - 1].story,
            is_public: chars[currChar - 1].is_public,
          }}
          submitText="Edit Character"
        />
      ) : null}

      <div className="CharacterBook">
        {currChar ? null : <h3>Table of Contents</h3>}

        {currChar && chars.length > 0 ? (
          <Character
            handleClick={() => setEditForm(true)}
            character={chars[currChar - 1]}
            deleteChar={deleteCharacter}
          />
        ) : (
          chars.map((char, inx) => (
            <div className="CharLink" key={char.id}>
              <button
                type="button"
                onClick={() => changeCharacter(inx + 1)}
                name="button"
              >
                {char.name}
              </button>
              <button
                type="button"
                onClick={() => deleteCharacter(char.id)}
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
          submit={addCharacter}
          inputs={[
            { title: "Name", name: "name" },
            { title: "Birthday", name: "birthday" },
            { title: "Description", name: "description" },
            { title: "Extra info", name: "extra_info" },
            { title: "Backstory", name: "story" },
            { title: "Public", name: "is_public", type: "checkbox" },
          ]}
          initData={{
            name: "",
            birthday: "",
            description: "",
            extra_info: "",
            story: "",
            is_public: false,
          }}
          submitText="Add Character"
        />
      ) : (
        <>
          <button
            type="button"
            className="CharacterBook_button"
            onClick={() => setAddForm(true)}
            name="button"
          >
            New character
          </button>
        </>
      )}

      <div
        className="CharacterBook_Back"
        onClick={() => changeCharacter(-1)}
      ></div>
      <div
        className="CharacterBook_Next"
        onClick={() => changeCharacter(1)}
      ></div>
    </>
  );
};
export default CharacterBook;
