import {render,fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Book from '../books/Book';
import '@testing-library/jest-dom/extend-expect';

import { server } from './mocks/server.js';
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


it('should renders without crashing',()=>{
  render(<MemoryRouter>
    <Book areReading={true} bookId={200}/>
  </MemoryRouter>);
})

it('should match snapshot',()=>{
const {asFragment} = render(<MemoryRouter>
<Book areReading={true} bookId={200}/>
  </MemoryRouter>);
expect(asFragment()).toMatchSnapshot();
})


it('should show the book text',()=>{
const book = render(<MemoryRouter>
<Book areReading={true} bookId={200}/>
  </MemoryRouter>);
  expect(book.getByText('pg1 test')).toBeInTheDocument();
  expect(book.getByText('pg2 test')).toBeInTheDocument();
})

it('should flip to the next page and the previous page',()=>{
const  book  = render(<MemoryRouter>
<Book areReading={true} bookId={200}/>
  </MemoryRouter>);

const nextPg=book.getElementsByClassName('ChangePageNext');
const prevPg=book.getElementsByClassName('ChangePageBack');

fireEvent.click(nextPg);

  expect(book.getByText('pg3 test')).toBeInTheDocument();
  expect(book.getByText('pg4 test')).toBeInTheDocument();

fireEvent.click(prevPg);

  expect(book.getByText('pg1 test')).toBeInTheDocument();
  expect(book.getByText('pg2 test')).toBeInTheDocument();
})


it('should not let you flip to the previous page if there are no previous pages',()=>{
const  book  = render(<MemoryRouter>
<Book areReading={true} bookId={200}/>
  </MemoryRouter>);

  const prevPg=book.getElementsByClassName('ChangePageBack');
  fireEvent.click(prevPg);

  expect(book.getByText('pg1 test')).toBeInTheDocument();
  expect(book.getByText('pg2 test')).toBeInTheDocument();
})

it('should add pages if there are no next pages, if writing',()=>{
const  book  = render(<MemoryRouter>
<Book areReading={true} bookId={200}/>
  </MemoryRouter>);
const nextPg=book.getElementsByClassName('ChangePageNext');
fireEvent.click(nextPg);
fireEvent.click(nextPg);
expect(page.getElementsByClassName('InputPage_text')).toBeInTheDocument();
})
