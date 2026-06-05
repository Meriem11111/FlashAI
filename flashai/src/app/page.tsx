"use client";
// import Image from "next/image";
import React from "react";
import TopicCard from '@/components/card'

export default function Home() {

  const [isStarted, setIsStarted] = React.useState(false);
  return (
    <div className="background-pattern pt-10 flex font-bold flex-col flex-1 items-center justify-center gap-8 font-sans min-h-screen">
     <h1 className="text-6xl font-bold text-center text-white drop-shadow-lg">
        FLASHAI
      </h1>

    {!isStarted ? ( 
      <div className="max-w-2xl text-center bg-amber-900 bg-opacity-50 p-8 rounded-2xl backdrop-blur-sm">

        <p className="text-xl text-white drop-shadow-md leading-relaxed">
          Generate AI-powered flashcards from any topic. Learn faster, revise smarter, and test your knowledge instantly
        </p>
        
        <button
        onClick={() => setIsStarted(true)}
         className="mt-6 px-8 py-4 bg-olive-600 text-white font-bold rounded-xl font-semibold hover:bg-olive-700 transition duration-300 shadow-lg">GET STARTED</button>

      </div>
      ):(
        <div className="flex flex-col items-center gap-6">

        <TopicCard
          onGenerate={(topic) => {
            console.log('Generate:', topic) 
          }}
          onBack={() => setIsStarted(false)}
        />
        
        <button
          onClick={() => setIsStarted(false)}
          className="px-8 py-4 bg-olive-600 text-white font-bold rounded-xl font-semibold hover:bg-olive-700 transition duration-300 shadow-lg"
        >
          GO BACK
        </button>

        </div>
      )}
    
    </div>
  );
}