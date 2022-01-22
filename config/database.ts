// DB CONNECTION
import mongoose from 'mongoose'

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((error) => {
      console.log('Database connection failed !');
      console.error(error);
      process.exit(1);
    });
};
