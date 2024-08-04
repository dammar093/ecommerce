const mogoose = require("mongoose");

const categorySchema = new mogoose.Schema(
  {
    title:{
      type:String,
      required:true,
      unique:true
    },
    image:{
      type:String,
      required:true
    },
    imageId:{
      type:String
    }
  },
  {
    timestamps:true
  }
)

const Category = mogoose.model("Category",categorySchema);

module.exports = Category;