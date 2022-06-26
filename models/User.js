import mongoose from "mongoose";
import validator from "validator";

// Notes

//1 Can only set-up with email by using indexing to make sure only unique emails are accepted, validator will be set-up separately

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
        unique:true, //1 
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

export default mongoose.model('User', UserSchema)