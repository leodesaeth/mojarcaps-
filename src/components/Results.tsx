import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Target,
    Calendar,
    Clock,
    Utensils,
    Salad,
    ArrowRight,
    Flame,
    Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";


// Start Images
import image1Pot from "@/assets/1pot.png";
import image2Pots from "@/assets/2pots.png";
import image3Pots from "@/assets/3pots.png";
// End Images

const PLANS = [
    {
        id: '1month',
        title: 'TRAZAMENTO EXPERIMENTAL DE 30 DIAS',
        pots: '1 POTE',
        price: 'R$ 197,00',
        image: image1Pot,
        link: '/oferta-1-frasco',
        description: 'Para quem quer testar'
    },
    {
        id: '2months',
        title: 'TRATAMENTO RECOMENDADO DE 2 MESES',
        pots: '2 POTES',
        price: 'R$ 279,00',
        image: image2Pots,
        link: '/oferta-2-frascos',
        description: 'Tratamento recomendado'
    },
    {
        id: '3months',
        title: 'TRATAMENTO COMPLETO DE 3 MESES',
        pots: '3 POTES',
        price: 'R$ 379,00',
        image: image3Pots,
        link: '/oferta-3-frascos',
        bestValue: true,
        description: 'Melhor custo-benefício'
    }
];

interface Answers {
    gender: string;
    weight: string;
    height: string;
    goal: string;
    food_relationship: string;
    cravings: string;
    age: string;
    activity: string;
}

