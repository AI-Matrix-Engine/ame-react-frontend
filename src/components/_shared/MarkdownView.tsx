"use client"

import React, { useRef, useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { IoIosCheckmarkCircleOutline, IoIosCopy } from "react-icons/io";
import { BiSolidDislike } from "react-icons/bi";
import { FiClipboard } from "react-icons/fi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';
import { SlReload } from "react-icons/sl";

interface MarkdownViewProps {
  content: string;
  fontSize?: string;
  width?: string;
  height?: string;
  reloadIcon?: boolean;
  reloadHandler: () => void;
  index: number;
}

const MarkdownView: React.FC<MarkdownViewProps> = ({
  content,
  fontSize = 'inherit',
  width = 'auto',
  height = 'auto',
  reloadIcon = false,
  reloadHandler,
  index
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
      return (
        <SyntaxHighlighter style={vscDarkPlus} language={match ? match[1] : language} PreTag="div">
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
      <code className={`px-2 py-1 rounded-md`}>
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

  const handleDislike = () => {
    console.log('dislike click')
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
    <div key={index} className={`chatbot-messages-area text-opacity-50 dark:text-white text-md font-semibold m-auto relative rounded-md overflow-auto group`} style={{ width: width, height: height, fontSize: fontSize }}>
      <div ref={contentRef} className='pl-10'><ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {numberedContent}
      </ReactMarkdown>
      </div>
      {showCopyText && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 dark:text-black my-4 text-center">
          <p className="bg-gray-300 bg-opacity-75 p-2 rounded-md">Text copied!</p>
        </div>
      )}
      < div className='h-[70px]'>
        <div className='hidden group-hover:flex gap-2 pt-4 pl-10'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={handleCopyText} className='opacity-50 hover:opacity-100 duration-150'>
                <FiClipboard size={18} />
              </TooltipTrigger>
              <TooltipContent sideOffset={12}>Copy</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {reloadIcon && <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={reloadHandler} className='opacity-50 hover:opacity-100 duration-150'>
                <SlReload size={18} />
              </TooltipTrigger>
              <TooltipContent sideOffset={12}>Reload</TooltipContent>
            </Tooltip>
          </TooltipProvider>}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={handleDislike} className='opacity-50 hover:opacity-100 duration-150'>
                <BiSolidDislike size={18} />
              </TooltipTrigger>
              <TooltipContent sideOffset={12}>Bad response</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div >
  );
};

export default MarkdownView;