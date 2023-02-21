//shows a character
const Character = ({ character, handleClick, deleteChar }) => {
  return (
    <>
      <div className="Character">
        <h3>{character.name}</h3>

        <h4>Description:</h4>
        <p>{character.description}</p>

        <h4>Birthday:</h4>
        <p>{character.birthday}</p>

        <h4>Backstory:</h4>
        <p>{character.story}</p>

        <h4>Extra info:</h4>
        <p>{character.extra_info}</p>
      </div>
      <button type="button" onClick={handleClick} name="button">
        Edit character
      </button>
      <button
        type="button"
        onClick={() => deleteChar(character.id)}
        name="button"
      >
        Delete character
      </button>
    </>
  );
};
export default Character;
