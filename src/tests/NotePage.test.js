import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import NotePage from '../notes/NotePage';
import '@testing-library/jest-dom/extend-expect';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <NotePage note={{id:394,title:'test',text:'test note'}}/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<NotePage note={{id:394,title:'test',text:'test note'}}/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
