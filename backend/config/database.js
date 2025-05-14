const mongoose=require('mongoose');

const createDatabase=()=>{
    mongoose.connect(process.env.CONNECTION_STRING).then((con)=>{
        console.log(`Database Connected At ${con.connection.host}`)
    })
}
module.exports=createDatabase