import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import LoggedOutPage from '../pages/LoggedOutPage';
import {ThemeContext} from '../context/context';
import themes from '../data/themes';
const theme = themes[0];
import '@testing-library/jest-dom/extend-expect';


it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <ThemeContext.Provider value={theme}>
    <LoggedOutPage/>
      </ThemeContext.Provider>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
  <ThemeContext.Provider value={theme}>
  <LoggedOutPage/>
    </ThemeContext.Provider>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
