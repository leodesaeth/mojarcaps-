import { Button } from "@/components/ui/button";

import {
    CheckCircle2,
    Lock,
    ShieldCheck,
    ArrowLeft,
    Clock,
    Eye,
    Star,
    Gift,
    CreditCard,
    Zap,
    Wallet,
    FileText,
    Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface OfferPageProps {
    title: string;
    subtitle: string;
    pots: string;
    price: string;
    oldPrice?: string;
    savings?: string;
    image: string;
    checkoutLink: string;
    benefits: string[];
    discount?: string;
}

export function OfferPage({
    title,
    subtitle,
    pots,
    price,
    oldPrice = "R$ 497,00",
    savings = "Economia de R$ 100,00",
    image,
    checkoutLink,
    benefits,
    discount = "20% OFF"
}: OfferPageProps) {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(1782); // 29:42 in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-white font-inter text-zinc-900 pb-20">

            {/* Urgency Bar */}
            <div className="bg-[#7C3AED] text-white py-2 px-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-[11px] font-bold uppercase tracking-wider z-[60] relative">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 animate-pulse" />
                    Oferta expira em: <span className="font-black tabular-nums">{formatTime(timeLeft)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    35 pessoas vendo agora
                </div>
            </div>

            <header className="py-8 px-4 flex flex-col items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-zinc-400 hover:text-zinc-600 font-bold text-[10px] uppercase tracking-widest transition-colors mb-6"
                >
                    <ArrowLeft className="w-3 h-3" /> Voltar ao resultado
                </button>

                <Link to="/" className="text-2xl font-black text-zinc-900 tracking-[0.2em] uppercase mb-4">MOJACAPS</Link>

                <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-1.5 rounded-full border border-purple-100 mb-6">
                    <Gift className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                        OFERTA ESPECIAL - {discount}
                    </span>
                </div>

                <div className="text-center space-y-2 max-w-2xl px-4">
                    <h1 className="text-2xl md:text-4xl font-black text-zinc-900 uppercase leading-[1.1] tracking-tight">
                        GARANTA SEU <span className="text-purple-600">{title}</span> COM {discount} DE DESCONTO
                    </h1>
                    <p className="text-zinc-400 text-xs md:text-sm font-bold uppercase tracking-wide">
                        {pots} de MOJACAPS para transformation completa
                    </p>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 md:px-8 space-y-12">

                {/* Main Hero Card */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* Left: Product Image */}
                    <div className="lg:col-span-5 relative group">
                        <div className="aspect-square bg-white rounded-[40px] shadow-2xl shadow-purple-200/40 border border-zinc-100 flex items-center justify-center p-8 overflow-hidden">
                            <motion.img
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                src={image}
                                alt={pots}
                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-8 right-8 bg-[#7C3AED] text-white w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-white transform rotate-12">
                                <span className="text-[10px] font-black leading-none">ATÉ</span>
                                <span className="text-sm font-black leading-none">{discount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Info & Pricing */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <h2 className="text-xl md:text-2xl font-black text-zinc-900 uppercase tracking-tight">
                                    {title}
                                </h2>
                                <p className="text-zinc-500 text-xs font-medium">{subtitle}</p>
                            </div>

                            <ul className="grid grid-cols-1 gap-3">
                                {benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="bg-purple-50 p-1 rounded-full border border-purple-100">
                                            <CheckCircle2 className="w-3 h-3 text-purple-600" />
                                        </div>
                                        <span className="text-[11px] md:text-xs font-bold text-zinc-600 uppercase tracking-tight">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pricing Box */}
                        <div className="bg-zinc-50/50 rounded-[32px] border border-zinc-100 p-8 space-y-4">
                            <div className="space-y-1">
                                <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest line-through">De: {oldPrice}</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-zinc-900 tracking-tighter">{price}</span>
                                    <span className="text-zinc-400 text-xs font-bold">,00</span>
                                </div>
                                <p className="text-zinc-400 text-[10px] font-bold">ou 10x de R$ 33,70 sem juros</p>
                            </div>
                            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full">
                                <Zap className="w-3 h-3 fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{savings}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bonus Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="bg-purple-600 p-1.5 rounded-lg shadow-lg shadow-purple-500/20">
                            <Star className="w-4 h-4 text-white fill-current" />
                        </div>
                        <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest">BÔNUS EXCLUSIVOS INCLUSOS:</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { label: "Guia Alimentar Completo (PDF)", icon: FileText },
                            { label: "Planner de Treinos de 90 Dias", icon: Calendar },
                            { label: "Acesso ao Grupo Exclusivo VIP", icon: ShieldCheck }
                        ].map((bonus, i) => (
                            <div key={i} className="bg-white border border-zinc-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-50">
                                    <bonus.icon className="w-5 h-5 text-purple-600" />
                                </div>
                                <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-tight leading-snug">{bonus.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Payment Methods */}
                <section className="flex justify-center gap-4 md:gap-8">
                    {[
                        { label: "CARTÃO", sub: "até 10x", icon: CreditCard },
                        { label: "PIX", sub: "5% OFF", icon: Wallet },
                        { label: "BOLETO", sub: "à vista", icon: FileText }
                    ].map((method, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 bg-white border border-zinc-100 p-5 rounded-2xl w-24 md:w-32 shadow-sm">
                            <method.icon className="w-6 h-6 text-purple-600" />
                            <div className="text-center">
                                <p className="text-[10px] font-black text-zinc-900 uppercase tracking-tighter">{method.label}</p>
                                <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter">{method.sub}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Fixed/Main CTA */}
                <section className="flex flex-col items-center gap-6">
                    <div className="w-full max-w-xl space-y-4">
                        <Button
                            onClick={() => window.location.href = checkoutLink}
                            size="lg"
                            fullWidth
                            className="h-20 rounded-3xl bg-purple-600 hover:bg-purple-700 shadow-2xl shadow-purple-500/40 text-white font-black text-lg md:text-xl uppercase tracking-[0.1em] flex items-center justify-center gap-4 group relative overflow-hidden animate-pulse-subtle"
                        >
                            <span className="relative z-10">QUERO TRANSFORMAR MEU CORPO AGORA</span>
                        </Button>
                        <div className="flex items-center justify-center gap-4 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                            <span>Pagamento 100% seguro</span>
                            <span className="h-1 w-1 bg-zinc-200 rounded-full"></span>
                            <span>Entrega garantida</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 pt-4">
                        {[
                            { label: "Garantia de 30 dias", icon: ShieldCheck },
                            { label: "Pagamento seguro", icon: Lock }
                        ].map((badge, i) => (
                            <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-tight">
                                <badge.icon className="w-4 h-4 text-purple-600" />
                                {badge.label}
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/resultados"
                        className="text-purple-600 hover:text-purple-700 font-bold text-xs uppercase tracking-widest underline underline-offset-8 decoration-purple-200 pt-8"
                    >
                        Quero ver outros planos
                    </Link>
                </section>

                <footer className="pt-20 border-t border-zinc-100 flex flex-col items-center text-center gap-6 opacity-40 grayscale">
                    <p className="text-[9px] font-medium text-zinc-500 uppercase tracking-widest">SAC: suporte@ylly.com.br</p>
                    <p className="text-[8px] max-w-sm text-zinc-400 leading-relaxed font-bold uppercase">
                        Produto para adultos. Consulte um profissional se necessário.
                        Resultados variam de acordo com o metabolismo individual.
                    </p>
                </footer>
            </main>
        </div>
    );
}
