import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema(
{
    name: {
        type: String, 
        required: true,
        minlength: [2, "Must be at least 2 characters long"],
        maxlength: [50, "Must be no more than 50 characters long"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [6, "Must be at least 6 characters long"],
      maxlength: [30, "Must be no more than 30 characters long"],
      validate: {
        validator: (val) => !validator.contains(val, " "),
        message: "Must contain no spaces",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Must be valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Must be at least 8 characters long"],
    },
    biography: {
      type: String,
      default: "",
      maxLength: [250, "Must be at most 250 characters long"],
    },
    liked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PostMessage',
        }
    ],
    saved: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PostMessage',
        }
    ],
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);