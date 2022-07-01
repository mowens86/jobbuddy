import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
/**
 * Notes
 * 1. Can only set-up with email by using indexing to make sure only unique emails are accepted, validator will be set-up separately
 * 2. https://mongoosejs.com/docs/middleware.html pre section for more info. Basically, let's us do something before anything is instantiated.
 * 3. Generate salt function first then hash the password and salt function. Both are async and creates extra characters. 10 is solid. The more characters the more secure, however it takes longer.
 * 4. Custom Instance Methods: https://mongoosejs.com/docs/guide.html#methods
 * 5. JWT json web tokens https://www.npmjs.com/package/jsonwebtoken
 * 6. Create secret and lifetime in .env file and use https://www.allkeysgenerator.com/ to create an Encryption key for 256-bit
 */

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please provide name'],
        minlength:3,
        maxlength:20,
        trim:true,
    },
    email: { 
        type: String, 
        required: [true, 'Please provide email'],
        validate: {
            validator:validator.isEmail,
            message: 'Please provide a valid email'
        },
/*1*/    unique:true, 
    },
    password: { 
        type: String, 
        required: [true, 'Please provide password'], 
        minlength:6,
        select: false,
        // trim:true,

    },
    lastName: { 
        type: String,
        trim:true,
        maxlength:20,
        default: 'lastName',
    },
    location: { 
        type: String,
        trim:true,
        maxlength:20,
        default: 'my city',
    },   
})

/*2*/ UserSchema.pre('save', async function() {
    /*3*/const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
})

/*4*/UserSchema.methods.createJWT = function () {
    // console.log(this);
    /*5*/return jwt.sign
        ( 
            { userId: this._id}, 
        /*6*/process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_LIFETIME } 
        );
}

export default mongoose.model('User', UserSchema)