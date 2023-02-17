import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import CharacterBook from '../notes/CharacterBook';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <CharacterBook/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})





it('should show all the characters',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to show one character',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to flip to the next character',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should go back to the list of characters when there are no more to flip to',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to add a character',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to add a character from another book',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to delete a character',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to edit a character',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
