import Character from './Character';
import PopUpForm from '../forms/PopUpForm';
import NewBookCharacterForm from '../forms/NewBookCharacterForm';
import {useState,useEffect} from 'react';
import useToggle from '../hooks/useToggle';
import noteBook from '../sprites/notes1.png';
import axios from 'axios';
import useAxios from '../hooks/useAxios';
import '../css/CharacterBook.css';
const CharacterBook=({bookId,username})=>{

const [reqChars,chars,setChars] = useAxios([]);
const [currChar,setCurrChar]=useState(null);
const [addForm,setAddForm] = useState(false);
const [editForm,setEditForm] = useState(false);
const [addExistingForm,setAddExistingForm] = useState(false);

console.log(chars);

useEffect(()=>{
  reqChars('get',`/books/${bookId}/characters`,'characters');
// const getChars = async()=>{
//   const res = await axios.get(`/books/${bookId}/characters`);
//   if(res.data.characters.length>0){
//     setChars((n)=> n= res.data.characters);
//   }
// }
// getChars();
},[])



const showContents =()=>{
setCurrChar(null);
}

const changeCharacter =(num)=>{
let newChar = currChar? currChar+num : num;
if (newChar<0) newChar = null;
if(newChar>chars.length) newChar =0;
setCurrChar(newChar);
}


const addCharacter =async(data)=>{
  reqChars('post',`/books/${bookId}/characters`,'character',data);
  // const res = await axios.post(`/books/${bookId}/characters`,data);
  // if(res.data.character){
  //   setChars((n)=> n= [...chars,res.data.character]);
  // }
}

const deleteCharacter =async(characterId)=>{
const res = await reqChars('delete',`/books/${bookId}/characters/${characterId}`)

   // const res = await axios.delete(`/books/${bookId}/characters/${characterId}`);
   // console.log(res);
   if(res.message === 'Deleted!'){
     if(currChar){
       if(chars[currChar-1].id === characterId){
         changeCharacter(-1);
       }
     }
     let updatedChars = chars.map(char=> {if(char.id != characterId)return char})
     if(!updatedChars[0]) updatedChars=[];
     setChars((n)=> n= updatedChars);
   }

}

const editCharacter =async(data)=>{
  const characterId = chars[currChar-1].id
    reqChars('patch',`/books/${bookId}/characters/${characterId}`,'character',data);
  // const res = await axios.patch(`/books/${bookId}/characters/${characterId}`,data);
  // if(res.data.character){
  //   setChars((n)=> n= chars.map(char=> char.id != characterId? char : res.data.character));
  // }
}


const addExistingChar =async(data)=>{

}


return <>
<img className ='CharacterBook_Image' src={noteBook} alt="NoteBook"/>

{editForm?
<PopUpForm closeForm ={()=>setEditForm(false)} submit={editCharacter} inputs={[{title: 'Name', name: 'name'},{title: 'Birthday', name:'birthday'},{title: 'Description', name:'description'},{title:'Extra info', name:'extra_info'},{title:'Backstory', name:'story'}]} initData={{name:'',birthday:'',description:'',extra_info:'',story:''}} submitText='Add Character'/>
:null
}

{
  addExistingForm?
  <>
  <NewBookCharacterForm addChar={addExistingChar} username={username}/>
  <button type="button" onClick={()=>setAddExistingForm(false)}  name="btn">Cancle</button>
  </>
  :null
}


<div className='CharacterBook'>

{
  currChar?
  null
  :<h3>Table of Contents</h3>
}

{
  currChar && chars.length>0?
  <Character handleClick={()=>setEditForm(true)} character={chars[currChar-1]} deleteChar={deleteCharacter}/>
  :
  chars.map((char,inx) => <div className='CharLink' key={char.id}>
  <button type="button" onClick={()=>changeCharacter(inx+1)} name="button">{char.name}</button>
  <button type="button" onClick={()=>deleteCharacter(char.id)} name="button">X</button>
</div>
)
}

</div>

{addForm?
<PopUpForm closeForm ={()=>setAddForm(false)} submit={addCharacter} inputs={[{title: 'Name', name: 'name'},{title: 'Birthday', name:'birthday'},{title: 'Description', name:'description'},{title:'Extra info', name:'extra_info'},{title:'Backstory', name:'story'}]} initData={{name:'',birthday:'',description:'',extra_info:'',story:''}} submitText='Add Character'/>
:<>
<button type="button" className='CharacterBook_button' onClick={()=>setAddForm(true)} name="button">New character</button>
<button type="button" className='CharacterBook_button' onClick={()=>setAddExistingForm(true)}  name="btn">Add existing character</button>
</>
}

<div className ='CharacterBook_Back' onClick ={()=>changeCharacter(-1)}></div>
<div className ='CharacterBook_Next' onClick ={()=>changeCharacter(1)}></div>
</>
}
export default CharacterBook;
