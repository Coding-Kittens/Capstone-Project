//shows a book to read
import Book from "../books/Book";
import { useParams } from "react-router-dom";
const ReadingPage = () => {
  const { id } = useParams();
  return <Book bookId={id} areReading={true} />;
};
export default ReadingPage;
