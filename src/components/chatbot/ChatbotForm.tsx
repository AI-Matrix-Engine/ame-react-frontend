"use client"

import { useEffect, useState } from "react";
import { Checkbox, Dropdown, RadioGroup, RadioGroupItem, Slider, Textarea } from "../_shared";
import sample from "./sample.json"

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
                const selectedValue = value.nativeEvent.target.value;
                updatedQuestions[questionIndex] = {
                    type: updatedQuestions[questionIndex].type,
                    question,
                    answer: selectedValue === 'Yes' ? 'Yes' : 'No',
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
                                placeHolder='Select an option'
                                onClick={(value) => handleInputChange(value, question.question)}
                                options={question.options ? question?.options?.map((option) => (
                                    { value: option, label: option }
                                )) : []}
                                className="my-2 text-xs font-normal text-[#898989] w-full"
                            />
                            {otherOptionValue === "user" && (
                                <input
                                    type="text"
                                    value={otherOptionValue}
                                    onChange={(e) => setOtherOptionValue(e.target.value)}
                                />
                            )}
                        </div>
                    );
                } else if (question.type === 'checkboxes') {
                    return (
                        <div key={question.question} className="my-4">
                            <label className="mb-3">{question.question}</label>
                            {question?.options?.map((option) => (
                                <div key={option} className="my-2 flex items-center justify-start">
                                    <Checkbox
                                        name={question.question}
                                        value={option}
                                        onChange={(value) => handleInputChange(option, question.question)}
                                    />
                                    <label className="ml-3 text-xs font-normal">{option}</label>
                                </div>
                            ))}
                        </div>
                    );
                } else if (question.type === 'yes_no') {
                    return (
                        <div key={question.question} className="my-4">
                            <label className="mb-3">{question.question}</label>
                            <RadioGroup className="my-3 flex items-center" onChange={(value) => handleInputChange(value, question.question)}>
                                {question?.options?.map((option) => (
                                    <div key={option} className="flex items-center justify-start mr-3">
                                        <RadioGroupItem
                                            value={option}
                                        />
                                        <label className="ml-3">{option}</label>
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
                            <Slider
                                min={question?.range?.min ? question?.range?.min : 0}
                                max={question?.range?.max ? question?.range?.max : 10}
                                step={question?.range?.step ? question?.range?.step : 1}
                                className="my-3 text-xs font-normal text-[#898989] w-full cursor-grab"
                                onChange={(value) => handleInputChange(value, question.question)}
                            />
                            <span>{ }</span>
                        </div>
                    );
                } else {
                    return null;
                }
            })}
            <div className="w-full flex justify-end">
                <button className="py-2 px-4 rounded-lg bg-[#dededea1]" type="submit">Answer Without Questions</button>
            </div>
        </form>
    )
}

export default ChatbotForm