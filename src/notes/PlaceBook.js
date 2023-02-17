import Place from './Place';
import PopUpForm from '../forms/PopUpForm';
import NewBookCharacterForm from '../forms/NewBookCharacterForm';
import {useState,useEffect} from 'react';
import useToggle from '../hooks/useToggle';
import noteBook from '../sprites/notes1.png';
import axios from 'axios';
import useAxios from '../hooks/useAxios';

const PlaceBook=({bookId,username})=>{

  const [reqPlaces,places,setPlaces] = useAxios([]);
  const [currPlace,setCurrPlace]=useState(null);
  const [addForm,setAddForm] = useState(false);
  const [editForm,setEditForm] = useState(false);
  const [addExistingForm,setAddExistingForm] = useState(false);

  console.log(places);

  useEffect(()=>{
    reqPlaces('get',`/books/${bookId}/places`,'places');
  },[])



  const showContents =()=>{
  setCurrPlace(null);
  }

  const changePlace =(num)=>{
  let newPlace = currPlace? currPlace+num : num;
  if (newPlace<0) newPlace = null;
  if(newPlace>places.length) newPlace =0;
  setCurrPlace(newPlace);
  }


  const addPlace =async(data)=>{
    reqPlaces('post',`/books/${bookId}/places`,'place',data);
  }

  const deletePlace =async(placeId)=>{
  const res = await reqPlaces('delete',`/books/${bookId}/places/${placeId}`)

     if(res.message === 'Deleted!'){
       if(currPlace){
         if(places[currPlace-1].id === placeId){
           changePlace(-1);
         }
       }
       let updatedPlaces = places.map(place=> {if(place.id != placeId)return place})
       if(!updatedPlaces[0]) updatedPlaces=[];
       setPlaces((n)=> n= updatedPlaces);
     }

  }

  const editPlace =async(data)=>{
    const placeId = places[currPlace-1].id
      reqPlaces('patch',`/books/${bookId}/places/${placeId}`,'place',data);
  }


  const addExistingPlace =async(data)=>{

  }


  return <>
  <img className ='CharacterBook_Image' src={noteBook} alt="NoteBook"/>

  {editForm?
  <PopUpForm closeForm ={()=>setEditForm(false)} submit={editPlace} inputs={[{title: 'Name', name: 'name'},{title: 'Birthday', name:'birthday'},{title: 'Description', name:'description'},{title:'Extra info', name:'extra_info'},{title:'Backstory', name:'story'}]} initData={{name:'',birthday:'',description:'',extra_info:'',story:''}} submitText='Add Place'/>
  :null
  }

  {
    addExistingForm?
    <>
    <NewBookCharacterForm addChar={addExistingPlace} username={username}/>
    <button type="button" onClick={()=>setAddExistingForm(false)}  name="btn">Cancle</button>
    </>
    :null
  }


  <div className='CharacterBook'>

  {
    currPlace?
    null
    :<h3>Table of Contents</h3>
  }

  {
    currPlace && places.length>0?
    <Place handleClick={()=>setEditForm(true)} place={places[currPlace-1]} deleteChar={deletePlace}/>
    :
    places.map((place,inx) => <div className='CharLink' key={place.id}>
    <button type="button" onClick={()=>changePlace(inx+1)} name="button">{place.name}</button>
    <button type="button" onClick={()=>deletePlace(place.id)} name="button">X</button>
  </div>
  )
  }

  </div>

  {addForm?
  <PopUpForm closeForm ={()=>setAddForm(false)} submit={addPlace} inputs={[{title: 'Name', name: 'name'},{title: 'Birthday', name:'birthday'},{title: 'Description', name:'description'},{title:'Extra info', name:'extra_info'},{title:'Backstory', name:'story'}]} initData={{name:'',birthday:'',description:'',extra_info:'',story:''}} submitText='Add Place'/>
  :<>
  <button type="button" className='CharacterBook_button' onClick={()=>setAddForm(true)} name="button">New place</button>
  <button type="button" className='CharacterBook_button' onClick={()=>setAddExistingForm(true)}  name="btn">Add existing place</button>
  </>
  }

  <div className ='CharacterBook_Back' onClick ={()=>changePlace(-1)}></div>
  <div className ='CharacterBook_Next' onClick ={()=>changePlace(1)}></div>
  </>
}
export default PlaceBook;
