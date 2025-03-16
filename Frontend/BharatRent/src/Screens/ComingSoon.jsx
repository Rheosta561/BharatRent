import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ComingSoon() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-06-01T00:00:00"); // Set your target date
    const difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold"
      >
        Coming Soon!
      </motion.h1>
      <p className="mt-4 text-lg">We are working hard to bring something amazing.</p>
      <div className="mt-6 flex space-x-6 text-2xl font-semibold">
        <div className="bg-white/20 p-4 rounded-lg">
          <span className="text-4xl">{timeLeft.days}</span> <br /> Days
        </div>
        <div className="bg-white/20 p-4 rounded-lg">
          <span className="text-4xl">{timeLeft.hours}</span> <br /> Hours
        </div>
        <div className="bg-white/20 p-4 rounded-lg">
          <span className="text-4xl">{timeLeft.minutes}</span> <br /> Minutes
        </div>
        <div className="bg-white/20 p-4 rounded-lg">
          <span className="text-4xl">{timeLeft.seconds}</span> <br /> Seconds
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="mt-6 px-6 py-3 bg-white text-purple-700 font-bold rounded-lg shadow-lg"
      >
        Notify Me
      </motion.button>
    </div>
  );
}
