import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from "react-router-dom";


it("should renders without crashing", () => {
  render(<MemoryRouter>
    <App />
    </MemoryRouter>
  );
});

it("should match snapshot", () => {
  const { asFragment } = render(<MemoryRouter>
    <App />
    </MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});
