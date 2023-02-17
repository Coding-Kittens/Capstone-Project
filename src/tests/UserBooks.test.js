import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import UserBooks from '../pages/UserBooks';
import {UserContext} from '../context/context';
import axios from "axios";

jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));

let id=0;
beforeAll(async()=>{
const res = await axios.post('/register',{username:'testUser',password:'098',first_name:'Test',last_name:'User'});
if(res.data.user){
  id = res.data.user.id;
}
})

it('should renders without crashing',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: id });
  <UserContext.Provider value={{username:'testUser'}}>
  <UserBooks/>
    </UserContext.Provider>
  render(<MemoryRouter>

  </MemoryRouter>);
})

it('should match snapshot',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: id });
const {asFragment} = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserBooks/>
    </UserContext.Provider>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})



it('should show all of the current users books',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: id });
const page = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserBooks/>
    </UserContext.Provider>
  </MemoryRouter>);

})

it('should show only the public books of other users',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: id });
const page = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserBooks/>
    </UserContext.Provider>
  </MemoryRouter>);

})

it('should let the current user delete their books',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: id });
const page = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserBooks/>
    </UserContext.Provider>
  </MemoryRouter>);

})

it(`should not show the delete btn for books that are not the current user's`,()=>{
jest.spyOn(Router, 'useParams').mockReturnValue({ id: id });
const page = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserBooks/>
    </UserContext.Provider>
  </MemoryRouter>);

})
