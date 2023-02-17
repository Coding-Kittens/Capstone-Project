import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import SignUpForm from '../forms/SignUpForm';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <SignUpForm/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<SignUpForm/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
