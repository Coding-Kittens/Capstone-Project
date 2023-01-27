import cover from './sprites/OpenBook1.png'
import page from './sprites/OpenBookPages.png'
import {useState,useEffect} from 'react';
import InputPage from './InputPage'
import Page from './Page'
import axios from 'axios';
import './css/Book.css';
const Book =({areReading,bookId})=>{

const [pages,setPages]=useState();
const [pageNum,setPageNum]=useState([1,2]);//maybe later keep track of what page they were on last and add it to the book in the db


useEffect(()=>{
const getPages = async()=>{
  const res = await axios.get(`/books/${bookId}/pages`);
  if(res.data.pages){
    setPages((n)=> n= res.data.pages);
  }
  else if(!areReading){
    addPage();
  }

}
getPages();
},[])

const updatePage=async()=>{
  let res = await axios.post(`/books/${bookId}/pages/${bookId}`,{page_num: pageNum[1]+1,num_of_pages:2});
  if(res.data.pages){
   setPages((n)=> n= [...pages,...res.data.pages]);
  }
}


const nextPage = async()=>{
  if(pageNum[1]+2 > pages.length){
    await addPage();
    if(!areReading) setPageNum((n)=> n=[pageNum[0]+2,pageNum[1]+2]);
  }else{
    setPageNum((n)=> n=[pageNum[0]+2,pageNum[1]+2]);
  }
}

const prevPage = ()=>{
  if(pageNum[0]-2 >0){
    setPageNum((n)=> n=[pageNum[0]-2,pageNum[1]-2]);
  }
}

const addPage =async(text)=>{
 let res = await axios.post(`/books/${pages[pageNum[0]].id}/pages`,{text:text});
if(res.data.pages){
  setPages((n)=> n= [...pages,...res.data.pages]);
}
}

return <div className ='Book'>

<img className ='Book_cover' src={cover} alt="cover"/>
<img className ='Book_pages' src={page} alt="pages"/>

{
  pages?
    areReading?
    <>
    <Page pageNum={pageNum[0]} changePage={prevPage} text={pages[pageNum[0]-1].text}/> <Page pageNum={pageNum[1]} changePage={nextPage} text={pages[pageNum[1]-1].text}/>
    </>
    : <>
    <InputPage pageNum={pageNum[0]} changePage={prevPage} text={pages[pageNum[0]-1].text}/><InputPage pageNum={pageNum[1]} changePage={nextPage} text={pages[pageNum[1]-1].text}/>
    </>
  : null
}


</div>
}
export default Book;
