import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import NewLibraryForm from '../forms/NewLibraryForm';

jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));

it('should renders without crashing',()=>{

  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 100 });

  render(<NewLibraryForm/>);
})

it('should match snapshot',()=>{

  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 100 });


  const {asFragment} = render(<NewLibraryForm/>);
  expect(asFragment()).toMatchSnapshot();
})
