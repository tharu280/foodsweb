'use client'

import { useState, useEffect } from 'react'
import { FoodItem } from '@prisma/client'
import { FoodCard } from './FoodCard'
import { Cart } from './Cart'
import { ShoppingBag, MapPin, Phone, Instagram, Facebook } from 'lucide-react'

import { siteConfig } from '@/lib/config'

interface MenuProps {
    initialFoods: FoodItem[]
}

interface CartItem extends FoodItem {
    quantity: number
}

export function Menu({ initialFoods }: MenuProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [featuredFood, setFeaturedFood] = useState<FoodItem | null>(initialFoods[0] || null)

    useEffect(() => {
        if (initialFoods.length > 0) {
            const randomIndex = Math.floor(Math.random() * initialFoods.length)
            setFeaturedFood(initialFoods[randomIndex])
        }
    }, [initialFoods])

    const addToCart = (food: FoodItem) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === food.id)
            if (existing) {
                return prev.map(item =>
                    item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...food, quantity: 1 }]
        })
    }

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + delta }
                }
                return item
            }).filter(item => item.quantity > 0)
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    return (
        <div className="bg-black min-h-screen text-white/90 selection:bg-amber-500 selection:text-black">
            {/* Header Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex-1 flex items-center gap-6">
                        {/* Logo & Brand */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/20 shadow-lg group-hover:border-amber-500/50 transition-colors">
                                <img src="/kitchen-lanka-logo.png" alt="Kitchen Lanka Logo" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-serif text-2xl font-black italic tracking-tighter -mb-1">{siteConfig.name.split(' ')[0]}</span>
                                <span className="text-amber-500 text-[8px] uppercase font-bold tracking-[0.4em] translate-x-1 outline-none">{siteConfig.name.split(' ')[1]}</span>
                            </div>
                        </div>

                        {/* Desktop Links */}
                        <nav className="hidden lg:flex items-center gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">
                            <a href="#" className="hover:text-white transition-colors">Our Story</a>
                            <a href="#" className="hover:text-white transition-colors">Menu</a>
                            <a href="#" className="hover:text-white transition-colors">Gift Packs</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </nav>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-white/40">
                            <Phone size={14} className="text-amber-500" />
                            <span>Inquiries: +94 77 123 4567</span>
                        </div>
                        <button className="relative group">
                            <ShoppingBag className="text-white/60 group-hover:text-amber-500 transition-colors" size={20} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-amber-600 text-black text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center">
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-3 mb-8">
                                <span className="h-px w-8 bg-amber-500/50" />
                                <span className="text-amber-500 text-[10px] uppercase font-bold tracking-[0.3em]">{siteConfig.hero.subtitle}</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-8 leading-[1.1] tracking-tight">
                                Traditional <br />
                                <span className="italic text-amber-500">Sweets &</span> Savories
                            </h1>

                            <p className="max-w-lg text-white/40 text-sm leading-relaxed mb-10 mx-auto lg:mx-0">
                                {siteConfig.hero.description}
                            </p>

                            <button
                                onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
                                className="bg-amber-600 hover:bg-amber-500 text-black px-10 py-4 rounded-lg font-black uppercase text-xs tracking-[0.2em] transition-all transform hover:translate-y-[-2px] active:scale-95 shadow-[0_10px_30px_rgba(217,119,6,0.2)]"
                            >
                                Order Now
                            </button>

                            <div className="mt-16 flex items-center gap-6 justify-center lg:justify-start">
                                <div className="flex items-center gap-2 text-white/20 hover:text-white/40 cursor-default transition-colors">
                                    <MapPin size={14} />
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-glow">Colombo, Sri Lanka</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image - Circular and Large */}
                        <div className="flex-1 relative">
                            <div className="relative w-80 h-80 lg:w-[500px] lg:h-[500px] mx-auto">
                                {/* Decorative Rings */}
                                <div className="absolute inset-0 border border-white/5 rounded-full animate-slow-spin-opposite scale-110" />
                                <div className="absolute inset-0 border-2 border-dashed border-amber-500/10 rounded-full animate-slow-spin" />

                                {/* Main Image Container */}
                                <div className="absolute inset-4 rounded-full overflow-hidden border-8 border-neutral-900 shadow-2xl relative z-10 group bg-neutral-900">
                                    {featuredFood?.imageUrl ? (
                                        <img
                                            src={featuredFood.imageUrl}
                                            alt={featuredFood.name}
                                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/10 italic text-sm">
                                            Signature Selection
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                </div>

                                {/* Floating Stats */}
                                <div className="absolute -right-4 top-1/4 bg-neutral-900/90 backdrop-blur-md p-4 rounded-xl border border-white/5 z-20">
                                    <span className="block text-amber-500 font-serif text-2xl font-bold italic">LKR {featuredFood?.price || "---"}</span>
                                    <span className="text-[8px] uppercase font-bold tracking-widest text-white/40">Fresh Selection</span>
                                </div>

                                <div className="absolute -left-4 bottom-1/4 flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/5 z-20">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                    <span className="text-[9px] uppercase font-bold tracking-[0.2em]">Best Picks Today</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <main className="container mx-auto px-6 py-24 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-baseline justify-between gap-8 mb-16 px-4">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight mb-2">
                            Our <span className="italic text-amber-500">Selection</span>
                        </h2>
                        <span className="text-white/20 text-[10px] uppercase font-bold tracking-[0.3em]">Pure Ceylon Spices • No Preservatives</span>
                    </div>

                    <div className="flex flex-wrap gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-white/30">
                        <button className="text-amber-500 border-b border-amber-500 pb-1">All Items</button>
                        <button className="hover:text-white transition-colors">Traditional Sweets</button>
                        <button className="hover:text-white transition-colors">Modern Snacks</button>
                        <button className="hover:text-white transition-colors">Savories</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {initialFoods.map((food) => (
                        <div key={food.id}>
                            <FoodCard food={food} onAdd={addToCart} />
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <button className="border border-white/10 hover:border-amber-500/50 hover:bg-white/5 px-12 py-4 rounded-lg text-[10px] uppercase font-bold tracking-[0.3em] transition-all">
                        View All Menu
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-neutral-950 border-t border-white/5 py-20">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex flex-col items-center mb-12">
                        <span className="text-white font-serif text-3xl font-black italic tracking-tighter mb-1">Kitchen</span>
                        <span className="text-amber-500 text-[10px] uppercase font-bold tracking-[0.4em]">Lanka</span>
                    </div>
                    <div className="flex justify-center gap-8 text-white/20 mb-12 text-sm uppercase font-bold tracking-widest">
                        <a href="#" className="hover:text-amber-500 transition-colors">Shipping Info</a>
                        <a href="#" className="hover:text-amber-500 transition-colors">Bulk Orders</a>
                        <a href="#" className="hover:text-amber-500 transition-colors">Locations</a>
                    </div>
                    <div className="pt-16 border-t border-white/5 mt-16 flex flex-col items-center">
                        <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.3em] mb-8">
                            © 2024 Kitchen Lanka. Proudly Sri Lankan.
                        </p>

                        <a
                            href="https://intelligenai.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center gap-4 px-7 py-3 rounded-full border border-white/5 bg-white/[0.02] hover:border-amber-500/30 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                            <span className="relative text-[10px] text-white/20 uppercase font-black tracking-[0.2em] group-hover:text-white/40 transition-colors">
                                Digital Partner
                            </span>

                            <div className="relative h-4 w-px bg-white/10" />

                            <div className="relative flex items-center gap-2">
                                <span className="text-white font-serif text-lg font-black italic tracking-tighter group-hover:text-amber-500 transition-colors">INT8LIGEN</span>
                                <span className="text-amber-500 font-bold text-xs tracking-widest group-hover:text-white transition-colors">AI</span>
                            </div>
                        </a>
                    </div>
                </div>
            </footer>

            <Cart
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
            />
        </div>
    )
}
