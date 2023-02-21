import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Page from '../books/Page';
import '@testing-library/jest-dom/extend-expect';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <Page pageNum={1} text='test'/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<Page pageNum={1} text='test'/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
