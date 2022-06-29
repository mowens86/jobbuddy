/**
 * Notes
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor
 * 
 */

// Create class extending the Error
class CustomAPIError extends Error {
    constructor(message) {
        // Here, it calls the parent class' constructor with the message
        super(message);
        // NOTE: In derived classes, `super()` must be called before you can use `this`. Leaving this out will cause a ReferenceError.
    }
}

export default CustomAPIError;