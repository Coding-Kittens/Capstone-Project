import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Library from '../libraries/Library';
import axios from "axios";
import '@testing-library/jest-dom/extend-expect';

jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));

let id=0;
beforeAll(async()=>{
 await axios.post('/register',{username:'testUser',password:'098',first_name:'Test',last_name:'User'});
const res = await axios.post('/users/testUser/libraries',{name:'Test Library',description:'this is a test Library',is_public:true})
await axios.post('/users/testUser/books',{title:'Test Title',synopsys:'test synopsys',text_color:'#000000',cover_color:'#ffffff',theme:'0',is_public:true});

if(res.data.library){
  id = res.data.library.id;
}
})



it('should renders without crashing',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: id });
  render(<MemoryRouter>
    <Library/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: id });
const {asFragment} = render(<MemoryRouter>
  <Library/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})



it('should be able to add a book to the library',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: id });
  const library = render(<MemoryRouter>
   <Library/>
   </MemoryRouter>);

expect(library.getByText('Test Title')).not.toBeInTheDocument();

   fireEvent.change(library.getByLabelText("Test Title"), {
     target: { value: true },
   });
   fireEvent.click(library.queryByText("Add book"));

  expect(library.getByText('Test Title')).toBeInTheDocument();
})


it('should be able to remove a book from the library',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: id });
  const library = render(<MemoryRouter>
   <Library/>
   </MemoryRouter>);

expect(library.getByText('Test Title')).toBeInTheDocument();
    fireEvent.click(library.queryByText("Remove from library"));
    expect(library.getByText('Test Title')).not.toBeInTheDocument();
})


it('should be able to edit the library',()=>{
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: id });
  const library = render(<MemoryRouter>
   <Library/>
   </MemoryRouter>);


expect(library.getByText('Test Library')).toBeInTheDocument();
fireEvent.click(library.queryByText("Edit Library"));

   fireEvent.change(library.getByLabelText("Name"), {
     target: { value: 'Test Edit' },
   });
   fireEvent.change(library.getByLabelText("Description"), {
     target: { value: 'Test Edit Description' },
   });
   fireEvent.change(library.getByLabelText("Public"), {
     target: { value: true },
   });

fireEvent.click(library.queryByText("Add"));

  expect(library.getByText('Test Edit')).toBeInTheDocument();

})

afterAll(async()=>{
 await axios.post('/users/testUser/delete');
})
