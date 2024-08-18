"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/ui/BackButton";

const FlashCard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    const getFlashcard = async () => {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = docs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFlashcards(flashcards);
    };
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <BackButton />
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {search} Flashcards
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashcards.map((flashcard) => (
          <div
            key={flashcard.id}
            className="flip-card cursor-pointer"
            onClick={() => handleCardClick(flashcard.id)}
          >
            <div
              className={`flip-card-inner ${
                flipped[flashcard.id] ? "is-flipped" : ""
              }`}
            >
              <div className="flip-card-front">
                <Card className="w-full h-full bg-gradient-to-br from-[#52C3FE] to-[#EC4899] text-white shadow-lg">
                  <CardHeader className="h-full flex items-center justify-center">
                    <CardTitle className="text-xl font-bold text-center">
                      Question
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-30">
                    <p className="text-sm">{flashcard.front}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="flip-card-back">
                <Card className="w-full h-full bg-gradient-to-br from-[#F8AD2D] to-[#EC4899] text-white shadow-lg">
                  <CardHeader className="h-full flex items-center justify-center">
                    <CardTitle className="text-xl font-bold text-center">
                      Answer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-30">
                    <p className="text-sm">{flashcard.back}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashCard;
