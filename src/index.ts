import 'dotenv/config';
import express from 'express';
import db, { connectDb } from './db';
import bodyParser from 'body-parser';
import controllers from './controllers';

connectDb(process.env.DATABASE_URL as string);

// Create a new express app instance
const app: express.Application = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models: db,
  };
  next();
});

app.get('/', function (req, res) {
  res.send('Hello there!');
});

app.use('/questions', controllers.Questions);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}!`);
});

/* 
  localhost/questions -> 
    GET -> returns all questions 
    POST -> create a new question
    PUT/:id -> update existing question
    DELETE/:id -> delete a question
*/