import { useState } from "react";
import { IoMdChatbubbles, IoMdSend } from "react-icons/io";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GeminiComponent: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Initialize the API key
  const apiKey = "AIzaSyDbFwxX0WuSLeoIoDGhrOxvMVw8pIgCWIw";
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleGenerateResponse = async () => {
    if (prompt.trim() === "") return;
    setLoading(true);

    try {
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      setResponse(responseText);

      setPrompt("");
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Error generating response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-50">
      {!isChatOpen && (
        <button
          className="fixed bottom-4 right-4 bg-gradient-to-br from-custom-blue to-custom-teal hover:bg-purple-600 p-4 rounded-full text-white shadow-lg z-50"
          onClick={() => setIsChatOpen(true)}
        >
          <IoMdChatbubbles size={24} />
        </button>
      )}

      {isChatOpen && (
        <div className="fixed bottom-4 right-4 sm:w-1/3 sm:h-1/3 lg:w-1/4 lg:h-1/2 rounded-xl shadow-lg p-4 flex flex-col justify-between bg-gradient-to-br from-custom-blue to-custom-teal text-white z-50">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-xl font-serif font-semibold">AI FOR YOU</h2>
            <button
              className="text-white hover:text-gray-200 text-2xl"
              onClick={() => setIsChatOpen(false)}
            >
              &times;
            </button>
          </div>

          <div className="flex-grow overflow-y-auto rounded-lg mb-4 p-4">
            {response ? (
              <p className="text-white whitespace-pre-wrap break-words">
                {response}
              </p>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <img
                  src="Robot.webp"
                  alt="Robot"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              rows={1}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            />
            <button
              onClick={handleGenerateResponse}
              disabled={loading}
              className={`absolute right-2 top-[45%] transform -translate-y-1/2 p-2 rounded-lg text-black font-semibold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-br from-custom-blue to-custom-teal text-gray-300"
              }`}
            >
              <IoMdSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiComponent;