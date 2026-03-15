'use client'

import { useState } from 'react'
import { ShoppingCart, X, MessageCircle, Trash2, Minus, Plus } from 'lucide-react'
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
        setShowButton(latest > 400)
    })

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    const handleWhatsAppOrder = () => {
        const phoneNumber = siteConfig.contact.whatsapp
        let message = `Hi ${siteConfig.name}, I'd like to place an order:\n\n`
        items.forEach(item => {
            message += `• ${item.quantity}× ${item.name} — ${siteConfig.currency} ${(item.price * item.quantity).toLocaleString()}\n`
        })
        message += `\nTotal: ${siteConfig.currency} ${total.toLocaleString()}`
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    if (items.length === 0) return null

    return (
        <div className="relative z-[100]">
            {/* Floating Cart Button */}
            <AnimatePresence>
                {!isOpen && showButton && (
                    <motion.button
                        key="cart-button"
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        onClick={() => setIsOpen(true)}
                        className="press-scale fixed bottom-6 right-6 bg-amber-600 text-black p-4 sm:p-5 rounded-full z-[100] shadow-[0_0_40px_rgba(217,119,6,0.45)] border border-amber-500/30 animate-ping-soft"
                        aria-label="Open cart"
                    >
                        <div className="relative">
                            <ShoppingCart size={22} className="sm:w-6 sm:h-6" />
                            <motion.span
                                key={itemCount}
                                initial={{ scale: 1.4 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="absolute -top-5 -right-5 bg-white text-black text-[9px] font-black h-5 w-5 sm:h-[22px] sm:w-[22px] rounded-full flex items-center justify-center border-2 border-amber-600 shadow-lg"
                            >
                                {itemCount}
                            </motion.span>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[110] flex justify-end">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 240 }}
                            className="relative w-full max-w-[420px] h-[100dvh] flex flex-col bg-[#0c0c0c] border-l border-white/[0.06] shadow-[-30px_0_60px_rgba(0,0,0,0.6)]"
                        >
                            {/* Ambient glow in panel */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

                            {/* Header */}
                            <div className="relative px-6 py-5 sm:px-8 sm:py-6 border-b border-white/[0.06] flex justify-between items-start bg-black/30 backdrop-blur-xl flex-shrink-0">
                                <div>
                                    <p className="text-[9px] uppercase font-black tracking-[0.35em] text-amber-600/70 mb-1">
                                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                                    </p>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                                        Your <span className="italic text-amber-500">Order</span>
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="press-scale p-2 rounded-xl border border-white/5 bg-white/[0.03] text-white/40 transition-colors mt-1"
                                    aria-label="Close cart"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Item List */}
                            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6 scrollbar-hide">
                                <AnimatePresence initial={false}>
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                                            transition={{ delay: index * 0.04, duration: 0.3 }}
                                            className="flex gap-4 items-start"
                                        >
                                            {/* Image */}
                                            <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl overflow-hidden flex-shrink-0 border border-white/[0.06] bg-neutral-900">
                                                {item.imageUrl ? (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full shimmer" />
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-white font-serif text-sm sm:text-base truncate leading-tight mb-0.5">
                                                    {item.name}
                                                </h4>
                                                <p className="text-amber-500 font-bold text-xs tabular-nums mb-3">
                                                    {siteConfig.currency} {(item.price * item.quantity).toLocaleString()}
                                                </p>

                                                <div className="flex items-center gap-3">
                                                    {/* Quantity stepper */}
                                                    <div className="flex items-center gap-0.5 bg-white/[0.04] rounded-lg border border-white/[0.06] p-0.5">
                                                        <button
                                                            onClick={() => onUpdateQuantity(item.id, -1)}
                                                            className="press-scale w-7 h-7 rounded-md flex items-center justify-center text-white/50 active:bg-white/10 transition-colors"
                                                        >
                                                            <Minus size={12} strokeWidth={3} />
                                                        </button>
                                                        <span className="text-white font-black text-xs w-7 text-center tabular-nums">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => onUpdateQuantity(item.id, 1)}
                                                            className="press-scale w-7 h-7 rounded-md flex items-center justify-center text-white/50 active:bg-white/10 transition-colors"
                                                        >
                                                            <Plus size={12} strokeWidth={3} />
                                                        </button>
                                                    </div>

                                                    {/* Remove */}
                                                    <button
                                                        onClick={() => onRemove(item.id)}
                                                        className="press-scale p-1.5 rounded-lg text-white/20 active:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Footer — Total + CTA */}
                            <div className="px-6 sm:px-8 py-6 border-t border-white/[0.06] bg-black/30 backdrop-blur-3xl flex-shrink-0 relative">
                                {/* Total */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-white/30 text-[10px] uppercase font-black tracking-widest">
                                        <span>Subtotal</span>
                                        <span className="tabular-nums">{siteConfig.currency} {total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline pt-3 border-t border-white/[0.06]">
                                        <span className="font-bold text-white text-lg font-serif">Total</span>
                                        <span className="font-bold text-2xl text-amber-500 font-serif tabular-nums">
                                            {siteConfig.currency} {total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* WhatsApp CTA */}
                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleWhatsAppOrder}
                                    className="w-full bg-amber-600 active:bg-amber-500 text-black py-4 px-6 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 transition-colors shadow-[0_10px_40px_rgba(217,119,6,0.25)]"
                                >
                                    <MessageCircle size={18} />
                                    Order via WhatsApp
                                </motion.button>

                                <p className="text-center text-white/15 text-[8px] uppercase font-black tracking-[0.3em] mt-4">
                                    Fresh · Authentic · Sri Lankan
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
