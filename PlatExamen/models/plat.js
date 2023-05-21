const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Plat = new
    Schema(
        {
            plat_name: String,
            price: Number,
            nbre_ingredients: Number,
            description: String,
            plat_image: String
        }
    );
module.exports = mongoose.model("plat", Plat);