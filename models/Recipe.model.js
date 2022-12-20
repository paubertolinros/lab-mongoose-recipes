const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const { Schema } = mongoose;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: String,
  level: {
    enum: {
        values: ['Easy Peasy', 'Amateur Chef' , 'UltraPro Chef'],
        message: 'That is not an accepted level. Try another one.'
      },
    type: String
  },
  ingredients: [String],
  cuisine: {
    type: String,
    required: [true, 'Cuisine is mandatory. Please add cuisine.']
  },
  dishType: {
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now()
  } 
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
