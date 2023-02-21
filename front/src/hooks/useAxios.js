
import { useState } from "react";
import axios from "axios";


///makes axios calls and sets state for the data it returns
//returns a function to make requests,the state, setState
///
//takes:
//initalVal the initial value of the state
//isList, if the state should be a list or just on value
////
///////if its a list it will set the State with the data coming back in a list with the state that is already there
///////if not it will replace the state with the data coming back
///
const useAxios=(initalVal,isList=false)=>{
  const [state,setState] = useState(initalVal)


//makes a request and returns the response
//takes:
//type or request 'get','post','patch',or 'delete'
//url
//key of the data thats returned like data['books']
//updateState, whether it should update the state or not
  const request=async(type,url,key,data,updateState=true)=>{
    let res='';

    switch (type){
      case 'get':
        res = await axios.get(url,{params:{...data}}, {headers:{credentials: 'include'}});
        break;
        case 'post':
       res = await axios.post(url,{...data},{headers:{credentials: 'include'}});
          break;
          case 'patch':
             res = await axios.patch(url,{...data},{headers:{credentials: 'include'}});
            break;
            case 'delete':
             res = await axios.delete(url,{headers:{credentials: 'include'}});
              break;
      default:
      break;
    }


    if(res.data[key]){
      if(!updateState) return res.data[key];

      let newState;
      if(isList){
        if(state.length>0){
            newState = state.map(s => res.data[key].id === s.id? res.data[key]:s)

            if(type=='post'){
              newState =[...state,res.data[key]];
            }
        }
        else {
          if(Array.isArray(res.data[key])){
            newState =[...res.data[key]];
          }else{
            newState =[res.data[key]];
          }
        }

      }else{
        newState =res.data[key];
      }

    setState(newState);
    return {data: res.data[key]}

    }
    else if(res.data.message){
      if(res.status != 201 && res.status != 200)setState(initalVal);
      return res.data;
    }
    if(res.status === 404){
      return {message:`No ${key} found!`};
    }
  }

return [request,state,setState];
}


export default useAxios;
