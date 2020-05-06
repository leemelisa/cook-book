const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Recipe = new Recipe({
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
    total_rating: {
        type: Number,
        default: 0,
    },
    serving_size: {
        type: Number,
        default: 1,
    },
    cuisine: {
        type: String,
        enum: ['American', 'Chinese', 'Korean', 'Japanese', 'Mexican', 'Singaporean'],
    },
    instruction: {
        type: [String],
        require: [true, 'Insert cooking instructions'],
    },
    note: {
        type: String,
        default: '',
    },
    ingredient: [
        {
            name: {
                type: String,
                require: [true, 'Insert ingredient name']
            },
            measurement_num: Number,
            measurement_unit: {
                type: String,
                enum: ['cup', 'oz', 'tbsp', 'tsp', 'mL', 'L', 'g'],
            }
        }
    ],
    rating: [
        {
            user: String,
            message: String,
            date_created: {
                type: Date,
                default: Date.now(),
            },
            star_rating: {
                type: Number,
                min: 1,
                max: 5,
                require: [true, 'Insert rating from 1 - 5 stars'],
            }
        }
    ]
});

module.exports = mongoose.model('Recipe', Recipe);