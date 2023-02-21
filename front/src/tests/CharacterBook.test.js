import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import CharacterBook from '../notes/CharacterBook';
import axios from "axios";
import '@testing-library/jest-dom/extend-expect';

let bookId=0;
beforeAll(async()=>{
 await axios.post('/register',{username:'testUser',password:'098',first_name:'Test',last_name:'User'});
const res = await axios.post('/users/testUser/books',{title:'test',synopsys:'test synopsys',text_color:'#000000',cover_color:'#ffffff',theme:'0',is_public:true});
if(res.data.book){
  bookId = res.data.book.id;
}
await axios.post(`/books/${bookId}/characters`,{name='nick',birthday='test birthday',description='test description',extra_info='test info',story='test story'});
await axios.post(`/books/${bookId}/characters`,{name='larry',birthday='test birthday2',description='test description2',extra_info='test info2',story='test story2'});
})


it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <CharacterBook bookId={bookId} username='testUser'/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<CharacterBook bookId={bookId} username='testUser'/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})





it('should show all the characters',()=>{
const char = render(<MemoryRouter>
<CharacterBook bookId={bookId} username='testUser'/>
  </MemoryRouter>);
expect(char.getByText('nick')).toBeInTheDocument();
expect(char.getByText('larry')).toBeInTheDocument();
})

it('should be able to show one character',()=>{
const char = render(<MemoryRouter>
<CharacterBook bookId={bookId} username='testUser'/>
  </MemoryRouter>);
  expect(char.getByText('larry')).toBeInTheDocument();
  fireEvent.click(char.getByText('larry'));
  expect(char.getByText('larry')).toBeInTheDocument();
  expect(char.getByText('test birthday2')).toBeInTheDocument();
  expect(char.getByText('test description2')).toBeInTheDocument();
  expect(char.getByText('test info2')).toBeInTheDocument();
  expect(char.getByText('test story2')).toBeInTheDocument();
})

it('should be able to flip to the next character',()=>{
const char = render(<MemoryRouter>
<CharacterBook bookId={bookId} username='testUser'/>
  </MemoryRouter>);

  const nextPg=char.getElementsByClassName('CharacterBook_Next');
  fireEvent.click(nextPg);
  expect(char.getByText('nick')).toBeInTheDocument();
  expect(char.getByText('test birthday')).toBeInTheDocument();
  expect(char.getByText('test description')).toBeInTheDocument();
  expect(char.getByText('test info')).toBeInTheDocument();
  expect(char.getByText('test story')).toBeInTheDocument();
})

it('should go back to the list of characters when there are no more to flip to',()=>{
const char = render(<MemoryRouter>
<CharacterBook bookId={bookId} username='testUser'/>
  </MemoryRouter>);

//go foward to the next char
  const nextPg=char.getElementsByClassName('CharacterBook_Next');
  fireEvent.click(nextPg);
  expect(char.getByText('test birthday')).toBeInTheDocument();

  //go foward to the next char
  fireEvent.click(nextPg);
    expect(char.getByText('test birthday2')).toBeInTheDocument();

  // loop to the chars list, there are no more chars to flip to
  fireEvent.click(nextPg);

  expect(char.getByText('nick')).toBeInTheDocument();
  expect(char.getByText('nick2')).toBeInTheDocument();
  expect(char.getByText('test birthday')).not.toBeInTheDocument();
  expect(char.getByText('test description')).not.toBeInTheDocument();
  expect(char.getByText('test info')).not.toBeInTheDocument();
  expect(char.getByText('test story')).not.toBeInTheDocument();

//should not change if you try to go back from the list of chars
  const backPg=char.getElementsByClassName('CharacterBook_Next');
  fireEvent.click(backPg);

  expect(char.getByText('nick')).toBeInTheDocument();
  expect(char.getByText('larry')).toBeInTheDocument();
  expect(char.getByText('test birthday')).not.toBeInTheDocument();
  expect(char.getByText('test description')).not.toBeInTheDocument();
  expect(char.getByText('test info')).not.toBeInTheDocument();
  expect(char.getByText('test story')).not.toBeInTheDocument();

})


it('should be able to add a character',()=>{
const char = render(<MemoryRouter>
<CharacterBook bookId={bookId} username='testUser'/>
  </MemoryRouter>);


  fireEvent.click(char.queryByText("New character"));

  fireEvent.change(char.getByLabelText("Name"), {
    target: { value: "add name" },
  });
  fireEvent.change(char.getByLabelText("Description"), {
    target: { value: "add description" },
  });
  fireEvent.change(char.getByLabelText("Birthday"), {
    target: { value: "add birthday" },
  });
  fireEvent.change(char.getByLabelText("Extra info"), {
    target: { value: "add extra info" },
  });
  fireEvent.change(char.getByLabelText("Backstory"), {
    target: { value: "add backstory" },
  });

fireEvent.click(char.queryByText("Add Character"));

expect(char.getByText('add name')).toBeInTheDocument();



})

it('should be able to delete a character',()=>{
const char = render(<MemoryRouter>
<CharacterBook bookId={bookId} username='testUser'/>
  </MemoryRouter>);
  //go to character nick
    expect(char.getByText('nick')).toBeInTheDocument();
    fireEvent.click(char.getByText('nick'));
    expect(char.getByText('nick')).toBeInTheDocument();
    expect(char.getByText('test birthday')).toBeInTheDocument();
    expect(char.getByText('test description')).toBeInTheDocument();
    expect(char.getByText('test info')).toBeInTheDocument();
    expect(char.getByText('test story')).toBeInTheDocument();

  fireEvent.click(char.queryByText("Delete character"));

expect(char.getByText('larry')).toBeInTheDocument();
  expect(char.getByText('nick')).not.toBeInTheDocument();
})

it('should be able to edit a character',()=>{
const char = render(<MemoryRouter>
<CharacterBook bookId={bookId} username='testUser'/>
  </MemoryRouter>);

//go to character larry
  expect(char.getByText('larry')).toBeInTheDocument();
  fireEvent.click(char.getByText('larry'));
  expect(char.getByText('larry')).toBeInTheDocument();
  expect(char.getByText('test birthday2')).toBeInTheDocument();
  expect(char.getByText('test description2')).toBeInTheDocument();
  expect(char.getByText('test info2')).toBeInTheDocument();
  expect(char.getByText('test story2')).toBeInTheDocument();

//edit char

  fireEvent.click(char.queryByText("Edit character"));

  fireEvent.change(char.getByLabelText("Name"), {
    target: { value: "edit name" },
  });
  fireEvent.change(char.getByLabelText("Description"), {
    target: { value: "edit description" },
  });
  fireEvent.change(char.getByLabelText("Birthday"), {
    target: { value: "edit birthday" },
  });
  fireEvent.change(char.getByLabelText("Extra info"), {
    target: { value: "edit extra info" },
  });
  fireEvent.change(char.getByLabelText("Backstory"), {
    target: { value: "edit backstory" },
  });

fireEvent.click(char.queryByText("Edit Character"));

//char should be edited
expect(char.getByText('edit name')).toBeInTheDocument();
expect(char.getByText('edit birthday')).toBeInTheDocument();
expect(char.getByText('edit description')).toBeInTheDocument();
expect(char.getByText('edit extra info')).toBeInTheDocument();
expect(char.getByText('edit backstory')).toBeInTheDocument();
})


afterAll(async()=>{
 await axios.post('/users/testUser/delete');
})
