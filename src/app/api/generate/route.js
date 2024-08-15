import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards. Both front and back should be one sentence long. You should return in the following JSON format: {   "flashcards":[     {       "front": "Front of the card",       "back": "Back of the card"     }   ] }`;

export const POST = async (req) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  // Text sent from frontend
  const text = await req.text();

  try {
    const prompt = `${systemPrompt}\n${text}`;

    // Send the request to the Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let content = response.text();

    // Remove any markdown code block formatting if present
    content = content.replace(/^```json\s*/, "").replace(/\s*```$/, "");

    if (content) {
      try {
        const parsedContent = JSON.parse(content);
        if (
          parsedContent.flashcards &&
          Array.isArray(parsedContent.flashcards)
        ) {
          return new Response(JSON.stringify(parsedContent.flashcards), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } else {
          throw new Error("Response does not contain flashcards array");
        }
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return new Response(
          JSON.stringify({ error: "Invalid JSON response from API", content }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } else {
      throw new Error("Empty response from API");
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
