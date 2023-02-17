import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import UserPage from '../pages/UserPage';
import {UserContext} from '../context/context';
import '@testing-library/jest-dom/extend-expect';

import { server } from './mocks/server.js';
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));



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
expect(page.getByText('This is a test user bio')).toBeInTheDocument();
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
