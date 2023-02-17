import useFields from '../hooks/useFields';
import '../css/InputPage.css';
import {useState,useEffect} from 'react';
const InputPage =({pageNum,changePage,savePage,page,isTwoPages=true})=>{


let text = page[0]? page[0].text:'';

  const init ={
    text:text
  }

  if(isTwoPages) init['text2']=page[1]? page[1].text:'';

const[inputPage,handleChange,resetpage,setPage] = useFields(init);

useEffect(()=>{
if(inputPage){
  setPage(init);
}

},[page])


const handleClick=(num)=>{
  changePage(num,inputPage);
  resetpage();
}


return <div className ='InputPage'>
{page?
  <>
  <textarea  name="text" rows="27" cols="33" value={inputPage.text} onChange={handleChange}></textarea>
  {isTwoPages? <textarea  name="text2" rows="27" cols="33" value={inputPage.text2} onChange={handleChange}></textarea>:null}
  <p>{page[0].page_num}</p>
  {isTwoPages? <p>{page[1].page_num}</p>:null}

  <div className ='ChangePageBack' onClick ={()=>handleClick(-2)}></div>
  <div className ='ChangePageNext' onClick ={()=>handleClick(2)}></div>
</>
:null}

<button type="button" onClick={()=>savePage(inputPage)} name="button">Save</button>
</div>
}
export default InputPage;
