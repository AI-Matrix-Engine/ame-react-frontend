import React, { useState } from "react";
import { Dropdown, Input } from '@/components/_shared';

export interface Question {
    question: string;
    options: string[]
}

interface Props {
    question: Question;
    handleInputChange: (value: any, question: string) => void;
}

const DropdownWithOtherOption: React.FC<Props> = ({ question, handleInputChange }) => {
    const [otherInput, setOtherInput] = useState("");
    const [isOther, setIsOther] = useState(false);

    const handleOptionChange = (value: any) => {
        if (value === "Other") {
            handleInputChange("", question.question);
            setIsOther(true);
        } else {
            handleInputChange(value, question.question);
            setIsOther(false);
        }
    };

    const handleOtherInputChange = (value: string) => {
        setOtherInput(value);
        handleInputChange(value, question.question);
    };
    return (
        <>
            <Dropdown
                isLabel={true}
                placeHolder="Select an option"
                onClick={handleOptionChange}
                options={question.options ? question.options.map((option) => (
                    { value: option, label: option }
                )) : []}
                className="my-2 text-xs font-normal text-[#898989] w-full"
            />
            {isOther && (
                <Input
                    type="text"
                    placeholder="Enter your answer"
                    className="my-2 text-xs font-normal text-[#898989] w-full"
                    value={otherInput}
                    onChange={(e: any) => handleOtherInputChange(e.target.value)}
                />
            )}
        </>
    );
};

export default DropdownWithOtherOption;