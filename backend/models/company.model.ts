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
})

export default mongoose.model("company", CompanySchema);