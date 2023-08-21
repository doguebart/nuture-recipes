const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Recipe = mongoose.model(
  "Recipe",
  new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      ingredients: [
        {
          name: { type: String, required: true },
          qty: { type: Number, required: true },
          unit: { type: String },
        },
      ],
      preparationMode: [
        {
          stepNumber: { type: Number, required: true },
          stepDescription: { type: String, required: true },
        },
      ],
      level: { type: String, required: true },
      preparationTime: { type: String, required: true },
      image: { type: String, required: true },
      user: Object,
    },
    { timestamps: true }
  )
);

module.exports = Recipe;
