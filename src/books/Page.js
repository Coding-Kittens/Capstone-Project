import '../css/Page.css';

//shows the pages for a book
const Page =({pageNum,page,changePage,isTwoPages=true})=>{

  const handleClick=(num)=>{
    changePage(num);
  }


return <div className ='Page'>
<p className ='Page_text' >{page[0].text}</p>
<p className ='Page_text2'>{page[1].text}</p>

<p className="pg1">{page[0].page_num}</p>
{isTwoPages? <p className="pg2">{page[1].page_num}</p>:null}

<div className ='ChangePageBack' onClick ={()=>handleClick(-2)}></div>
<div className ='ChangePageNext' onClick ={()=>handleClick(2)}></div>

</div>
}

export default Page;
