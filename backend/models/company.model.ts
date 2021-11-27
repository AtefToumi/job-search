const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    logo: {

    }
}, {
    timestamps: true
})

export default mongoose.model("company", CompanySchema);