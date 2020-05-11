const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FavoriteSchema = new Schema({
    recipe_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
