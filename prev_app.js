// require("dotenv").config();
// const express = require('express');
// const app = express();
// app.use(express.static('public'));
// app.set('view engine','ejs');


// require("dotenv").config();
// const axios = require("axios");
// console.log("API KEY:", process.env.GROQ_API_KEY);
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/scansureDB")
// .then(()=>{console.log("Database connected")}).catch((err)=>{
//     console.log(err);
// })

// const chemcialSchema = new mongoose.Schema({
//     chemical:String,
//     risk:String,
//     score:Number,
//     confidence:Number,
//     description:String
// })

// const Chemical = mongoose.model("Chemical",chemcialSchema);

// app.use(express.urlencoded({ extended: true }));
// // app.get('/',(req,res)=>{
// //     res.render('index');
// // })

// app.get('/',(req,res)=>{
//     res.render('home');
// })

// app.get('/about',(req,res)=>{
//     res.render('about');
// })

// app.get('/alternative',(req,res)=>{
//     res.render('alternative');
// })

// app.get('/awareness',(req,res)=>{
//     res.render('awareness');
// })

// app.get('/result',(req,res)=>{
//     res.render('result');
// })

// app.get('/insights',(req,res)=>{
//     res.render('insights');
// })

// app.get('/alternatives',(req,res)=>{
//     res.render('alternatives');
// })

// app.get('/howItWorks',(req,res)=>{
//     res.render('howItWorks');
// })

// app.post('/analyze',async (req,res)=>{
//     const chemical = req.body.chemical.toLowerCase().trim();
//     const data = await Chemical.findOne({ chemical:chemical });
//     // console.log(chemical);
//     // console.log(req.body);
//     console.log(data);
//     if(!data){
//         try{
//             const url = "https://api.groq.com/openai/v1/chat/completions";            const prompt = `GIve safety analysis for the chemical ${chemical} in JSON with fields
//             score(number),risk(low/medium/high),description(short but usefull which help user 
//             understand that chemical),ai confidence index(number)`;

//             const response = await axios.post(url, {
//                 model: "llama-3.3-70b-versatile",
//                 messages: [{ role: "user", content: prompt }]
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.GROQ_API_KEY}`
//                 }
//             });
//             console.log(response.data);
//             const text = response.data.choices[0].message.content.replace(/```json|```/g, "").trim();
//             const aiData = JSON.parse(text);
//             return res.render('result', {
//     score: aiData.score,
//     risk: aiData.risk,
//     confidence: aiData.ai_confidence_index,
//     description: aiData.description,
//     chemical: chemical
// });
//             console.log("TEXT:", response.data.choices[0].message);
//     }
//             catch (err) {
//                 console.log(err.response?.data);
//                 return res.render('result',{
//             score:"0",
//             description:"NO data of this chemical right now available",
//             risk:"high",
//             confidence:"0"

//         })
//     }

//             // const text = response.data.candidates[0].contents.part[0].text;  


        
//     }
//     res.render('result',{
//         score:data.score,
//         risk:data.risk,
//         confidence:data.confidence,
//         description:data.description,
//         chemical:data.chemical
//     });
//     console.log(process.env.API_KEY);
  
// })



// app.listen(3001,()=>{
//     console.log("Server is running on port http://localhost:3001");
// })




