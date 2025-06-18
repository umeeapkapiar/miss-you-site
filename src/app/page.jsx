"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Play, Pause } from "lucide-react"
import Loader from "@/components/Loader"
import WelcomeScreen from "@/components/WelcomeScreen"
import MissCounterScreen from "@/components/MissCounterScreen"
import MessageScreen from "@/components/MessageScreen"
import MemoriesScreen from "@/components/MemoriesScreen"
import FinalScreen from "@/components/FinalScreen"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showMusicControl, setShowMusicControl] = useState(false)
  const [stars, setStars] = useState([]);
  const [hearts, setHearts] = useState([]);
  const audioRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const handleMusicToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
      setIsPlaying(true)
      setShowMusicControl(true)
    }
  }

  const nextScreen = () => {
    if (currentScreen === 0) {
      startMusic()
    }
    setCurrentScreen((prev) => (prev + 1) % 5)
  }

  useEffect(() => {
    const starArray = [...Array(80)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }));
    setStars(starArray);
  }, []);

  useEffect(() => {
    const heartArray = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      fontSize: Math.random() * 10 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setHearts(heartArray);
  }, []);

  const FloatingHearts = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed inset-0 overflow-hidden pointer-events-none"
    >
      {hearts.map((heart, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/40"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            fontSize: `${heart.fontSize}px`,
          }}
          animate={{
            y: [-20, -60],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </motion.div>
  )

  const SubtleStars = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed inset-0 overflow-hidden pointer-events-none"
    >
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/80 rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </motion.div>
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-cute">
      <SubtleStars />
      <FloatingHearts />

      {/* {showMusicControl && (
        <motion.button
          className="fixed top-6 right-6 z-50 bg-pink-500/10 backdrop-blur-md border border-pink-300/20 rounded-full p-4 text-pink-300 hover:bg-pink-500/20 transition-all duration-300"
          onClick={handleMusicToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>
      )} */}

      {/* <audio ref={audioRef} loop>
        <source src="/placeholder-audio.mp3" type="audio/mpeg" />
      </audio> */}

      <AnimatePresence mode="wait">
        {currentScreen === 0 && (
          <WelcomeScreen
            key="welcome"
            onNext={nextScreen}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 1 && (
          <MissCounterScreen
            key="counter"
            onNext={nextScreen}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 2 && (
          <MessageScreen
            key="message"
            onNext={nextScreen}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 3 && (
          <MemoriesScreen
            key="memories"
            onNext={nextScreen}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 4 && (
          <FinalScreen
            key="final"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-xs text-white/40 pointer-events-none select-none z-50 font-light">
        @anujbuilds
      </motion.div>
    </div>
  )
}
