"use client";

import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { db } from "../../firebase";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MainHeader from "@/components/ui/MainHeader";

const Generate = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
    setText("");
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];

      if (collections.find((f) => f.name === name)) {
        alert("A flashcard with this name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }
    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push(`/flashcards/${name}`);
  };

  return (
    <section className=" mx-auto max-w-xl">
      <div className="pt-4 pb-6  flex items-center h-full justify-center flex-col">
        <MainHeader>Generate Flashcards</MainHeader>
        <form className="grid w-full gap-2" onSubmit={handleSubmit}>
          <Label htmlFor="message">Your message</Label>
          <Textarea
            id="message"
            name="message"
            className="w-full p-3 text-gray-800"
            rows={10}
            value={text}
            placeholder="Type your message here."
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <Button type="submit">Generate Flashcards</Button>
        </form>
      </div>
      <Button
        variant="outline"
        onClick={() => {
          handleOpen();
        }}
      >
        Save Flashcards
      </Button>

      <Dialog open={open}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Flashcards</DialogTitle>
            <DialogDescription>
              Please enter a name for your flashcards collection
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Label htmlFor="collectionName">Collection Name</Label>
            <Input
              id="collectionName"
              value={name}
              placeholder="Enter the name here"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <DialogFooter className="sm:justify-end">
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="hover:bg-gray-200 transition-all"
                onClick={() => {
                  handleClose();
                }}
              >
                Close
              </Button>
            </div>
            <div>
              <Button
                type="button"
                className="border border-green-600 bg-transparent text-slate-900 hover:border-transparent hover:bg-green-600 hover:text-white transition-all"
                onClick={saveFlashcards}
              >
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {flashcards.length > 0 && (
        <div className="py-8">
          <h5 className="text-xl font-medium mb-6">Flashcards Preview</h5>
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
        </div>
      )}
    </section>
  );
};

export default Generate;
