const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecipeSchema = new Schema({
    title: {
        type: String,
        require: [true, 'Insert recipe title']
    },
    description: {
        type: String,
        require: [true, 'Insert recipe description']
    },
    course: {
        type: [String], 
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Side Dish', 'Dessert'],
    },
    avg_rating: {
        type: Number,
        default: 0,
    },
    serving_sizes: {
        type: Number,
        default: 1,
    },
    cuisine: {
        type: String,
        enum: ['American', 'Chinese', 'French', 'Japanese', 'Korean', 'Mexican', 'Singaporean'],
    },
    instructions: [
        {
            step: {
                type: [String],
            // require: [true, 'Insert cooking instructions'],
            }            
        }
    ],
    notes: {
        type: String,
        default: '',
    },
    ingredients: [
        {
            name: {
                type: String,
                require: [true, 'Insert ingredient name']
            },
            measurement: Number,
            unit: {
                type: String,
                enum: ['cup', 'oz', 'tbsp', 'tsp', 'mL', 'L', 'g'],
            }
        }
    ],
    keywords: [
        {
            keyword: {
                type: String
            }
        }
    ]
    // ratings: [
    //     {
    //         message: String,
    //         date_created: {
    //             type: Date,
    //             default: Date.now(),
    //         },
    //         star_rating: {
    //             type: Number,
    //             min: 1,
    //             max: 5,
    //             require: [true, 'Insert rating from 1 - 5 stars'],
    //         }
    //     }
    // ]
});

module.exports = mongoose.model('RecipeSchema', RecipeSchema);
