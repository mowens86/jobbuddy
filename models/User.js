import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
/**
 * Notes
 * 1. Can only set-up with email by using indexing to make sure only unique emails are accepted, validator will be set-up separately
 * 2. https://mongoosejs.com/docs/middleware.html pre section for more info. Basically, let's us do something before
 * 3. Generate salt function first then hash the password and salt function. Both are async and creates extra characters. 10 is solid. The more characters the more secure, however it takes longer.
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
        trim:true,
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

export default mongoose.model('User', UserSchema)