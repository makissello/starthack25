"use client";

import { useSearchParams } from "next/navigation";

export default function ResultPage() {
    const searchParams = useSearchParams();
    const persona = searchParams.get("persona");

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <h1 className="text-6xl font-bold text-black">{persona?.toUpperCase()}</h1>
        </div>
    );
}