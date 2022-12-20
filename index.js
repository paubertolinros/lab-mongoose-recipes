const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const dataRecipe = require('./dataRecipe');
mongoose.set('strictQuery', true);
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    //return Recipe.create({ title: "Roast beef with caramelised onion gravy", level: 'Easy Peasy', ingredients: "1 tbsp black peppercorn, 1 tbsp English mustard powder,1 tbsp dried thyme, 1 tsp celery seeds, 1 tbsp olive oil, about 2kg/4lb 8oz topside joint of beef ", cuisine: "english", dishType: "main-course", image: "https://www.barkerbutchers.co.uk/wp-content/uploads/2019/09/traditional-roast-beef-caramelised-onion-gravy-3.jpg", duration: 90, creator: "Sara Cook", created: '2020-12-03' })
    return Recipe.create(dataRecipe)
  })
  .then(recipes => console.log(recipes.title))
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(recipes => recipes.forEach((title) => console.log(title.title)))
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, {new: true})
  })
  .then(x => console.log("It's been updated!"))
   .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then(x => console.log("It's been deleted!"))
  .then(() => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
