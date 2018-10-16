const mongoose = require("mongoose");

mongoose.model("Customer",{
    //title, author, numberofpages, publisher
    name:{
        type: String,
        require: true
    },  
    age:{
        type: Number,
        require: true
    },    
    address:{
        type: String,
        require: true
    }    
});