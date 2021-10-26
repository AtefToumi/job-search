const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const EducationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    endDate: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    location: {
        type: String,
        required: true,
    }
})

export default mongoose.model("education", EducationSchema);