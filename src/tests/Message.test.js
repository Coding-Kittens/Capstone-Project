import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Message from '../pieces/Message';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <Message text='this is a test' color='green'/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<Message text='this is a test' color='green'/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
