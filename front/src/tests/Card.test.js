import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Card from '../pieces/Card';
import '@testing-library/jest-dom/extend-expect';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <Card title='test title' texts={['test1','test2']}/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<Card title='test title' texts={['test1','test2']}/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
