const express = require('express');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

// const openai = new OpenAI(config);

router.route('/').get((req,res) => {
    res.status(200).json({message: "Hello from DALL.E ROUTES"})
})

router.route('/').post(async (req,res) => {
    try{
        const { prompt } = req.body;

        const response = await openai.images.generate({
            prompt,
            n:1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        console.log(response);

        const imageUrl = response.data[0].b64_json;
        res.status(200).json({ photo: imageUrl});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Something went wrong"})
    }
})

module.exports = router;