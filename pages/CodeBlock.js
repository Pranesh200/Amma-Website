import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import React, { useEffect, useRef  } from 'react';

const CodeBlock = ({ code }) => {
    const codeRef = useRef(null);
    useEffect(() => {
      Prism.highlightAll();
    }, [code]);
    const copyToClipboard = () => {
      codeRef.current.select();
      document.execCommand("copy");
    }
    return (
      <>
      <pre className="rounded" >
        <code ref={codeRef} className="language-javascript">{code}</code>
      </pre>
      </>
    );
  };
  
  export default CodeBlock