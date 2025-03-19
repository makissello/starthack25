"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const questions = [
    {
        text: "How much do you like to innovate?",
        options: [
            { answer: "I am happy with the status-quo, but let's see what's possible!", persona: "clueless" },
            { answer: "I see risk in innovating, but with a worked out concept maybe.", persona: "hesitant" },
            { answer: "I really want to innovate, but need help in doing so!", persona: "motivated" }
        ]
    },
    {
        text: "What is your main source of information, when it comes to business?",
        options: [
            { answer: "I rely on my business network such as suppliers.", persona: "clueless" },
            { answer: "I like to visit industry events for new information.", persona: "hesitant" },
            { answer: "I rely on industry news and magazines ", persona: "motivated" }
        ]
    },
    {
        text: "How do you usually network?",
        options: [
            { answer: "With phone calls.", persona: "clueless" },
            { answer: "By Social Media", persona: "hesitant" },
            { answer: "Through industry associations.", persona: "motivated" }
        ]
    },
];

export default function Onboarding() {
    const [step, setStep] = useState(-2); // -2: Welcome, -1: Name, 0: Workplace, then questions
    const [name, setName] = useState("");
    const [workplace, setWorkplace] = useState("");
    const [responses, setResponses] = useState({ clueless: 0, hesitant: 0, motivated: 0 });

    const router = useRouter(); // For navigation

    const handleAnswer = (persona: keyof typeof responses) => {
        setResponses((prev) => ({ ...prev, [persona]: prev[persona] + 1 }));
        setStep((prevStep) => prevStep + 1);
    };

    useEffect(() => {
        if (step === questions.length + 1) {
            // Determine highest persona
            const highestPersona = Object.keys(responses).reduce((a, b) =>
                responses[a as keyof typeof responses] > responses[b as keyof typeof responses] ? a : b
            );
            // Redirect to results page with persona
            router.push(`/result?persona=${highestPersona}`);
        }
    }, [step, responses, router]);

    const startQuestions = () => setStep(-1);
    const handleNameSubmit = () => name.trim() && setStep(0);
    const handleWorkplaceSubmit = () => workplace.trim() && setStep(1);

    return (
        <div className="flex flex-col h-screen bg-gray p-4">
            <div className="flex flex-row h-full">
                {/* Left Section (Speech Bubble & Questions) */}
                <div className="w-2/3 p-8 flex flex-col justify-center">
                    {/* Speech Bubble */}
                    <motion.div
                        className="p-10 bg-white border-4 border-black rounded-3xl shadow-xl text-black text-2xl font-semibold italic w-full"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {step === -2 ? (
                            <div>
                                <p className="text-3xl font-bold">Hello, I am Olma, your personal guide.</p>
                                <p className="mt-4 text-xl">
                                    To provide you with the best help, I’ll ask you a few questions.
                                </p>
                                <button
                                    onClick={startQuestions}
                                    className="mt-6 w-full bg-blue-500 border-2 border-black text-white text-xl font-bold py-4 px-8 rounded-xl shadow-md hover:bg-blue-600 transition-all"
                                >
                                    Start
                                </button>
                            </div>
                        ) : step === -1 ? (
                            <div>
                                <p className="text-3xl">Hey! What's your name?</p>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-4 w-full p-3 text-lg border-2 border-black rounded-lg"
                                    placeholder="Enter your name..."
                                />
                                <button
                                    onClick={handleNameSubmit}
                                    disabled={!name.trim()}
                                    className="mt-4 w-full bg-blue-500 border-2 border-black text-white text-xl font-bold py-3 px-6 rounded-xl shadow-md hover:bg-blue-600 transition-all disabled:bg-gray-400"
                                >
                                    Next
                                </button>
                            </div>
                        ) : step === 0 ? (
                            <div>
                                <p className="text-3xl">Where do you work, {name}?</p>
                                <input
                                    type="text"
                                    value={workplace}
                                    onChange={(e) => setWorkplace(e.target.value)}
                                    className="mt-4 w-full p-3 text-lg border-2 border-black rounded-lg"
                                    placeholder="Enter your workplace..."
                                />
                                <button
                                    onClick={handleWorkplaceSubmit}
                                    disabled={!workplace.trim()}
                                    className="mt-4 w-full bg-blue-500 border-2 border-black text-white text-xl font-bold py-3 px-6 rounded-xl shadow-md hover:bg-blue-600 transition-all disabled:bg-gray-400"
                                >
                                    Next
                                </button>
                            </div>
                        ) : step <= questions.length ? (
                            <div>
                                <p className="text-3xl">{questions[step - 1].text}</p>
                            </div>
                        ) : null}
                    </motion.div>

                    {/* Answer Options */}
                    {step > 0 && step <= questions.length && (
                        <div className="mt-8 w-full flex flex-col">
                            {questions[step - 1].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option.persona)}
                                    className="w-full bg-blue-500 border-2 border-black text-white text-xl font-bold py-4 px-8 rounded-xl shadow-md hover:bg-blue-600 transition-all mb-4"
                                >
                                    {option.answer}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Section (Avatar) */}
                <div className="w-1/3 flex justify-center items-center">
                    <img src="avatar2.png" alt="Avatar" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}