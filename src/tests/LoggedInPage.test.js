import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import LoggedInPage from '../pages/LoggedInPage';
import {ThemeContext} from '../context/context';
import themes from '../data/themes';
const theme = themes[0];

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <ThemeContext.Provider value={theme}>
    <LoggedInPage username='testUser'/>
      </ThemeContext.Provider>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
  <ThemeContext.Provider value={theme}>
  <LoggedInPage username='testUser'/>
    </ThemeContext.Provider>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
