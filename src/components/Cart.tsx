'use client'

import { useState } from 'react'
import { ShoppingCart, X, MessageCircle, Trash2 } from 'lucide-react'
import { FoodItem } from '@prisma/client'

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
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 bg-amber-600 text-black p-5 rounded-full shadow-[0_0_30px_rgba(217,119,6,0.3)] z-50 hover:scale-110 transition-all duration-300 group hover:shadow-[0_0_50px_rgba(217,119,6,0.5)] border border-amber-500/20 active:scale-95 animate-bounce-subtle`}
            >
                <div className="relative">
                    <ShoppingCart size={28} className="font-bold" />
                    <span className="absolute -top-6 -right-5 bg-white text-black text-[10px] font-black h-6 w-6 rounded-full flex items-center justify-center border-2 border-amber-600 shadow-xl animate-pulse">
                        {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                </div>
            </button>

            {/* Cart Modal/Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="bg-[#0a0a0a] w-full max-w-md h-full flex flex-col relative border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-xl">
                            <div>
                                <h2 className="text-3xl font-bold text-white font-serif tracking-tight">Your <span className="italic text-amber-500">Order</span></h2>
                                <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">Authentic Selection ({items.length} items)</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
                                <X size={24} className="text-white/40 group-hover:text-white transition-colors" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-6 items-center group">
                                    <div className="w-20 h-20 bg-neutral-900 rounded-full overflow-hidden relative flex-shrink-0 border border-white/5 shadow-2xl">
                                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white mb-1 font-serif">{item.name}</h4>
                                        <p className="text-amber-500 font-bold text-sm">LKR {item.price}</p>

                                        <div className="flex items-center gap-4 mt-4">
                                            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/5">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                                    className="w-8 h-8 rounded-md hover:bg-white/10 text-white transition-colors flex items-center justify-center font-bold"
                                                >
                                                    -
                                                </button>
                                                <span className="font-bold text-xs w-8 text-center text-white tabular-nums">{item.quantity}</span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                                    className="w-8 h-8 rounded-md hover:bg-white/10 text-white transition-colors flex items-center justify-center font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => onRemove(item.id)}
                                                className="text-white/20 hover:text-red-500 transition-colors p-2"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-white/40 text-[10px] uppercase font-bold tracking-widest">
                                    <span>Subtotal</span>
                                    <span>LKR {total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-6">
                                    <span className="font-bold text-xl text-white font-serif tracking-tight">Order Total</span>
                                    <span className="font-bold text-2xl text-amber-500 font-serif">LKR {total.toFixed(2)}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleWhatsAppOrder}
                                className="w-full bg-amber-600 hover:bg-amber-500 text-black py-4 px-6 rounded-xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(217,119,6,0.2)] transform active:scale-[0.98]"
                            >
                                <MessageCircle size={18} />
                                Complete via WhatsApp
                            </button>
                            <p className="text-center text-white/20 text-[8px] uppercase font-bold tracking-widest mt-6">Safe • Authentic • Sri Lankan</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
