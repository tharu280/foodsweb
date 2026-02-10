'use client'

import { useState, useEffect, useRef } from 'react'
import { FoodItem } from '@prisma/client'
import { FoodCard } from './FoodCard'
import { Cart } from './Cart'
import { ShoppingBag, MapPin, Phone } from 'lucide-react'
import { BackgroundEffects } from './BackgroundEffects'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { siteConfig } from '@/lib/config'

interface MenuProps {
    initialFoods: FoodItem[]
}

interface CartItem extends FoodItem {
    quantity: number
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
} as const;

export function Menu({ initialFoods }: MenuProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [featuredFood, setFeaturedFood] = useState<FoodItem | null>(initialFoods[0] || null)

    // Primary Scroll Section
    const heroRef = useRef(null)
    const { scrollY } = useScroll()
    const { scrollYProgress: heroProgressRaw } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })
    const heroProgress = useSpring(heroProgressRaw, { stiffness: 100, damping: 30, restDelta: 0.001 })

    // Selection Scroll Section
    const selectionRef = useRef(null)
    const { scrollYProgress: selectionProgressRaw } = useScroll({
        target: selectionRef,
        offset: ["start end", "end start"]
    })
    const selectionProgress = useSpring(selectionProgressRaw, { stiffness: 80, damping: 25 })

    // Header Transformations
    const headerHeight = useTransform(scrollY, [0, 80], ["5rem", "4rem"])
    const headerBg = useTransform(scrollY, [0, 80], ["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.98)"])
    const headerBorder = useTransform(scrollY, [0, 80], ["rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.12)"])

    // Hero Parallax
    const heroImageY = useTransform(heroProgress, [0, 1], [0, 100])
    const heroTextY = useTransform(heroProgress, [0, 1], [0, -30])
    const heroRingRotation = useTransform(heroProgress, [0, 1], [0, 360])
    const heroRingScale = useTransform(heroProgress, [0, 0.5], [1, 1.2])
    const heroBadgeY = useTransform(heroProgress, [0, 1], [0, -80])

    // Hero Title Spreading
    const titleLeftX = useTransform(heroProgress, [0, 0.5], [0, -150])
    const titleRightX = useTransform(heroProgress, [0, 0.5], [0, 150])
    const titleOpacity = useTransform(heroProgress, [0, 0.5], [1, 0.2])

    // Hero Button Transformation
    const buttonWidth = useTransform(heroProgress, [0, 0.6], ["220px", "100%"])
    const buttonBg = useTransform(heroProgress, [0, 0.6], ["rgba(217, 119, 6, 1)", "rgba(217, 119, 6, 0.02)"])
    const buttonTextColor = useTransform(heroProgress, [0, 0.6], ["#000", "#d97706"])
    const buttonBorder = useTransform(heroProgress, [0, 0.6], ["rgba(0,0,0,0)", "rgba(217, 119, 6, 0.4)"])
    const buttonOpacity = useTransform(heroProgress, [0, 0.7], [1, 0.5])

    // Unified Section Header Spreading - Exactly like the hero title
    // Spread apart when scrolling away from the section
    const selectionLeftX = useTransform(selectionProgress, [0.5, 1], [0, -200])
    const selectionRightX = useTransform(selectionProgress, [0.5, 1], [0, 200])
    const selectionOpacity = useTransform(selectionProgress, [0.5, 1], [1, 0.2])

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
        <div className="relative min-h-screen text-white/90 selection:bg-amber-500 selection:text-black overflow-hidden bg-black/95">
            <BackgroundEffects />

            {/* Header Navigation */}
            <motion.header
                style={{
                    height: headerHeight,
                    backgroundColor: headerBg,
                    borderBottomColor: headerBorder
                }}
                className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors"
            >
                <div className="container mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex-1 flex items-center gap-6">
                        {/* Logo & Brand */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/20 shadow-lg">
                                <img src="/kitchen-lanka-logo.png" alt="Kitchen Lanka Logo" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-serif text-xl sm:text-2xl font-black italic tracking-tighter -mb-1">{siteConfig.name.split(' ')[0]}</span>
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

                    <div className="flex items-center gap-4 sm:gap-8">
                        <div className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-white/40">
                            <Phone size={14} className="text-amber-500" />
                            <span>Inquiries: {siteConfig.contact.phone}</span>
                        </div>
                        <button className="relative group p-2">
                            <ShoppingBag className="text-white/60 group-hover:text-amber-500 transition-colors" size={20} />
                            {cartItems.length > 0 && (
                                <motion.span
                                    key={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                                    initial={{ scale: 1.5, backgroundColor: "#fff" }}
                                    animate={{ scale: 1, backgroundColor: "#fff" }}
                                    className="absolute -top-5 -right-5 bg-white text-black text-[10px] font-black h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center border-2 border-amber-600 shadow-xl"
                                >
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </motion.span>
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <motion.div
                            style={{ y: heroTextY }}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex-1 text-center lg:text-left w-full max-w-2xl lg:max-w-none"
                        >
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-6 lg:mb-10 justify-center lg:justify-start">
                                <span className="h-px w-12 bg-amber-500/50" />
                                <span className="text-amber-500 text-[10px] uppercase font-bold tracking-[0.4em]">{siteConfig.hero.subtitle}</span>
                            </motion.div>

                            <motion.h1
                                style={{ opacity: titleOpacity }}
                                className="text-5xl sm:text-6xl lg:text-[100px] font-serif font-bold text-white mb-8 lg:mb-12 leading-[1.05] tracking-tight overflow-visible flex flex-col items-center lg:items-start"
                            >
                                <motion.span style={{ x: titleLeftX }} className="block whitespace-nowrap text-center lg:text-left">Traditional</motion.span>
                                <span className="italic text-amber-500 relative inline-block my-2 text-center lg:text-left">
                                    Sweets &
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-500/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                </span>
                                <motion.span style={{ x: titleRightX }} className="block whitespace-nowrap text-center lg:text-left">Savories</motion.span>
                            </motion.h1>

                            <motion.p variants={itemVariants} className="max-w-lg text-white/40 text-sm sm:text-base leading-relaxed mb-12 mx-auto lg:mx-0 font-light tracking-wide px-4 sm:px-0">
                                {siteConfig.hero.description}
                            </motion.p>

                            <motion.div
                                className="relative flex justify-center lg:justify-start w-full"
                            >
                                <motion.button
                                    style={{
                                        width: buttonWidth,
                                        backgroundColor: buttonBg,
                                        color: buttonTextColor,
                                        borderColor: buttonBorder,
                                        opacity: buttonOpacity,
                                        boxShadow: useTransform(heroProgress, [0, 0.4], ["0 0 50px rgba(217, 119, 6, 0.4)", "0 0 0px rgba(217, 119, 6, 0)"])
                                    }}
                                    animate={{
                                        boxShadow: ["0 0 20px rgba(217,119,6,0.2)", "0 0 40px rgba(217,119,6,0.5)", "0 0 20px rgba(217,119,6,0.2)"]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                                    className="h-14 sm:h-16 rounded-full border font-black uppercase text-[10px] tracking-[0.3em] overflow-hidden whitespace-nowrap px-8"
                                >
                                    Experience The Taste
                                </motion.button>
                            </motion.div>

                            <motion.div variants={itemVariants} className="mt-16 lg:mt-24 flex items-center gap-8 justify-center lg:justify-start pt-10 border-t border-white/5">
                                <div className="flex items-center gap-3 text-white/30 hover:text-amber-500 transition-colors group cursor-default">
                                    <MapPin size={16} className="group-hover:translate-y-[-2px] transition-transform" />
                                    <span className="text-[10px] uppercase font-black tracking-[0.2em]">Colombo, SL</span>
                                </div>
                                <div className="w-1.5 h-1.5 bg-amber-500/20 rounded-full" />
                                <div className="text-[10px] uppercase font-black tracking-[0.2em] text-white/20 italic">Since 2024</div>
                            </motion.div>
                        </motion.div>

                        {/* Hero Image - Circular and Large */}
                        <motion.div
                            style={{ y: heroImageY }}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                            className="flex-1 relative w-full max-w-[450px] lg:max-w-none px-4 lg:px-0"
                        >
                            <div className="relative w-72 h-72 sm:w-[500px] sm:h-[500px] lg:w-[650px] lg:h-[650px] mx-auto">
                                {/* Decorative Rings */}
                                <motion.div
                                    style={{ rotate: heroRingRotation, scale: heroRingScale }}
                                    className="absolute inset-0 border border-white/5 rounded-full animate-[spin_60s_linear_infinite] scale-110 opacity-30"
                                />
                                <motion.div
                                    style={{ rotate: useTransform(heroProgress, [0, 1], [0, -180]) }}
                                    className="absolute inset-0 border border-dashed border-amber-500/20 rounded-full scale-95 opacity-50"
                                />

                                {/* Main Image Container */}
                                <div className="absolute inset-6 rounded-full overflow-hidden border-8 border-amber-900/10 shadow-2xl relative z-10 bg-neutral-900/40 backdrop-blur-sm">
                                    {featuredFood?.imageUrl ? (
                                        <motion.img
                                            src={featuredFood.imageUrl}
                                            alt={featuredFood.name}
                                            initial={{ scale: 1.15 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 1.2, ease: "easeOut" }}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/10 italic text-sm">
                                            Handcrafted Delicacy
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/30 via-transparent to-transparent opacity-60" />
                                </div>

                                {/* Price Badge */}
                                <motion.div
                                    style={{ y: heroBadgeY }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.8, type: "spring" }}
                                    className="absolute right-0 top-1/4 bg-black/60 backdrop-blur-xl p-4 sm:p-7 rounded-[2rem] border border-white/10 z-20 shadow-2xl flex flex-col items-center"
                                >
                                    <span className="text-amber-500 font-serif text-2xl sm:text-4xl font-bold italic">LKR {featuredFood?.price || "---"}</span>
                                    <span className="text-[9px] uppercase font-black tracking-[0.3em] text-white/30 mt-2">Premium Selection</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <main ref={selectionRef} className="container mx-auto px-6 py-32 border-t border-white/5 relative z-10">
                <motion.div
                    style={{ opacity: selectionOpacity }}
                    className="flex flex-col md:flex-row items-center md:items-baseline justify-between gap-10 mb-20 px-4 w-full"
                >
                    <div className="flex flex-col items-center md:items-start text-center md:text-left overflow-visible w-full md:w-auto">
                        <h2 className="text-5xl lg:text-7xl font-serif font-bold text-white tracking-tight mb-4 flex gap-6 justify-center md:justify-start">
                            <motion.span style={{ x: selectionLeftX }} className="inline-block whitespace-nowrap">Our</motion.span>
                            <motion.span style={{ x: selectionRightX }} className="italic text-amber-500 inline-block whitespace-nowrap">Selection</motion.span>
                        </h2>
                        <span className="text-white/20 text-xs uppercase font-black tracking-[0.5em]">Pure Ceylon Spices • No Preservatives</span>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-6 sm:gap-10 text-[10px] uppercase font-black tracking-[0.3em] text-white/30">
                        <button className="text-amber-500 border-b-2 border-amber-500 pb-2">All Items</button>
                        <button className="hover:text-amber-500 transition-colors">Traditional</button>
                        <button className="hover:text-amber-500 transition-colors">Modern</button>
                        <button className="hover:text-amber-500 transition-colors">Savories</button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 lg:gap-y-24">
                    {initialFoods.map((food) => (
                        <div key={food.id}>
                            <FoodCard food={food} onAdd={addToCart} />
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-neutral-950 border-t border-white/5 py-20 sm:py-32 relative z-10 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="container mx-auto px-6 text-center"
                >
                    <div className="flex flex-col items-center mb-16">
                        <span className="text-white font-serif text-4xl font-black italic tracking-tighter mb-1">Kitchen</span>
                        <span className="text-amber-500 text-[11px] uppercase font-black tracking-[0.5em]">Lanka</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 sm:gap-12 text-white/20 mb-20 text-[11px] uppercase font-black tracking-widest">
                        <a href="#" className="hover:text-amber-500 transition-colors">Shipping</a>
                        <a href="#" className="hover:text-amber-500 transition-colors">Bulk Orders</a>
                        <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
                    </div>

                    <div className="pt-20 border-t border-white/5 flex flex-col items-center">
                        <p className="text-white/10 text-[10px] uppercase font-black tracking-[0.4em] mb-12">
                            © 2024 Kitchen Lanka. Proudly Sri Lankan.
                        </p>

                        <a
                            href="https://tharushika-portfolio.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center gap-5 px-9 py-4 rounded-full border border-white/5 bg-white/[0.01] hover:border-amber-500/30 transition-all duration-700"
                        >
                            <span className="text-[10px] text-white/20 uppercase font-black tracking-[0.3em] group-hover:text-white/40 transition-colors">
                                Digital Partner
                            </span>
                            <div className="h-5 w-px bg-white/10" />
                            <div className="flex items-center gap-2">
                                <span className="text-white font-serif text-xl font-black italic tracking-tighter group-hover:text-amber-500 transition-colors">INT8LIGEN</span>
                                <span className="text-amber-500 font-bold text-sm tracking-widest group-hover:text-white transition-colors">AI</span>
                            </div>
                        </a>
                    </div>
                </motion.div>
            </footer>

            <Cart
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
            />
        </div>
    )
}
