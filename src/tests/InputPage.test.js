import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import InputPage from '../pages/InputPage';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <InputPage pageNum={1} page={{title:'test',text:'test'}}/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<InputPage pageNum={1} page={{title:'test',text:'test'}}/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
