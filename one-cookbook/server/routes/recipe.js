var express = require("express");
var recipeRouter = express.Router();
var RecipeSchema = require('../recipe.model');

// GET all recipes from the database
recipeRouter.get("/get", (req, res, next) => {
    RecipeSchema.find(function(err, recipe) {
        if (err) {
            console.log(err);
        } else {
            res.json(recipe);
        }
    });
});

// POST a new recipe 
recipeRouter.post("/post", (req, res, next) => {
    let recipe = new RecipeSchema(req.body);
    console.log(req.body);
    recipe.save()
        .then(recipe => {
            res.status(200).json({'recipe': 'recipe added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new recipe failed');
        });
});

module.exports = recipeRouter;