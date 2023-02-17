import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import UserLibraries from '../pages/UserLibraries';
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
  jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'testUser' });
  render(<MemoryRouter>
    <UserLibraries/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
    jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'testUser' });
const {asFragment} = render(<MemoryRouter>
<UserLibraries/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})




it('should show all of the current users libraries',()=>{
    jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'testUser' });
const page = render(<MemoryRouter>
  <UserLibraries/>
</MemoryRouter>);

expect(page.getByText('Test Library')).toBeInTheDocument();
expect(page.getByText('Test Library 2')).toBeInTheDocument();

expect(page.getByText('this is a test Library')).toBeInTheDocument();
expect(page.getByText('this is a test Library 2')).toBeInTheDocument();

expect(page.getByText('public')).toBeInTheDocument();
expect(page.getByText('private')).toBeInTheDocument();

})


it('should be able to go to a library',()=>{
    jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'testUser' });
const page = render(<MemoryRouter>
  <UserLibraries/>
  </MemoryRouter>);

  expect(page.getByText('Edit Library')).not.toBeInTheDocument();
    fireEvent.click(page.getByText('Test Library'));
    expect(page.getByText('Test Library')).toBeInTheDocument();
    expect(page.getByText('this is a test Library, this library is public.')).toBeInTheDocument();
    expect(page.getByText('Edit Library')).toBeInTheDocument();
})



it('should be able to add a library',()=>{
    jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'testUser' });
const page = render(<MemoryRouter>
  <UserLibraries/>
  </MemoryRouter>);


  expect(app.getByText('Test Add Library')).not.toBeInTheDocument();
  fireEvent.click(app.queryByText("New Library"));

     fireEvent.change(app.getByLabelText("Name"), {
       target: { value: 'Test Add Library' },
     });
     fireEvent.change(app.getByLabelText("Description"), {
       target: { value: 'Test Add Description' },
     });
     fireEvent.change(app.getByLabelText("Public"), {
       target: { value: true },
     });

  fireEvent.click(app.queryByText("Add"));

    expect(app.getByText('Test Add Library')).toBeInTheDocument();

})


it('should be able to delete a library',()=>{
    jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'testUser2' });
const page = render(<MemoryRouter>
  <UserLibraries/>
  </MemoryRouter>);
  expect(app.getByText('Test Library')).toBeInTheDocument();
  fireEvent.click(app.queryByText("X"));
expect(app.getByText('Test Library')).not.toBeInTheDocument();
})
