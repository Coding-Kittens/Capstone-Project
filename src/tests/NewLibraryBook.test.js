import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import NewLibraryBook from '../forms/NewLibraryBook';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <NewLibraryBook username='testUser' title='test'/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<NewLibraryBook username='testUser' title='test'/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
