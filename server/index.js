import express from 'express';
import bodyParser from 'body-parser';
import user from './routes/user-routes.js';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/users/', user);

app.listen(8080, (req, res) => {
    console.log("connected!");
});

// await client.connect()
 
// const res = await client.query('SELECT * FROM users')
// console.log(res.rows[0])
// await client.end()
