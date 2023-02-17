import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import WritingPage from '../pages/WritingPage';
import '@testing-library/jest-dom/extend-expect';

import { server } from './mocks/server.js';
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));

//book {
// id:100,
// author:"Test User",
// cover_color:"#ffffff",
// cover_image:null,
// is_public:false,
// synopsys: "this is a test book",
// text_color:"#000000",
// theme:0,
// title: "Test title",
// username: "testUser" }


it('WritingPage should renders without crashing',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 100 });
  render(<WritingPage/>);
})

it('WritingPage should match snapshot',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 100 });
  const {asFragment} = render(<WritingPage/>);
  expect(asFragment()).toMatchSnapshot();
})



it('WritingPage should show the correct book',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 100 });
  const page = render(<WritingPage/>);
expect(page.queryByText("Test title")).toBeInTheDocument();
})


it('WritingPage should be able to open the book',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 100 });
  const page = render(<WritingPage/>);
  const book = page.getElementsByClassName('WritingPage_closedBook');
  expect(book).toBeInTheDocument();
fireEvent.click(book);
  expect(page.getElementsByClassName('Book')).toBeInTheDocument();
})



it('WritingPage should show the character, place, and note books',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: 100 });
  render(<WritingPage/>);
expect(page.getElementsByClassName('WritingPage_charBook')).toBeInTheDocument();
expect(page.getElementsByClassName('WritingPage_placeBook')).toBeInTheDocument();
expect(page.getElementsByClassName('WritingPage_noteBook')).toBeInTheDocument();
})
