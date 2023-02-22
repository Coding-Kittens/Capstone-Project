import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import HomePage from '../pages/HomePage';
import {UserContext} from '../context/context';
import '@testing-library/jest-dom/extend-expect';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <UserContext.Provider value={{username:'testUser'}}>
    <HomePage/>
      </UserContext.Provider>
  </MemoryRouter>);

})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <HomePage/>
    </UserContext.Provider>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should show LoggedOutPage when user is logged out',()=>{
const page = render(<MemoryRouter>
  <UserContext.Provider value={null}>
  <HomePage/>
    </UserContext.Provider>
  </MemoryRouter>);
expect(page.getByText('Welcome')).toBeInTheDocument();
})

it('should show LoggedInPage when user is logged in',()=>{
const page = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <HomePage/>
    </UserContext.Provider>
  </MemoryRouter>);
expect(page.getByText('Table of Contents')).toBeInTheDocument();
})
