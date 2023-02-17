import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Search from '../pages/Search';
import {UserContext} from '../context/context';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <UserContext.Provider value={{username:'testUser'}}>
    <Search/>
      </UserContext.Provider>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <Search/>
    </UserContext.Provider>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
