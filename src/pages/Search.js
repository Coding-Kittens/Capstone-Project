import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useAxios from "../hooks/useAxios";
import axios from "axios";
import { UserContext } from "../context/context";
import Card from "../pieces/Card";
import NewLibraryBook from "../forms/NewLibraryBook";
const Search = ({ searchFor = 0 }) => {
  const currentUser = useContext(UserContext);

  const navigate = useNavigate();
  const [reqLibraries, libraries, setLibraries] = useAxios([]);
  const [reqBooks, books, setBooks] = useAxios([]);
  const [reqUsers, users, setUsers] = useAxios([]);
  const [addForm, setAddForm] = useState(false);
  const [bookId, setBookId] = useState(null);

  let username = null;
  if (currentUser) username = currentUser.username;

  useEffect(() => {
    if (searchFor === 0 || searchFor === 2) {
      reqBooks("get", "/books", "books");
    }
    if (searchFor > 0 && searchFor < 3) {
      reqLibraries("get", "/libraries/public/0", "libraries");
    }
    if(searchFor >= 3){
      reqUsers('get','/users','users');
    }

  }, []);

  const addBook = async (data) => {
    const res = await reqBooks(
      "post",
      `/users/${username}/libraries/books`,
      "",
      { libraries: Object.keys(data.libraries), books: [data.bookId] }
    );
    setAddForm((n) => (n = false));
  };

  const handleClick = async (id) => {
    setBookId((n) => (n = id));
    setAddForm((n) => (n = true));
  };

  return (
    <>

    {users.length > 0
      ? users.map((user) => (
          <Card
            key={user.username}
            title={user.username}
            texts={[user.name]}
            handleClick={() => navigate(`/user/${user.username}`)}
          />
        ))
      : null}


      {libraries.length > 0
        ? libraries.map((library) => (
            <Card
              key={library.id}
              title={library.name}
              texts={[
                library.description,
                `${library.is_public ? "public" : "private"}`,
              ]}
              handleClick={() => navigate(`/library/${library.id}`)}
            />
          ))
        : null}
      {books.length > 0
        ? books.map((book) => (
            <div key={book.id}>
              <Card
                title={book.title}
                texts={[
                  book.synopsys,
                  `${book.is_public ? "public" : "private"}`,
                ]}
                handleClick={() => navigate(`/book/${book.id}`)}
              />
              <button
                key={book.id}
                type="button"
                onClick={() => handleClick(book.id)}
                name="button"
              >
                Add To Library
              </button>
              {addForm && username ? (
                <div className="Library_Add_Book">
                  <NewLibraryBook
                    bookId={bookId}
                    addBook={addBook}
                    username={username}
                    title="name"
                    isBooks={false}
                    msg="No Libraries to add to!"
                  />
                  <button
                    type="button"
                    onClick={() => setAddForm(false)}
                    name="button"
                  >
                    Cancle
                  </button>
                </div>
              ) : null}
            </div>
          ))
        : null}
    </>
  );
};
export default Search;
