'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Plus, ImageOff } from 'lucide-react'
import { FoodItem } from '@prisma/client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { siteConfig } from '@/lib/config'

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

    const yDrift = useTransform(scrollYProgress, [0, 1], [0, -20])
    const imageY = useTransform(scrollYProgress, [0, 1], [6, -6])

    return (
        <motion.div
            ref={cardRef}
            style={{ y: yDrift }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="press-scale group relative rounded-2xl flex flex-col overflow-hidden border border-white/[0.06] bg-neutral-900/50 shadow-xl"
        >
            {/* Ambient glow behind image */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />

            {/* Top image zone */}
            <div className="relative w-full aspect-square overflow-hidden bg-neutral-900">
                <motion.div style={{ y: imageY }} className="absolute inset-0">
                    {food.imageUrl ? (
                        <Image
                            src={food.imageUrl}
                            alt={food.name}
                            fill
                            className="object-cover transition-transform duration-700 group-active:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-neutral-800 flex items-center justify-center shimmer">
                            <ImageOff className="text-white/10" size={36} />
                        </div>
                    )}
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
                </motion.div>

                {/* Price pill — bottom-left of image */}
                <div className="absolute bottom-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1 bg-black/70 backdrop-blur-md border border-amber-500/20 px-3 py-1 rounded-full text-amber-400 font-bold text-sm font-serif">
                        {siteConfig.currency} {food.price}
                    </span>
                </div>

                {/* Unavailable badge */}
                {!food.isAvailable && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                        <span className="bg-neutral-900/80 border border-white/10 text-white/50 text-[10px] uppercase font-black tracking-[0.3em] px-4 py-2 rounded-full">
                            Coming Soon
                        </span>
                    </div>
                )}
            </div>

            {/* Content zone */}
            <div className="flex flex-col flex-1 p-5 pt-4">
                {/* Name + label */}
                <div className="mb-3">
                    <h3 className="text-white font-serif text-lg font-bold leading-tight mb-0.5 transition-colors duration-300 group-active:text-amber-400">
                        {food.name}
                    </h3>
                    <span className="text-amber-600/60 text-[9px] uppercase font-black tracking-[0.3em]">
                        {siteConfig.foodCard.recipeLabel}
                    </span>
                </div>

                {/* Description */}
                <p className="text-white/40 text-xs leading-relaxed line-clamp-3 mb-5 flex-1">
                    {food.description || 'A hand-crafted daily special prepared fresh each morning.'}
                </p>

                {/* Divider */}
                <div className="h-px bg-white/5 mb-4" />

                {/* Footer row */}
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <span className="block text-white/20 text-[9px] uppercase font-black tracking-[0.25em]">Portion</span>
                        <span className="text-white/50 text-xs font-medium italic">{siteConfig.foodCard.portionLabel}</span>
                    </div>

                    <button
                        onClick={() => onAdd(food)}
                        disabled={!food.isAvailable}
                        className="press-scale flex items-center gap-2 bg-amber-600 disabled:bg-neutral-700 disabled:opacity-40 text-black disabled:text-white/30 px-5 py-2.5 rounded-xl font-black uppercase text-[9px] tracking-widest shadow-[0_0_20px_rgba(217,119,6,0.25)] transition-colors duration-200 active:bg-amber-500"
                    >
                        <Plus size={14} strokeWidth={3} />
                        Add
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
