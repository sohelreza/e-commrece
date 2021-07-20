const dotenv=require('dotenv')
dotenv.config()
const mongoose=require('mongoose')
// const config=require('config')
// const dbString=config.get('mongoURI')

async function connectDB(){
    try {
        const conn = await mongoose.connect(process.env.MONGO_STRING)
        console.log(`Mongodb connected:${conn.connection.host}`)
    } catch (err) {
        console.log('DB Error: ',err.message)
        process.exit(1)
    }
} 

module.exports=connectDB