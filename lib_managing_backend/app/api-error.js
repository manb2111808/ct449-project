//custome built extension from Error 
class ApiError extends Error {
    constructor (statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ApiError;