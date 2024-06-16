const express=require('express');

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/bharatintern');

const connection=mongoose.connection;
const app=express();

const port=3000;

app.use(express.urlencoded());

//money tracker js content starts here

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/pages/moneytracker.html');
});


//defining schema
const schema =mongoose.Schema;

const moneyschema=new schema({
        category: String,
        amount: Number,
        description: String,
        date: Date
});


//compiling schema to model

const moneymodel=mongoose.model('moneytrackers',moneyschema);

app.post('/moneytrackersend',(req,res)=>{
    data=req.body;
    try{
        const newmoney=new moneymodel({
            category: data.category,
            amount: data.amount,
            description: data.description,
            date: data.date
           })
           newmoney.save();
            res.sendFile(__dirname+'/pages/moneytracker.html');
    }
    catch{
        res.sendFile(__dirname+'/pages/error.html');
    }
});



//find req. js content starts here 
app.get('/find',(req,res)=>{
   
});


//find req. js content ends here

//money tracker js content ends here

app.listen(port,()=>{
    console.log('Server started for moneytracker on http://localhost:3000/');
});