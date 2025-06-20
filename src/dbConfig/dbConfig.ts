import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;

        connection.on('connected',()=>{
            console.log('MongoDb Connected Succesfully');
        })
          
        connection.on('error',(err)=>{
              console.log('MongoDb Connected error'+ err );
              process.exit();
        })

        
    } catch (error) {
        console.log('something went wrong');
        console.log(error);
    }
}