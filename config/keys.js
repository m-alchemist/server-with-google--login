//keys js
//check if in production mode or development
if (process.env.NODE_ENV=='production'){
  //we are in production
  module.exports=require('./prod');
}
else{
  //in development
module.exports=require('./dev');
}
