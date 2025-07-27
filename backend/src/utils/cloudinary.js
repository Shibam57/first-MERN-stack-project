require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require('fs');


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        console.log("Uploading to Cloudinary:", localFilePath);

        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            folder: "avatars",
            resource_type: "auto"
        });

        console.log(" Upload successful:", uploadResult);
        fs.unlinkSync(localFilePath);
        return uploadResult;
    } catch (error) {
        console.error(" Upload failed:", error.message);
        fs.unlinkSync(localFilePath); 
        return null;
    }
};

module.exports = uploadOnCloudinary;