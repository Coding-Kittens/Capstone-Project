import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import ChangePasswordform from '../forms/ChangePasswordform';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <ChangePasswordform/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<ChangePasswordform/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
