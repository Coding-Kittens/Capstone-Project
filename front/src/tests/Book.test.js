import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Book from '../books/Book';
import axios from "axios";


let bookId=0;
let pageId=0;
let pageId2=0;
beforeAll(async()=>{
 await axios.post('/register',{username:'testUser',password:'098',first_name:'Test',last_name:'User'});
const res = await axios.post('/users/testUser/books',{title:'test',synopsys:'test synopsys',text_color:'#000000',cover_color:'#ffffff',theme:'0',is_public:true});

if(res.data.book){
  bookId = res.data.book.id;
}

const pageRes = await axios.post(`/books/${bookId}/pages`,{num_of_pages:2})
const pageRes2 = await axios.post(`/books/${bookId}/pages`,{num_of_pages:2})

if(pageRes.data.pages){
  pageId = pageRes.data.pages.id;
}

if(pageRes2.data.pages){
  pageId2 = pageRes2.data.pages.id;
}

await axios.patch(`/books/${bookId}/pages/${1}`,{text:'pg1'})
await axios.patch(`/books/${bookId}/pages/${2}`,{text:'pg2'})
await axios.patch(`/books/${bookId}/pages/${3}`,{text:'pg3'})
await axios.patch(`/books/${bookId}/pages/${4}`,{text:'pg4'})
})



it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <Book areReading={true} bookId={bookId}/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<Book areReading={true} bookId={bookId}/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})


it('should show the book text',()=>{
const book = render(<MemoryRouter>
<Book areReading={true} bookId={bookId}/>
  </MemoryRouter>);
  expect(book.getByText('pg1')).toBeInTheDocument();
  expect(book.getByText('pg2')).toBeInTheDocument();
})

it('should flip to the next page and the previous page',()=>{
const  book  = render(<MemoryRouter>
<Book areReading={true} bookId={bookId}/>
  </MemoryRouter>);

const nextPg=book.getElementsByClassName('ChangePageNext');
const prevPg=book.getElementsByClassName('ChangePageBack');

fireEvent.click(nextPg);

  expect(book.getByText('pg3')).toBeInTheDocument();
  expect(book.getByText('pg4')).toBeInTheDocument();

fireEvent.click(prevPg);

  expect(book.getByText('pg1')).toBeInTheDocument();
  expect(book.getByText('pg2')).toBeInTheDocument();
})


it('should not let you flip to the previous page if there are no previous pages',()=>{
const  book  = render(<MemoryRouter>
<Book areReading={true} bookId={bookId}/>
  </MemoryRouter>);

  const prevPg=book.getElementsByClassName('ChangePageBack');
  fireEvent.click(prevPg);

  expect(book.getByText('pg1')).toBeInTheDocument();
  expect(book.getByText('pg2')).toBeInTheDocument();
})

it('should add pages if there are no next pages, if writing',()=>{
const  book  = render(<MemoryRouter>
<Book areReading={true} bookId={bookId}/>
  </MemoryRouter>);
const nextPg=book.getElementsByClassName('ChangePageNext');
fireEvent.click(nextPg);
fireEvent.click(nextPg);
expect(page.getElementsByClassName('InputPage_text')).toBeInTheDocument();
})

afterAll(async()=>{
 await axios.post('/users/testUser/delete');
})
