import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);



const generateAction = async (req, res) => {

  const firstPrompt =
  `
  Given this context: 
  ${req.body.userContext}

  Given this code: 
  ${req.body.userCode}
  
  Given this problem: 
  ${req.body.userQuestion}

  Give me a solution to fix my problem given the code and context:
  `;

  // Run first prompt
  console.log(`API: ${firstPrompt}${req.body.userContext}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${firstPrompt}`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  const isCode = text => {
    const codeRegex = /;\n|{.*}/;
    return codeRegex.test(text);
  };

let codeCheck = isCode(basePromptOutput.text)
//   const secondPrompt =   `
//   Suggest me some gifts priced under $50 for a person who loves ${req.body.userContext}

//   List: ${basePromptOutput.text}
  
//   List
//   `;
  
//   console.log(`API: ${secondPrompt}`)

//   const finalCompletion = await openai.createCompletion({
//     model: 'text-davinci-002',
//     prompt: `${secondPrompt}`,
//     temperature: 0.7,
//     max_tokens: 1250,
//   });

//   const finalPromptOutput = finalCompletion.data.choices.pop();


  res.status(200).json({ output: basePromptOutput, isCode:  codeCheck});
};


export default generateAction;