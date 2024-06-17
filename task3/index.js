const express=require('express');
const bodyParser = require('body-parser');

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/bharatintern');

const connection=mongoose.connection;
const app=express();

const port=3000;

//body parse 2 lines required
app.use(bodyParser.json());           
app.use(bodyParser.urlencoded({ extended: true }));

// money tracker js content starts here

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

app.post('/add',(req,res)=>{
    data=req.body;
    try{
        const newmoney=new moneymodel({
            category: data.category,
            amount: data.amount,
            description: data.description,
            date: data.date
           })
           newmoney.save();
            res.redirect('/');
    }
    catch{
        res.sendFile(__dirname+'/pages/error.html');
    }
});



app.get('/find', async (req, res) => {
    try {
        const data = await moneymodel.find({});
        res.json(data);
    } catch (error) {
        console.log(error);
        res.send('Error retrieving data');
    }
});


//find req. js content ends here


app.post('/delete',async(req,res)=>{
   
    try{
        delete_id=req.body.id;
        // console.log(received_id);
        const id = await moneymodel.deleteOne({_id:delete_id});
        res.redirect('/');
        // res.send('deleted  id received:'+delete_id);
    }
    catch{

    }
  
});
//money tracker js content ends here

app.listen(port,()=>{
    console.log('Server started for moneytracker on http://localhost:3000/');
});