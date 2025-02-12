const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required :true,
    },
    email :{
        type : String,
        required :true,
    },
    phoneNumber :{
      type : String,
      required :true, 
    },
    website : {
      type :String,
      required : true,
    },
    address : {
      type :String,
      required : true,
    },
    specialization :{
      type :String,
      required : true,
    },
    hospital :{
      type :String,
      required : true,
    },
    password:  {
        type : String,
        required :true ,
        
        },
},{
  timestamps:true
}
);
const userModel = mongoose.model('users',userSchema);
module.exports = userModel;



