import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTelegram, FaTwitter, FaInstagram } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { MdGames } from "react-icons/md";

const Onboard = () => {
  const targetDate = new Date("2024-09-11T09:00:00");

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, difference };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  const { width, height } = useWindowSize(); // For confetti dimensions
  const [showMessage, setShowMessage] = useState(false); // Track if the time is up
  const [score, setScore] = useState(0); // Game score
  const [gameTimeLeft, setGameTimeLeft] = useState(20); // 20 seconds for the game
  const [isGameActive, setIsGameActive] = useState(false); // Game state
  const [name, setName] = useState(""); // Player's name
  const [gameFinished, setGameFinished] = useState(false); // Game finished state

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      if (updatedTimeLeft.difference <= 0) {
        clearInterval(timer);
        setShowMessage(true); // Show "Happy New Year" message
      }
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const springDays = useSpring({ value: timeLeft.days, from: { value: 0 } });
  const springHours = useSpring({ value: timeLeft.hours, from: { value: 0 } });
  const springMinutes = useSpring({
    value: timeLeft.minutes,
    from: { value: 0 },
  });
  const springSeconds = useSpring({
    value: timeLeft.seconds,
    from: { value: 0 },
  });

  // Start game logic
  const startGame = () => {
    setIsGameActive(true);
    setScore(0);
    setGameTimeLeft(20);
    setGameFinished(false);

    const gameTimer = setInterval(() => {
      setGameTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(gameTimer);
          setIsGameActive(false);
          setGameFinished(true);
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Game logic: Clicker game to increase score
  const handleClick = () => {
    if (isGameActive) {
      setScore(score + 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-800 via-indigo-600 to-purple-700 text-white p-4 relative overflow-hidden">
      {showMessage && <Confetti width={width} height={height} />}

      {showMessage ? (
        <div className="text-center z-10">
          <h1 className="text-6xl font-extrabold mb-4 animate-bounce">መልካም አዲስ ዓመት 🎉</h1>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 animate-fadeIn">
            Happy New Year! 🎊
          </h2>

          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center px-6 py-3 bg-yellow-500 text-black rounded-md shadow-lg hover:bg-yellow-400 transition gap-2 text-2xl"
          >
            🎁 Take a Gift!
          </a>
        </div>
      ) : (
        <div className="z-10 text-center">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg capitalize animate-pulse">
            New Year will be in
          </h1>

          <div className="grid grid-flow-col gap-6 sm:gap-8 text-center auto-cols-max z-10">
            <div className="flex flex-col p-4 bg-black bg-opacity-50 rounded-lg shadow-lg">
              <animated.span className="countdown font-mono text-5xl sm:text-7xl">
                {springDays.value.to((val) => Math.floor(val))}
              </animated.span>
              <span className="mt-2 text-lg sm:text-xl">days</span>
            </div>
            <div className="flex flex-col p-4 bg-black bg-opacity-50 rounded-lg shadow-lg">
              <animated.span className="countdown font-mono text-5xl sm:text-7xl">
                {springHours.value.to((val) => Math.floor(val))}
              </animated.span>
              <span className="mt-2 text-lg sm:text-xl">hours</span>
            </div>
            <div className="flex flex-col p-4 bg-black bg-opacity-50 rounded-lg shadow-lg">
              <animated.span className="countdown font-mono text-5xl sm:text-7xl">
                {springMinutes.value.to((val) => Math.floor(val))}
              </animated.span>
              <span className="mt-2 text-lg sm:text-xl">min</span>
            </div>
            <div className="flex flex-col p-4 bg-black bg-opacity-50 rounded-lg shadow-lg">
              <animated.span className="countdown font-mono text-5xl sm:text-7xl">
                {springSeconds.value.to((val) => Math.floor(val))}
              </animated.span>
              <span className="mt-2 text-lg sm:text-xl">sec</span>
            </div>
          </div>

          {/* Game */}
          <div className="mt-8 gap-6 flex justify-center items-baseline ">
            {!isGameActive && !gameFinished ? (
              <>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-4 px-4 py-2 text-black rounded-md"
                />
                <button
                  onClick={startGame}
                  disabled={!name}
                  className={`inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md shadow-lg transition gap-2 text-xl ${
                    !name ? "opacity-50 cursor-not-allowed" : "hover:bg-green-400"
                  }`}
                >
                  <MdGames /> Start Game!
                </button>
              </>
            ) : isGameActive ? (
              <>
                <h3 className="text-2xl mb-4">Click as fast as you can!</h3>
                <button
                  onClick={handleClick}
                  className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-md shadow-lg hover:bg-red-400 transition text-2xl"
                >
                  Click me!
                </button>
                <p className="mt-4 text-lg">Time left: {gameTimeLeft} seconds</p>
                <p className="mt-2 text-lg">Score: {score}</p>
              </>
            ) : (
              <div className="mt-4">
                <h2 className="text-3xl font-bold">Game Over!</h2>
                <p className="text-lg mt-2">
                  {name}, you have scored <span className="font-semibold">{score}</span> points!
                </p>
                <button
                  onClick={startGame}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-400 transition gap-2 text-xl"
                >
                  <MdGames /> Play Again!
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subtle Meskel flower animation */}
      <div className="absolute top-0 left-0 w-full h-full animate-floating-flower z-0">
        <img
          src="https://freesvg.org/img/meskel-daisy.png"
          alt="Meskel Flower"
          className="w-24 h-24 opacity-10"
        />
      </div>
    </div>
  );
};

export default Onboard;
