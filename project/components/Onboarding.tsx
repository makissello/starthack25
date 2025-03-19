"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
    {
        text: "How familiar are you with innovation and entrepreneurship?",
        options: [
            { answer: "Not at all. It’s all new to me.", persona: "clueless" },
            { answer: "I know a little but don’t know how to start.", persona: "hesitant" },
            { answer: "I have some experience and am eager to do more.", persona: "motivated" }
        ]
    },
    {
        text: "Imagine you come across an exciting new idea. What’s your first thought?",
        options: [
            { answer: "I wouldn’t know if it's good or bad.", persona: "clueless" },
            { answer: "Sounds interesting, but I’d need help making it real.", persona: "hesitant" },
            { answer: "Awesome! Let’s explore how to build on it!", persona: "motivated" }
        ]
    },
    {
        text: "3?",
        options: [
            { answer: "I wouldn’t know if it's good or bad.", persona: "clueless" },
            { answer: "Sounds interesting, but I’d need help making it real.", persona: "hesitant" },
            { answer: "Awesome! Let’s explore how to build on it!", persona: "motivated" }
        ]
    },
    {
        text: "4",
        options: [
            { answer: "I wouldn’t know if it's good or bad.", persona: "clueless" },
            { answer: "Sounds interesting, but I’d need help making it real.", persona: "hesitant" },
            { answer: "Awesome! Let’s explore how to build on it!", persona: "motivated" }
        ]
    },
];

export default function Onboarding() {
    const [step, setStep] = useState(0);
    const [responses, setResponses] = useState({ clueless: 0, hesitant: 0, motivated: 0 });

    const handleAnswer = (persona: keyof typeof responses) => {
        setResponses((prev) => ({ ...prev, [persona]: prev[persona] + 1 }));
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            determinePersona();
        }
    };

    const determinePersona = () => {
        const maxPersona = Object.keys(responses).reduce((a, b) =>
            responses[a as keyof typeof responses] > responses[b as keyof typeof responses] ? a : b
        );
        alert(`Your persona is: ${maxPersona}`);
    };


    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-blue-200 p-4">
            <div className="flex flex-row h-full">
                {/* The left two-thirds */}
                <div className="flex-2"></div>

                {/* The image container which takes up the right third */}
                <div className="flex-1 flex justify-center items-center">
                    <img src="avatar.png" alt="Avatar" className="w-full h-full object-cover"/>
                </div>
            </div>
        </div>
    );
    /**return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="mb-4">
                    <img src="/avatar.png" alt="Avatar" className="w-24 h-24 mx-auto" />
                </div>
                <p className="text-lg font-semibold mb-4">{questions[step].text}</p>
                {questions[step].options.map((option, index) => (
                    <button
                        key={index}
                        className="block w-full bg-blue-500 text-white py-2 px-4 rounded-lg mb-2 hover:bg-blue-700 transition"
                        onClick={() => handleAnswer(option.persona)}
                    >
                        {option.answer}
                    </button>
                ))}
            </motion.div>
        </div>
    ); */
}