import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "../assets/hero-image-new.jpg";

interface LandingProps {
    onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4 w-full">
            <div className="max-w-[450px] w-full space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                >
                    <span className="text-primary font-bold tracking-wider text-sm md:text-base uppercase bg-primary/10 px-4 py-1.5 rounded-full">
                        MOJA CAPS
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#1A1A1B] leading-tight">
                        DESCUBRA SEU PLANO PERSONALIZADO PARA <span className="text-primary">EMAGRECER</span> E TER MAIS ENERGIA
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Faça o quiz de 2 minutos e receba uma estratégia feita sob medida para acelerar seu metabolismo.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-full flex justify-center py-6"
                >
                    <div className="relative w-full max-w-[420px] aspect-[4/5] md:aspect-square rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden bg-[#F6F6FB] border border-zinc-200">
                        <img
                            src={heroImage}
                            alt="Casal comendo hambúrguer"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Button
                        size="lg"
                        onClick={onStart}
                        className="text-lg px-12 py-8 rounded-full shadow-2xl shadow-primary/40 animate-pulse hover:animate-none transform hover:scale-105 transition-all text-white font-bold"
                    >
                        QUERO MEU PLANO PERSONALIZADO
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-center space-x-8 text-gray-400 text-sm"
                >
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        100% Seguro
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Baseado em Ciência
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
