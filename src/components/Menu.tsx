'use client'

import { useState, useEffect, useRef } from 'react'
import { FoodItem } from '@prisma/client'
import { FoodCard } from './FoodCard'
import { Cart } from './Cart'
import { ShoppingBag, MapPin, Phone, UtensilsCrossed, Moon } from 'lucide-react'
import { BackgroundEffects } from './BackgroundEffects'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { siteConfig } from '@/lib/config'

interface MenuProps {
    initialFoods: FoodItem[]
}

interface CartItem extends FoodItem {
    quantity: number
}

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
} as const

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
} as const

export function Menu({ initialFoods }: MenuProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [selectedDay, setSelectedDay] = useState<string>(siteConfig.menu.days[0])
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [featuredFood, setFeaturedFood] = useState<FoodItem | null>(initialFoods[0] || null)

    useEffect(() => {
        if (initialFoods.length > 0) {
            const idx = Math.floor(Math.random() * initialFoods.length)
            setFeaturedFood(initialFoods[idx])
        }
    }, [initialFoods])

    // Scroll refs
    const heroRef = useRef(null)
    const { scrollY } = useScroll()
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })
    const smoothHero = useSpring(heroProgress, { stiffness: 90, damping: 28 })

    // Header
    const headerBg = useTransform(scrollY, [0, 80], ["rgba(10,10,10,0.7)", "rgba(5,5,5,0.97)"])
    const headerBorder = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0.03)", "rgba(255,255,255,0.09)"])

    // Hero parallax
    const heroTextY = useTransform(smoothHero, [0, 1], [0, -40])
    const heroImageY = useTransform(smoothHero, [0, 1], [0, 80])
    const heroRingRotation = useTransform(smoothHero, [0, 1], [0, 90])
    const heroBadgeY = useTransform(smoothHero, [0, 1], [0, -60])

    // Title spread effect
    const titleOpacity = useTransform(smoothHero, [0, 0.55], [1, 0.15])
    const titleLeftX = useTransform(smoothHero, [0, 0.55], [0, -140])
    const titleRightX = useTransform(smoothHero, [0, 0.55], [0, 140])

    // CTA button morph
    const buttonWidth = useTransform(smoothHero, [0, 0.65], ["240px", "100%"])
    const buttonBg = useTransform(smoothHero, [0, 0.65], ["rgba(217,119,6,1)", "rgba(217,119,6,0.04)"])
    const buttonColor = useTransform(smoothHero, [0, 0.65], ["#000000", "#d97706"])
    const buttonBorderColor = useTransform(smoothHero, [0, 0.65], ["rgba(0,0,0,0)", "rgba(217,119,6,0.35)"])

    // featuredFood is set by useEffect above (client-only to avoid hydration mismatch)

    const addToCart = (food: FoodItem) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === food.id)
            if (existing) return prev.map(i => i.id === food.id ? { ...i, quantity: i.quantity + 1 } : i)
            return [...prev, { ...food, quantity: 1 }]
        })
    }

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(prev =>
            prev.map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i)
                .filter(i => i.quantity > 0)
        )
    }

    const removeFromCart = (id: number) => {
        setCartItems(prev => prev.filter(i => i.id !== id))
    }

    const lunchItems = initialFoods.filter(f => (f as any).dayOfWeek === selectedDay && (f as any).mealType === 'LUNCH')
    const dinnerItems = initialFoods.filter(f => (f as any).dayOfWeek === selectedDay && (f as any).mealType === 'DINNER')
    const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0)

    return (
        <div className="relative min-h-screen text-white/90 selection:bg-amber-500 selection:text-black overflow-hidden">
            <BackgroundEffects />

            {/* ── Header ── */}
            <motion.header
                style={{ backgroundColor: headerBg, borderBottomColor: headerBorder }}
                className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 border-b backdrop-blur-xl"
            >
                <div className="container mx-auto px-5 sm:px-8 h-full flex items-center justify-between">
                    {/* Left: Logo + Brand */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-amber-500/20 shadow-md flex-shrink-0">
                            <img
                                src={siteConfig.logo.src}
                                alt={siteConfig.logo.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-white font-serif text-lg sm:text-2xl font-black italic tracking-tighter">
                                {siteConfig.name}
                            </span>
                            <span className="text-amber-500 text-[7px] sm:text-[8px] uppercase font-black tracking-[0.45em] mt-0.5">
                                {siteConfig.nameAccent}
                            </span>
                        </div>
                    </div>

                    {/* Centre: Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-white/35">
                        {siteConfig.navLinks.map(link => (
                            <a key={link.label} href={link.href} className="hover:text-white/80 transition-colors duration-200">
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right: Phone + Cart */}
                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] text-white/30">
                            <Phone size={12} className="text-amber-500" />
                            <span>{siteConfig.contact.phone}</span>
                        </div>

                        {/* Cart icon in header */}
                        <button
                            className="press-scale relative p-2 rounded-xl border border-white/[0.05] bg-white/[0.02]"
                            aria-label="Open cart"
                        >
                            <ShoppingBag className="text-white/50" size={19} />
                            {cartCount > 0 && (
                                <motion.span
                                    key={cartCount}
                                    initial={{ scale: 1.5 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* ── Hero ── */}
            <section ref={heroRef} className="relative pt-28 pb-16 sm:pt-36 lg:pt-48 lg:pb-36 overflow-hidden">
                <div className="container mx-auto px-5 sm:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                        {/* Left: Text */}
                        <motion.div
                            style={{ y: heroTextY }}
                            variants={stagger}
                            initial="hidden"
                            animate="visible"
                            className="flex-1 text-center lg:text-left w-full max-w-2xl lg:max-w-none"
                        >
                            {/* Badge */}
                            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-8 justify-center lg:justify-start">
                                <span className="h-px w-10 bg-amber-500/40" />
                                <span className="text-amber-500/80 text-[10px] uppercase font-black tracking-[0.45em]">
                                    {siteConfig.hero.subtitle}
                                </span>
                                <span className="h-px w-10 bg-amber-500/40" />
                            </motion.div>

                            {/* Title — three lines with spread animation */}
                            <motion.h1
                                style={{ opacity: titleOpacity }}
                                className="text-[clamp(3.5rem,10vw,7.5rem)] font-serif font-bold text-white leading-[0.95] tracking-tight mb-10 flex flex-col items-center lg:items-start overflow-visible"
                            >
                                <motion.span
                                    style={{ x: titleLeftX }}
                                    className="block whitespace-nowrap"
                                >
                                    {siteConfig.hero.titleLine1}
                                </motion.span>
                                <span className="italic text-amber-500 relative inline-block my-1">
                                    {siteConfig.hero.titleAccent}
                                    <svg className="absolute w-full h-2 -bottom-0.5 left-0 text-amber-500/20" viewBox="0 0 100 8" preserveAspectRatio="none">
                                        <path d="M0 4 Q 25 8 50 4 Q 75 0 100 4" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                </span>
                                <motion.span
                                    style={{ x: titleRightX }}
                                    className="block whitespace-nowrap"
                                >
                                    {siteConfig.hero.titleLine2}
                                </motion.span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p variants={fadeUp} className="max-w-md text-white/35 text-sm sm:text-base leading-relaxed mb-10 mx-auto lg:mx-0 font-light tracking-wide">
                                {siteConfig.hero.description}
                            </motion.p>

                            {/* CTA */}
                            <motion.div className="relative flex justify-center lg:justify-start w-full mb-12">
                                <motion.button
                                    style={{
                                        width: buttonWidth,
                                        backgroundColor: buttonBg,
                                        color: buttonColor,
                                        borderColor: buttonBorderColor,
                                    }}
                                    animate={{
                                        boxShadow: [
                                            "0 0 20px rgba(217,119,6,0.2)",
                                            "0 0 45px rgba(217,119,6,0.5)",
                                            "0 0 20px rgba(217,119,6,0.2)"
                                        ]
                                    }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                                    className="press-scale h-14 sm:h-16 rounded-full border font-black uppercase text-[10px] tracking-[0.3em] overflow-hidden whitespace-nowrap px-8"
                                >
                                    {siteConfig.hero.ctaText}
                                </motion.button>
                            </motion.div>

                            {/* Meta row */}
                            <motion.div variants={fadeUp} className="flex items-center gap-6 justify-center lg:justify-start pt-8 border-t border-white/[0.06]">
                                <div className="flex items-center gap-2 text-white/25">
                                    <MapPin size={14} className="text-amber-600/60" />
                                    <span className="text-[10px] uppercase font-black tracking-[0.25em]">{siteConfig.location}</span>
                                </div>
                                <div className="w-1 h-1 bg-amber-500/20 rounded-full" />
                                <span className="text-[10px] uppercase font-black tracking-[0.25em] text-white/15">
                                    Since {siteConfig.established}
                                </span>
                                <div className="w-1 h-1 bg-amber-500/20 rounded-full hidden sm:block" />
                                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-amber-600/40 hidden sm:block">
                                    {siteConfig.tagline}
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* Right: Hero Image Orb */}
                        <motion.div
                            style={{ y: heroImageY }}
                            initial={{ opacity: 0, scale: 0.88 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.1, ease: "easeOut" }}
                            className="flex-1 w-full max-w-[380px] sm:max-w-[480px] lg:max-w-none px-4 lg:px-0"
                        >
                            <div className="relative w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[560px] lg:h-[560px] mx-auto">
                                {/* Floating ring — pure CSS animation */}
                                <div className="absolute inset-0 rounded-full border border-white/[0.04] scale-110 animate-spin-slow opacity-40" />
                                <motion.div
                                    style={{ rotate: heroRingRotation }}
                                    className="absolute inset-0 rounded-full border border-dashed border-amber-500/15 scale-95"
                                />

                                {/* Glow ring */}
                                <div className="absolute inset-0 rounded-full scale-105 bg-amber-600/5 blur-3xl animate-orb-a" />

                                {/* Main image circle */}
                                <div className="absolute inset-4 sm:inset-6 rounded-full overflow-hidden border-4 border-amber-900/10 shadow-2xl bg-neutral-900/50 backdrop-blur-sm animate-float z-10">
                                    {featuredFood?.imageUrl ? (
                                        <motion.img
                                            src={featuredFood.imageUrl}
                                            alt={featuredFood.name}
                                            initial={{ scale: 1.15 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 1.4, ease: "easeOut" }}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full shimmer flex items-center justify-center text-white/10 text-sm italic">
                                            Fresh Meals
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/25 via-transparent to-transparent" />
                                </div>

                                {/* Price badge */}
                                <motion.div
                                    style={{ y: heroBadgeY }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 18 }}
                                    className="absolute right-0 sm:-right-4 top-1/4 bg-black/65 backdrop-blur-xl px-5 py-4 sm:px-7 sm:py-5 rounded-[1.5rem] border border-white/[0.07] z-20 shadow-2xl"
                                >
                                    <span className="block text-amber-500 font-serif text-2xl sm:text-3xl font-bold italic">
                                        {siteConfig.currency} {featuredFood?.price ?? '—'}
                                    </span>
                                    <span className="block text-[8px] uppercase font-black tracking-[0.35em] text-white/25 mt-1.5">
                                        Today's Special
                                    </span>
                                </motion.div>

                                {/* Tagline badge */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1.1, type: "spring" }}
                                    className="absolute left-0 sm:-left-4 bottom-1/4 bg-amber-600/10 backdrop-blur-xl px-4 py-3 rounded-2xl border border-amber-500/15 z-20"
                                >
                                    <span className="block text-[8px] uppercase font-black tracking-[0.3em] text-amber-500/70">
                                        {siteConfig.tagline}
                                    </span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Menu Section ── */}
            <main className="container mx-auto px-5 sm:px-8 py-20 sm:py-28 border-t border-white/[0.05] relative z-10">

                {/* Section header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-14">
                    <div>
                        <p className="text-amber-600/60 text-[9px] uppercase font-black tracking-[0.45em] mb-3">
                            {siteConfig.menu.sectionSubtitle}
                        </p>
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight">
                            {siteConfig.menu.sectionTitle1}{' '}
                            <span className="italic text-amber-500">{siteConfig.menu.sectionTitleAccent}</span>
                        </h2>
                    </div>

                    {/* Day tabs — scrollable pill row on mobile */}
                    <div className="w-full md:w-auto overflow-x-auto scrollbar-hide -mx-5 sm:-mx-0 px-5 sm:px-0">
                        <div className="flex gap-2 pb-1 w-max md:w-auto">
                            {siteConfig.menu.days.map(day => (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={`press-scale flex-shrink-0 px-4 py-2 rounded-full text-[9px] uppercase font-black tracking-[0.2em] border transition-all duration-200 ${
                                        selectedDay === day
                                            ? 'bg-amber-600 text-black border-amber-600 shadow-[0_0_16px_rgba(217,119,6,0.4)]'
                                            : 'bg-white/[0.03] text-white/35 border-white/[0.06] active:bg-white/10'
                                    }`}
                                >
                                    {day.substring(0, 3)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Lunch */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`lunch-${selectedDay}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center gap-2 text-amber-500">
                                <UtensilsCrossed size={16} />
                                <h3 className="text-xl font-serif italic font-bold">Lunch</h3>
                            </div>
                            <div className="h-px bg-white/[0.07] flex-1" />
                            <span className="text-white/20 text-[9px] uppercase font-black tracking-widest">
                                {lunchItems.length} items
                            </span>
                        </div>

                        {lunchItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                                {lunchItems.map(food => (
                                    <FoodCard key={food.id} food={food} onAdd={addToCart} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center py-16 mb-16 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
                                <p className="text-white/20 text-sm">No lunch items scheduled for {selectedDay.charAt(0) + selectedDay.slice(1).toLowerCase()}</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Dinner */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`dinner-${selectedDay}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, delay: 0.08 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center gap-2 text-amber-500">
                                <Moon size={16} />
                                <h3 className="text-xl font-serif italic font-bold">Dinner</h3>
                            </div>
                            <div className="h-px bg-white/[0.07] flex-1" />
                            <span className="text-white/20 text-[9px] uppercase font-black tracking-widest">
                                {dinnerItems.length} items
                            </span>
                        </div>

                        {dinnerItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {dinnerItems.map(food => (
                                    <FoodCard key={food.id} food={food} onAdd={addToCart} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center py-16 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
                                <p className="text-white/20 text-sm">No dinner items scheduled for {selectedDay.charAt(0) + selectedDay.slice(1).toLowerCase()}</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* ── Footer ── */}
            <footer className="relative z-10 bg-neutral-950/80 border-t border-white/[0.05] py-20 sm:py-28 overflow-hidden">
                {/* Footer glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-amber-600/5 blur-3xl rounded-full" />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-5 sm:px-8 text-center relative"
                >
                    {/* Brand */}
                    <div className="flex flex-col items-center mb-14">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-amber-500/15 shadow-lg mb-5">
                            <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-white font-serif text-3xl sm:text-4xl font-black italic tracking-tighter">
                            {siteConfig.name}
                        </span>
                        <span className="text-amber-500 text-[9px] uppercase font-black tracking-[0.5em] mt-1.5">
                            {siteConfig.nameAccent}
                        </span>
                        <p className="text-white/20 text-xs mt-3 tracking-wider">{siteConfig.tagline}</p>
                    </div>

                    {/* Footer links */}
                    <div className="flex flex-wrap justify-center gap-8 sm:gap-12 text-white/20 mb-16 text-[10px] uppercase font-black tracking-[0.2em]">
                        {siteConfig.footer.links.map(link => (
                            <a key={link.label} href={link.href} className="active:text-amber-500 transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-12" />

                    {/* Copyright */}
                    <p className="text-white/10 text-[9px] uppercase font-black tracking-[0.45em] mb-10">
                        {siteConfig.footer.copyright}
                    </p>

                    {/* Developer credit */}
                    <a
                        href={siteConfig.footer.developerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press-scale inline-flex items-center gap-4 px-7 py-3.5 rounded-full border border-white/[0.06] bg-white/[0.015] transition-all duration-300"
                    >
                        <span className="text-[9px] text-white/20 uppercase font-black tracking-[0.3em]">Digital Partner</span>
                        <div className="h-4 w-px bg-white/10" />
                        <span className="text-white font-serif text-lg font-black italic tracking-tight">
                            {siteConfig.footer.developerBrand}
                        </span>
                    </a>
                </motion.div>
            </footer>

            <Cart items={cartItems} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
        </div>
    )
}
