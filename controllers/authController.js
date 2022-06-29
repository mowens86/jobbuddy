import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js'

/**
 * Notes
 * 1. The word “async” before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.
 * 2. The next parameter helps with displaying a better error for debugging in the try/catch statement
 * 3. Try/catch set-up is a manual way to test things but installing the npm package express-async-errors helps mitigate the redundant usage of this in controllers
 * 4. Important Note: Already have express.json inside of server.js
 * 5. The keyword await makes JavaScript wait until that promise settles and returns its result.
 * 6. Deconstruct req.body to pull the name, email, and password out
 * 7. If there is no name OR email OR pw then throw the new error
 * 
 */

const register = /*1*/async (req, res/*2, next*/) => {

    // res.send('register user') /*Postman tester*/

    // /*3*/ try { 
    // /*4 & 5*/ const user = await User.create(req.body) 
    //     res.status(201).json({user})
    // } catch (error) {
    //     next(error)
    // }

    /*6*/const { name, email, password } = req.body;
    
    /*7*/if ( !name || !email || !password ) {
        throw new BadRequestError('Please provide all values');
    }

    const userAlreadyExists = await User.findOne({email});
    if (userAlreadyExists) {
        throw new BadRequestError('Email already exists.');
    }

    const user = await User.create({ name, email, password});
    res.status(StatusCodes.CREATED).json({ user });
}
const login = (req, res) => {
    // res.send('login user') /*Postman tester*/
}
const updateUser = (req, res) => {
    // res.send('updateUser') /*Postman tester*/
}

export { register, login, updateUser }