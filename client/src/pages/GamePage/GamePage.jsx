import { useState, useEffect } from "react";
import axios from "axios";

import GameNavbar from "../../components/GameNavbar/GameNavbar";
import alertError from "../../utils/toastify";

export default function GamePage() {
  const [aiRes, setAiRes] = useState({});
  const [aiPromt, setAiPrompt] = useState("");
  const [gameState, setGameState] = useState("not_start");

  

  const postAiPrompt = async (userAnswer) => {
    try {
      let { data } = await axios({
        method: "POST",
        url: `http://localhost:3002/game`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {
          aiPromt: aiPromt,
          userAnswer: userAnswer,
        },
      });

      // console.log(data);
      setAiRes(data.Question)
      setAiPrompt("");
      
    } catch (error) {
      alertError(error.response?.data?.message || error.message, "error");
      console.error(error);
    }
  };
  // untuk ngecek respon dari AI setelah di prompt melalui method post
  // console.log(aiRes);

  return (
    <>
      <GameNavbar />
      <div
        className="flex flex-col items-center justify-center min-h-screen pt-16"
        style={{ paddingTop: "300px" }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mb-5">
          <h1 className="text-xl font-semibold mb-4">Akinaprematur:</h1>
          <p className="text-gray-600">{JSON.stringify(aiRes)}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
        {gameState === "not_start" ? (
          <button
            onClick={() => {setGameState("started"), postAiPrompt('start the game')}}
            className="w-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Start Game
          </button>
        ) : (
          // <ul>
          //   <li>
          //     <button
          //       type="button"
          //       onClick={() => postAiPrompt("character")}
          //       className="w-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          //     >
          //       Character
          //     </button>
          //   </li>
          //   <li>
          //     <button
          //       type="button"
          //       onClick={() => postAiPrompt("animal")}
          //       className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          //     >
          //       Animal
          //     </button>
          //   </li>
          // </ul>
          
          <ul>
            <li>
              <button
                type="button"
                onClick={() => postAiPrompt("yes")}
                className="w-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Yes
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => postAiPrompt("no")}
                className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                No
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
