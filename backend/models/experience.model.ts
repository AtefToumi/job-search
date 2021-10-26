const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
    company: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
})

export default mongoose.model("experience", ExperienceSchema);