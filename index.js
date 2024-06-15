const express = require('express');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bharatintern');
const connection = mongoose.connection;

const app = express();
const port = 3000;

app.use(express.urlencoded());


//registration js content starts here
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/registration.html',);
});

const schema = mongoose.Schema;       //defining schema
const employeeschema = new schema({
    firstname: String,
    middlename: String,
    lastname: String,
    email: String,
    password: String,
    contactno: Number,
    dob: Date,
    nationality: String,
    qualification: String,
    address: String
});

const employee = mongoose.model('employee', employeeschema);   //compiling schema to model
app.post('/register', (req, res) => {

    data = req.body;

    try {
        const newemployee = new employee({
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            contactno: data.contactno,
            dob: data.dob,
            nationality: data.nationality,
            qualification: data.qualification,
            address: data.address
        })

        newemployee.save();         //storing into the mongoDB database
        res.sendFile(__dirname + '/pages/success.html');   //redirecting to the success page
    }
    catch {
        res.sendFile(__dirname + '/pages/error.html');
    }

})

//registration js content ends here


//Money tracker js content starts here
app.get('/MoneyTracker', (req, res) => {
    res.sendFile(__dirname + '/pages/MoneyTracker.html');
})


const schema2 = mongoose.Schema;       //defining schema
const moneyschema = new schema2({
    category: String,
    amount: Number,
    description: String,
    date: Date,
});

const money2 = mongoose.model('moneytracker', moneyschema);   //compiling schema to model

app.post('/moneytrackersend', (req, res) => {
    // res.send('post request invoked successfully');
    // console.log(req.body);

    data = req.body;

    try {
        const newemoney = new money2({
            category: data.category,
            amount: data.amount,
            description: data.description,
            date: data.date,
        })

        newemoney.save();         //storing into the mongoDB database
        res.sendFile(__dirname+'/pages/MoneyTracker.html');   //redirecting to the success page
    }
    catch {
        res.send('error');
    }

})



//money tracker js content ends here

app.listen(port, () => {
    console.log('Server started on for register http://localhost:3000/');
    console.log('Server started on for moneytracker http://localhost:3000/MoneyTracker');
});