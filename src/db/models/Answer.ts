import mongoose from 'mongoose';
import { Answer } from '../../types/models';
 
const answerSchema = new mongoose.Schema(
  {
    answer: {
      type: String,
      required: true,
    },
    correct: {
      type: Boolean,
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  },
  { timestamps: true },
);

const Answer = mongoose.model<Answer>('Answer', answerSchema);

export default Answer;