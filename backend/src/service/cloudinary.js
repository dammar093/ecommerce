const { v2 } = require("cloudinary");
const fs = require("fs");


const config = require("../config/config");
const { error } = require("console");
v2.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.coudinaryApiSecretKey
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // console.log(response);
        // file has been uploaded successfull
        // console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.error("Upload Error: ", error);
        fs.unlinkSync(localFilePath)
        return null;
    }
}

module.exports = uploadOnCloudinary;