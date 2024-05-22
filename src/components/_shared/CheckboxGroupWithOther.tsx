import React, { useState } from "react";
import { Input } from '@/components/_shared';
import { Checkbox, CheckboxGroup } from "./catalyst/checkbox";

export interface Question {
    question: string;
    options: string[]
}

interface Props {
    question: Question;
    handleInputChange: (value: any, question: string) => void;
}

const CheckboxGroupWithOtherOption: React.FC<Props> = ({ question, handleInputChange }) => {
    const [otherInput, setOtherInput] = useState("");
    const [isOther, setIsOther] = useState(false);
    const [memoryInput, setMemoryInput] = useState("");

    const handleOptionChange = (value: boolean, option: string) => {
        if (option === "Other") {
            if (value) {
                setIsOther(true);
                handleInputChange(otherInput, question.question);
                setMemoryInput(otherInput);
            } else {
                setIsOther(false);
                setOtherInput("");
                handleInputChange(memoryInput, question.question);
            }
        } else {
            handleInputChange(option, question.question);
        }
    };

    const handleOtherInputChange = (value: string) => {
        setOtherInput(value);
        handleInputChange(value, question.question);
    };

    return (
        <>
            <CheckboxGroup>
                {question?.options?.map((option) => (
                    <div key={option} className="my-2 flex items-center justify-start">
                        <Checkbox
                            name={question.question}
                            value={option}
                            onChange={(value) => handleOptionChange(value, option)}
                        />
                        <label className="ml-3 text-xs font-normal">{option}</label>
                    </div>
                ))}</CheckboxGroup>
            {isOther && (
                <Input
                    type="text"
                    placeholder="Enter your answer"
                    className="my-2 text-xs font-normal text-[#898989] w-full"
                    value={otherInput}
                    onChange={(e: any) => setOtherInput(e.target.value)}
                    onBlur={() => handleOtherInputChange(otherInput)}
                />
            )}
        </>
    );
};

export default CheckboxGroupWithOtherOption;