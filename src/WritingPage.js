import Book from './Book';
import ImageBtn from './ImageBtn';
import './css/WritingPage.css';
import useToggle from './hooks/useToggle';
import { useParams } from "react-router-dom";
import closedBook from './sprites/BookMedival.png'

const WritingPage =()=>{
const { id } = useParams();

const [isOpen,toggleIsOpen] = useToggle(false);

  return <>
  {
    isOpen? <Book bookId={id}/> :<ImageBtn nameClass='WritingPage_closedBook' image={closedBook} handleClick={toggleIsOpen}/>
  }
  </>



}
export default WritingPage;
