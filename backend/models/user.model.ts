import { IUser } from "../interfaces/user.interface";
import { model, Schema } from "mongoose";
import mongoose from "mongoose"
import bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema({
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

UserSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Invalid Email');
    try {
        const user = await this.findOne({ email });
        if (user) return false;

        return true;
    } catch (error: any) {
        console.log('error inside isThisEmailInUse method', error.message);
        return false;
    }
};

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();
        })
    }
});

UserSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('password missing');

    try {
        const result = await bcrypt.compare(password, this.password)
        return result;
    } catch (error: any) {
        console.log(error.message)
    }
}
// UserSchema.pre(/^find/, function () {
//     this.populate('skills');
// });

// UserSchema.post(/^save/, function () {
//     this.populate('skills');
// })
export default model<IUser>("User", UserSchema);