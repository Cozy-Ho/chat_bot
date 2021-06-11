import mongoose from "mongoose";
const { Schema } = mongoose;

export const memorySchema = new Schema({
  id: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: false
  },
  value: {
    type: String,
    required: false
  },
  date: {
    type: Number,
    required: false
  }
});
