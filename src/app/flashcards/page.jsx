"use client";

import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getFlashcards = async () => {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    };
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) return null;

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Flashcard Collections</h1>
      {flashcards.length === 0 ? (
        <p className="text-gray-600 text-lg">You haven't created any flashcard collections yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {flashcards.map((card, index) => (
            <div
              key={card.id || index}
              onClick={() => handleCardClick(card.name)}
              className="cursor-pointer transform transition duration-300 hover:scale-105"
            >
              <Card className="h-full border-2 border-gray-200 hover:border-[#EC4899] shadow-lg hover:shadow-xl">
                <CardHeader className="bg-gradient-to-r from-[#EC4899] to-[#F8AD2D]">
                  <CardTitle className="text-white text-xl font-semibold truncate">
                    {card.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <CardDescription className="text-gray-600">
                    Click to view and study this collection
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;