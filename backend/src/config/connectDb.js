const mongoose = require("mongoose");
const config = require("./config");

// fucntion for connecct database

const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${config.dbUrl}/${config.databaseName}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

module.exports = dbConnect;