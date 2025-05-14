const mongoose=require('mongoose');

const createDatabase=()=>{
    mongoose.connect('mongodb+srv://nantha:dellvostro123@myappcluster.2yz21jf.mongodb.net/?retryWrites=true&w=majority&appName=MyAppCluster').then((con)=>{
        console.log(`Database Connected At ${con.connection.host}`)
    })
}
module.exports=createDatabase
