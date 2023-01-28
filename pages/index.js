import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';
import CodeBlock from './CodeBlock'
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

const Home = () => {
  const [userContext, setuserContext] = useState('');
  const [userCode, setuserCode] = useState('');
  const [userQuestion, setuserQuestion] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userContext, userCode, userQuestion }),
    });

    const data = await response.json();
    console.log("Hi", data)
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onContextChangedText = (event) => {
    console.log(event.target.value);
    setuserContext(event.target.value);
  };
  const onCodeChangedText = (event) => {
    console.log(event.target.value);
    setuserCode(event.target.value);
  };
  const onQuestionChangedText = (event) => {
    console.log(event.target.value);
    setuserQuestion(event.target.value);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>StackGPT</h1>
          </div>
          <div className="header-subtitle">
            <h2>Instant answers to all your coding questions</h2>
          </div>
          <div className="header-subtitle">
          <h2>(Context and code are optional)</h2>
          </div>

        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="provide some context to the code (a little context can go a long way!)"
            value={userContext}
            onChange={onContextChangedText}
          />

          <textarea
            className="prompt-box monospace"
            placeholder="throw the code that needs fixing in here"
            value={userCode}
            onChange={onCodeChangedText}
          />

          <textarea
            className="prompt-box"
            placeholder="Enter your question here"
            value={userQuestion}
            onChange={onQuestionChangedText}
          />
          <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p> Generate solution </p>}
    </div>
  </a>
</div>

          {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <div className='code-block'>
        <CodeBlock code={apiOutput} />
      </div>   
   </div>
  </div>
)}


        </div>

        
      </div>
     
    </div>
  );
};

export default Home;
