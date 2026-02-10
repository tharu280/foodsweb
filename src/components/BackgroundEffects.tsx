'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export function BackgroundEffects() {
    const { scrollYProgress } = useScroll()

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
    const y3 = useTransform(scrollYProgress, [0, 1], [0, 400])
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Base Gradient - Deep elegant background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,20,1)_0%,_rgba(0,0,0,1)_100%)]" />

            {/* Elegant Amber Glows - Slower, smoother */}
            <motion.div
                style={{ y: y2 }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[10%] -right-[10%] w-[800px] h-[800px] bg-amber-900/20 rounded-full blur-[120px] mix-blend-screen"
            />

            <motion.div
                style={{ y: y1 }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-[10%] -left-[10%] w-[900px] h-[900px] bg-orange-950/20 rounded-full blur-[150px] mix-blend-screen"
            />

            {/* Refined Texture - SVG Noise */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    )
}
