import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import PageNotFound from '../pages/PageNotFound';
import '@testing-library/jest-dom/extend-expect';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <PageNotFound/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<PageNotFound/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
