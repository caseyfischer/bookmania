import express from 'express';
import bodyParser from 'body-parser';
import router from '~/router';
import { errorHandler } from '~/middleware/errors';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api/', router);
app.use(errorHandler);

app.listen(8080, () => {
    console.log("started!");
});
