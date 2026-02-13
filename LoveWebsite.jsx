import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Lock, Heart, Stars, Music } from "lucide-react";

export default function LoveWebsite() {
    const [isLogged, setIsLogged] = useState(false);
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [showLetter, setShowLetter] = useState(false);
    const [showSecret, setShowSecret] = useState(false);
    const [showFinalScene, setShowFinalScene] = useState(false);
    const [timeTogether, setTimeTogether] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef(null);



    const loveStartDate = new Date("2025-10-27T00:00:00");
    const { scrollYProgress } = useScroll();
    const scaleHero = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = now - loveStartDate;

            const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
            const years = Math.floor(totalDays / 365);
            const months = Math.floor((totalDays % 365) / 30);
            const days = totalDays % 30;
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const minutes = Math.floor(diff / (1000 * 60)) % 60;
            const seconds = Math.floor(diff / 1000) % 60;

            setTimeTogether({ years, months, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleLogin = () => {
        if (day === "27" && month === "10" && year === "2025") {
            setIsLogged(true);
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
                setIsPlaying(true);
            }
            setTimeout(() => setShowLetter(true), 1200);
        } else {
            alert("جربوا تاريخكم المميز (27 / 10 / 2025)");
        }
    };

    const triggerSecret = () => {
        setShowSecret(true);
        setTimeout(() => setShowSecret(false), 2000);
    };

    if (!isLogged) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('/background.jpg')" }}
            >
                <div className="bg-black/70 p-10 rounded-3xl text-center text-white">
                    <Lock className="mx-auto mb-4" size={40} />
                    <h1 className="text-3xl font-bold mb-6">دخول خاص</h1>
                    <div className="flex gap-4 justify-center mb-6">
                        <input
                            type="password"
                            placeholder="27"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className="w-20 p-3 rounded-xl text-black text-center"
                        />
                        <input
                            type="password"
                            placeholder="10"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="w-20 p-3 rounded-xl text-black text-center"
                        />
                        <input
                            type="password"
                            placeholder="2025"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-24 p-3 rounded-xl text-black text-center"
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        className="bg-pink-500 px-8 py-3 rounded-2xl"
                    >
                        دخول
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-rose-100 via-pink-200 to-rose-300 text-gray-800 overflow-hidden relative">
            <audio ref={audioRef} src="./music.mp4" loop />

            <button
                onClick={() => {
                    if (isPlaying) audioRef.current.pause();
                    else audioRef.current.play();
                    setIsPlaying(!isPlaying);
                }}
                className={`fixed top-4 left-4 z-50 bg-white/80 p-3 rounded-full shadow-lg text-pink-600 hover:bg-white transition-all duration-300 ${isPlaying ? "animate-spin" : ""}`}
            >
                <Music size={24} />
            </button>

            {/* Secret Popup */}
            <AnimatePresence>
                {showSecret && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-center"
                    >
                        <div className="bg-white px-16 py-10 rounded-3xl shadow-2xl border-4 border-pink-300">
                            <h2 className="text-4xl font-bold text-pink-600 mb-4">بحبك يا توحا ❤</h2>
                            <p className="text-xl text-gray-700">يا أغلى حاجة في حياتي</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Love Letter Modal */}
            <AnimatePresence>
                {showLetter && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setShowLetter(false)}
                    >
                        <div className="bg-white/90 p-8 md:p-12 rounded-[2rem] max-w-2xl w-full shadow-2xl relative text-center border-4 border-rose-200" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setShowLetter(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl">✕</button>
                            <Heart className="w-16 h-16 text-rose-500 mx-auto mb-6 animate-pulse" />
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif">رسالة إلى توحا ❤️</h2>
                            <div className="text-lg md:text-xl text-gray-700 leading-relaxed font-light space-y-4">
                                <p>إلى توحا.. يا أجمل صدفة في عمري.</p>
                                <p>من يوم <strong>27/10/2025</strong>، وحياتي اتغيرت بيكي، وكأن الدنيا صالحتني بوجودك. أنتي مش بس حبيبتي، أنتي بنتي وصحبتي وكل دنيتي.</p>
                                <p>كل ثانية بتعدي وأنتي معايا بتسوى عندي كنوز الدنيا، ونفسي أكمل باقي عمري كله جمبك.</p>
                                <p>ربنا يديمك نعمة في حياتي وميحرمنيش من ضحكتك أبداً. بحبك يا توحا.</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <p className="text-2xl font-bold text-rose-600 font-serif">حبيبك.. يوسف</p>
                                <button onClick={() => setShowLetter(false)} className="mt-6 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-2 rounded-full shadow-lg">
                                    اغلاق ❌
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Final Scene Overlay */}
            <AnimatePresence>
                {showFinalScene && (
                    <FinalSceneComponent onClose={() => setShowFinalScene(false)} />
                )}
            </AnimatePresence>

            {/* Hero Cinematic */}
            <motion.section style={{ scale: scaleHero }} className="text-center py-32 relative overflow-hidden">
                <video src="./bg_video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
                <div className="relative z-10">
                    <h1 className="text-6xl font-extrabold mb-6">يوسف ❤️ توحا</h1>
                    <p className="text-2xl">قصة حب مكتوبة للابد (27/10/2025)</p>
                    <button
                        onClick={triggerSecret}
                        className="mt-10 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full shadow-xl"
                    >
                        زر المفاجأة
                    </button>
                </div>
            </motion.section>

            {/* Timeline Memories */}
            <section className="py-24 bg-white/70">
                <h2 className="text-4xl font-bold text-center mb-16">خط ذكرياتنا</h2>
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute left-1/2 top-0 w-1 bg-pink-400 h-full" />

                    {[
                        "أول تعارف 27/10/2025",
                        "أول ضحكة سوا",
                        "أول خروجة",
                        "الاعتراف بالحب 27/10/2025",
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className={`mb-16 flex ${index % 2 === 0 ? "justify-start" : "justify-end"
                                }`}
                        >
                            <div className="bg-pink-500 text-white p-6 rounded-2xl w-80 shadow-xl font-bold">
                                {item}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>



            {/* Counter */}
            <section className="py-24 bg-white/70 text-center">
                <h2 className="text-3xl font-bold mb-10">مدة حبنا</h2>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
                    <TimeBox label="سنين" value={timeTogether.years} />
                    <TimeBox label="شهور" value={timeTogether.months} />
                    <TimeBox label="أيام" value={timeTogether.days} />
                    <TimeBox label="ساعات" value={timeTogether.hours} />
                    <TimeBox label="دقائق" value={timeTogether.minutes} />
                    <TimeBox label="ثواني" value={timeTogether.seconds} />
                </div>
            </section>

            <footer className="text-center py-10 text-lg flex flex-col items-center gap-4">
                <p>For the rest of our life ❤</p>
                <button
                    onClick={() => setShowFinalScene(true)}
                    className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm hover:bg-purple-700 transition"
                >
                    النهاية
                </button>
            </footer>
        </div>
    );
}

function TimeBox({ label, value }) {
    return (
        <div className="bg-pink-500 text-white p-5 rounded-2xl shadow-xl">
            <div className="text-2xl font-bold">{value || 0}</div>
            <div className="text-sm">{label}</div>
        </div>
    );
}

function FinalSceneComponent({ onClose }) {
    const [step, setStep] = useState(0);

    // Timings for the sequence (in milliseconds)
    useEffect(() => {
        const timeouts = [];

        // Start sequence
        timeouts.push(setTimeout(() => setStep(1), 500)); // Header: ولو كان في عمر تاني...
        timeouts.push(setTimeout(() => setStep(2), 3500)); // مش مجرد شخص...
        timeouts.push(setTimeout(() => setStep(3), 6500)); // أنت الحياة نفسها
        timeouts.push(setTimeout(() => setStep(4), 9500)); // مش مجرد حب...
        timeouts.push(setTimeout(() => setStep(5), 12500)); // أنت الأمان...
        timeouts.push(setTimeout(() => setStep(6), 16000)); // لو الأيام اتشقلبت...
        timeouts.push(setTimeout(() => setStep(7), 19000)); // ولو الدنيا وقفت...
        timeouts.push(setTimeout(() => setStep(8), 22000)); // أنا ثابتة... (Short)
        timeouts.push(setTimeout(() => setStep(9), 24000)); // علشان اخترتك...
        timeouts.push(setTimeout(() => setStep(10), 28000)); // ومش باختارك...
        timeouts.push(setTimeout(() => setStep(11), 32000)); // أنا باختارك كل لحظة

        // Final Grand Reveal
        timeouts.push(setTimeout(() => setStep(12), 36000)); // Clear text, Darken more
        timeouts.push(setTimeout(() => setStep(13), 37000)); // مهند ❤️ مريم
        timeouts.push(setTimeout(() => setStep(14), 40000)); // For the rest of our life + Hearts

        // The very last whisper
        timeouts.push(setTimeout(() => setStep(15), 45000)); // شكراً إنك جيت حياتي...

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center text-center p-8 overflow-hidden"
        >
            {/* Close button for safety */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/30 hover:text-white text-sm"
            >
                خروج
            </button>

            {/* Floating Background Particles (Stars/Hearts) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: -100,
                            x: Math.random() * window.innerWidth
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        className="absolute text-pink-500/30"
                    >
                        {i % 2 === 0 ? <Heart size={10 + Math.random() * 20} /> : <Stars size={10 + Math.random() * 20} />}
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 max-w-3xl w-full flex flex-col items-center justify-center min-h-[50vh]">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.h2
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1 }}
                            className="text-4xl md:text-6xl font-bold text-pink-500 mb-8"
                        >
                            ولو كان في عمر تاني… هختارك برضه
                        </motion.h2>
                    )}

                    {step >= 2 && step < 12 && (
                        <motion.div
                            key="sequence-text"
                            className="space-y-6"
                        >
                            {step >= 2 && (
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                    className="text-2xl text-white/90"
                                >
                                    مش مجرد شخص دخل حياتي…
                                </motion.p>
                            )}
                            {step >= 3 && (
                                <motion.p
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    className="text-3xl font-semibold text-pink-400"
                                >
                                    أنتي الحياة نفسها.
                                </motion.p>
                            )}
                            {step >= 4 && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    className="text-2xl text-white/90 mt-4"
                                >
                                    مش مجرد حب…
                                </motion.p>
                            )}
                            {step >= 5 && (
                                <motion.p
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    className="text-3xl font-semibold text-rose-400"
                                >
                                    أنتي الأمان، والونس، والبيت.
                                </motion.p>
                            )}
                            {step >= 6 && (
                                <motion.p
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-xl text-gray-300 mt-6"
                                >
                                    لو الأيام اتشقلبت... ولو الدنيا وقفت ضدنا
                                </motion.p>
                            )}
                            {step >= 8 && (
                                <motion.p
                                    initial={{ opacity: 0, scale: 1.5 }} animate={{ opacity: 1, scale: 1 }}
                                    className="text-4xl font-bold text-white mt-4"
                                >
                                    أنا ثابت…
                                </motion.p>
                            )}
                            {step >= 9 && (
                                <motion.p
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-2xl text-pink-300"
                                >
                                    علشان اخترتك بقلب كامل.
                                </motion.p>
                            )}
                            {step >= 10 && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="mt-8 text-xl text-white/80"
                                >
                                    <p>ومش باختارك كل يوم بس…</p>
                                    {step >= 11 && <p className="text-3xl text-pink-500 font-bold mt-2">أنا باختارك كل لحظة.</p>}
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {step >= 13 && (
                        <motion.div
                            key="grand-finale"
                            className="flex flex-col items-center"
                        >
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, type: "spring" }}
                                className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 mb-8"
                            >
                                يوسف ❤️ توحا
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 2 }}
                                className="text-2xl text-white flex items-center gap-2"
                            >
                                <span>إلى ما لا نهاية</span>
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                >
                                    ♾️
                                </motion.span>
                            </motion.div>

                            {step >= 14 && (
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                    className="text-xl text-gray-400 mt-4 font-serif italic"
                                >
                                    For the rest of our life.
                                </motion.p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* The Final Whisper */}
            {step >= 15 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute bottom-10 text-sm text-gray-500"
                >
                    شكراً إنك جيتي حياتي… وغيرتها للأبد.
                </motion.div>
            )}
        </motion.div>
    );
}
