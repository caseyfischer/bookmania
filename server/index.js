import express from 'express';
import bodyParser from 'body-parser';
import router from './router.js';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api/', router);

app.listen(8080, (req, res) => {
    console.log("connected!");
});

// await client.connect()
 
// const res = await client.query('SELECT * FROM users')
// console.log(res.rows[0])
// await client.end()
