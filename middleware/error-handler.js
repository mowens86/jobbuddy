import { StatusCodes } from 'http-status-codes';

/**
 * Notes 
 * 1. If there is a validation error
 * 2. Make the error 500 code to default to 400
 * 3. For reference only
 * 4. The Object.values() method returns an array of a given object's own enumerable property values, in the same order as that provided by a for...in loop. (The only difference is that a for...in loop enumerates properties in the prototype chain as well.). The map creates an array and join concatenates the strings together.
 * 5. If the error code is 11000 (an email error)
 * 6. Make the error 500 code to default to 400
 * 7. Make error msg this...
 */

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err.message);
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later',
    }
    
    /*1*/if (err.name === 'ValidationError') {
        /*2*/defaultError.statusCode = StatusCodes.BAD_REQUEST;
        /*3*/ defaultError.msg = err.message;
        /*4*/defaultError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(', ');
    }
    // 
    /*5*/if ( err.code && err.code === 11000 ) {
        /*6*/defaultError.statusCode = StatusCodes.BAD_REQUEST;
        /*7*/defaultError.msg = `The ${Object.keys(err.keyValue)} field has to be unique.`;
    }
    // res.status(defaultError.statusCode).json({ msg: err })
    res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware;