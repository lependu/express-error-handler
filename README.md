Experimental error handler for express.js projects.

### Usage
`$npm install [--save]`

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
