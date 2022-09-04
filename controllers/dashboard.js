const Recipe = require('../models/Recipe')
const User = require('../models/User')

module.exports = {
    getRecipes: async (req, res) => {
        try{
            if (req.user) {
                const recipes = await Recipe.find({userId: req.user.id})
                res.render('dashboard.ejs', {recipes: recipes, user: req.user})
            } else {
                res.render('dashboard.ejs', {user: null})
            }
        } catch(err) {
            console.log(err)
        }
    },
    getRecipe: async (req, res) => {
        console.log(req.params.recipeId)
        const recipe = await Recipe.findById(req.params.recipeId)
        console.log(recipe)
        res.render('recipe.ejs', {user: req.user, recipe: recipe})
    },
    createRecipe: async (req, res) => {
        try {
            await Recipe.create({
                title: req.body.title,
                description: req.body.description || '',
                instructions: req.body.instructions, 
                ingredients:req.body.ingredients, 
                userId: req.user.id
            })
            console.log('Recipe has been added!')
            res.redirect('/dashboard')
        } catch(err) {
            console.log(err)
        }
    },
    modifyRecipe: async (req, res) => {
        try {
            await Recipe.findOneAndUpdate({_id:req.body.recipeId}, {
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        } catch(err) {
            console.log(err)
        }
    },
    deleteRecipe: async (req, res) => {
        console.log(req.body.todoIdFromJSFile)
        try {
            await Recipe.findOneAndDelete({_id:req.body.recipeId})
            console.log('Deleted Recipe')
            res.json('Deleted It')
        } catch(err) {
            console.log(err)
        }
    }
}    