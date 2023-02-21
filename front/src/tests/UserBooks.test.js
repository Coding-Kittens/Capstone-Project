import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import UserBooks from '../pages/UserBooks';
import {UserContext} from '../context/context';
import axios from "axios";
import '@testing-library/jest-dom/extend-expect';

jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));

let bookId=0;
beforeAll(async()=>{
const res = await axios.post('/register',{username:'testUser',password:'098',first_name:'Test',last_name:'User'});
 await axios.post('/users/testUser/books',{title:'test',synopsys:'test synopsys',text_color:'#000000',cover_color:'#ffffff',theme:'0',is_public:true});
const bookRes = await axios.post('/users/testUser/books',{title:'test2',synopsys:'test synopsys2',text_color:'#000000',cover_color:'#ffffff',theme:'0',is_public:false});

if(bookRes.data.book){
  bookId = bookRes.data.book.id;
}
})

it('should render without crashing',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({username:'testUser'});
  <UserContext.Provider value={{username:'testUser'}}>
  <UserBooks/>
    </UserContext.Provider>
  render(<MemoryRouter>

  </MemoryRouter>);
})


it('should match snapshot',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({username:'testUser' });
const {asFragment} = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserBooks/>
    </UserContext.Provider>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})


it('should show all of the current users books',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({username:'testUser' });
const page = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserBooks/>
    </UserContext.Provider>
  </MemoryRouter>);
    expect(page.getByText('test')).toBeInTheDocument();
    expect(page.getByText('test2')).not.toBeInTheDocument();
})

it('should let the current user delete their books',async()=>{
  await axios.delete(`/users/testUser/books/${bookId}`);
  jest.spyOn(Router, 'useParams').mockReturnValue({ username:'testUser'});
const page = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserBooks/>
    </UserContext.Provider>
  </MemoryRouter>);

  expect(page.getByText('test')).toBeInTheDocument();
  expect(page.getByText('X')).toBeInTheDocument();
  fireEvent.click(page.getByText('X'));
  expect(page.getByText('test')).not.toBeInTheDocument();
})

it('should show all public books from another user',()=>{
  const res2 = await axios.post('/register',{username:'testUser2',password:'123',first_name:'Test2',last_name:'User2'});
  jest.spyOn(Router, 'useParams').mockReturnValue({username:'testUser2' });
const page = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserBooks/>
    </UserContext.Provider>
  </MemoryRouter>);
  expect(page.getByText('test')).toBeInTheDocument();
    expect(page.getByText('test2')).not.toBeInTheDocument();
})


it(`should not show the delete btn for books that are not the current user's`,()=>{
jest.spyOn(Router, 'useParams').mockReturnValue({ username:'testUser2' });
const page = render(<MemoryRouter>
  <UserContext.Provider value={{username:'testUser'}}>
  <UserBooks/>
    </UserContext.Provider>
  </MemoryRouter>);

expect(page.getByText('X')).not.toBeInTheDocument();

})

afterAll(async()=>{
 await axios.post('/users/testUser/delete');
 await axios.post('/users/testUser2/delete');
})
