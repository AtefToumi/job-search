const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'an email is required'],
        unique: false,
        validate: {
            validator: function (v: any) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    name: {
        type: String,
        required: true,
        minLength: [3, 'enter valid name']
    },
    dateOfBirth: {
        type: Date,
        required: false,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
        trim: true
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false
    },
    photo:{
        type: String
    },
    education: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Education'
        }
    ],
    experience: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Experience'
        }
    ],
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill'
        }
    ]
        
    


});

export default mongoose.model("user", UserSchema);