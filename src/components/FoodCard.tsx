import { useRef } from 'react'
import Image from 'next/image'
import { Plus, Info, ImageOff } from 'lucide-react'
import { FoodItem } from '@prisma/client'
import { motion, useScroll, useTransform } from 'framer-motion'

interface FoodCardProps {
    food: FoodItem
    onAdd: (food: FoodItem) => void
}

export function FoodCard({ food, onAdd }: FoodCardProps) {
    const cardRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    })

    const yDrift = useTransform(scrollYProgress, [0, 1], [0, -30])
    const imageY = useTransform(scrollYProgress, [0, 1], [10, -10])
    const badgeY = useTransform(scrollYProgress, [0, 1], [5, -5])

    return (
        <motion.div
            ref={cardRef}
            style={{ y: yDrift }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for elegance
                scale: { type: "spring", damping: 20, stiffness: 100 }
            }}
            className="group relative bg-neutral-900/40 rounded-2xl p-6 transition-colors duration-500 border border-white/5 flex flex-col items-center text-center overflow-hidden h-full shadow-lg hover:bg-neutral-800/60 hover:border-amber-500/30"
        >
            {/* Availability Badge */}
            {!food.isAvailable && (
                <motion.div
                    style={{ y: badgeY }}
                    className="absolute top-4 right-4 z-20"
                >
                    <div className="bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-2 rounded-full">
                        <span className="text-white/60 font-medium uppercase tracking-[0.2em] text-[10px] px-2 py-1">
                            Coming Soon
                        </span>
                    </div>
                </motion.div>
            )}

            {/* Price Indicator */}
            <div className="absolute top-6 left-6 flex flex-col items-start z-10">
                <span className="text-amber-500 font-serif text-lg font-bold">LKR {food.price}</span>
            </div>

            {/* Info Icon */}
            <div className="absolute top-6 right-6 text-white/20 group-hover:text-amber-500/50 transition-colors z-10 cursor-help">
                <Info size={16} />
            </div>

            {/* Food Image Container */}
            <motion.div
                style={{ y: imageY }}
                className="relative w-40 h-40 sm:w-48 sm:h-48 mb-8"
            >
                <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors duration-700" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/5 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-6">
                    {food.imageUrl ? (
                        <Image
                            src={food.imageUrl}
                            alt={food.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 160px, 192px"
                        />
                    ) : (
                        <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                            <ImageOff className="text-white/10" size={32} />
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Food Info */}
            <div className="mb-4 z-10 w-full px-2">
                <h3 className="text-white font-serif text-xl font-bold mb-1 tracking-tight group-hover:text-amber-500 transition-colors duration-300">
                    {food.name}
                </h3>
                <span className="block text-white/20 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">Traditional Recipe</span>

                <p className="text-white/50 text-xs italic leading-relaxed line-clamp-3 text-center mb-4 min-h-[3rem]">
                    {food.description}
                </p>
            </div>

            {/* Add Button Section */}
            <div className="w-full mt-auto flex items-center justify-between border-t border-white/5 pt-6 z-10">
                <div className="text-left">
                    <span className="block text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">Portion</span>
                    <span className="text-white/50 text-xs font-medium italic text-nowrap">Hand-prepared</span>
                </div>

                <button
                    onClick={() => onAdd(food)}
                    disabled={!food.isAvailable}
                    className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-black px-6 py-2.5 rounded-lg font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:bg-neutral-800"
                >
                    Add to Cart
                </button>
            </div>
        </motion.div>
    )
}
