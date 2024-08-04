class ApiError extends Error{
  constructor(
    statusCode,
    message="Soemthing went wrong!",
    erros=[],
    stack=""
  ){
    super(message)
    this.statusCode= statusCode
    this.message=message
    console.log(message);
    this.erros= erros
      if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
  }
};
module.exports = ApiError;