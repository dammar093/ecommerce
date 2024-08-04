const jwt = require("jsonwebtoken");
const config = require("../config/config");
const ApiError = require("./ApiError");


function generateJwtToken(userId){
  try {
    const token = jwt.sign({sub:userId},config.jwtSecret,{
      expiresIn:'7d'
    });

    return token;
  } catch (error) {
    throw new ApiError(500,"Error while generate token")
  } 
}

module.exports = generateJwtToken