import { connectDb } from './connectDb';
import Question from './models/Question';
import Answer from './models/Answer';

const models = {
  Question,
  Answer,
}

export {
  connectDb,
}

export default models;