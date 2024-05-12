"use client";

import { MdSettings } from 'react-icons/md';
import { Checkbox, Dropdown, Label } from '../../components/_shared';
import { useState } from 'react';

interface SearchSettings {
    checkboxes: string[];
    dropdown1: string;
    dropdown2: string;
}

interface CheckboxChangeEvent {
    target: {
        checked: boolean;
        value: string;
    };
}

const ChatBotSettings = () => {
    const [showSettings, setShowSettings] = useState(false);

    const handleToggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const settings = [
        { value: 'Direct AI chat', label: 'Direct AI chat' },
        { value: 'Ask me Some Questions', label: 'Ask me Some Questions' },
        { value: 'Give Me a Few Options', label: 'Give Me a Few Options' },
        { value: 'I wll Fill Out a Form', label: 'I wll Fill Out a Form' },
    ]

    const premiumSettings = [
        { value: 'Chat With One AI', label: 'Chat With One AI' },
        { value: 'Two AIs Side by Side', label: 'Two AIs Side by Side' },
        { value: 'Lets Get a Team', label: 'Lets Get a Team' },
        { value: 'Show Me What You Can Do', label: 'Show Me What You Can Do' },
        { value: 'Unleash Infinity Matrix!', label: 'Unleash Infinity Matrix!' },
    ]

    return (
        <div className='w-full mt-4 text-sm flex items-start'>
            <button className='mt-[0.1rem] mr-4 text-[#898989]' onClick={handleToggleSettings}><MdSettings /></button>
            {showSettings && (
                <div className="w-full transition-all duration-300">
                    <div className="w-full flex flex-wrap justify-start items-center text-nowrap">
                        <div className='flex items-center mr-5 mb-2'>
                            <Checkbox />
                            <Label className='ml-3 text-xs font-normal'>Display Custom Options</Label>
                        </div>
                        <div className='flex items-center mr-5 mb-2'>
                            <Checkbox />
                            <Label className='ml-3 text-xs font-normal'>Make Small Talk</Label>
                        </div>
                        <div className='flex items-center mr-5 mb-2'>
                            <Checkbox />
                            <Label className='ml-3 text-xs font-normal'>Answer Quickly Please!</Label>
                        </div>
                        <div className='flex items-center mr-5 mb-2'>
                            <Checkbox />
                            <Label className='ml-3 text-xs font-normal'>Improve My Questions</Label>
                        </div>
                        <div className='flex items-center mr-5 mb-2'>
                            <Checkbox />
                            <Label className='ml-3 text-xs font-normal'>Submit on Enter</Label>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-start mt-2">
                        <div className='flex-1 w-full mr-2 mb-2'>
                            <Dropdown className="text-xs font-normal text-[#898989]" isLabel={true} placeHolder="Direct AI Chat" options={settings} />
                        </div>
                        <div className='flex-1 w-full mr-2'>
                            <Dropdown className="text-xs font-normal text-[#898989]" isLabel={true} placeHolder="Select From Premium Options" options={premiumSettings} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatBotSettings