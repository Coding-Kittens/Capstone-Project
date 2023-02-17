// code from https://mswjs.io/docs/getting-started/integrate/node
//so that I can mock the API calls for my tests
import { setupServer } from 'msw/node';
import { handlers } from './handlers';


export const server = setupServer(...handlers);
