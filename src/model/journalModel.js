const mongoose = require('mongoose');

const journalSchema = mongoose.Schema(
    {
        text:{
            type : String,
            required : [true, "please provide the journal"]
        }, 
        feeling:{
            type : String
        },
        suggestion:{
            type : String
        },
    },
    {
        timestamps:true
    }
);

const Journal = mongoose.model('Journal',journalSchema);

module.exports = Journal;