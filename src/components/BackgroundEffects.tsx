'use client'

export function BackgroundEffects() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Base radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(30,20,10,1)_0%,_rgba(0,0,0,1)_70%)]" />

            {/* Orb A — top-right amber */}
            <div
                className="absolute -top-[15%] -right-[15%] w-[700px] h-[700px] rounded-full blur-[130px] mix-blend-screen animate-orb-a"
                style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.28) 0%, rgba(180,83,9,0.12) 60%, transparent 100%)' }}
            />

            {/* Orb B — bottom-left deep orange */}
            <div
                className="absolute -bottom-[20%] -left-[15%] w-[800px] h-[800px] rounded-full blur-[150px] mix-blend-screen animate-orb-b"
                style={{ background: 'radial-gradient(circle, rgba(180,83,9,0.22) 0%, rgba(120,53,15,0.10) 60%, transparent 100%)' }}
            />

            {/* Orb C — centre subtle gold drift */}
            <div
                className="absolute top-[30%] left-[20%] w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen animate-orb-c"
                style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)' }}
            />

            {/* Horizontal amber line — top separator glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />

            {/* Film grain texture — animated */}
            <div
                className="absolute inset-0 w-[200%] h-[200%] opacity-[0.025] mix-blend-overlay animate-grain"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '200px 200px',
                }}
            />

            {/* Subtle grid lines */}
            <div
                className="absolute inset-0 opacity-[0.018]"
                style={{
                    backgroundImage: `linear-gradient(rgba(217,119,6,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.5) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />
        </div>
    )
}
