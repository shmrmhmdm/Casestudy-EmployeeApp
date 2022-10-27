const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Employee_Details=new Schema({
    name:String,
    position:String,
    location:String,
    salary:Number

})
const EmployeeData  = mongoose.model('employ',Employee_Details)
module.exports=EmployeeData;