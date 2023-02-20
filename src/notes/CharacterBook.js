import Character from "./Character";
import PopUpForm from "../forms/PopUpForm";
import NewBookCharacterForm from "../forms/NewBookCharacterForm";
import { useState, useEffect } from "react";
import useToggle from "../hooks/useToggle";
import noteBook from "../sprites/notes1.png";
import useAxios from "../hooks/useAxios";
import "../css/CharacterBook.css";
const CharacterBook = ({ bookId, username }) => {
  const [reqChars, chars, setChars] = useAxios([],true);
  const [currChar, setCurrChar] = useState(null);
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [addExistingForm, setAddExistingForm] = useState(false);


  useEffect(() => {
    reqChars("get", `/books/${bookId}/characters`, "characters");
  }, []);

  const showContents = () => {
    setCurrChar(null);
  };

  const changeCharacter = (num) => {
    let newChar = currChar ? currChar + num : num;
    if (newChar < 0) newChar = null;
    if (newChar > chars.length) newChar = 0;
    setCurrChar(newChar);
  };

  const addCharacter = (data) => {
    reqChars("post", `/books/${bookId}/characters`, "character", data);
  };

  const deleteCharacter = async (characterId) => {
    const res = await reqChars(
      "delete",
      `/books/${bookId}/characters/${characterId}`
    );

    if (res.message === "Deleted!") {
      if (currChar) {
        if (chars[currChar - 1].id === characterId) {
          changeCharacter(-1);
        }
      }
      let updatedChars = chars.filter((char) => {
        if (char.id !== characterId) return char;
      });
      if (!updatedChars[0]) updatedChars = [];
      setChars((n) => (n = updatedChars));
    }
  };

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
            { title: "Public", name: "is_public",type:'checkbox'},
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
            { title: "Public", name: "is_public",type:'checkbox'},
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
