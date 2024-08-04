const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fullName : {
      type:String,
      require:true
    },
    email:{
      type:String,
      unique:true,
      require:true
    },
    username:{
      type:String,
      unique:true,
      require:true
    },
    password:{
      type:String,
      require:true
    },
    avatar:{
      type:String, // comming url from cloudinary
      require:true
    },
    avatarId:{
      type:String
    },
    role:{
      type:String,
      default:"user"
    }
  },
  {
    timestamps:true
  }
);
const User = mongoose.model("User",userSchema);
module.exports = User;