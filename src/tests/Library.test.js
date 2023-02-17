import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Library from '../libraries/Library';
import '@testing-library/jest-dom/extend-expect';

import { server } from './mocks/server.js';
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));

it('should renders without crashing',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 100 });
  render(<MemoryRouter>
    <Library/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 100 });
const {asFragment} = render(<MemoryRouter>
  <Library/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})



it('should be able to add a book to the library',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 100 });
  const library = render(<MemoryRouter>
   <Library/>
   </MemoryRouter>);

expect(app.getByText('Test Title')).not.toBeInTheDocument();

   fireEvent.change(app.getByLabelText("Test Title"), {
     target: { value: true },
   });
   fireEvent.click(app.queryByText("Add book"));

  expect(app.getByText('Test Title')).toBeInTheDocument();
})


it('should be able to remove a book from the library',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 100 });
  const library = render(<MemoryRouter>
   <Library/>
   </MemoryRouter>);

expect(app.getByText('Test library')).toBeInTheDocument();
    fireEvent.click(app.queryByText("Remove from library"));
    expect(app.getByText('Test library')).not.toBeInTheDocument();
})


it('should be able to edit the library',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 100 });
  const library = render(<MemoryRouter>
   <Library/>
   </MemoryRouter>);


expect(app.getByText('Test Title')).toBeInTheDocument();
fireEvent.click(app.queryByText("Edit Library"));

   fireEvent.change(app.getByLabelText("Name"), {
     target: { value: 'Test Edit' },
   });
   fireEvent.change(app.getByLabelText("Description"), {
     target: { value: 'Test Edit Description' },
   });
   fireEvent.change(app.getByLabelText("Public"), {
     target: { value: true },
   });

fireEvent.click(app.queryByText("Add"));

  expect(app.getByText('Test Edit')).toBeInTheDocument();

})
