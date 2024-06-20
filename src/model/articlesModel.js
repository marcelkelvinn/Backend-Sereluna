const mongoose = require('mongoose');

const articleslSchema = mongoose.Schema(
    {
        condition:{
            type : String,
            required : [true, "condition"]

        },
        body:{
            type : String,
            required : [true, "please articles"]
        },
    },
    {
        timestamps:true
    }
);

const Articles = mongoose.model('Articles',articleslSchema);

module.exports = Articles;