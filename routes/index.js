const express = require('express');
const router = express.Router();

const OpenAI = require('openai');
require('dotenv').config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


// POST route for receiving form submission and generating workout plan
router.post('/', async (req, res) => {
    try {
        // Extract form data
        const { Name, AMAB, AFAB, weight, height, splitOption } = req.body;

        // Generate message for OpenAI
        const message = `I am a ${AMAB || AFAB}. My height is ${height}, my prefered split is ${splitOption} and my weight is ${weight}. Build me a workout in list-item format based on my info`;

        // Call OpenAI API to generate completion
        const completions = await runPrompt(message);

        // Extract response text from completions
        const responseText = completions.choices[0].message.content;

        // Render the index page with the workout plan and response
        res.render('index', {
            title: 'Express',
            Name,
            AMAB,
            AFAB,
            weight,
            height,
            splitOption,
            message: responseText
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// GET route for rendering the index page initially
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

// Function to call OpenAI API with user message
async function runPrompt(message) {
    try {
        const completions = await client.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "gpt-3.5-turbo"
        });
        return completions;
    } catch (error) {
        throw error;
    }
}

module.exports = router;










// router.get('/response', async (req, res)  => {
  
//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo-instruct', // Choose the model you want to use
//     message: [{"role": "user", "content": `${}`}],
//     max_tokens: 100 // Adjust based on your requirements
//   })
//   try {
//     console.log(response);
//   }
//   catch (error){
//     console.log(error);
//     res.render('response', { 
//       title: 'Express' 
//     });
//   }
  
// });

