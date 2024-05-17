"use client"

import { useEffect, useState } from "react";
import { Textarea, Input } from "../_shared";
import { Button } from "../_shared/catalyst/button";
import { RadioGroup, Radio, RadioField } from "../_shared/catalyst/radio";
import RangeSlider from "../_shared/rangeSlider";
import MarkdownView from "../_shared/MarkdownView";
import sample from "./sample.json"
import DropdownWithOtherOption, { Question } from "../_shared/DropdownWithOther";
import CheckboxGroupWithOtherOption from "../_shared/CheckboxGroupWithOther";
import { UpdatedRespondForm, respondForm } from "@/utils/types";

const initialState: UpdatedRespondForm = {
    introduction: '',
    questions: [],
}

const ChatbotForm = ({ index, respondData, setFormAnswers }: { index: number, respondData: string, setFormAnswers: Function }) => {
    const [formValues, setFormValues] = useState<UpdatedRespondForm>(initialState);
    const [content, setContent] = useState<respondForm>(sample);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (index === 10000) {
            console.log(sample);
            setFormValues({
                ...sample,
                questions: sample.questions.map((question: any) => ({
                    question: question.question,
                    answer: '',
                })),
            })
        } else {
            try {
                if (respondData) {
                    const content = JSON.parse(respondData);
                    if (isValidContent(content)) {
                        setContent(content);
                        setFormValues({
                            ...content,
                            questions: content.questions.map((question: any) => ({
                                question: question.question,
                                answer: '',
                            })),
                        });
                    } else {
                        setError("Invalid form data. Please check the content.");
                        console.error("Error parsing form data. Please check the content format.");
                    }
                }
            } catch (error) {
                setError("Error parsing form data. Please check the content format.");
                console.error(error);
            }
        }

    }, []);

    const isValidContent = (content: string): boolean => {
        try {
            JSON.parse(content);
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleInputChange = (value: any, question: string) => {
        const questionIndex = formValues.questions.findIndex(q => q.question === question);
        if (questionIndex !== -1) {
            const updatedQuestions = [...formValues.questions];
            if (updatedQuestions[questionIndex].type === 'yes_no') {
                updatedQuestions[questionIndex] = {
                    question,
                    answer: value,
                };
            } else if (updatedQuestions[questionIndex].type === 'checkboxes') {
                let answer: string[] = [];
                if (typeof updatedQuestions[questionIndex].answer === 'string') {
                    answer = (updatedQuestions[questionIndex].answer as string).split(', ');
                }
                if (answer.includes(value)) {
                    answer = answer.filter((item) => item !== value)
                } else {
                    answer.push(value);
                }
                updatedQuestions[questionIndex] = {
                    question,
                    answer: answer.length > 1 ? answer.join(', ') : answer[0],
                };
            } else {
                updatedQuestions[questionIndex] = {
                    question,
                    answer: value,
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
        setFormAnswers(formValues)
        console.log(formValues)
    }

    if (error) {
        return (
            <MarkdownView index={index} content={respondData} />
        )
    }

    return (
        <form onSubmit={submitForm} className="my-4 w-full rounded-lg p-6 text-xs">
            {content.questions.map((question) => {
                if (question.type === 'multiple_choice') {
                    return (
                        <div key={question.question} className="mb-8">
                            <label className="mb-3">{question.question}</label>
                            <DropdownWithOtherOption question={question as Question} handleInputChange={handleInputChange} />
                        </div>
                    );
                } else if (question.type === 'checkboxes') {
                    return (
                        <div key={question.question} className="my-8">
                            <label className="mb-3">{question.question}</label>
                            <CheckboxGroupWithOtherOption question={question as Question} handleInputChange={handleInputChange} />
                        </div>
                    );
                } else if (question.type === 'yes_no') {
                    return (
                        <div key={question.question} className="my-8">
                            <label className="mb-3">{question.question}</label>
                            <RadioGroup className="my-3 flex flex-row items-end mt-0" onChange={(value) => {
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
                        <div key={question.question} className="my-8">
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
                        <div key={question.question} className="my-8">
                            <label className="mb-3">{question.question}</label>
                            <RangeSlider
                                min={question?.range?.min ? question?.range?.min : 0}
                                max={question?.range?.max ? question?.range?.max : 10}
                                step={question?.range?.step ? question?.range?.step : 1} label={``} defaultValue={question?.range?.value ? question?.range?.value : 0} helpText={""}
                                onChange={(value) => handleInputChange(value, question.question)}
                            />
                        </div>
                    );
                } else if (question.type === 'input') {
                    return (
                        <div key={question.question} className="my-8">
                            <label className="mb-3">{question.question}</label>
                            <Input
                                placeholder="Enter your answer"
                                onChange={(value: any) => handleInputChange(value, question.question)}
                            />
                        </div>

                    );
                } else {
                    return <MarkdownView index={index} content={respondData} />
                }
            })}
            <div className="w-full flex justify-end">
                <Button className="cursor-pointer" type="submit">Answer Without Questions</Button>
            </div>
        </form>
    )
}

export default ChatbotForm