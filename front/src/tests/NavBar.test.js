import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import NavBar from '../pieces/NavBar';
import {ThemeContext,UserContext} from '../context/context';
import themes from '../data/themes';
const theme = themes[0];
import '@testing-library/jest-dom/extend-expect';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <UserContext.Provider value={{username:'testUser'}}>
    <ThemeContext.Provider value={theme}>
    <NavBar/>
      </ThemeContext.Provider>
        </UserContext.Provider>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <ThemeContext.Provider value={theme}>
  <NavBar/>
    </ThemeContext.Provider>
      </UserContext.Provider>
</MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})


it('should show login,sign-up when not logged in',()=>{
const nav = render(<MemoryRouter>
  <UserContext.Provider value={null}>
  <ThemeContext.Provider value={theme}>
  <NavBar/>
    </ThemeContext.Provider>
      </UserContext.Provider>
</MemoryRouter>);
expect(nav.getByText('Home')).toBeInTheDocument();

expect(nav.getByText('Login')).toBeInTheDocument();
expect(nav.getByText('Sign Up')).toBeInTheDocument();
expect(nav.getByText('Logout')).not.toBeInTheDocument();
})

it('should show logOut when logged in',()=>{
const nav = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <ThemeContext.Provider value={theme}>
  <NavBar/>
    </ThemeContext.Provider>
      </UserContext.Provider>
</MemoryRouter>);
  expect(nav.getByText('Home')).toBeInTheDocument();

  expect(nav.getByText('Login')).not.toBeInTheDocument();
  expect(nav.getByText('Sign Up')).not.toBeInTheDocument();
  expect(nav.getByText('Logout')).toBeInTheDocument();
})
