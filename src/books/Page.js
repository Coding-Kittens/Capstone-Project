import "../css/Page.css";

//shows the pages for a book
//
///takes:
//the page or pages / witch is a list of objs with all the page info in it.
//functions to change the page
//if it is one or two pages, so later I can have books with only one page showing
const Page = ({ page, changePage, isTwoPages = true }) => {
  const handleClick = (num) => {
    changePage(num);
  };

  return (
    <div className="Page">
      <p className="Page_text">{page[0].text}</p>
      <p className="Page_text2">{page[1].text}</p>

      <p className="pg1">{page[0].page_num}</p>
      {isTwoPages ? <p className="pg2">{page[1].page_num}</p> : null}

      <div className="ChangePageBack" onClick={() => handleClick(-2)}></div>
      <div className="ChangePageNext" onClick={() => handleClick(2)}></div>
    </div>
  );
};

export default Page;
