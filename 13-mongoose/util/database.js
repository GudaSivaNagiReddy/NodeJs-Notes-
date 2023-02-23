const mongodb= require('mongodb');

const MongoClient = mongodb.MongoClient;

 const mongoConnect= (callback)=>{
  MongoClient.connect('mongodb+srv://gudasiva_reddy:Siva123@atlascluster.czmbklp.mongodb.net/?retryWrites=true&w=majority'
  ,{ useUnifiedTopology: true } )
      .then(result=>{
        console.log(result);
        callback(result);
      })
      .catch(error =>{
        console.log(error);
      });

 };
module.exports= mongoConnect;
