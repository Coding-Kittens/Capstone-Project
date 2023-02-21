import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import NewLibraryForm from '../forms/NewLibraryForm';
import '@testing-library/jest-dom/extend-expect';

it('should renders without crashing',()=>{
  render(<NewLibraryForm/>);
})

it('should match snapshot',()=>{
  const {asFragment} = render(<NewLibraryForm/>);
  expect(asFragment()).toMatchSnapshot();
})
