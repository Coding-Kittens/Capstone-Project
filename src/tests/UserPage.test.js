import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import UserPage from '../pages/UserPage';
import {UserContext} from '../context/context';
import axios from "axios";
import '@testing-library/jest-dom/extend-expect';

jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));


beforeAll(async()=>{
const res2 = await axios.post('/register',{username:'testUser2',password:'123',first_name:'Test2',last_name:'User2'});
const res = await axios.post('/register',{username:'testUser',password:'098',first_name:'Test',last_name:'User'});
})



it('UserPage should renders without crashing',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'testUser' });
  render(<MemoryRouter>
    <UserContext.Provider value={{username:'testUser'}}>
    <UserPage/>
      </UserContext.Provider>
  </MemoryRouter>);
})

it('UserPage should match snapshot',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'testUser' });
const {asFragment} = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserPage/>
    </UserContext.Provider>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('UserPage should show user info',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'testUser' });
const page = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserPage/>
    </UserContext.Provider>
  </MemoryRouter>);

expect(page.getByText('Username: testUser')).toBeInTheDocument();
expect(page.getByText('Full Name: Test User')).toBeInTheDocument();
})


it(`UserPage should show links to add a book,library and to go to settings, if it is the current user's page`,()=>{
jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'testUser' });
const page = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserPage/>
    </UserContext.Provider>
  </MemoryRouter>);

expect(page.getByText('New Library')).toBeInTheDocument();
expect(page.getByText('New Book')).toBeInTheDocument();
expect(page.getByText('Settings')).toBeInTheDocument();
})

it(`UserPage should show links to the users books and libraries, if it is another user's page`,()=>{
jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'testUser' });
const page = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser2'}}>
  <UserPage/>
    </UserContext.Provider>
  </MemoryRouter>);

  expect(page.getByText(`testUser2's Libraries`)).toBeInTheDocument();
  expect(page.getByText(`testUser2's Books`)).toBeInTheDocument();

})

afterAll(async()=>{
 await axios.post('/users/testUser/delete');
 await axios.post('/users/testUser2/delete');
})
