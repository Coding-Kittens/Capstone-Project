import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Character from '../notes/Character';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <Character character={{id:123,name:'Rose',description:'test description',birthday:'test birthday',story:'test story',extra_info:'test info'}}/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<Character character={{id:123,name:'Rose',description:'test description',birthday:'test birthday',story:'test story',extra_info:'test info'}}/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
