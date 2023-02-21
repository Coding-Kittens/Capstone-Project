import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import ReadingPage from '../pages/ReadingPage';
import axios from "axios";
import '@testing-library/jest-dom/extend-expect';

jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));

let bookId=0;
beforeAll(async()=>{
 await axios.post('/register',{username:'testUser',password:'098',first_name:'Test',last_name:'User'});
const bookRes = await axios.post('/users/testUser/books',{title:'test2',synopsys:'test synopsys2',text_color:'#000000',cover_color:'#ffffff',theme:'0',is_public:true});

if(bookRes.data.book){
  bookId = bookRes.data.book.id;
}
})


it('should renders without crashing',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: bookId });
  render(<MemoryRouter>
    <ReadingPage/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: bookId });
const {asFragment} =  render(<MemoryRouter>
    <ReadingPage/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})



it('should close the book when there are no more pages to flip to, if reading',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: bookId });
const page =  render(<MemoryRouter>
    <ReadingPage/>
  </MemoryRouter>);
  const prevPg=page.getElementsByClassName('ChangePageBack');
  fireEvent.click(prevPg);
  expect(page.getElementsByClassName('WritingPage_closedBook')).toBeInTheDocument();
expect(asFragment()).toMatchSnapshot();
})


afterAll(async()=>{
 await axios.post('/users/testUser/delete');
})
