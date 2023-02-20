import { useState} from "react";
import PopUpForm from "../forms/PopUpForm";
import '../css/Tab.css';

const Tab =({info,page_id,handleClick,editTab,deleteTab,doZoom=false})=>{
const [isOpen, setIsOpen ] = useState(false);


const handleEdit = async (data) => {
editTab(data,info.page_id);
};


  const [editForm, setEditForm] = useState(false);

  return <div className={info.page_id === page_id? 'Tab_Open':'Tab'} onClick={handleClick} onMouseEnter={()=> setIsOpen(true)}  onMouseLeave={()=> setIsOpen(false)} >
<h5>{info.page_num}</h5>

{editForm ? (
  <PopUpForm
    closeForm={() => setEditForm(false)}
    submit={handleEdit}
    inputs={[
      {name:'text',title:'Note'},
    ]}
    initData={{
      text: info.text,
    }}
    submitText="Edit"

  />
) : null}


{info.page_id === page_id || (isOpen && doZoom )?
  <>
<p>{info.text}</p>
<button type="button" onClick={()=>setEditForm(true)} name="button">Edit</button>
<button type="button" onClick={()=>deleteTab(info.page_id)} name="button">X</button>
</>
:null

}

  </div>
}
export default Tab;
