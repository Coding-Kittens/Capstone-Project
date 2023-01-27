import {useState} from 'react';

const useFields =(initState)=>{

const [state,setState] = useState(initState);

const handleChange =(event)=>{
  let {name,value}=event.target;
  if(event.target.type === 'checkbox'){
    value = event.target.checked;
  }

  setState((state)=>({...state,[name]: value}));
}

const resetState =()=>{
  setState(initState);
}

return [state,handleChange,resetState];
}
export default useFields;
