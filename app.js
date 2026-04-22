const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine','ejs');

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



app.listen(3001,()=>{
    console.log("Server is running on port http://localhost:3001");
})