import React, { useEffect, useRef, useState } from 'react';
import { GrFormEdit } from 'react-icons/gr';

interface MyMessageViewProps {
    content: string;
    fontSize?: string;
    width?: string;
    height?: string;
    onSave: (index: number, content: string) => void;
    index: number;
    uniqueKey: string;
}

const MyMessageView: React.FC<MyMessageViewProps> = ({
    content,
    fontSize = 'inherit',
    width = 'auto',
    height = 'auto',
    onSave,
    index,
    uniqueKey,
}) => {
    const [edit, setEdit] = useState(false);
    const [editableContent, setEditableContent] = useState('');

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (edit && textareaRef.current) {
            adjustHeight();
        }
    }, [edit]);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height to auto
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        adjustHeight();
        setEditableContent(event.target.value);
    };

    const handleEdit = () => {
        setEdit(true);
    };

    const saveHandler = () => {
        setEdit(false);
        const newContent = textareaRef.current?.value || content;
        setEditableContent(newContent);
        onSave(index, newContent);
    };

    const cancelHandler = () => {
        setEdit(false);
        setEditableContent(content);
    };

    useEffect(() => {
        setEditableContent(content)
    }, [content])

    return (
        <div key={uniqueKey + content} className={`chatbot-messages-area text-opacity-50 dark:text-white text-md font-semibold m-auto relative rounded-md overflow-auto group`} style={{ width: width, height: height, fontSize: fontSize }}>
            <div className="pl-10 w-full resize-none min-h-fit" ref={divRef}>
                {edit ? (
                    <textarea
                        ref={textareaRef}
                        value={editableContent}
                        onChange={handleChange}
                        onClick={(event) => event.preventDefault()}
                        className="w-full resize-none dark:bg-gray-900"
                        style={{ outline: 'none' }}
                        key={uniqueKey + content}
                    />
                ) : (
                    <span key={uniqueKey + content}>{editableContent}</span>
                )}
            </div>
            <div className='h-[60px]'>
                <div className='flex'>
                    {edit ?
                        <div className='flex w-full justify-center items-center pt-4'>
                            <button onClick={saveHandler} className="bg-green-700 rounded-md mr-2 opacity-80 hover:opacity-100 duration-150">
                                <div className='text-center text-white p-2'>Save & Submit</div>
                            </button>
                            <button onClick={cancelHandler} className="border border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                                <div className='text-center p-2'>Cancel</div>
                            </button>
                        </div>
                        :
                        <div className='hidden group-hover:flex gap-2 pt-4 pl-10'>
                            <button onClick={handleEdit} className="opacity-50 hover:opacity-100 duration-150">
                                <GrFormEdit size={22} />
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default MyMessageView;
