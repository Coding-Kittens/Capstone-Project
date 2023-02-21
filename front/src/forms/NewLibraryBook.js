import useFields from "../hooks/useFields";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";

//a for for adding book(s) to a library
const NewLibraryBook = ({
  addBook,
  username,
  title,
  isBooks = true,
  bookId = null,
  msg = "No books to add!",
}) => {
  const [reqItems, items] = useAxios([]);

  //gets a list of books or libraries
  //depending on if your adding a book to librarys
  //or if you adding books to a library
  useEffect(() => {
    if (isBooks) {
      reqItems("get", `/users/${username}/books`, "books");
    } else {
      reqItems("get", `/users/${username}/libraries/`, "libraries");
    }
  }, []);

  const initData = items
    ? items.reduce((obj, items) => {
        obj[items.id] = false;
        return obj;
      }, {})
    : null;

  const [formData, handleChange, resetFormData] = useFields({ ...initData });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = bookId ? { bookId, libraries: formData } : formData;
    addBook(data);
    resetFormData();
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      {items.length > 0 ? (
        items.map((items) => (
          <label key={items.id}>
            {items[title]}
            <input
              type="checkBox"
              name={items.id}
              value={formData[items.id]}
              onChange={handleChange}
            />
          </label>
        ))
      ) : (
        <h2>{msg}</h2>
      )}

      <button type="submit" name="button">
        Save
      </button>
    </form>
  );
};
export default NewLibraryBook;
