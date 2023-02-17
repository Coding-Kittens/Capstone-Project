import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import BookMark from '../books/BookMark';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <BookMark/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should show tabs in the book for all the bookmarks',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should show a bookmark',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})


it('should be able to add a bookmark',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})

it('should be able to delete a bookmark',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})


it('should be able to edit a bookmark',()=>{
const {asFragment} = render(<MemoryRouter>

  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
