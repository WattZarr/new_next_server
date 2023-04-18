const mongoose = require('mongoose');
const schema = mongoose.Schema;

const registerSchema = new schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        requried : true
    },
    education : {
        type : String,
        required : true
    },
    course : {
        type : String,
        required : true
    },
    transaction : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Register',registerSchema)