//importing
import express from 'express'
import mongoose from "mongoose"
import Content from './dbquote.js'
import cors from "cors"
//app config
const app = express();
const port = process.env.PORT || 52857

//middleware
app.use(cors)
app.use(express.json());


//DB config
const connect_URL = "mongodb+srv://phu1994:6298327@cluster0.rpsig.mongodb.net/Random-Quote-Machine?retryWrites=true&w=majority"
mongoose.connect(connect_URL, { useNewUrlParser: true,  useUnifiedTopology: true });

//api routes
app.get("/", (req, res)=> res.status(200).send("hello world"));
app.get("/content/quote", async function(req, res) {
    const content = await Content.find()
	res.json(content)
});

app.post("/content/id", (req, res) =>{
    const quote = req.body;
    Content.create(quote, (err, data) => {
        if (err) {
            res.status(500).send('err')
        } else {
            res.status(201).send(`New content was created: ${data}`)
        }
    
    })

})

app.post("/", (req, res) =>{
    const quote = req.body;
    Content.create(quote, (err, data) => {
        if (err) {
            res.status(500).send('err')
        } else {
            res.status(201).send(`New content was created: ${data}`)
        }
    
    })

})

// app.get("/content/id", (req, res) => {
//     const id =  req.body
//     Content.find()
// })

//listen
app.listen(port, () => console.log(`Please listen in port: ${port}`))