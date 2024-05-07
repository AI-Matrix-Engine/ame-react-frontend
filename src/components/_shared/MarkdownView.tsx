"use client"

import React, { Children, useRef, useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { IoIosCheckmarkCircleOutline, IoIosCopy } from "react-icons/io";

interface MarkdownViewProps {
  content: string;
  fontSize?: string;
  width?: string;
  height?: string;
}
const empty = ({ children }: any) => {
  return (
    <em className="empty__tag">
      {children}
    </em>
  )
};

const MarkdownView: React.FC<MarkdownViewProps> = ({
  content,
  fontSize = 'inherit',
  width = 'auto',
  height = 'auto',
}) => {
  const contentRef = useRef(null);
  const [showCopyText, setShowCopyText] = useState(false);

  const components: Components & {
    inlineCode: ({ children }: { children: React.ReactNode }) => React.JSX.Element;
    h1: ({ children }: any) => React.JSX.Element;
    th: ({ children }: any) => React.JSX.Element;
    
    code: ({ node, inline, className, children, language, ...props }: any,
    ) => React.ReactNode; // Adjust the type here
    list: ({ children }: any) => React.JSX.Element;
  } = {
    code: ({ node, inline, className, children, language, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      console.log(match, "-----");
      return (
        <SyntaxHighlighter style={vscDarkPlus} language={match ? match[1] : language} PreTag={match ? "div" : empty}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      )
    },
    h1: ({ children }) => (
      <h1 className='text-bg'>
        {children}
      </h1>
    ),
    th: ({ children }) => (
      <th style={{ backgroundColor: 'transparent', border: 'none', padding: '0.5rem', margin: '0' }}>
        {children}
      </th>
    ),
    table: ({ children }) => (
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        {children}
      </table>
    ),
    tr: ({ children }) => (
      <tr style={{ border: '1px solid #ccc' }}>
        {children}
      </tr>
    ),
    td: ({ children }) => (
      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
        {children}
      </td>
    ),
    inlineCode: ({ children }) => (
      <code className={`bg-gray-100 px-2 py-1 rounded-md`}>
        {children}
      </code>
    ),
    list: ({ children }) => (
      <li>
        <IoIosCheckmarkCircleOutline className="inline-block mr-2" />
        {children}
      </li>
    )
  };

  const handleCopyText = () => {
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setShowCopyText(true);
    setTimeout(() => {
      setShowCopyText(false);
    }, 5000);
  };

  const addNumbersToMarkdownList = (markdown: string) => {
    const lines = markdown.split("\n");

    const numberedMarkdown = lines.map((line: string) => {
      if (line.trim().startsWith("-")) {
        return `- • ${line.trim().substring(1)}`;
      }
      return line;
    });
    return numberedMarkdown.join("\n");
  };

  const numberedContent = addNumbersToMarkdownList(content);

  return (
    <div className={`dark:bg-gray-900 dark:text-white m-auto relative rounded-md`} style={{ width: width, height: height, fontSize: fontSize }}>
      <button onClick={handleCopyText} className="absolute top-0 right-0 p-2">
        <IoIosCopy size={20} />
      </button>
      <div ref={contentRef}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {numberedContent}
        </ReactMarkdown>
      </div>
      {showCopyText && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 dark:text-black my-4 text-center">
          <p className="bg-gray-300 bg-opacity-75 p-2 rounded-md">Text copied!</p>
        </div>
      )}
    </div >
  );
};

export default MarkdownView;