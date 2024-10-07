const dbConnect = require("./src/config/connectDb");
const app = require("./app");

// call the function to connect db
dbConnect().then(() => {
  app.listen(8000, () => {
    console.log("server is ruuning on port 8000");
  })
}).catch((err) => {
  console.log("MONGO db connection failed !!! ", err);
});