export function Results() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("m1");
    const [selectedPlanId, setSelectedPlanId] = useState('3months');

    // Default values if direct access (fallback)
    const defaultAnswers: Answers = {
        gender: 'female',
        weight: '70',
        height: '165',
        goal: '10-20',
        food_relationship: 'control',
        cravings: 'afternoon',
        age: '30',
        activity: 'moderate'
    };

    const answers: Answers = location.state?.answers || defaultAnswers;

    const selectedPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[2];

    const handlePlanSelect = (planId: string) => {
        setSelectedPlanId(planId);
    };

    // Personalization Logic
    const getWorkoutPlan = (activity: string) => {
        if (activity === 'sedentary' || activity === 'light') {
            return [
                { day: 'Segunda', train: 'Caminhada + Alongamento', time: '30 min' },
                { day: 'Terça', train: 'Fortalecimento Leve (Casa)', time: '20 min' },
                { day: 'Quarta', train: 'Caminhada Ritmo Médio', time: '30 min' },
                { day: 'Quinta', train: 'Descanso Ativo', time: '15 min' },
                { day: 'Sexta', train: 'Dança ou Movimento', time: '30 min' },
                { day: 'Sábado', train: 'Caminhada Longa', time: '40 min' },
                { day: 'Domingo', train: 'Descanso', time: '-' },
            ];
        } else {
            return [
                { day: 'Segunda', train: 'Treino A - Superior + HIIT', time: '45 min' },
                { day: 'Terça', train: 'Cardio Moderado + Core', time: '30 min' },
                { day: 'Quarta', train: 'Treino B - Inferior', time: '45 min' },
                { day: 'Quinta', train: 'Descanso Ativo / Yoga', time: '20 min' },
                { day: 'Sexta', train: 'Full Body Funcional', time: '50 min' },
                { day: 'Sábado', train: 'Cardio Intenso', time: '30 min' },
                { day: 'Domingo', train: 'Descanso', time: '-' },
            ];
        }
    };

    const getTips = (cravings: string, foodRel: string) => {
        const tips = [
            { icon: Target, text: `Seu peso atual (${answers.weight}kg) será nosso ponto de partida` },
            { icon: Utensils, text: "MÍNIMO 3 litros de água por dia para acelerar o metabolismo" },
        ];

        if (cravings === 'every_day' || cravings === 'afternoon') {
            tips.push({ icon: Flame, text: "Estratégia Anti-Doces: Mojacaps 1h após almoço" });
            tips.push({ icon: Zap, text: "Troque o doce da tarde por fruta com canela" });
        } else {
            tips.push({ icon: Flame, text: "Café reforçado: Proteína + Fibras para saciedade" });
            tips.push({ icon: Zap, text: "Evite carboidratos simples isolados no jantar" });
        }

        if (foodRel === 'cant_stop' || foodRel === 'snacking') {
            tips.push({ icon: Salad, text: "Aumente as fibras (saladas) antes do prato principal" });
        } else {
            tips.push({ icon: Salad, text: "Mantenha a constância nos horários das refeições" });
        }

        return tips;
    };

    const workoutPlan = getWorkoutPlan(answers.activity);
    const personalizedTips = getTips(answers.cravings, answers.food_relationship);


    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center py-8 px-5 font-inter text-zinc-900">
            <div className="max-w-[450px] w-full space-y-8">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest">⚡ SEU PLANO PERSONALIZADO FOI CRIADO!</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-purple-600 uppercase leading-none tracking-tight">
                        PLANO CONTROLE DE<br /><span className="text-[#d946ef]">COMPULSÃO</span>
                    </h1>

                    <p className="text-sm text-zinc-500 font-medium max-w-sm mx-auto leading-relaxed">
                        Seu corpo está pedindo controle sobre os picos de glicose que causam a vontade por doces.
                    </p>

                    {/* Tags / Pills */}
                    <div className="flex justify-center gap-3 pt-2">
                        <div className="bg-zinc-50 border border-zinc-100 px-4 py-1.5 rounded-lg text-[10px] font-bold text-zinc-600 uppercase tracking-wide">
                            {answers.weight}kg
                        </div>
                        <div className="bg-zinc-50 border border-zinc-100 px-4 py-1.5 rounded-lg text-[10px] font-bold text-zinc-600 uppercase tracking-wide">
                            {answers.height}cm
                        </div>
                    </div>
                </motion.div>

                {/* 3-Month Cycle Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="rounded-[24px] border border-zinc-100 shadow-sm overflow-hidden bg-white">
                        <CardHeader className="pb-2 border-b border-zinc-50 pt-6 px-6">
                            <CardTitle className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                <Calendar className="w-4 h-4 text-purple-600" /> CICLO COMPLETO DE 3 MESES
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6 relative px-6 pb-8">
                            {/* Vertical Line */}
                            <div className="absolute left-[39px] top-10 bottom-10 w-[2px] bg-purple-100"></div>

                            {/* Month 1 (Active) */}
                            <div className="relative z-10 pl-10">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center ring-4 ring-white z-20 shadow-sm">
                                    <span className="text-[8px] font-bold">●</span>
                                </div>
                                <div className="p-4 rounded-xl bg-zinc-50 border border-purple-100 relative shadow-sm">
                                    <h3 className="text-[10px] font-bold text-purple-600 uppercase mb-1 tracking-wider">Mês 1</h3>
                                    <h4 className="text-sm font-bold text-zinc-900 mb-1">Adaptação Metabólica</h4>
                                    <p className="text-zinc-500 text-[10px]">Seu corpo começa a responder</p>
                                </div>
                            </div>

                            {/* Month 2 */}
                            <div className="relative z-10 pl-10 opacity-60">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center ring-4 ring-white shadow-sm">
                                    <span className="text-[8px] font-bold">●</span>
                                </div>
                                <div className="p-4 rounded-xl bg-white border border-zinc-100">
                                    <h3 className="text-[10px] font-bold text-purple-600 uppercase mb-1 tracking-wider">Mês 2</h3>
                                    <h4 className="text-sm font-bold text-zinc-900 mb-1">Transformação Corporal</h4>
                                    <p className="text-zinc-500 text-[10px]">Queima de gordura constante</p>
                                </div>
                            </div>

                            {/* Month 3 */}
                            <div className="relative z-10 pl-10 opacity-60">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center ring-4 ring-white shadow-sm">
                                    <span className="text-[8px] font-bold">●</span>
                                </div>
                                <div className="p-4 rounded-xl bg-white border border-zinc-100">
                                    <h3 className="text-[10px] font-bold text-purple-600 uppercase mb-1 tracking-wider">Mês 3</h3>
                                    <h4 className="text-sm font-bold text-zinc-900 mb-1">Consolidação</h4>
                                    <p className="text-zinc-500 text-[10px]">Resultados duradouros</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Workout Plan */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >

                    <Card className="rounded-[24px] border border-zinc-100 shadow-sm overflow-hidden bg-white">
                        {/* Product Image Section - Large & Centered */}
                        <div className="w-full bg-[#FAFAFA] pt-8 pb-4 flex justify-center">
                            <div className="relative w-48 h-48 md:w-56 md:h-56">
                                <img
                                    src={selectedPlan.image}
                                    alt="Mojacaps Potes"
                                    className="w-full h-full object-contain drop-shadow-xl"
                                />
                            </div>
                        </div>

                        <CardHeader className="pb-2 border-b border-zinc-50 pt-0 px-6 bg-white">
                            <CardTitle className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest py-4">
                                <Calendar className="w-4 h-4 text-purple-600" /> CICLO COMPLETO DE 3 MESES
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 px-6 pb-8">
                            {/* Tabs */}
                            <div className="flex bg-zinc-100 p-1 rounded-xl mb-6 shadow-inner">
                                {['m1', 'm2', 'm3'].map((month, i) => (
                                    <button
                                        key={month}
                                        onClick={() => setActiveTab(month)}
                                        className={cn(
                                            "flex-1 py-3 text-xs font-bold rounded-lg transition-all",
                                            activeTab === month
                                                ? "bg-purple-600 text-white shadow-md border border-purple-500"
                                                : "text-zinc-400 hover:text-zinc-900"
                                        )}
                                    >
                                        Mês {i + 1}
                                    </button>
                                ))}
                            </div>

                            <div className="mb-6 bg-purple-50 p-4 rounded-xl border border-purple-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-4 h-4 rounded-full bg-purple-200 flex items-center justify-center">
                                        <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                                    </div>
                                    <h4 className="font-bold text-zinc-900 text-sm">Mês 1: Adaptação</h4>
                                </div>
                                <p className="text-[11px] text-zinc-500 ml-6 leading-relaxed">Fase de adaptação metabólica. Foco no controle do apetite e ansiedade.</p>
                            </div>

                            {/* Schedule Headline */}
                            <div className="flex items-center gap-2 mb-4 text-zinc-400 font-bold text-[10px] uppercase tracking-widest px-1">
                                <Clock className="w-3 h-3" /> Agenda Semanal
                            </div>


                            {/* Clean Table */}
                            <div className="space-y-1 mb-8">
                                {workoutPlan.map((item, index) => (
                                    <div
                                        key={item.day}
                                        className={cn(
                                            "grid grid-cols-[90px_1fr_auto] items-center py-4 border-b border-zinc-50 last:border-0",
                                            index % 2 === 1 ? "bg-zinc-50/50 rounded-xl px-4 -mx-4" : "px-0"
                                        )}
                                    >
                                        <span className="font-bold text-zinc-800 text-xs tracking-tight">{item.day}</span>
                                        <span className="text-zinc-500 text-[11px] text-center font-medium leading-none">{item.train}</span>
                                        <span className="text-zinc-400 text-[10px] text-right font-bold tracking-tighter">{item.time}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Dicas do Mês Section (Inside Workout Card) */}
                            <div className="pt-6 border-t border-zinc-50">
                                <div className="flex items-center gap-2 mb-4 text-zinc-400 font-bold text-[10px] uppercase tracking-widest px-1">
                                    Dicas do Mês:
                                </div>
                                <ul className="space-y-3">
                                    {personalizedTips.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 p-1">
                                            <div className="mt-0.5 rounded-full p-1.5 bg-purple-100 shrink-0">
                                                <item.icon className="w-3 h-3 text-purple-600" />
                                            </div>
                                            <span className="text-zinc-600 text-[11px] leading-relaxed font-medium">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </CardContent>
                    </Card>
                </motion.div>

                {/* COMO USAR MOJACAPS */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full"
                >
                    <Card className="rounded-[24px] border border-zinc-100 shadow-sm overflow-hidden bg-white p-6 mb-6">
                        <div className="flex items-center gap-2 mb-6">
                            <ArrowRight className="w-4 h-4 text-purple-600 -rotate-45" />
                            <h3 className="text-sm font-black text-[#1A1A1B] uppercase tracking-wide">COMO USAR MOJACAPS</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Tome 2 cápsulas 30min antes do almoço",
                                "Nos dias de mais compulsão, adicione 1 cápsula antes do jantar",
                                "Mantenha o uso consistente por 90 dias para resultados duradouros"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                                    </div>
                                    <span className="text-xs text-zinc-600 font-medium leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </motion.div>

                {/* ALIMENTAÇÃO PERSONALIZADA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="w-full"
                >
                    <Card className="rounded-[24px] border border-zinc-100 shadow-sm overflow-hidden bg-white p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Utensils className="w-4 h-4 text-purple-600" />
                            <h3 className="text-sm font-black text-[#1A1A1B] uppercase tracking-wide">ALIMENTAÇÃO PERSONALIZADA</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Evite doces isolados - sempre combine com fibras ou proteínas",
                                "Inclua canela e especiarias que ajudam no controle glicêmico",
                                "Faça um lanche com proteína às 16h para evitar a compulsão noturna"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                                    </div>
                                    <span className="text-xs text-zinc-600 font-medium leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </motion.div>

                {/* Plan Selection */}
                {/* Plan Selection */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full space-y-4"
                >
                    <div className="w-full">
                        <Button
                            onClick={() => document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-xl shadow-purple-200 font-black uppercase tracking-widest text-xs flex items-center justify-between px-8 mb-12"
                        >
                            <span className="flex-1 text-center">GARANTIR MEU PLANO COM DESCONTO</span>
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div id="plans-section"></div>

                    <div className="flex flex-col gap-4">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                onClick={() => handlePlanSelect(plan.id)}
                                className={cn(
                                    "relative p-8 rounded-[32px] border transition-all duration-300 group shadow-sm bg-white overflow-hidden",
                                    selectedPlanId === plan.id
                                        ? "border-purple-600 ring-1 ring-purple-600 shadow-lg shadow-purple-100 scale-[1.02] z-10"
                                        : "border-zinc-200 hover:border-purple-300"
                                )}
                            >
                                {plan.bestValue && (
                                    <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-widest">
                                        Mais Vendido
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 shrink-0 bg-zinc-50 rounded-xl p-2 flex items-center justify-center border border-zinc-100">
                                        <img src={plan.image} alt={plan.pots} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>

                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">
                                                {plan.pots}
                                            </span>
                                        </div>
                                        <div className="text-lg font-black text-[#1A1A1B] uppercase leading-none">{plan.title}</div>
                                        <div className="text-xs text-zinc-500 font-medium">{plan.description}</div>
                                        <div className="text-lg font-bold text-[#1A1A1B]">{plan.price}</div>
                                    </div>
                                </div>

                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(plan.link);
                                    }}
                                    className={cn(
                                        "w-full mt-4 rounded-xl font-bold uppercase tracking-wide h-12 text-sm",
                                        selectedPlanId === plan.id
                                            ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200"
                                            : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                                    )}
                                >
                                    Comprar Agora <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="h-12"></div>

            </div>
        </div>
    );
}
