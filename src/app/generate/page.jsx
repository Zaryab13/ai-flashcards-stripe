"use client";

import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { db } from "../../firebase";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sparkles, Save, LucideSunset, Loader2 } from "lucide-react";
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
import { colors } from "@/theme";
import { useToast } from "@/components/ui/use-toast";

const Generate = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState(Array(flashcards.length).fill(false));
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!text.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some text to generate flashcards",
      });
      return;
    }
    generateFlashcards(text);
    setText("");
  };
  const generateFlashcards = async (inputText) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: inputText,
      });

      if (!response.ok) {
        setIsGenerating(false);

        toast({ description: "Failed to generate flashcards" });
      }

      const data = await response.json();

      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      toast({
        title: "Server Error",
        description:
          "An error occurred while generating flashcards. Please try again.",
      });
    }
    setIsGenerating(false);
  };

  const handleCardClick = (index) => {
    setFlipped((prevState) => {
      const newFlipped = [...prevState];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const handleViewAll = () => {
    if (!name) {
      toast({
        description: "Please save the flashcards first before viewing them.",
      });
    } else {
      router.push(`/flashcard?id=${name}`);
    }
  };

  const handleOpen = () => {
    if (flashcards.length === 0) {
      toast({
        description:
          "Please generate flashcards before attempting to save them.",
      });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      toast({
        description: "Please enter a name",
      });
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];

      if (collections.find((f) => f.name === name)) {
        toast({
          title: "Duplication of Name",
          description: "A flashcard with this name already exists",
        });
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
    router.push(`/flashcard?id=${name}`);
  };

  const dummyText = `Sunsets only exist because Earth’s atmosphere acts as a prism for light. In scientific terms, it’s called “scattering”. 
  Molecules and particles in the atmosphere (which are more numerous at sunset) scatter short-wavelength violet and blue light away from your eyes, so we can see the other colors on the spectrum, like yellow and orange.

  The most remote place in the world is the Tristan da Cunha islands in the Southern Atlantic Ocean. They’re 2,434km from Saint Helena, the nearest inhabited place. Imagine Mum sends you out for groceries but the local supermarket is closed? That’s a long trip.
  
  When you do a Google query, 1000 computers are used to find the answer in 0.2 seconds.
  
  There are almost 5 billion internet users in the world.
  
  The median age of the world’s population is around 30 years, as of 2019.
  
  We actually produce enough food to feed everyone on the planet; the problem is distribution.
  
  In 2010, Google tried to find out how many books there were in the world. They reckon there are about 130,000,000 of them.
  
  A tiger’s roar can be heard up to two miles away.
  
  The Earth is 147.2 million kilometers away from the Sun, and it’s about 4.5 billion years old.
  
  Owls don’t have eyeballs.`;
  return (
    <section className="flex items-center justify-center h-fit md:h-hero w-full">
      <div className="w-full sm:w-4/5">
        <div className="py-20 max-w-full flex items-center h-full justify-start flex-col">
          <MainHeader className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-center mb-4 bg-gradient-to-r from-[#EC4899] to-[#52C3FE] text-transparent bg-clip-text">
            Transform Text into Flash Cards!
          </MainHeader>
          <form className="grid w-full gap-2 py-2" onSubmit={handleSubmit}>
            <Textarea
              id="message"
              name="message"
              className="w-full p-3 text-gray-800"
              rows={4}
              value={text}
              placeholder="Type text to generate flash cards"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />

            <div className="flex flex-wrap mt-3 md:flex-row justify-center items-stretch sm:items-center gap-4 md:space-y-0 md:space-x-4">
              <Button
                variant="default2"
                className="w-[80%] xs:w-fit md:text-lg sm:text-sm md:w-auto rounded-full md:pt-6 md:pb-6  hover:bg-gradient-to-r from-[#EC4899] to-[#52C3FE] transition-all"
                type="submit"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="size-10 mr-2 animate-spin text-gray-400" />
                ) : (
                  "Generate"
                )}
                <pre> </pre> <Sparkles className="inline-block w-5 h-5 mr-2" />
              </Button>
              <Button
                variant="outline2"
                className="w-[80%] xs:w-fit rounded-full md:w-auto md:pt-6 md:pb-6  md:text-base  sm:text-sm "
                onClick={handleOpen}
              >
                Save Flashcards <pre> </pre>{" "}
                <Save className="inline-block w-5 h-5" />
              </Button>
              <Button
                variant="pinkBtn"
                className="w-[80%] xs:w-fit rounded-full flex items-center !mx-0 gap-2 md:pt-6 md:pb-6 md:text-base  sm:text-sm border border-[#EC4899]  "
                onClick={(e) => {
                  e.preventDefault();
                  setText(dummyText);
                  generateFlashcards(dummyText);
                }}
              >
                Funfacts
                <LucideSunset className="inline-block w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>

        <Dialog open={open}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Save Flashcards</DialogTitle>
              <DialogDescription>
                Please enter a name for your flashcards collection
              </DialogDescription>
            </DialogHeader>
            <div className="my-4">
              <Label htmlFor="collectionName">
                <span style={{ color: colors.colors.yellow }}>
                  Collection Name
                </span>
              </Label>
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
                  variant="outline2"
                  className="transition-all"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
              <div>
                <Button
                  type="button"
                  variant="default2"
                  className="border bg-[#EC4899] bg-transparent text-slate-900 hover:border-transparent hover:bg-[#c6357d] hover:text-white transition-all"
                  onClick={saveFlashcards}
                >
                  Save
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-6">
          {flashcards.slice(0, 2).map((flashcard, index) => (
            <div
              key={index}
              className="flip-card cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div
                className={`flip-card-inner ${
                  flipped[index] ? "is-flipped" : ""
                }`}
              >
                <div className="flip-card-front">
                  <Card className="w-full h-full bg-gradient-to-br from-[#52C3FE] to-[#EC4899] text-white shadow-lg">
                    <CardHeader className="h-full flex items-center justify-center">
                      <CardTitle className="text-xl font-bold text-center flex flex-col items-center gap-2">
                        Question
                        <span>Click to Flip</span>
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
          {flashcards.length > 0 && (
            <>
              <Button
                variant="default2"
                onClick={() => {
                  handleOpen();
                }}
              >
                Save Cards
              </Button>
              <Button
                variant="outline2"
                onClick={() => {
                  handleViewAll();
                }}
              >
                View All
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Generate;
