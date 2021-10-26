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
        ref: 'User'
    },
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    },
    status: {
        type: String,
        enum: ['Waiting for reviewing', 'Reviewing', 'Rejected', 'Accepted']
    }
})

export default mongoose.model("application", ApplicationSchema);