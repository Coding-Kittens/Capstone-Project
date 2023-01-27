import Book from './Book';
import { useParams } from "react-router-dom";
const ReadingPage =()=>{
  const { id } = useParams();
    return <Book bookId={id} areReading={true}/>
}
export default ReadingPage;
