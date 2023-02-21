import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import WritingPage from '../pages/WritingPage';
import axios from "axios";
import '@testing-library/jest-dom/extend-expect';

jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));



let bookId=0;
beforeAll(async()=>{
 await axios.post('/register',{username:'testUser',password:'098',first_name:'Test',last_name:'User'});
const res =  await axios.post('/users/testUser/books',{title:'Test title',synopsys:'this is a test book',text_color:'#000000',cover_color:'#ffffff',theme:'0',is_public:false});
if(res.data.book){
  bookId = res.data.book.id;
}
})


it('WritingPage should renders without crashing',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: bookId });
  render(<WritingPage/>);
})

it('WritingPage should match snapshot',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: bookId });
  const {asFragment} = render(<WritingPage/>);
  expect(asFragment()).toMatchSnapshot();
})



it('WritingPage should show the correct book',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: bookId });
  const page = render(<WritingPage/>);
expect(page.queryByText("Test title")).toBeInTheDocument();
})


it('WritingPage should be able to open the book',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: bookId });
  const page = render(<WritingPage/>);
  const book = page.getElementsByClassName('WritingPage_closedBook');
  expect(book).toBeInTheDocument();
fireEvent.click(book);
  expect(page.getElementsByClassName('Book')).toBeInTheDocument();
})



it('WritingPage should show the character, place, and note books',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: bookId });
  render(<WritingPage/>);
expect(page.getElementsByClassName('WritingPage_charBook')).toBeInTheDocument();
expect(page.getElementsByClassName('WritingPage_placeBook')).toBeInTheDocument();
expect(page.getElementsByClassName('WritingPage_noteBook')).toBeInTheDocument();
})


afterAll(async()=>{
 await axios.post('/users/testUser/delete');
await axios.delete(`/users/testUser/books/${bookId}`);
})
