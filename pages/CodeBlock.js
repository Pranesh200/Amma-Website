import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import React, { useEffect } from 'react';

const CodeBlock = ({ code }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre className="rounded">
      <code className="language-javascript">{code}</code>
    </pre>
  );
};

export default CodeBlock;
