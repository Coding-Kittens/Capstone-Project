//shows a place
const Place = ({ place, handleClick, deletePlace }) => {
  return (
    <>
      <div className="Character">
        <h3>{place.name}</h3>

        <h4>Description:</h4>
        <p>{place.description}</p>

        <h4>Extra info:</h4>
        <p>{place.extra_info}</p>
      </div>
      <button type="button" onClick={handleClick} name="button">
        Edit Place
      </button>
      <button type="button" onClick={() => deletePlace(place.id)} name="button">
        Delete Place
      </button>
    </>
  );
};
export default Place;
