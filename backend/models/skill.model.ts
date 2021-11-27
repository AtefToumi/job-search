const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const SkillSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    skillLevel: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    }
}, {
    timestamps: true
})

export default mongoose.model("skill", SkillSchema);