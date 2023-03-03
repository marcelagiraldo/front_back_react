const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const superheroSchema = new Schema({
    superhero : {type:String, require:true},
    universe: {type:String, require:true},
    superpowers: [String],
    creators : [String],
    address: {
        street:String,
        city:String,
        state:String,
        country:String
    }
});
module.exports = mongoose.model("SuperheroCollection", superheroSchema);
