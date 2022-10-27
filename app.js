// Task1: initiate app and run server at 3000
const express=require('express')
const app=express()
app.use(express.json());//*important 
app.use(express.urlencoded({extended:true}))

const EMPLOYEE_DATA=require('./model/employee');

const mongoose=require('mongoose')
const path=require('path');
const { findOne } = require('./model/employee');
const EmployeeData = require('./model/employee');
const { error } = require('console');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
mongoose.connect("mongodb+srv://shmrmhmd:shameer123@cluster0.8w6ktgs.mongodb.net/DBEmployee?retryWrites=true&w=majority")
.then(()=>{
    console.log('Mongo DB Connected Successfully')
})
.catch(error=>{
    console.log('connection error'+error)
})
//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',async(req,res)=>{
    EmployeeData.find().then((result)=>{
        res.send(result)
        
    }).catch((error)=>{
        console.log(error)
    })
    })
//TODO: get single data from db  using api '/api/employeelist/:id'

app.get("/api/employeelist/:id", async (req, res) => {
    try {
        const data = await EmployeeData.findById(req.params.id);
        console.log("data from get api with id or frontend= ", data);
        res.send(data);
    }
    catch (e) {
        console.log(`get single api error occured ${e}`);
    }
})
//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    try {
        let item=req.body
        console.log(item)
        const user=new EMPLOYEE_DATA(item)
        const savedUser= await user.save()
        console.log('saved Data:',savedUser);
        res.send(savedUser)

    } catch (error) {
        console.log(error)
    }

})
//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete("/api/employeelist/:id", async (req, res) => {
    try {
        const data = await EmployeeData.deleteOne({ "_id": req.params.id })
        console.log("data from delete api or frontend= ", data);//to view in terminal
        res.send(data);//to view in postaman
    }
    catch (e) {
        console.log(`delete error occured ${e}`);
    }
})
//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', async (req, res) => {

    try {
        const data = await EmployeeData.findByIdAndUpdate(
            {
                "_id": req.body._id,
            },
            {
                $set: {
                    "name": req.body.name,
                    "location": req.body.location,
                    "position": req.body.position,
                    "salary": req.body.salary
                }
            }
        );

        console.log("data from put api or frontend= ", data);
        res.send(data);
    }
    catch (e) {
        console.log(`update error occured ${e}`);
    }
})
//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000,()=>{
    console.log('PORT Connected at 3000')
})