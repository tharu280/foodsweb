import Image from 'next/image'
import { Plus, Info, ImageOff } from 'lucide-react'
import { FoodItem } from '@prisma/client'

interface FoodCardProps {
    food: FoodItem
    onAdd: (food: FoodItem) => void
}

export function FoodCard({ food, onAdd }: FoodCardProps) {
    return (
        <div className="group relative bg-neutral-900/40 rounded-2xl p-6 transition-all duration-500 hover:bg-neutral-800/60 border border-white/5 hover:border-amber-500/30 flex flex-col items-center text-center overflow-hidden h-full">
            {/* Availability Overlay */}
            {!food.isAvailable && (
                <div className="absolute inset-0 z-20 bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-4">
                    <span className="text-white/60 font-medium uppercase tracking-[0.2em] text-xs px-4 py-2 border border-white/10 rounded-full">
                        Fresh Batch Coming Soon
                    </span>
                </div>
            )}

            {/* Price Indicator */}
            <div className="absolute top-6 left-6 flex flex-col items-start z-10">
                <span className="text-amber-500 font-serif text-lg font-bold">LKR {food.price}</span>
            </div>

            {/* Info Icon */}
            <div className="absolute top-6 right-6 text-white/20 group-hover:text-amber-500/50 transition-colors z-10 cursor-help">
                <Info size={16} />
            </div>

            {/* Circular Food Image */}
            <div className="relative w-44 h-44 mt-8 mb-6 group-hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 rounded-full border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.6)]" />
                <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-800/50 flex items-center justify-center">
                    {food.imageUrl ? (
                        <img
                            src={food.imageUrl}
                            alt={food.name}
                            className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1589187151003-0dd476a00bd8?w=400&auto=format&fit=crop'; // Subtle tea/spice background fallback
                            }}
                        />
                    ) : (
                        <ImageOff className="text-white/5" size={40} />
                    )}
                </div>
                {/* Decorative glow */}
                <div className="absolute inset-0 rounded-full bg-amber-500/0 group-hover:bg-amber-500/5 transition-all duration-700" />
            </div>

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
        </div>
    )
}
