import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import BookMark from '../books/BookMark';
import axios from "axios";
import '@testing-library/jest-dom/extend-expect';

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

await axios.post(`/bookmarks/${bookId}/${pageId}`,{text:'test'})
await axios.post(`/bookmarks/${bookId}/${pageId2}`,{text:'testing'})
})



it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <BookMark bookId={bookId} username='testUser' currPageId={pageId}/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<BookMark bookId={bookId} username='testUser' currPageId={pageId}/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})



it('should show tabs in the book for all the bookmarks',()=>{
const note = render(<MemoryRouter>
<BookMark bookId={bookId} username='testUser' currPageId={pageId}/>
  </MemoryRouter>);
expect(note.getByText('1')).toBeInTheDocument();
expect(note.getByText('3')).toBeInTheDocument();
})

it('should show a bookmark',()=>{
const note = render(<MemoryRouter>
<BookMark bookId={bookId} username='testUser' currPageId={pageId}/>
  </MemoryRouter>);
expect(note.getByText('test')).toBeInTheDocument();
expect(note.getByText('testing')).not.toBeInTheDocument();
})


afterAll(async()=>{
 await axios.post('/users/testUser/delete');
})
