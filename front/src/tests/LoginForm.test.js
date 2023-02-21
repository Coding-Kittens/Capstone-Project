import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import LoginForm from '../forms/LoginForm';
import '@testing-library/jest-dom/extend-expect';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <LoginForm/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<LoginForm/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
