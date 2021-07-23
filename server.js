require("dotenv").config({ path: __dirname + "/.env" })
const express = require("express");
const cors = require("cors");
const app = express();
const initIngredientsAPI = require('./apis/ingredients');
const initRecipesAPI = require('./apis/recipes');

app.use(cors());

// Ingredients
initIngredientsAPI(app);

// Recipes
initRecipesAPI(app);

app.listen(process.env.PORT || 8080);
