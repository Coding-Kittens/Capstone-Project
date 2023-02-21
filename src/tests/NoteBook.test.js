import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import NoteBook from '../notes/NoteBook';
import axios from "axios";
import '@testing-library/jest-dom/extend-expect';

let bookId=0;
beforeAll(async()=>{
await axios.post('/register',{username:'testUser',password:'098',first_name:'Test',last_name:'User'});
const bookRes = await axios.post('/users/testUser/books',{title:'test',synopsys:'test synopsys',text_color:'#000000',cover_color:'#ffffff',theme:'0',is_public:true});

if(bookRes.data.book){
  bookId = bookRes.data.book.id;
}
})

it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <NoteBook bookId={bookId} username='testUser'/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<NoteBook bookId={bookId} username='testUser'/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})


afterAll(async()=>{
 await axios.post('/users/testUser/delete');
})
