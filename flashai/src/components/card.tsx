"use client";

import React from "react";
// import Image from "next/image";

type Props = {
    // onGenerate:(topic:string) => void
    onBack:()=>void
}

type Flashcard = {
    question: string;
    answer: string;
}

type topicGroup = {
    topic : string;
    cards : Flashcard[];
    startIndex: number;
}

export default function TopicCard({ onBack}: Props){
    const[topic, setTopic] = React.useState('')
    const[isGenerated, setIsGenerated] = React.useState(false)
    const[isFlipped, setIsFlipped] = React.useState(false)
    const[flashcards, setFlashcards] = React.useState<Flashcard[]>([])
    const[currentIndex, setCurrentIndex] = React.useState(0)
    const[isAddingNew, setIsAddingNew] = React.useState(false)
    const [isGenerating, setIsGenerating] = React.useState(false)
    const [error, setError] = React.useState('')
    const[topicGrp, settopicGrp] = React.useState<topicGroup[]>([])

    const handleGenerate = async () => {
        if (!topic.trim()) 
            return
        
        setIsGenerating(true)
        setError('')
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic })
            })
            
            const data = await res.json()
            if(data.cards && data.cards.length > 0) {
                const newCards = isAddingNew ? [...flashcards, ...data.cards] : data.cards
                const newTopicGroup : topicGroup = {
                    topic,
                    cards: data.cards,
                    startIndex: isAddingNew ? flashcards.length : 0,
                }
                settopicGrp([...topicGrp, newTopicGroup])
                setFlashcards(newCards)
                setCurrentIndex(isAddingNew ? flashcards.length : 0)
                setIsGenerated(true)
                setIsAddingNew(false)
                setTopic('')
                setIsFlipped(false)
                // onGenerate(topic.trim())
            } else {
                setError('Failed to generate flashcards. Please try again.')
            }
        } catch (error) {
            console.error('Error generating flashcards:', error)
            setError('Network error. Please check your connection and try again.')
        } finally {
            setIsGenerating(false)
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
                    disabled={isGenerating}
                    className="w-full h-48 bg-transparent border-none outline-none resize-none text-lg text-white placeholder-slate-400 font-semibold disabled:opacity-50"
                />
                
                {error && (
                    <div className="mt-3 p-3 bg-red-600 text-white rounded-lg text-sm text-center w-full">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleGenerate}
                    disabled={!topic.trim() || isGenerating}
                    className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                    {isGenerating ? 'GENERATING...' : 'GENERATE'}
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
                        disabled={isGenerating}
                        className="w-full h-48 bg-transparent border-none outline-none resize-none text-lg text-white placeholder-slate-400 font-semibold disabled:opacity-50"
                    />
                    
                    {error && (
                        <div className="mt-3 p-3 bg-red-600 text-white rounded-lg text-sm text-center w-full">
                            {error}
                        </div>
                    )}

                <button
                    onClick={handleGenerate}
                    disabled={!topic.trim() || isGenerating}
                    className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                    {isGenerating ? 'GENERATING...' : 'GENERATE'}
                </button>
                </div>
            </div>
        )
    }

    const currentCard = flashcards[currentIndex]

    return (
    
    <div className="flex gap-6 items-start">
        
    <div className="flex gap-6 items-start">  
       <button
        onClick={onBack}
        className="px-8 py-4 bg-slate-500 text-white font-bold rounded-xl font-semibold hover:bg-slate-700 transition duration-300 shadow-lg"
        >
        GO BACK
        </button>
    </div>

    
   
    <div className="w-48 bg-slate-800 bg-opacity-90 rounded-2xl p-4 shadow-lg border border-slate-700 flex flex-col gap-2">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
        Topics
      </h3>
      {topicGrp.map((group, i) => (
        <button
          key={i}
          onClick={() => {
            setCurrentIndex(group.startIndex)
            setIsFlipped(false)
          }}
          className={`text-left px-3 py-2 rounded-lg text-sm font-semibold transition duration-200 truncate
            ${currentIndex >= group.startIndex && 
              (i === topicGrp.length - 1 || currentIndex < topicGrp[i + 1].startIndex)
              ? 'bg-indigo-600 text-white'  
              : 'text-slate-300 hover:bg-slate-700'
            }`}
        >
          {group.topic}
        </button>
      ))}
      </div>


        <div className="flex flex-col items-center gap-4">
            <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-140 h-94 cursor-pointer"
            style={{ perspective: "1000px" }}>
            <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                <div
                    className="absolute inset-0 bg-slate-700 bg-opacity-90 p-8 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center shadow-lg border border-slate-800"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <h3 className="text-2xl font-bold text-white mb-4">Question</h3>
                    <p className="text-lg text-white text-center">{currentCard.question}</p>
                </div>
                <div
                    className="absolute inset-0 bg-slate-700 bg-opacity-90 p-8 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center shadow-lg border border-slate-800"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">Answer</h3>
                    <p className="text-lg text-white text-center">{currentCard.answer}</p>
                </div>
            </div>
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
                    + ADD TOPIC
                </button>
            </div>
        </div>
    </div>
    )
}