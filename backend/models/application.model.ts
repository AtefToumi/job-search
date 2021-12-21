const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'offer'
    },
    status: {
        type: String,
        enum: ['Waiting for reviewing', 'Reviewing', 'Rejected', 'Accepted'],
        default: 'Waiting for reviewing'
    }
}, {
    timestamps: true
})

export default mongoose.model("application", ApplicationSchema);