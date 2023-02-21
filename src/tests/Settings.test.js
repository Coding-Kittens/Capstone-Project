import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Settings from '../pages/Settings';
import { UserContext, MessageContext } from "../context/context";
import axios from "axios";
import '@testing-library/jest-dom/extend-expect';

beforeAll(async()=>{
const res = await axios.post('/register',{username:'testUser',password:'098',first_name:'Test',last_name:'User'});
})

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <UserContext.Provider value={{username:'testUser'}}>
    < MessageContext.Provider value={{'message', (msg)=>console.log(msg)}}>
    <Settings/>
  </ MessageContext.Provider>
  </UserContext.Provider>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  < MessageContext.Provider value={{'message', (msg)=>console.log(msg)}}>
  <Settings/>
</ MessageContext.Provider>
</UserContext.Provider>
</MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

afterAll(async()=>{
 await axios.post('/users/testUser/delete');
})
