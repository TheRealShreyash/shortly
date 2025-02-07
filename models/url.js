import { Schema, model } from "mongoose";

const urlSchema = new Schema({
  url: { type: String, required: true },
  code: { type: String, unique: true, required: true },
});

export const Url = model("Url", urlSchema);
