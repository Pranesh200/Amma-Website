import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';


const Home = () => {
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {

    let regexCodeCheck = /\b(int|str|char)\b\s*=|\b(for|if|while)\b\s*[\{\(]|\/\/.*|\/\*[\s\S]*?\*\/|\"\"\".*|\b(func)\b\s*[\(\w]+|\bprint\b\(|\b\w+\b\.\b\w+\b|\bimport\b\s+\b\w+\b|\bclass\b\s+\b\w+\b|\b\w+\b\s*=\s*\b\w+\b|\breturn\b\s+.*|\byield\b\s+.*|<\s*\w+.*>.*<\s*\/\s*\w+.*>|\bvar\b\s+\b\w+\b|\bpackage\b\s+\b\w+\b/;

    let userContext = document.getElementById("context").value
    let userCode = document.getElementById("code").value
    let userQuestion = document.getElementById("question").value
    console.log(`Code: ${regexCodeCheck.test(userCode)}`)

    if (regexCodeCheck.test(userCode) || (userCode.length == 0)) {
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
    } else {
      toast("alert")
    }
    
  }

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title"><h1>StackGPT</h1></div>
          <div className="header-subtitle"><h2>Context + Code + Question = Solution</h2></div>
          <div className="header-subtitle"><h2>(Context and code are optional)</h2></div>
        </div>
        <div className="prompt-container">
          <textarea
            id="context"
            className="prompt-box"
            placeholder="provide some context to the code (a little context can go a long way!)"
          />

          <textarea
            id="code"
            className="prompt-box"
            placeholder="throw the code that needs fixing in here"
          />

          <textarea
            id="question"
            className="prompt-box"
            placeholder="Enter your question here"
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
                <div className="output-header"><h3>Output</h3></div>
              </div>
              <div className="output-content"><p>{apiOutput}</p></div>
            </div>
          )}
        </div>

        
      </div>
      <ToastContainer theme="dark" fontSize="8px"/>
    </div>
  );
};

export default Home;
