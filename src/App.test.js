import { render, screen } from '@testing-library/react';
import App from './App';
import { render, fireEvent, waitForElementToBeRemoved,waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { server } from './mocks/server.js';
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());



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


it("should go to the right place", async() => {
  const app = render(<MemoryRouter>
    <App />
    </MemoryRouter>);

    expect(app.getByText('Loading …')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => app.queryByText('Loading …'));

  //go to the snacks menu
  const snacksMenu = app.getByText("Snacks");
  fireEvent.click(snacksMenu);

  //it should be on the snacks menu
  expect(app.queryByText("Here are all the snacks to choose from!")).toBeInTheDocument();

});


it("should show 404 page", async() => {
  const app = render(<MemoryRouter>
    <App />
    </MemoryRouter>);

    expect(app.getByText('Loading …')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => app.queryByText('Loading …'));

  //go to the snacks menu
  const snacksMenu = app.getByText("Snacks");
  fireEvent.click(snacksMenu);

  //it should be on the snacks menu
  expect(app.queryByText("Here are all the snacks to choose from!")).toBeInTheDocument();

});
