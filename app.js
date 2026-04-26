const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine','ejs');

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/scansureDB")
.then(()=>{console.log("Database connected")}).catch((err)=>{
    console.log(err);
})

const chemcialSchema = new mongoose.Schema({
    chemical:String,
    risk:String,
    score:Number,
    confidence:Number,
    description:String
})

const Chemical = mongoose.model("Chemical",chemcialSchema);

app.use(express.urlencoded({ extended: true }));
// app.get('/',(req,res)=>{
//     res.render('index');
// })

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/alternative',(req,res)=>{
    res.render('alternative');
})

app.get('/awareness',(req,res)=>{
    res.render('awareness');
})

app.get('/result',(req,res)=>{
    res.render('result');
})

app.get('/insights',(req,res)=>{
    res.render('insights');
})

app.get('/alternatives',(req,res)=>{
    res.render('alternatives');
})

app.get('/howItWorks',(req,res)=>{
    res.render('howItWorks');
})

app.post('/analyze',(req,res)=>{
    const data = {
    score:"0",
    risk:"low",
    confidence:"0",
    description:""
}
    const chemical = req.body.chemical;
    console.log(chemical);
    console.log(req.body);
    res.render('result',data);
})


app.listen(3001,()=>{
    console.log("Server is running on port http://localhost:3001");
})