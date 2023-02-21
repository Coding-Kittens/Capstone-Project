import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useAxios from "../hooks/useAxios";
import NewLibraryBook from "../forms/NewLibraryBook";
import LibraryBook from "./LibraryBook";
import Card from "../pieces/Card";
import { UserContext } from "../context/context";

//show the library info and all the books in the library
const Library = () => {
  const currentUser = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [reqBooks, books, setBooks] = useAxios([]);
  const [reqLibrary, library] = useAxios(null);
  const [addForm, setAddForm] = useState(false);

  //gets the library and its books
  useEffect(() => {
    reqBooks("get", `/libraries/${id}/books`, "books");
    reqLibrary("get", `/libraries/${id}`, "library");
  }, []);

  //adds a book to the library
  const addBook = async (data) => {
     await reqBooks(
      "post",
      `/users/${library.username}/libraries/books`,
      "",
      { libraries: [id], books: Object.keys(data) }
    );
    await reqBooks("get", `/libraries/${id}/books`, "books");
    setAddForm(false);
  };

  //delets a book from the library
  const deleteBook = async (bookId) => {
    const res = await reqBooks("delete", `/libraries/${id}/books/${bookId}`);
    if (res.message === "Deleted!")
      setBooks(() => (books.filter((book) => book.id != bookId)));
  };

  return (
    <div className="ListPage">
      {library ? (
        <div className="Library">
          <h1>{library.name}</h1>
          <p>
            {library.description}, this library is{" "}
            {library.is_public ? "public" : "not public"}.{" "}
          </p>
        </div>
      ) : null}
      {books.length > 0 ? (
        <ol>
          {books.map((book) => (
            <li key={book.id}>
              <LibraryBook book={book} deleteBook={deleteBook} />
            </li>
          ))}
        </ol>
      ) : null}

      {library ? (
        currentUser.username === library.username ? (
          <>
            <Card title="Add book" handleClick={() => setAddForm(true)} />
            <button
              type="button"
              onClick={() => navigate(`/edit/library/${id}`)}
              name="button"
            >
              Edit Library
            </button>
          </>
        ) : null
      ) : null}

      {addForm ? (
        <div className="Library_Add_Book">
          <NewLibraryBook
            addBook={addBook}
            username={library.username}
            title={"title"}
          />
          <button type="button" onClick={() => setAddForm(false)} name="button">
            Cancle
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default Library;
