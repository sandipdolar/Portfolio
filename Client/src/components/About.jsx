import Reveal from "./Reveal"

import { GraduationCap } from "lucide-react";

import { STATS } from "../data/stats";

const About = () => {
    return(
        <>
            {/* =================================================================
                ABOUT
            ================================================================= */}
            <section
            id="about"
            className="px-6 py-24 border-t border-slate-100 bg-slate-50/60"
            >
            <div className="mx-auto max-w-6xl">
                <Reveal>
                <span className="font-mono text-xs text-emerald-600">
                    // 01 — about
                </span>
                </Reveal>
    
                <div className="mt-4 grid md:grid-cols-5 gap-12 items-start">
                <Reveal className="md:col-span-3" delay={80}>
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                    Turning coursework into real, working software.
                    </h2>
                    <p className="mt-5 text-slate-600 leading-relaxed">
                    I'm currently in my final year of BCA, and I learn best by
                    shipping — not just studying syntax. Over the past couple of
                    years that's meant building a WooCommerce store from a custom
                    WordPress theme, an admin dashboard in PHP and MySQL with full
                    CRUD, and interfaces in React styled with Tailwind CSS. I've
                    also started exploring MongoDB to round out the stack for full
                    JavaScript-based apps.
                    </p>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                    I care about clean structure and code that's easy to hand off —
                    the same way I've tried to write this portfolio. I'm looking for
                    an internship or freelance work where I can keep building things
                    that are actually used.
                    </p>
    
                    <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                    <GraduationCap size={20} className="text-emerald-600" />
                    TYBCA — Final Year, India
                    </div>
                </Reveal>
    
                <Reveal className="md:col-span-2" delay={160}>
                    <div className="grid grid-cols-2 gap-4">
                    {STATS.map((stat) => (
                        <div
                        key={stat.label}
                        className="rounded-xl border border-slate-200 bg-white p-5"
                        >
                        <div className="font-display text-2xl font-semibold text-slate-900">
                            {stat.value}
                        </div>
                        <div className="mt-1 text-xs text-slate-500 leading-snug">
                            {stat.label}
                        </div>
                        </div>
                    ))}
                    </div>
                </Reveal>
                </div>
            </div>
            </section>
        </>
    )
}

export default About