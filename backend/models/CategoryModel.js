import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Category schema with only a single 'name' field
const categorySchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
});

export const Category = model('Category', categorySchema);
export default Category;
