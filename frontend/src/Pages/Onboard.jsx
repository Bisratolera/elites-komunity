import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";

const Onboard = () => {
  // Set your target date and time (e.g., October 25, 2024, 14:30:00)
  const targetDate = new Date("2024-08-24T14:30:00");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    // Calculate time units from the difference
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, difference };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      if (updatedTimeLeft.difference <= 0) {
        clearInterval(timer);
      }
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
          Production will start in
        </h1>
        <p className="text-lg md:text-xl mb-4">
          Till then, grab your coffee and enjoy!
        </p>
        <div className=" gap-2 flex">
          <a
            href="https://github.com/bisratolera"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700 transition gap-2 "
          >
            <FaGithub />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/company/94135092/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700 transition gap-2 "
          >
            <FaLinkedin />
            linkedin
          </a>
          <a
            href="https://t.me/elites_et"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700 transition gap-2 "
          >
            <FaTelegram />
            telegram
          </a>
        </div>
      </div>
      <div className="grid grid-flow-col gap-6 sm:gap-8 text-center auto-cols-max">
        <div className="flex flex-col p-4 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <span className="countdown font-mono text-5xl sm:text-7xl">
            <span style={{ "--value": timeLeft.days }}>{timeLeft.days}</span>
          </span>
          <span className="mt-2 text-lg sm:text-xl">days</span>
        </div>
        <div className="flex flex-col p-4 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <span className="countdown font-mono text-5xl sm:text-7xl">
            <span style={{ "--value": timeLeft.hours }}>{timeLeft.hours}</span>
          </span>
          <span className="mt-2 text-lg sm:text-xl">hours</span>
        </div>
        <div className="flex flex-col p-4 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <span className="countdown font-mono text-5xl sm:text-7xl">
            <span style={{ "--value": timeLeft.minutes }}>
              {timeLeft.minutes}
            </span>
          </span>
          <span className="mt-2 text-lg sm:text-xl">min</span>
        </div>
        <div className="flex flex-col p-4 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <span className="countdown font-mono text-5xl sm:text-7xl">
            <span style={{ "--value": timeLeft.seconds }}>
              {timeLeft.seconds}
            </span>
          </span>
          <span className="mt-2 text-lg sm:text-xl">sec</span>
        </div>
      </div>
    </div>
  );
};

export default Onboard;