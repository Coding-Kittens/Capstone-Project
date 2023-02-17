import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import ReadingPage from '../pages/ReadingPage';

import { server } from './mocks/server.js';
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));


it('should renders without crashing',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 200 });
  render(<MemoryRouter>
    <ReadingPage/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 200 });
const {asFragment} =  render(<MemoryRouter>
    <ReadingPage/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})



it('should close the book when there are no more pages to flip to, if reading',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 200 });
const page =  render(<MemoryRouter>
    <ReadingPage/>
  </MemoryRouter>);
  const prevPg=page.getElementsByClassName('ChangePageBack');
  fireEvent.click(prevPg);
  expect(page.getElementsByClassName('WritingPage_closedBook')).toBeInTheDocument();
expect(asFragment()).toMatchSnapshot();
})
