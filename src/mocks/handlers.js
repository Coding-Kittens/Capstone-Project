// code from https://mswjs.io/docs/getting-started/mocks/rest-api
//so that I can mock the API calls for my tests
import { rest } from 'msw'

export const handlers = [
  rest.post('http://localhost:5000/snacks', async(req, res, ctx)=>{
    const data = await req.json();
    return res(ctx.status(201), ctx.json({id:3,...data}),);
  }),

  rest.delete('http://localhost:5000/snacks/*', (req, res, ctx)=>{
    return res(ctx.status(201),);
  }),

  rest.get('http://localhost:5000/snacks', (req, res, ctx)=>{
  return res(
    ctx.status(200),
    ctx.json([]),
     );
  }),

  rest.get('http://localhost:5000/drinks', (req, res, ctx)=>{
    return res(
      ctx.status(200),
      ctx.json([{
        id:2,
        name:'drink',
        description: 'drink  description',
        recipe: 'drink recipe',
        serve:  'serve drink',
         }]),
       );
  }),
]
