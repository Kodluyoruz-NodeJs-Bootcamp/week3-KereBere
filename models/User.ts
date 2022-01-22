import mongoose from "mongoose";
const Schema = mongoose.Schema;
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    username: {
      type: String,
      required: true,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter an email'],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimun password length is 6 characters'],
    },
  }, 
);

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
 

const User = mongoose.model("User", UserSchema);
export default User;
