
import bookThemes from '../data/bookThemes.js';
import useFields from "../hooks/useFields";
import { useParams } from "react-router-dom";
import {useState,useEffect} from 'react';
import useToggle from '../hooks/useToggle';
import '../css/NewBookForm.css'
import arrowFlip from '../sprites/ArrowFlip.png';
import useAxios from "../hooks/useAxios";
//a form to add a new book
const NewBookForm = ({ addBook }) => {
  const { id } = useParams();
  const [reqBook] = useAxios(null);
//book

  let initData = {
    title: "Title...",
    synopsys: "Synopsys...",
    text_color: "#000000",
    cover_color: "#ffffff",
    theme: 0,
    is_public: false,
  };

  const [formData, handleChange, resetFormData,setFormData] = useFields(initData);
  //gets the book
  useEffect(() => {
    const getBook = async()=>{

      if(id){
      const res = await reqBook("get", `/books/${id}`, "book");
        initData= {
          title:res.data.title ,
          synopsys: res.data.synopsys,
          text_color: res.data.text_color,
          cover_color: res.data.cover_color,
          theme: res.data.theme,
          is_public:res.data.is_public,
        }
        if (formData) {
          setFormData(initData);
        }


      }


    }
getBook();

  }, []);




const [isFliped,flipBook]=useToggle(false);
  const [bookTheme,setBookTheme] = useState(0);
const[isOpen,openBook] =useToggle(false);



  const handleSubmit = (event) => {
    event.preventDefault();
    addBook({...formData,theme: bookTheme}, id);
    resetFormData();
  };

  return (
    <form className="NewBookForm" onSubmit={handleSubmit}>

<div className="NewBookForm_themes">
      {
        bookThemes.map((theme)=> <img
          key={theme.id}
          className="NewBookForm_themeBook"
          src={theme.sampleImg}
          alt="closedBook"
          onClick={()=>setBookTheme(theme.id)}
        />
        )
      }
</div>

    { formData? <div className="NewBookForm_closedBookBtn" onClick={openBook}></div> :null}
  {
formData?
    isOpen?
    <>
  <img
    className="NewBookForm_openBook"
    src={bookThemes[bookTheme].openBookImg}
    alt="cover"
  />

  <img
    style={{ backgroundColor: formData.cover_color}}
    className="NewBookForm_openBook  image_color"
    src={bookThemes[bookTheme].overOpenImg}
    alt="pages"
  />

  </>

  : <>

  <img
  style={{transform: ` scaleX(${isFliped? -1:1})`}}
  className="NewBookForm_closedBook"
  src={bookThemes[bookTheme].closedBookImg}
  alt="closedBook"
  />

  <img
  style={{ backgroundColor: formData.cover_color, transform: `scaleX(${isFliped? -1:1})`}}
  className="NewBookForm_closedBook  image_color"
  src={bookThemes[bookTheme].overClosedImg}
  alt="closedBook"
  />

  <img
  className="NewBookForm_arrow"
  src={arrowFlip}
  alt="arrow"
  onClick={flipBook}
  />

  </>
  :null}
        <input
        style={{ color: formData.text_color, zIndex: isFliped || isOpen? -1 :3}}
        className="NewBookForm_bookText"
          required
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
        style={{ color: formData.text_color, zIndex: !isFliped || isOpen? -1 : 3}}
        className="NewBookForm_bookText"
        name="synopsys"
        value={formData.synopsys}
        onChange={handleChange}
          rows="16"
          cols="26"
        ></textarea>

      <label className="NewBookForm_Color">
        Title text color
        <input
          type="color"
          name="text_color"
          value={formData.text_color}
          onChange={handleChange}
        />
      </label>
      <label className="NewBookForm_Color">
        Cover color
        <input
          type="color"
          name="cover_color"
          value={formData.cover_color}
          onChange={handleChange}
        />
      </label>
      <label className="NewBookForm_Public">
        Public
        <input
          type="checkbox"
          name="is_public"
          value={formData.is_public}
          onChange={handleChange}
        />
      </label>
      <button className="NewBookForm_Write" type="submit" name="button">
        Write!
      </button>
    </form>

  );
};
export default NewBookForm;
