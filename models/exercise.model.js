const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const exerciseSchema = new Schema ({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    _id: {type:String, required: true}
})

const Exercise =  mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise
