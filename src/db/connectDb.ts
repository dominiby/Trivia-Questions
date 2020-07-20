import mongoose from 'mongoose';

export const connectDb = (dbUrl: string): Promise<typeof mongoose> => {
  return mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  });
}