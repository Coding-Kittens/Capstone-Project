import useFields from '../hooks/useFields';
import {useState,useEffect} from 'react';
import axios from 'axios';


const NewBookCharacterForm =({addChar,username})=>{

  const [chars,setChars]= useState(null);

  useEffect(()=>{
  const getChars = async()=>{
    const res = await axios.get(`/user/${username}/characters`);
    if(res.data){
      console.log(res.data);
      setChars(res.data);
    }
    else{
      setChars(null);
    }

  }
  getChars();
  },[])


  const initData = chars?
  chars.reduce((obj,char) =>
  {
  obj[char.id]=false;
  return obj;
  },{})
  :null;

const[formData,handleChange,resetFormData] = useFields(initData);


const handleSubmit=(event)=>{
  event.preventDefault();
  console.log('add existing char formData',formData);
  addChar(formData);
  resetFormData();
}

return <form className="Form"  onSubmit={handleSubmit}>
{chars? chars.map(char => <label key={char.id} >{char.name}<input type="checkBox" name={char.id} value={formData[char.id]} onChange={handleChange}/></label>):<h2>No characters to add!</h2>}
  <button type="submit" name="button">Save</button>
</form>
}
export default NewBookCharacterForm;
