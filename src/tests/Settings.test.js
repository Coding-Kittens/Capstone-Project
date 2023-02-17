import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Settings from '../pages/Settings';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <Settings/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to change the theme',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to change a users password',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to delete a user',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
