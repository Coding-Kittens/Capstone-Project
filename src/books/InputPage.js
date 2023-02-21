import useFields from "../hooks/useFields";
import "../css/InputPage.css";
import { useEffect } from "react";

//show the input textareas for the pages in a book
//
///takes:
//the page or pages / witch is a list of objs with all the page info in it.
//functions to change the page and save the page
//if it is one or two pages, so later I can have books with only one page showing
const InputPage = ({ changePage, savePage, page, isTwoPages = true }) => {
  //sets the init val to be the page text
  let text = page[0] ? page[0].text : "";
  const init = {
    text: text,
  };
  if (isTwoPages) init["text2"] = page[1] ? page[1].text : "";

  const [inputPage, handleChange, resetpage, setPage] = useFields(init);

  //sets the page text to be the init val
  useEffect(() => {
    if (inputPage) {
      setPage(init);
    }
  }, [page]);

  //calls changePage and passes the textarea data to it so it can save the pages
  //also gives it a num that it should add to the current page num
  const handleClick = (num) => {
    changePage(num, inputPage);
    resetpage();
  };

  return (
    <div className="InputPage">
      {page ? (
        <>
          <textarea
            name="text"
            rows="23"
            cols="36"
            maxLength="997"
            value={inputPage.text}
            onChange={handleChange}
          ></textarea>
          {isTwoPages ? (
            <textarea
              name="text2"
              rows="23"
              cols="33"
              maxLength="905"
              value={inputPage.text2}
              onChange={handleChange}
            ></textarea>
          ) : null}
          <p className="pg1">{page[0].page_num}</p>
          {isTwoPages ? <p className="pg2">{page[1].page_num}</p> : null}

          <div className="ChangePageBack" onClick={() => handleClick(-2)}></div>
          <div className="ChangePageNext" onClick={() => handleClick(2)}></div>
        </>
      ) : null}

      <button
        className="InputPage_Save"
        type="button"
        onClick={() => savePage(inputPage)}
      >
        Save
      </button>
    </div>
  );
};
export default InputPage;
