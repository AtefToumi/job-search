import { IUser } from "../interfaces/user.interface";
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        // required: [true, 'an email is required'],
        unique: true,
        validate: {
            validator: function (v: any) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    // username: {type: String, required: true},
    password: { type: String, required: false },

    name: {
        type: String,
        minLength: [3, 'enter valid name']
    },
    dateOfBirth: {
        type: Date,
        trim: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        trim: true
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
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
},
    {
        timestamps: true
    }
);

// UserSchema.pre(/^find/, function () {
//     this.populate('skills');
// });

// UserSchema.post(/^save/, function () {
//     this.populate('skills');
// })
export default mongoose.model("user", UserSchema);