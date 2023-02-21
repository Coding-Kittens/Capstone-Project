import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import LibraryBook from "../libraries/LibraryBook";

//shows all the users books
const UserBooks = () => {
  const { username } = useParams();

  const [reqBooks, books, setBooks] = useAxios(null);

  //gets all the users books
  useEffect(() => {
    reqBooks("get", `/users/${username}/books`, "books");
  }, []);

  //deletes a book
  const deleteBook = async (bookId) => {
    const res = await reqBooks("delete", `/users/${username}/books/${bookId}`);
    console.log(res);
    if (res.message === "Deleted!")
      setBooks(() => books.filter((book) => book.id != bookId));
  };

  return (
    <div className="ListPage">
      <h1>{`${username}'s Books`}</h1>
      {books
        ? books.map((book) => (
            <LibraryBook
              key={book.id}
              book={book}
              deleteBook={deleteBook}
              btnText="X"
            />
          ))
        : null}
    </div>
  );
};
export default UserBooks;
