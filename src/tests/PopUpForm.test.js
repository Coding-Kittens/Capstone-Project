import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import PopUpForm from '../forms/PopUpForm';
import '@testing-library/jest-dom/extend-expect';

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <PopUpForm inputs={[{title:'Test title',name:'testName'},{title:'Test title 2',name:'testName2'}]} initData={{testName:'',testName2:''}}/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
  <PopUpForm inputs={[{title:'Test title',name:'testName'},{title:'Test title 2',name:'testName2'}]} initData={{testName:'',testName2:''}}/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})
