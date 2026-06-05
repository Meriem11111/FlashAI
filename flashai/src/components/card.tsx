"use client";

import React from "react";
// import Image from "next/image";

type Props = {
    onGenerate:(topic:string) => void
    // onBack:()=>void
}

type Flashcard = {
    question: string;
    answer: string;
}

export default function TopicCard({onGenerate}: Props){
    const[topic, setTopic] = React.useState('')
    const[isGenerated, setIsGenerated] = React.useState(false)
    const[isFlipped, setIsFlipped] = React.useState(false)
    const[flashcards, setFlashcards] = React.useState<Flashcard[]>([])
    const[currentIndex, setCurrentIndex] = React.useState(0)
    const[isAddingNew, setIsAddingNew] = React.useState(false)

    const handleGenerate = () => {
        if (topic.trim()) {
            const newCard: Flashcard = {
                question: topic,
                answer: "This is the answer to: " + topic
            }
            setFlashcards([...flashcards, newCard])
            setCurrentIndex(flashcards.length)
            setIsGenerated(true)
            setTopic('')
            setIsFlipped(false)
            onGenerate(topic.trim())
        }
    }

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setIsFlipped(false)
        }
    }

    const handleAddCard = () => {
        setIsFlipped(false)
        setTopic('')
        setIsAddingNew(true)
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            setIsFlipped(false)
            setIsAddingNew(false)
        }
    }

    const handleGoBack = () => {
        setFlashcards([])
        setCurrentIndex(0)
        setIsGenerated(false)
        setTopic('')
        setIsFlipped(false)
        setIsAddingNew(false)
    }

    if (!isGenerated) {
        return (
            <div className="w-140 h-94 bg-slate-700 bg-opacity-90 p-8 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center shadow-lg border border-slate-800">
                <textarea
                    autoFocus
                    value={topic}
                    placeholder="Type your topic here..."
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full h-48 bg-transparent border-none outline-none resize-none text-lg text-white placeholder-slate-400 font-semibold"
                />

                <button
                    onClick={handleGenerate}
                    disabled={!topic.trim()}
                    className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                    GENERATE
                </button>
            </div>
        )
    }

    if (isAddingNew) {
        return (
            <div className="flex flex-col items-center gap-4">
                <div className="w-140 h-94 bg-slate-700 bg-opacity-90 p-8 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center shadow-lg border border-slate-800">
                    <textarea
                        autoFocus
                        value={topic}
                        placeholder="Type your next topic here..."
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full h-48 bg-transparent border-none outline-none resize-none text-lg text-white placeholder-slate-400 font-semibold"
                    />

                <button
                    onClick={() => {
                        if (topic.trim()) {
                            const newCard: Flashcard = {
                                question: topic,
                                answer: "This is the answer to: " + topic
                            }
                            setFlashcards([...flashcards, newCard])
                            setCurrentIndex(flashcards.length)
                            setTopic('')
                            setIsFlipped(false)
                            setIsAddingNew(false)
                            onGenerate(topic.trim())
                        }
                    }}
                    disabled={!topic.trim()}
                    className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                    GENERATE
                </button>
                </div>
            </div>
        )
    }

    const currentCard = flashcards[currentIndex]

    return (
        <div className="flex flex-col items-center gap-4">
            <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-140 h-94 bg-slate-700 bg-opacity-90 p-8 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center shadow-lg border border-slate-800 cursor-pointer transition-transform duration-500 hover:shadow-2xl"
                style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                <style>{`
                    .flip-text {
                        transform: rotateY(180deg);
                    }
                `}</style>
                
                {!isFlipped ? (
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Question</h3>
                        <p className="text-lg text-white">{currentCard.question}</p>
                    </div>
                ) : (
                    <div className="text-center flip-text">
                        <h3 className="text-2xl font-bold text-indigo-300 mb-4">Answer</h3>
                        <p className="text-lg text-white">{currentCard.answer}</p>
                    </div>
                )}
            </div>

            <div className="flex gap-3 items-center justify-center flex-wrap">
                {currentIndex > 0 && (
                    <button
                        onClick={handlePrevious}
                        className="px-5 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition duration-300 shadow-md text-sm"
                    >
                        ← PREVIOUS
                    </button>
                )}
                
                <span className="text-slate-300 font-semibold text-sm px-4 py-2 bg-slate-800 rounded-lg">
                    {currentIndex + 1} / {flashcards.length}
                </span>

                {currentIndex < flashcards.length - 1 && (
                    <button
                        onClick={handleNext}
                        className="px-5 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition duration-300 shadow-md text-sm"
                    >
                        NEXT →
                    </button>
                )}

                <button
                    onClick={handleAddCard}
                    className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md text-sm"
                >
                    + ADD CARD
                </button>
            </div>
        </div>
    )
}