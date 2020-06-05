var express = require("express");
var recipeRouter = express.Router();
var RecipeSchema = require('../recipe.model');

// GET all recipes from the database
recipeRouter.get("/getAllRecipe", (req, res, next) => {
    RecipeSchema.find(function(err, recipe) {
        if (err) {
            console.log(err);
        } else {
            res.json(recipe);
        }
    });
});

// GET filtered recipes from database
recipeRouter.get("/getRecipe", (req, res, next) =>  { 
    let filterQuery = {};

    for (let prop in req.query) {
        if (prop == 'keywords') {
            filterQuery['keywords.keyword'] = req.query[prop];
        } else {
            filterQuery[prop] = req.query[prop];
        }
    }
    
    let query = RecipeSchema.find(filterQuery);

    query.exec(function(err, recipe) {
        if (err) {
            console.log(err);
        } else {
            res.json(recipe);
        }
    })
});

// POST a new recipe 
recipeRouter.post("/", (req, res, next) => {
    console.log(req.body);
    let recipe = new RecipeSchema(req.body);
    
    recipe.save()
        .then(recipe => {
            res.status(200).json({'recipe': 'recipe added successfully'});
        })
        .catch(err => {
            console.log('Error: ', error);
        });
});

module.exports = recipeRouter;