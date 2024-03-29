const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, 'enter valid title']
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    description: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: false
    },
    requirements: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Internship'],
        required: true,
    },
    salary: {
        type: Number,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
    // status: {

    // }

},
    {
        timestamps: true
    })

export default mongoose.model("offer", OfferSchema);