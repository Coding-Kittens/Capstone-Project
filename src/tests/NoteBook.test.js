import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import NoteBook from '../notes/NoteBook';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <NoteBook/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})


it('should show all the notes',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to show one note',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to flip to the next note',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should go back to the list of notes when there are no more to flip to',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to add a note',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to delete a note',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to edit a note',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
