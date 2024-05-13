"use client"

import { useEffect, useState } from "react";
import { Dropdown, Label, RadioGroup, Textarea } from "../_shared";
import { Checkbox } from "@radix-ui/react-checkbox";
import RangeSlider from "../_shared/rangeSlider";
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

    const handleInputChange = (value: any) => {
        const updatedQuestions = formValues.questions.map((questionData) => {
            if (typeof value === 'boolean') {
                return {
                    ...questionData,
                    answer: value ? 'Yes' : 'No',
                };
            } else {
                return {
                    ...questionData,
                    answer: value,
                };
            }
        })
        setFormValues({
            ...formValues,
            questions: updatedQuestions,
        });
    };

    return (
        <form>
            {respondData.questions.map((question) => {
                if (question.type === 'multiple_choice') {
                    return (
                        <div key={question.question}>
                            <Label>{question.question}</Label>
                            <Dropdown
                                isLabel={true}
                                value={question.question}
                                onClick={(value) => handleInputChange(value)}
                                options={question.options ? question?.options?.map((option) => (
                                    { value: option, label: option }
                                )) : []}
                            />
                        </div>
                    );
                } else if (question.type === 'checkboxes') {
                    return (
                        <div key={question.question}>
                            <Label>{question.question}</Label>
                            {question?.options?.map((option) => (
                                <div key={option}>
                                    <Checkbox
                                        name={question.question}
                                        value={option}
                                        onClick={(value) => handleInputChange(value)}
                                    />
                                    <label>{option}</label>
                                </div>
                            ))}
                        </div>
                    );
                } else if (question.type === 'yes_no') {
                    return (
                        <div key={question.question}>
                            <Label>{question.question}</Label>
                            {question?.options?.map((option) => (
                                <div key={option}>
                                    <RadioGroup
                                        name={question.question}
                                        value={option}
                                    />
                                    <label>{option}</label>
                                </div>
                            ))}
                        </div>
                    );
                } else if (question.type === 'text_area') {
                    return (
                        <div key={question.question}>
                            <Label>{question.question}</Label>
                            <Textarea
                                name={question.question}
                                required
                            />
                        </div>
                    );
                } else if (question.type === 'range_selector') {
                    return (
                        <div key={question.question}>
                            <label>{question.question}</label>
                            <RangeSlider
                                min={question?.range?.min ? question?.range?.min : 0}
                                max={question?.range?.max ? question?.range?.max : 10}
                                step={question?.range?.step ? question?.range?.step : 1}
                                defaultValue={question?.range?.value ? question?.range?.value : 0} label={""} helpText={""} />
                            <span>{question?.range?.value}</span>
                        </div>
                    );
                } else {
                    return null;
                }
            })}
            <button type="submit">Answer Without Questions</button>
        </form>
    )
}

export default ChatbotForm