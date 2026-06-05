"use client";

import React from "react";
// import Image from "next/image";

type Props = {
    onGenerate:(topic:string) => void
    onBack:()=>void
}

export default function TopicCard({onGenerate, onBack}: Props){
    const[topic, setTopic] = React.useState('')
    const[click, setclick] = React.useState(false)
    

    return (
        <div className="w-140 h-94 bg-amber-900 bg-opacity-80 p-8 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center">
            <textarea
                autoFocus
                value={topic}
                placeholder="Type your topic here..."
                onChange={(e) => setTopic(e.target.value)}
                className="w-full h-48 bg-transparent border-none outline-none resize-none text-lg text-amber-950 placeholder-amber-900/50 font-semibold"
            />

            {!click ? (
                <button
                    onClick={() => {
                        if (topic.trim()) {
                            setclick(true);
                            onGenerate(topic);
                        }
                    }}
                    disabled={!topic.trim()}
                    className="mt-6 px-8 py-4 bg-olive-600 text-white font-bold rounded-xl font-semibold hover:bg-olive-700 transition duration-300 shadow-lg"
                >
                    GENERATE
                </button>
            ) : (
                <p
                    className="mt-6 px-8 py-4 bg-gray-400 text-white font-bold rounded-xl font-semibold cursor-not-allowed"
                >
                    GENERATING...
                </p>
            )}

        </div>
    )
}