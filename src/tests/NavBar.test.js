import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import NavBar from '../pieces/NavBar';
import {ThemeContext} from '../context/context';
import themes from '../data/themes';
const theme = themes[0];


it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <ThemeContext.Provider value={theme}>
    <NavBar/>
      </ThemeContext.Provider>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
  <ThemeContext.Provider value={theme}>
  <NavBar/>
    </ThemeContext.Provider>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})


it('should show login,sign-up when not logged in',()=>{
const nav = render(<MemoryRouter>
  <ThemeContext.Provider value={theme}>
  <NavBar/>
    </ThemeContext.Provider>
  </MemoryRouter>);
expect(app.getByText('Home')).toBeInTheDocument();

expect(app.getByText('Login')).toBeInTheDocument();
expect(app.getByText('Sign Up')).toBeInTheDocument();
expect(app.getByText('Logout')).not.toBeInTheDocument();
})

it('should show logOut when logged in',()=>{
const nav = render(<MemoryRouter>
  <ThemeContext.Provider value={theme}>
  <NavBar/>
    </ThemeContext.Provider>
  </MemoryRouter>);
  expect(app.getByText('Home')).toBeInTheDocument();

  expect(app.getByText('Login')).not.toBeInTheDocument();
  expect(app.getByText('Sign Up')).not.toBeInTheDocument();
  expect(app.getByText('Logout')).toBeInTheDocument();
})
