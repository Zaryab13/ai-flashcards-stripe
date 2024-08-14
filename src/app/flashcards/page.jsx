"use client";

import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useRouter } from "next/navigation"; // Changed from next/router
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Page to showw all the cards saved by the loggedin User
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
    <div className="max-w-full">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {flashcards.map((card, index) => (
          <div
            key={card.id || index}
            onClick={() => {
              handleCardClick(card.name);
            }}
            className="cursor-pointer"
          >
            <Card className="w-full h-full shadow-[0px_2px_8px_rgba(0,0,0,0.08),0px_-2px_8px_rgba(0,0,0,0.08)]">
              <CardHeader>
                <CardTitle>{card.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription></CardDescription>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
