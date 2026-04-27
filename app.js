require("dotenv").config();
const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

const axios = require("axios");
console.log("API KEY:", process.env.GROQ_API_KEY);
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/scansureDB")
    .then(() => { console.log("Database connected") }).catch((err) => {
        console.log(err);
    })

const chemcialSchema = new mongoose.Schema({
    chemical: String,
    risk: String,
    score: Number,
    confidence: Number,
    description: String
})

const Chemical = mongoose.model("Chemical", chemcialSchema);

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => { res.render('home'); })
app.get('/about', (req, res) => { res.render('about'); })
app.get('/alternative', (req, res) => { res.render('alternative'); })
app.get('/awareness', (req, res) => { res.render('awareness'); })
app.get('/result', (req, res) => { res.render('result'); })
app.get('/insights', (req, res) => { res.render('insights'); })
app.get('/alternatives', (req, res) => { res.render('alternatives'); })
app.get('/howItWorks', (req, res) => { res.render('howItWorks'); })

app.post('/analyze', async (req, res) => {
    const chemical = req.body.chemical.toLowerCase().trim();
    const data = await Chemical.findOne({ chemical: chemical });
    console.log(data);

    if (!data) {
        try {
            const url = "https://api.groq.com/openai/v1/chat/completions";
            const prompt = `Give safety analysis for the chemical ${chemical} in JSON with fields:
            score (number 0-100), risk (low/medium/high), description (short but useful),
            ai_confidence_index (number 0-100).
            Return ONLY valid JSON, no extra text, no markdown.`;

            const response = await axios.post(url, {
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }]
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`
                }
            });

            const text = response.data.choices[0].message.content
                .replace(/```json|```/g, "").trim();
            const aiData = JSON.parse(text);
            console.log("AI Data:", aiData);

            const newChemical = new Chemical({
                chemical: chemical,
                risk: aiData.risk,
                score: aiData.score,
                confidence: aiData.ai_confidence_index,
                description: aiData.description
            });

            await newChemical.save();
            console.log("Saved to DB");

            return res.render('result', {
                score: aiData.score,
                risk: aiData.risk,
                confidence: aiData.ai_confidence_index,
                description: aiData.description,
                chemical: chemical
            });

        } catch (err) {
            console.log(err.response?.data || err.message);
            return res.render('result', {
                score: "0",
                description: "No data for this chemical available right now.",
                risk: "high",
                confidence: "0",
                chemical: chemical
            });
        }
    }

    return res.render('result', {
        score: data.score,
        risk: data.risk,
        confidence: data.confidence,
        description: data.description,
        chemical: data.chemical
    });
})

app.listen(3001, () => {
    console.log("Server is running on port http://localhost:3001");
})

//