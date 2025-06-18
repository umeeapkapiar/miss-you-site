"use client"

import { motion } from "motion/react"
import { useState, useEffect } from "react"

export default function FinalScreen({ ...motionProps }) {
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(true)

    const finalMessage =
        "You are my everything, my reason to smile every day. No matter how far apart we are, you're always in my heart. I can't wait to hold you close again and tell you how much you mean to me. You make my world complete. I love you to the moon and back! 🌙💕"

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentIndex < finalMessage.length) {
                setDisplayText((prev) => prev + finalMessage[currentIndex])
                setCurrentIndex((prev) => prev + 1)
            } else {
                setIsTyping(false)
            }
        }, 10)
        return () => clearTimeout(timer)
    }, [currentIndex, finalMessage])

    return (
        <motion.div {...motionProps} className="min-h-screen flex items-center justify-center text-center px-6 relative">

            <div className="max-w-4xl z-10">
                <motion.div
                    className="mb-8 flex justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div><img src="/gifs/us.gif" alt="us gif" className="w-48" /></div>
                </motion.div>

                <motion.h2
                    className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Forever Yours
                </motion.h2>

                <motion.div
                    className="bg-gray-950/50 backdrop-blur-md border border-pink-500/10 rounded-3xl p-8 md:p-12 shadow-2xl mb-8"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-lg md:text-2xl text-white leading-relaxed font-light">
                        {displayText}
                        {isTyping && (
                            <motion.span
                                className="inline-block w-0.5 h-6 bg-pink-400 ml-1"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            />
                        )}
                    </p>
                </motion.div>

                {!isTyping && (
                    <motion.div
                        className="mt-12 relative"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.div
                            className="w-full h-20 relative"
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img src="/cute-hearts.gif" alt="Floating hearts" className="h-full object-contain" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}
