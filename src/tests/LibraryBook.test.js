import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import LibraryBook from '../libraries/LibraryBook';
import '@testing-library/jest-dom/extend-expect';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <LibraryBook book={{title:'test',author:'test',id:0}}/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
  <LibraryBook book={{title:'test',author:'test',id:0}}/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
