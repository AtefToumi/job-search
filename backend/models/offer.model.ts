const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, 'enter valid title']
    },
    Company: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Contact: {
        type: String,
        required: false
    },
    Requirements: {
        type: String,
        required: true,
    },
    Type: {
        type: String,
        enum: ['Full-time','Part-time','Internship'],
        required: true,
    },
    Salary: {
        type: Number,
        required: false,
    },
    Location: {
        type: String,
        required: true,
    },
    Status: {
        
    }

})

export default mongoose.model("offer", OfferSchema);