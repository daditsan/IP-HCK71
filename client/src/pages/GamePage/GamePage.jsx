import { Link } from "react-router-dom";
import GameNavbar from "../../components/GameNavbar/GameNavbar";

export default function GamePage() {
  return (
    <>
      <GameNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen pt-16" style={{paddingTop: '300px'}}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
          <h1 className="text-xl font-semibold mb-4">Akinaprematur:</h1>
          <p className="text-gray-600">
            QUESTION FROM AI GENERATED HERE
          </p>
          
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
            <button>Yes</button>
            <button>No</button>
            <button>Maybe yes</button>
            <button>Maybe No</button>
            <button>I don&apos;t know</button>
          </div>
    </>
  );
}
