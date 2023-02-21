import cover from "../sprites/OpenBook1.png";
import page from "../sprites/OpenBookPages.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import InputPage from "./InputPage";
import BookMark from "../books/BookMark";
import { UserContext, MessageContext } from "../context/context";
import Page from "./Page";

import useAxios from "../hooks/useAxios";
import "../css/Book.css";

//keeps track of what page the user is on
//
// if they are reading the book gets all the pages for it
//
//  if not gets the page by page num when going to the next page
//   add pages when there are no more Pages
//   updates the pages when changeing pages and when user presses save
///////////
const Book = ({ areReading, bookId }) => {
  const currentUser = useContext(UserContext);
  const setMessage = useContext(MessageContext).setMessage;
  const navigate = useNavigate();
  const [reqPages, pages, setPages] = useAxios([], areReading);
  const [reqBook] = useAxios(null);
  const [currPage, setCurrPage] = useState([1, 2]);

  //when the component first renders
  // gets all the pages in the book, if the user is reading the book
  useEffect(() => {
    const getPages = async () => {
      if (areReading) {
        const res = await reqPages(
          "get",
          `/books/${bookId}/pages/all`,
          "pages"
        );
        if (res.data.length <= 0) navigate(`/`);
        setMessage({
          text: "There are no pages in this book",
          color: "orange",
        });
      }
    };
    getPages();
  }, []);

  ///when the current page updates gets the current pages, if the user is writing
  //if there are no pages in the book then it adds pages, if the user is writing
  //if a user is trying to write on another users book, it redirects them to the page where they can read it instead
  useEffect(() => {
    const getPages = async () => {
      const res = await reqBook("get", `/books/${bookId}`, "book");

      if (!areReading && res.data.username === currentUser.username) {
        const res = await reqPages(
          "get",
          `/books/${bookId}/pages`,
          "pages",
          { page_nums: currPage },
          false
        );
        if (res.message === "Page not found!") {
          addPages();
        } else {
          setPages(() => ( [...res]));
        }
      } else if (!areReading && res.data.username !== currentUser.username) {
        navigate(`/book/${bookId}`);
        //set message to: Unautrized! Only the writer of the book can edit the book.
      }
    };

    getPages();
  }, [currPage]);

  //go to the next or previous pages
  //save the current pages
  const changePage = (num, data) => {
    if (!areReading) updatePage(data);
    let newPage = currPage[0] !== null ? currPage[0] + num : num;
    if (newPage <= 0) newPage = 1;
    if (newPage >= pages.length && areReading) newPage = pages.length - 1;
    setCurrPage(() => ([newPage, newPage + 1]));
  };

  //gose to a page
  const goToPage = (num) => {
    setCurrPage(() => ([num, num + 1]));
  };

  //add new Pages
  const addPages = async () => {
    await reqPages("post", `/books/${bookId}/pages`, "pages", {
      num_of_pages: 2,
      page_num: currPage[0],
    });
  };

  //saves/updates the current pages
  const updatePage = async (data) => {
    if (currPage[0]) {
      await reqPages(
        "patch",
        `/books/${bookId}/pages/${currPage[0]}`,
        "page",
        { text: data.text },
        false
      );
       await reqPages(
        "patch",
        `/books/${bookId}/pages/${currPage[1]}`,
        "page",
        { text: data.text2 },
        false
      );
    }
  };

  return (
    <div className="Book">
      {pages[0] && !areReading ? (
        <BookMark
          bookId={bookId}
          username={currentUser.username}
          currPageId={pages[0].id}
          changePage={goToPage}
        />
      ) : null}

      <img
        className={areReading ? "Book_cover_Reading" : "Book_cover"}
        src={cover}
        alt="cover"
      />
      <img
        className={areReading ? "Book_pages_Reading" : "Book_pages"}
        src={page}
        alt="pages"
      />

      {pages.length > 0 ? (
        areReading ? (
          <>
            <Page
              changePage={changePage}
              page={[pages[currPage[0] - 1], pages[currPage[1] - 1]]}
            />
          </>
        ) : (
          <>
            <InputPage
              changePage={changePage}
              savePage={updatePage}
              page={[...pages]}
            />
          </>
        )
      ) : null}
    </div>
  );
};

export default Book;
