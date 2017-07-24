Experimental error handler for express.js projects.

### Usage
This project not published yet, so if you want to use, you need:
`$ npm i git+https://github.com/lependu/express-error-handler.git#0.1.1 [--save]`

```JSON
{
  dependencies: {
    "express-error-handler": "git+https
  }
}
```Javascript
import express from 'express';
import bodyParser from 'body-parser';
import { notFound, errorHandler } from 'express-error-handler';

// ...

const app = express();

const { json } = bodyParser;

app.use(json());

//  ...

// These two middlewares has to be the last ones.
app.use(notFound);
app.use(errorHandler);

app.listen(3000);

export default app;
```

### Tests
`$ npm run lint`

`$ npm run test`

`$ npm run coverage`
See the generated `coverage` directory.
