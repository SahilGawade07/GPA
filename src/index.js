import dotenv from "dotenv";

import connectDB from './db/index.js';
dotenv.config({
    path: './env'
})


connectDB()

.then(() => {
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch(err => {
    console.log("mongoDB connection Error: ",err)
})

/*
import express from 'express';

(async () => {
try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${ DB_NAME}`);
    application.on("error", (error)=> {
        console.log("Error: ", error);
        throw error
    })

    app.listen(process.env.PORT,() => {
        console.log((`App Listening on port ${process.env.PORT}`));
        
    })
}catch(error){
    console.log("ERROR: ", error);
    throw err
}
})()
*/