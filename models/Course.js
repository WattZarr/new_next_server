const mongoose = require('mongoose')
const schema = mongoose.Schema;

const courseSchema = new schema({
    title : {
        type : String,
        required :true
    },
    price :{
        type : Number,
        required : true
    },
    duration:{
        type : String,
        required : true
    },
    level:{
        type : String,
        required : true
    },
    image:{
        type: String,
        required : true
    }
})

module.exports = mongoose.model('Course',courseSchema);