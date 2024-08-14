"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Indivdual page for Saved Cards
const FlashCard = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const searchParams = useSearchParams();

  const search = searchParams.get("id");

  useEffect(() => {
    const getFlashcard = async () => {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);

      const docs = await getDocs(colRef);

      const flashcards = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    };
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
    if (!isLoaded || !isSignedIn) return null;

    return <></>;
  };

  return (
    <div className="grid grid-cols-2 gap-4 py-4">
      {flashcards.map((flashcard, index) => (
        <div
          key={index}
          className={`flashcard-styles cursor-pointer ${
            flipped[index] ? "flashcard-flipped" : ""
          }`}
          onClick={() => handleCardClick(index)}
        >
          <div>
            <div>
              <Card className="w-full h-full shadow-[0px_2px_8px_rgba(0,0,0,0.08),0px_-2px_8px_rgba(0,0,0,0.08)]">
                <CardHeader>
                  <CardTitle>Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{flashcard.front}</CardDescription>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="w-full h-full shadow-[0px_2px_8px_rgba(0,0,0,0.08),0px_-2px_8px_rgba(0,0,0,0.08)]">
                <CardHeader>
                  <CardTitle>Answer</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{flashcard.back}</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlashCard;
