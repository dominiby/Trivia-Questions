import mongoose from 'mongoose';
import { DifficultyLevel } from "../../types/enums";
import { Question } from "../../types/models";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: [DifficultyLevel.Easy, DifficultyLevel.Medium, DifficultyLevel.Hard]
    },
    answers : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
      }
    ]
  },
  { timestamps: true },
);

const Question = mongoose.model<Question>('Question', questionSchema);

export default Question;