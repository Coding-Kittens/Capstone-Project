import Place from "./Place";
import PopUpForm from "../forms/PopUpForm";

import { useState, useEffect } from "react";

import noteBook from "../sprites/notes1.png";
import useAxios from "../hooks/useAxios";

//shows all the places for a book
//lets you look at just one place
//you can flip between places
//you can add edit or delete a place
const PlaceBook = ({ bookId }) => {
  const [reqPlaces, places, setPlaces] = useAxios([], true);
  const [currPlace, setCurrPlace] = useState(null);
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);


  //gets all the places for a book
  useEffect(() => {
    reqPlaces("get", `/books/${bookId}/places`, "places");
  }, []);

  //changes the current place so you can flip between places
  const changePlace = (num) => {
    let newPlace = currPlace ? currPlace + num : num;
    if (newPlace < 0) newPlace = null;
    if (newPlace > places.length) newPlace = 0;
    setCurrPlace(newPlace);
  };

  //adds a place
  const addPlace = async (data) => {
    reqPlaces("post", `/books/${bookId}/places`, "place", data);
  };

  //deletes a place
  const deletePlace = async (placeId) => {
    const res = await reqPlaces("delete", `/books/${bookId}/places/${placeId}`);

    if (res.message === "Deleted!") {
      //if you are on that place page it changes it to the place before the current one
      if (currPlace) {
        if (places[currPlace - 1].id === placeId) {
          changePlace(-1);
        }
      }
      let updatedPlaces = places.filter((place) => {
        if (place.id !== placeId) return place;
      });
      if (!updatedPlaces[0]) updatedPlaces = [];
      setPlaces(() => (updatedPlaces));
    }
  };

  //edits a place
  const editPlace = async (data) => {
    const placeId = places[currPlace - 1].id;
    reqPlaces("patch", `/books/${bookId}/places/${placeId}`, "place", data);
  };

  return (
    <>
      <img className="CharacterBook_Image" src={noteBook} alt="NoteBook" />

      {currPlace && editForm ? (
        <PopUpForm
          closeForm={() => setEditForm(false)}
          submit={editPlace}
          inputs={[
            { title: "Name", name: "name" },
            { title: "Description", name: "description" },
            { title: "Extra info", name: "extra_info" },
            { title: "Public", name: "is_public", type: "checkbox" },
          ]}
          initData={{
            name: places[currPlace - 1].name,
            description: places[currPlace - 1].description,
            extra_info: places[currPlace - 1].extra_info,
            is_public: places[currPlace - 1].is_public,
          }}
          submitText="Edit Place"
        />
      ) : null}

      <div className="CharacterBook">
        {currPlace ? null : <h3>Table of Contents</h3>}

        {currPlace && places.length > 0 ? (
          <Place
            handleClick={() => setEditForm(true)}
            place={places[currPlace - 1]}
            deletePlace={deletePlace}
          />
        ) : (
          places.map((place, inx) => (
            <div className="CharLink" key={place.id}>
              <button
                type="button"
                onClick={() => changePlace(inx + 1)}
                name="button"
              >
                {place.name}
              </button>
              <button
                type="button"
                onClick={() => deletePlace(place.id)}
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
          submit={addPlace}
          inputs={[
            { title: "Name", name: "name" },
            { title: "Description", name: "description" },
            { title: "Extra info", name: "extra_info" },
            { title: "Public", name: "is_public", type: "checkbox" },
          ]}
          initData={{
            name: "",
            description: "",
            extra_info: "",
            is_public: false,
          }}
          submitText="Add Place"
        />
      ) : (
        <>
          <button
            type="button"
            className="CharacterBook_button"
            onClick={() => setAddForm(true)}
            name="button"
          >
            New place
          </button>
        </>
      )}

      <div className="CharacterBook_Back" onClick={() => changePlace(-1)}></div>
      <div className="CharacterBook_Next" onClick={() => changePlace(1)}></div>
    </>
  );
};
export default PlaceBook;
