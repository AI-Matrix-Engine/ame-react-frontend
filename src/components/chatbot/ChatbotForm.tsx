"use client"

import { useEffect, useState } from "react";
import { Dropdown, Textarea, Input } from "../_shared";
import sample from "./sample.json"
import { Button } from "../_shared/catalyst/button";
import { RadioGroup, Radio, RadioField } from "../_shared/catalyst/radio";
import { CheckboxField, Checkbox, CheckboxGroup } from "../_shared/catalyst/checkbox";
import { Dropdown as DropDown, DropdownButton, DropdownItem, DropdownMenu } from "../_shared/catalyst/dropdown";
import { ChevronDownIcon } from "lucide-react";
import RangeSlider from "../_shared/rangeSlider";

interface respondQuestions {
    type: "multiple_choice" | "checkboxes" | "yes_no" | "text_area" | "range_selector" | string;
    question: string;
    options?: string[];
    range?: {
        min: number;
        max: number;
        value: number;
        step?: number;
    };
    allow_custom_input?: boolean;
}

interface respondForm {
    introduction: string;
    questions: respondQuestions[];
}

interface UpdatedRespondForm extends respondForm {
    questions: UpdatedRespondQuestion[];
}

interface UpdatedRespondQuestion {
    type: "multiple_choice" | "checkboxes" | "yes_no" | "text_area" | "range_selector" | string;
    question: string;
    answer: string | boolean | number;
}

const initialState: UpdatedRespondForm = {
    introduction: '',
    questions: [],
}

const respondData = sample

const ChatbotForm = () => {
    const [formValues, setFormValues] = useState<UpdatedRespondForm>(initialState);
    const [otherOptionValue, setOtherOptionValue] = useState("");

    useEffect(() => {
        if (respondData) {
            setFormValues({
                ...respondData,
                questions: respondData.questions.map((question) => ({
                    type: question.type,
                    question: question.question,
                    answer: '',
                })),
            });
        }
    }, []);

    const handleInputChange = (value: any, question: string) => {
        const questionIndex = formValues.questions.findIndex(q => q.question === question);
        if (questionIndex !== -1) {
            const updatedQuestions = [...formValues.questions];
            if (updatedQuestions[questionIndex].type === 'yes_no') {
                updatedQuestions[questionIndex] = {
                    type: updatedQuestions[questionIndex].type,
                    question,
                    answer: value,
                };
            } else if (updatedQuestions[questionIndex].type === 'checkboxes') {
                let answer: string[] = (updatedQuestions[questionIndex].answer as string).split(', ');
                if (answer.includes(value)) {
                    answer = answer.filter((item) => item !== value)
                } else {
                    answer.push(value)
                }
                updatedQuestions[questionIndex] = {
                    type: updatedQuestions[questionIndex].type,
                    question,
                    answer: answer.join(', '),
                };
            } else {
                if (value === "Other") {
                    setOtherOptionValue("user");
                    updatedQuestions[questionIndex] = {
                        type: updatedQuestions[questionIndex].type,
                        question,
                        answer: otherOptionValue,
                    }
                } else {
                    updatedQuestions[questionIndex] = {
                        type: updatedQuestions[questionIndex].type,
                        question,
                        answer: value,
                    }
                }
            }

            setFormValues({
                ...formValues,
                questions: updatedQuestions,
            });
        }
    };

    const submitForm = (e: any) => {
        e.preventDefault()
        console.log(formValues)
    }

    return (
        <form onSubmit={submitForm} className="my-4 w-full rounded-lg p-6 text-xs">
            {respondData.questions.map((question) => {
                if (question.type === 'multiple_choice') {
                    return (
                        <div key={question.question} className="mb-4">
                            <label className="mb-4">{question.question}</label>
                            <Dropdown
                                isLabel={true}
                                placeHolder="Select an option"
                                onClick={(value) => handleInputChange(value, question.question)}
                                options={question.options ? question?.options?.map((option) => (
                                    { value: option, label: option }
                                )) : []}
                                className="my-2 text-xs font-normal text-[#898989] w-full"
                            />
                            {/* <DropDown>
                                <DropdownButton outline className="my-2 text-xs font-normal text-[#898989] w-full">
                                    Select an option
                                    <ChevronDownIcon />
                                </DropdownButton>
                                <DropdownMenu className="my-2 text-xs font-normal text-[#898989] w-full">
                                    {question?.options?.map((option) => (
                                        <DropdownItem className="my-2 text-xs font-normal text-[#898989] w-full" onClick={() => handleInputChange(option, question.question)}>{option}</DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </DropDown> */}
                            <Input
                                type="text"
                                onChange={(e: any) => setOtherOptionValue(e.target.value)}
                            />
                        </div>
                    );
                } else if (question.type === 'checkboxes') {
                    return (
                        <div key={question.question} className="my-4">
                            <label className="mb-3">{question.question}</label>
                            <CheckboxGroup className="max-w-[500px]">
                                {question?.options?.map((option) => (
                                    <div key={option} className="my-2 flex items-center justify-start">
                                        <Checkbox
                                            name={question.question}
                                            value={option}
                                            onChange={(value) => handleInputChange(option, question.question)}
                                        />
                                        <label className="ml-3 text-xs font-normal">{option}</label>
                                    </div>
                                ))}</CheckboxGroup>
                        </div>
                    );
                } else if (question.type === 'yes_no') {
                    return (
                        <div key={question.question} className="my-4">
                            <label className="mb-3">{question.question}</label>
                            <RadioGroup className="my-3 flex flex-row items-center space-y-0" onChange={(value) => {
                                return handleInputChange(value, question.question);
                            }}>
                                {question?.options?.map((option) => (
                                    <div key={option} className="flex items-center mr-3">
                                        <Radio className={"mr-3"}
                                            value={option} />
                                        <RadioField >{option}</RadioField>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    );
                } else if (question.type === 'text_area') {
                    return (
                        <div key={question.question} className="my-4">
                            <label className="mb-3">{question.question}</label>
                            <Textarea
                                name={question.question}
                                handleChange={(value) => handleInputChange(value, question.question)}
                                className="my-2 text-xs font-normal text-[#898989] w-full"
                            />
                        </div>
                    );
                } else if (question.type === 'range_selector') {
                    return (
                        <div key={question.question} className="my-4">
                            <label className="mb-3">{question.question}</label>
                            <RangeSlider
                                min={question?.range?.min ? question?.range?.min : 0}
                                max={question?.range?.max ? question?.range?.max : 10}
                                step={question?.range?.step ? question?.range?.step : 1} label={`${question?.range?.value ? question?.range?.value : '0'}`} defaultValue={question?.range?.value ? question?.range?.value : 0} helpText={""}
                                onChange={(value) => handleInputChange(value, question.question)} />
                        </div>
                    );
                } else {
                    return null;
                }
            })}
            <div className="w-full flex justify-end">
                <Button className="cursor-pointer" type="submit">Answer Without Questions</Button>
            </div>
        </form>
    )
}

export default ChatbotForm