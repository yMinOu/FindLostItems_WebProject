const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String,
        maxlength:50,
    },
    description: {
        type: String,
    },
    // price :{
    //     type: Number,
    // },
    // privacy: {
    //     type: Number,
    // },
    filePath : {
        type: String,
    },
    views : {
        type: Number,
        default: 0 
    },
    category :{
        type: String
    }
}, { timestamps: true })


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }