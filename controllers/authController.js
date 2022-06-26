import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

// Notes

//1 The word “async” before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.

//2 Important Note: Already have express.json inside of server.js

//3 The keyword await makes JavaScript wait until that promise settles and returns its result.

//4 Try/catch set-up is a manual way to test things but installing the npm package express-async-errors helps mitigate the redundant usage of this in controllers

//5 The next parameter helps with displaying a better error for debugging in the try/catch statement

const register = /*1*/async (req, res/*5, next*/) => {

    // res.send('register user') /*Postman tester*/

    // try { //4
    //     const user = await User.create(req.body) //2 & 3
    //     res.status(201).json({user})
    // } catch (error) {
    //     next(error)
    // }

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
}
const login = (req, res) => {
    // res.send('login user') /*Postman tester*/
}
const updateUser = (req, res) => {
    // res.send('updateUser') /*Postman tester*/
}

export { register, login, updateUser }