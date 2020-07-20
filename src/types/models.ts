import { DifficultyLevel } from './enums';
import { Document } from 'mongoose';

export interface Answer extends Document {
  answer: string;
  correct: boolean;
  question: string;
}

export interface Question extends Document {
  question: string;
  difficultyLevel: DifficultyLevel;
  category: string;
  answers: Answer[];
}