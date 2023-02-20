import {useState} from 'react';

const useToggle =(initState=true)=>{

const [state,setState] = useState(initState);
const toggle = ()=>{
  setState(state => !state);
}

return [state,toggle,setState];

}

export default useToggle;
