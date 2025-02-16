import {v2 as cloudinary} from "cloudinary"
import "dotenv/config"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_SECRET
})

const UploadOnCloudinary=async(localFile)=>{
    try {
        if (!localFile) return null;
        const response= await cloudinary.uploader.upload(localFile,{
            resource_type:"auto"
        })
        console.log("file uploaded successfully on cloudinary",response.url)
       
        return response 
        
    } catch (error) {
            console.log(error)
            fs.unlinkSync()
        
    }
}

export default UploadOnCloudinary