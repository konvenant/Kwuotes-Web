import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    favoriteColor: {
      type: String,
    },
  },
  { timestamps: true }
);

const categorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    quoteCount: { type: Number, required: true },
    dateAdded: { type: String },
    dateModified: { type: String },
    username: {
      type: String,
    },
  }
);



const myQuoteSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    authorSlug: { type: String, required: true },
    authorId: { type: String, required: true },
    tags: { type: [String], required: true },
    length: { type: Number, required: true },
    dateAdded: { type: String },
    dateModified: { type: String },
    username: {
      type: String,
    },
  }
);

const favQuoteSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    authorSlug: { type: String, required: true },
    authorId: { type: String, required: true },
    tags: { type: [String], required: true },
    length: { type: Number, required: true },
    dateAdded: { type: String },
    dateModified: { type: String },
    username: {
      type: String,
    },
  }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export const MyQuote = mongoose.models.MyQuote || mongoose.model('MyQuote', myQuoteSchema);
export const FavQuote = mongoose.models.FavQuote || mongoose.model('FavQuote', favQuoteSchema);
