const mongoose = require('mongoose')



const UserSchema = new mongoose.Schema({
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
    photo: {
        type: String
    },
    education: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'education'
        }
    ],
    experience: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'experience'
        }
    ],
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'skill'
        }
    ]




});

// UserSchema.pre(/^find/, function () {
//     this.populate('skills');
// });

// UserSchema.post(/^save/, function () {
//     this.populate('skills');
// })


export default mongoose.model("user", UserSchema);