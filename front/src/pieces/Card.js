import "../css/Card.css";
import { v4 as uuidv4 } from 'uuid';
//shows info on a Card
//takes:
//Title/headder of the Card
// a list of text to add to the Card
//a function for when you click on it
//a prop for that function
const Card = ({ title, texts, handleClick, prop }) => {
  return (
    <div className="Card" onClick={() => handleClick(prop)}>
      {title ? <h3>{title}</h3> : null}
      {texts ? texts.map((text) => <p key={uuidv4()}>{text}</p>) : null}
    </div>
  );
};
export default Card;
