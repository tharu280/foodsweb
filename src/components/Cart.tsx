'use client'

import { useState } from 'react'
import { ShoppingCart, X, MessageCircle, Trash2 } from 'lucide-react'
import { FoodItem } from '@prisma/client'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { siteConfig } from '@/lib/config'

interface CartItem extends FoodItem {
    quantity: number
}

interface CartProps {
    items: CartItem[]
    onUpdateQuantity: (id: number, delta: number) => void
    onRemove: (id: number) => void
}

export function Cart({ items, onUpdateQuantity, onRemove }: CartProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 400) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    })

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleWhatsAppOrder = () => {
        const phoneNumber = siteConfig.contact.whatsapp
        let message = `Hi ${siteConfig.name}, I want to order:\n`
        items.forEach(item => {
            message += `${item.quantity}x ${item.name}\n`
        })
        message += `Total: ${total} ${siteConfig.currency}`

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    if (items.length === 0) return null

    return (
        <div className="relative z-[100]">
            <AnimatePresence>
                {!isOpen && showButton && (
                    <motion.button
                        key="cart-button"
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0,
                            boxShadow: ["0 0 20px rgba(217,119,6,0.2)", "0 0 60px rgba(217,119,6,0.6)", "0 0 20px rgba(217,119,6,0.2)"]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            boxShadow: {
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            default: {
                                duration: 0.3
                            }
                        }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 s:bottom-8 right-6 s:right-8 bg-amber-600 text-black p-4 sm:p-5 rounded-full z-[100] border border-amber-500/20 shadow-[0_0_50px_rgba(217,119,6,0.4)]"
                    >
                        <div className="relative">
                            <ShoppingCart size={24} className="sm:w-7 sm:h-7" />
                            <motion.span
                                key={items.reduce((sum, item) => sum + item.quantity, 0)}
                                initial={{ scale: 1.5, backgroundColor: "#fff" }}
                                animate={{ scale: 1, backgroundColor: "#fff" }}
                                className="absolute -top-5 -right-5 bg-white text-black text-[10px] font-black h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center border-2 border-amber-600 shadow-xl"
                            >
                                {items.reduce((sum, item) => sum + item.quantity, 0)}
                            </motion.span>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[110] flex justify-end overflow-hidden">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="bg-[#0a0a0a] w-full max-w-md h-[100dvh] flex flex-col relative border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
                        >
                            <div className="p-6 sm:p-8 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-xl">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">Your <span className="italic text-amber-500">Order</span></h2>
                                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">Authentic Selection ({items.length} items)</p>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
                                    <X size={24} className="text-white/40 group-hover:text-white transition-colors" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 scrollbar-hide">
                                <AnimatePresence initial={false}>
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex gap-4 sm:gap-6 items-center group"
                                        >
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-900 rounded-full overflow-hidden relative flex-shrink-0 border border-white/5 shadow-2xl">
                                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-white mb-0.5 sm:mb-1 font-serif text-sm sm:text-base truncate">{item.name}</h4>
                                                <p className="text-amber-500 font-bold text-xs sm:text-sm tabular-nums">LKR {item.price}</p>

                                                <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                                                    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/5">
                                                        <button
                                                            onClick={() => onUpdateQuantity(item.id, -1)}
                                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-md hover:bg-white/10 text-white transition-colors flex items-center justify-center font-bold"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="font-bold text-[10px] sm:text-xs w-6 sm:w-8 text-center text-white tabular-nums">{item.quantity}</span>
                                                        <button
                                                            onClick={() => onUpdateQuantity(item.id, 1)}
                                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-md hover:bg-white/10 text-white transition-colors flex items-center justify-center font-bold"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => onRemove(item.id)}
                                                        className="text-white/20 hover:text-red-500 transition-colors p-2"
                                                    >
                                                        <Trash2 size={14} className="sm:w-4 sm:h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="p-6 sm:p-8 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
                                <div className="space-y-4 mb-6 sm:mb-8">
                                    <div className="flex justify-between text-white/40 text-[10px] uppercase font-bold tracking-widest">
                                        <span>Subtotal</span>
                                        <span className="tabular-nums">LKR {total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 sm:pt-6 border-t border-white/5 mt-4 sm:mt-6">
                                        <span className="font-bold text-lg sm:text-xl text-white font-serif tracking-tight">Order Total</span>
                                        <span className="font-bold text-xl sm:text-2xl text-amber-500 font-serif tabular-nums">LKR {total.toLocaleString()}</span>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleWhatsAppOrder}
                                    className="w-full bg-amber-600 hover:bg-amber-500 text-black py-4 px-6 rounded-xl font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(217,119,6,0.2)]"
                                >
                                    <MessageCircle size={18} />
                                    Complete via WhatsApp
                                </motion.button>
                                <p className="text-center text-white/20 text-[8px] uppercase font-bold tracking-widest mt-6">Safe • Authentic • Sri Lankan</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
