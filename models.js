const mongoose = require('mongoose')

const DogScheme = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    }, 
    age:{
        type: Number, 
        required: true
    }, 
    breed:{
        type: String,
        required: true
    }, 
    isGoodBoy:{
        type: Boolean, 
        requird: false, 
        default: true
    }
})

const Dog = mongoose.model("Dog", DogScheme)

module.exports = {Dog};