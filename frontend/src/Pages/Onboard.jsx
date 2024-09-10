import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const Onboard = () => {
  // Set your target date and time (e.g., September 11, 2024, 09:00:00)
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

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      if (updatedTimeLeft.difference <= 0) {
        clearInterval(timer);
      }
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animation for countdown numbers
  const springDays = useSpring({ value: timeLeft.days, from: { value: 0 } });
  const springHours = useSpring({ value: timeLeft.hours, from: { value: 0 } });
  const springMinutes = useSpring({ value: timeLeft.minutes, from: { value: 0 } });
  const springSeconds = useSpring({ value: timeLeft.seconds, from: { value: 0 } });

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4 relative overflow-hidden">
      {timeLeft.difference <= 0 && <Confetti width={width} height={height} />}
      
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg capitalize animate-pulse">
          New Year will be in
        </h1>
        <p className="text-lg md:text-xl mb-4 animate-fadeIn">
          እንኳን ከዘመነ ዮሃንስ ወደ ዘመነ ማቴዎስ በሰላም አደረሳችሁ። 
        </p>
        <div className=" gap-2 flex">
          <a
            href="https://github.com/bisratolera"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700 transition gap-2 animate-bounce"
          >
            <FaGithub />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/company/94135092/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700 transition gap-2 animate-bounce"
          >
            <FaLinkedin />
            LinkedIn
          </a>
          <a
            href="https://t.me/elites_et"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700 transition gap-2 animate-bounce"
          >
            <FaTelegram />
            Telegram
          </a>
        </div>
      </div>
      
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

      {/* Subtle Meskel flower animation */}
      <div className="absolute top-0 left-0 w-full h-full animate-floating-flower">
        <img src="/path-to-meskel-flower-image.png" alt="Meskel Flower" className="w-24 h-24 opacity-10" />
      </div>
    </div>
  );
};

export default Onboard;
