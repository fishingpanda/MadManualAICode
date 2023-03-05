import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
  organization:"org-ZYJS1fhL0H81wchixAjHXDvk",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())   //allows cross orgin requests -
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello To Madhu!'
  })
})

//accepts payload
app.post('/test', async (req, res) => {
  try {

// const engines = await openai.listEngines();

// console.log(engines.data)

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages:[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the cricket world cup  in 2019?"}, 
        {"role": "system", "content": "England won cricket world cup in 2019"},
        {"role": "user", "content": "Who was the man of the match?"}, 
      ],
    });

    //console.log(response.data.choices);
    console.log(response.data.choices[0].message.content);

    res.status(200).send({
      bot: response.data.choices[0].message.content
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

// //accepts payload
// app.post('/', async (req, res) => {
//   try {
//     const prompt = req.body.prompt;
//     console.log('received payload - ' + prompt);
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{role:"user",content:"Hello World!"}],
//     });

//     console.log(response.data.choices[0].message)

//     res.status(200).send({
//       bot: response.data.choices[0].message
//     });

//   } catch (error) {
//     console.error(error)
//     res.status(500).send(error || 'Something went wrong');
//   }
// })

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))