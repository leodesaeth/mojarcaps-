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
    Zap,
    Droplets,
    Coffee,
    Moon,
    Activity,
    Heart,
    TrendingDown
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
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
        title: 'TRATAMENTO EXPERIMENTAL DE 30 DIAS',
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

// ===== ENGINE DE PERSONALIZAÇÃO =====

// Calcular IMC
const calculateIMC = (weight: number, height: number): number => {
    const heightM = height / 100;
    return weight / (heightM * heightM);
};

// Classificar IMC
const getIMCCategory = (imc: number): string => {
    if (imc < 18.5) return 'abaixo do peso';
    if (imc < 25) return 'peso normal';
    if (imc < 30) return 'sobrepeso';
    if (imc < 35) return 'obesidade grau I';
    if (imc < 40) return 'obesidade grau II';
    return 'obesidade grau III';
};

// Calcular TMB (Taxa Metabólica Basal) - Fórmula de Mifflin-St Jeor
const calculateTMB = (weight: number, height: number, age: number, gender: string): number => {
    if (gender === 'male') {
        return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    }
    return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
};

// Calcular Gasto Calórico Diário baseado no nível de atividade
const calculateDailyCalories = (tmb: number, activity: string): number => {
    const multipliers: Record<string, number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        intense: 1.725
    };
    return Math.round(tmb * (multipliers[activity] || 1.2));
};

// Calcular meta calórica para emagrecer
const calculateDeficitCalories = (dailyCalories: number, goal: string): number => {
    const deficits: Record<string, number> = {
        '5': 300,      // Perda leve
        '5-10': 400,   // Perda moderada
        '10-20': 500,  // Perda significativa
        '20+': 600     // Perda intensa (máximo seguro)
    };
    return Math.round(dailyCalories - (deficits[goal] || 400));
};

// Determinar título do plano baseado no perfil
const getPlanTitle = (cravings: string, foodRel: string, goal: string): { title: string; subtitle: string } => {
    if (cravings === 'every_day' || cravings === 'afternoon') {
        return {
            title: 'PLANO CONTROLE DE COMPULSÃO',
            subtitle: 'Seu corpo está pedindo controle sobre os picos de glicose que causam a vontade por doces.'
        };
    }
    if (foodRel === 'cant_stop' || foodRel === 'snacking') {
        return {
            title: 'PLANO REEDUCAÇÃO ALIMENTAR',
            subtitle: 'Vamos reprogramar seus hábitos alimentares para você comer menos sem passar fome.'
        };
    }
    if (goal === '20+') {
        return {
            title: 'PLANO TRANSFORMAÇÃO TOTAL',
            subtitle: 'Um programa completo para uma mudança significativa e duradoura no seu corpo.'
        };
    }
    if (foodRel === 'give_up') {
        return {
            title: 'PLANO CONSISTÊNCIA',
            subtitle: 'Estratégias para manter a disciplina e não desistir das suas metas.'
        };
    }
    return {
        title: 'PLANO EMAGRECIMENTO SAUDÁVEL',
        subtitle: 'Um plano equilibrado para você alcançar seus objetivos de forma sustentável.'
    };
};

// Gerar treino personalizado por mês
const generateWorkoutPlan = (
    activity: string,
    age: number,
    gender: string,
    goal: string,
    month: number
): { day: string; train: string; time: string }[] => {
    const isOlder = age >= 50;
    const isFemale = gender === 'female';
    const needsHighIntensity = goal === '10-20' || goal === '20+';

    // Base de exercícios por nível
    const sedentaryBase = [
        { day: 'Segunda', train: 'Caminhada leve', time: '20 min' },
        { day: 'Terça', train: 'Alongamento global', time: '15 min' },
        { day: 'Quarta', train: 'Caminhada moderada', time: '25 min' },
        { day: 'Quinta', train: 'Descanso ativo - respiração', time: '10 min' },
        { day: 'Sexta', train: 'Caminhada + exercícios no sofá', time: '20 min' },
        { day: 'Sábado', train: 'Caminhada ao ar livre', time: '30 min' },
        { day: 'Domingo', train: 'Descanso', time: '-' },
    ];

    const lightBase = [
        { day: 'Segunda', train: 'Caminhada rápida', time: '25 min' },
        { day: 'Terça', train: 'Exercícios de fortalecimento (casa)', time: '20 min' },
        { day: 'Quarta', train: 'Caminhada + escadas', time: '30 min' },
        { day: 'Quinta', train: 'Yoga ou pilates iniciante', time: '20 min' },
        { day: 'Sexta', train: 'Dança ou movimentação livre', time: '25 min' },
        { day: 'Sábado', train: 'Caminhada longa', time: '40 min' },
        { day: 'Domingo', train: 'Descanso', time: '-' },
    ];

    const moderateBase = [
        { day: 'Segunda', train: 'Treino A - Superior + Cardio', time: '40 min' },
        { day: 'Terça', train: 'Cardio moderado (corrida/bike)', time: '30 min' },
        { day: 'Quarta', train: 'Treino B - Inferior + Core', time: '40 min' },
        { day: 'Quinta', train: 'Yoga/Mobilidade', time: '25 min' },
        { day: 'Sexta', train: 'Full Body Funcional', time: '45 min' },
        { day: 'Sábado', train: 'Cardio intenso ou esporte', time: '35 min' },
        { day: 'Domingo', train: 'Descanso', time: '-' },
    ];

    const intenseBase = [
        { day: 'Segunda', train: 'Treino A - Peito/Costas + HIIT', time: '50 min' },
        { day: 'Terça', train: 'Treino B - Pernas completo', time: '55 min' },
        { day: 'Quarta', train: 'Cardio LISS + Core intenso', time: '40 min' },
        { day: 'Quinta', train: 'Treino C - Ombros/Braços', time: '45 min' },
        { day: 'Sexta', train: 'Treino D - Lower + Glúteos', time: '50 min' },
        { day: 'Sábado', train: 'HIIT ou CrossFit', time: '40 min' },
        { day: 'Domingo', train: 'Descanso ativo - caminhada', time: '20 min' },
    ];

    // Seleciona base conforme atividade
    let base = sedentaryBase;
    if (activity === 'light') base = lightBase;
    if (activity === 'moderate') base = moderateBase;
    if (activity === 'intense') base = intenseBase;

    // Ajustes por mês (progressão)
    if (month === 2) {
        base = base.map(item => {
            if (item.time === '-') return item;
            const currentTime = parseInt(item.time);
            const newTime = Math.min(currentTime + 5, 60);
            return {
                ...item,
                train: item.train.includes('leve')
                    ? item.train.replace('leve', 'moderada')
                    : item.train.includes('moderado')
                        ? item.train.replace('moderado', 'intenso')
                        : item.train,
                time: `${newTime} min`
            };
        });
    }

    if (month === 3) {
        base = base.map(item => {
            if (item.time === '-') return item;
            const currentTime = parseInt(item.time);
            const newTime = Math.min(currentTime + 10, 60);
            return {
                ...item,
                train: item.train + (needsHighIntensity && !isOlder ? ' + circuito' : ''),
                time: `${newTime} min`
            };
        });
    }

    // Ajustes para idade avançada
    if (isOlder) {
        base = base.map(item => ({
            ...item,
            train: item.train.replace('HIIT', 'Cardio moderado').replace('intenso', 'moderado'),
            time: item.time !== '-' ? `${Math.max(parseInt(item.time) - 5, 15)} min` : '-'
        }));
    }

    // Ajustes para mulheres (foco em glúteos e mobilidade)
    if (isFemale && (activity === 'moderate' || activity === 'intense')) {
        const fridayIndex = base.findIndex(d => d.day === 'Sexta');
        if (fridayIndex !== -1) {
            base[fridayIndex].train = 'Treino Glúteos + Core';
        }
    }

    return base;
};

// Gerar dicas personalizadas
const generateTips = (
    answers: Answers,
    _tmb: number,
    targetCalories: number
): { icon: typeof Target; text: string; priority: number }[] => {
    const tips: { icon: typeof Target; text: string; priority: number }[] = [];
    const weight = parseFloat(answers.weight) || 70;
    const waterLiters = Math.max(2, Math.round(weight * 0.035 * 10) / 10);

    // Dica de água (sempre)
    tips.push({
        icon: Droplets,
        text: `Beba ${waterLiters}L de água por dia para acelerar seu metabolismo`,
        priority: 1
    });

    // Dicas baseadas na compulsão
    if (answers.cravings === 'every_day') {
        tips.push({
            icon: Flame,
            text: 'Tome Mojacaps 1h ANTES do almoço para bloquear a compulsão da tarde',
            priority: 2
        });
        tips.push({
            icon: Zap,
            text: 'Evite carboidratos refinados no café da manhã - troque por proteína',
            priority: 3
        });
    } else if (answers.cravings === 'afternoon') {
        tips.push({
            icon: Coffee,
            text: 'Faça um lanche proteico às 15h para evitar a compulsão vespertina',
            priority: 2
        });
        tips.push({
            icon: Moon,
            text: 'Tome Mojacaps antes do almoço para controlar a vontade de doce da tarde',
            priority: 3
        });
    } else if (answers.cravings === 'stress') {
        tips.push({
            icon: Heart,
            text: 'Pratique 5 minutos de respiração profunda quando sentir ansiedade',
            priority: 2
        });
        tips.push({
            icon: Zap,
            text: 'Mantenha lanches saudáveis à mão para momentos de estresse',
            priority: 3
        });
    }

    // Dicas baseadas na relação com comida
    if (answers.food_relationship === 'cant_stop') {
        tips.push({
            icon: Salad,
            text: 'Comece SEMPRE pela salada - encha metade do prato com vegetais',
            priority: 2
        });
        tips.push({
            icon: Utensils,
            text: 'Use pratos menores e mastigue devagar (30x por garfada)',
            priority: 4
        });
    } else if (answers.food_relationship === 'snacking') {
        tips.push({
            icon: Clock,
            text: 'Defina 5 horários fixos para comer - não belisque fora deles',
            priority: 2
        });
        tips.push({
            icon: Target,
            text: 'Escove os dentes após cada refeição para evitar beliscar',
            priority: 4
        });
    } else if (answers.food_relationship === 'give_up') {
        tips.push({
            icon: Activity,
            text: 'Comece com mudanças pequenas - uma por semana, não tudo de uma vez',
            priority: 2
        });
        tips.push({
            icon: TrendingDown,
            text: 'Permita-se 1 refeição livre por semana para não sentir privação',
            priority: 4
        });
    }

    // Dica de calorias
    tips.push({
        icon: Target,
        text: `Sua meta calórica diária: ${targetCalories} kcal para emagrecer de forma saudável`,
        priority: 5
    });

    // Ordenar por prioridade e limitar
    return tips.sort((a, b) => a.priority - b.priority).slice(0, 5);
};

// Descrição do mês
const getMonthDescription = (month: number, _goal: string): { title: string; description: string } => {
    const descriptions: Record<number, { title: string; description: string }> = {
        1: {
            title: 'Adaptação Metabólica',
            description: 'Seu corpo começa a se adaptar. Foco no controle do apetite e regulação hormonal.'
        },
        2: {
            title: 'Aceleração da Queima',
            description: 'Metabolismo ativado. É quando você começa a ver os resultados no espelho.'
        },
        3: {
            title: 'Consolidação dos Resultados',
            description: 'Seu novo metabolismo se estabiliza. Resultados duradouros e sustentáveis.'
        }
    };
    return descriptions[month] || descriptions[1];
};

export function Results() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<number>(1);
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

    // Parse valores
    const weight = parseFloat(answers.weight) || 70;
    const height = parseFloat(answers.height) || 165;
    const age = parseFloat(answers.age) || 30;

    // ===== CÁLCULOS PERSONALIZADOS =====
    const calculations = useMemo(() => {
        const imc = calculateIMC(weight, height);
        const imcCategory = getIMCCategory(imc);
        const tmb = calculateTMB(weight, height, age, answers.gender);
        const dailyCalories = calculateDailyCalories(tmb, answers.activity);
        const targetCalories = calculateDeficitCalories(dailyCalories, answers.goal);
        const planInfo = getPlanTitle(answers.cravings, answers.food_relationship, answers.goal);

        return { imc, imcCategory, tmb, dailyCalories, targetCalories, planInfo };
    }, [weight, height, age, answers]);

    // Treino do mês atual
    const workoutPlan = useMemo(() => {
        return generateWorkoutPlan(answers.activity, age, answers.gender, answers.goal, activeTab);
    }, [answers.activity, age, answers.gender, answers.goal, activeTab]);

    // Dicas personalizadas
    const personalizedTips = useMemo(() => {
        return generateTips(answers, calculations.tmb, calculations.targetCalories);
    }, [answers, calculations.tmb, calculations.targetCalories]);

    const selectedPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[2];
    const monthInfo = getMonthDescription(activeTab, answers.goal);

    const handlePlanSelect = (planId: string) => {
        setSelectedPlanId(planId);
    };

    // Calcular meta de peso
    const getWeightGoal = (): string => {
        const goals: Record<string, string> = {
            '5': `${Math.round(weight - 5)}kg`,
            '5-10': `${Math.round(weight - 7.5)}kg`,
            '10-20': `${Math.round(weight - 15)}kg`,
            '20+': `${Math.round(weight - 25)}kg`
        };
        return goals[answers.goal] || `${Math.round(weight - 10)}kg`;
    };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center py-6 px-4 sm:py-8 sm:px-5 font-inter text-zinc-900">
            <div className="max-w-[450px] w-full space-y-6 sm:space-y-8">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-3 sm:space-y-4"
                >
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 sm:px-4 py-1.5 rounded-full mb-2">
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">⚡ SEU PLANO PERSONALIZADO FOI CRIADO!</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-purple-600 uppercase leading-none tracking-tight px-2">
                        {calculations.planInfo.title.split(' ').slice(0, 2).join(' ')}<br />
                        <span className="text-[#d946ef]">{calculations.planInfo.title.split(' ').slice(2).join(' ')}</span>
                    </h1>

                    <p className="text-xs sm:text-sm text-zinc-500 font-medium max-w-sm mx-auto leading-relaxed px-4">
                        {calculations.planInfo.subtitle}
                    </p>

                    {/* Tags / Pills - Dados REAIS do usuário */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-2">
                        <div className="bg-purple-50 border border-purple-100 px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold text-purple-600 uppercase tracking-wide">
                            {weight}kg
                        </div>
                        <div className="bg-purple-50 border border-purple-100 px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold text-purple-600 uppercase tracking-wide">
                            {height}cm
                        </div>
                        <div className="bg-zinc-50 border border-zinc-100 px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold text-zinc-600 uppercase tracking-wide">
                            IMC: {calculations.imc.toFixed(1)}
                        </div>
                        <div className="bg-green-50 border border-green-100 px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold text-green-600 uppercase tracking-wide">
                            Meta: {getWeightGoal()}
                        </div>
                    </div>
                </motion.div>

                {/* 3-Month Cycle Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="rounded-[20px] sm:rounded-[24px] border border-zinc-100 shadow-sm overflow-hidden bg-white">
                        <CardHeader className="pb-2 border-b border-zinc-50 pt-5 sm:pt-6 px-4 sm:px-6">
                            <CardTitle className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                <Calendar className="w-4 h-4 text-purple-600" /> CICLO COMPLETO DE 3 MESES
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 sm:space-y-6 pt-5 sm:pt-6 relative px-4 sm:px-6 pb-6 sm:pb-8">
                            {/* Vertical Line */}
                            <div className="absolute left-[35px] sm:left-[39px] top-10 bottom-10 w-[2px] bg-purple-100"></div>

                            {[1, 2, 3].map((month) => {
                                const info = getMonthDescription(month, answers.goal);
                                const isActive = month === 1;
                                return (
                                    <div key={month} className={cn("relative z-10 pl-8 sm:pl-10", !isActive && "opacity-60")}>
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 text-white rounded-full flex items-center justify-center ring-4 ring-white z-20 shadow-sm">
                                            <span className="text-[8px] font-bold">●</span>
                                        </div>
                                        <div className={cn(
                                            "p-3 sm:p-4 rounded-xl relative",
                                            isActive ? "bg-zinc-50 border border-purple-100 shadow-sm" : "bg-white border border-zinc-100"
                                        )}>
                                            <h3 className="text-[10px] font-bold text-purple-600 uppercase mb-1 tracking-wider">Mês {month}</h3>
                                            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1">{info.title}</h4>
                                            <p className="text-zinc-500 text-[10px] sm:text-[11px] leading-relaxed">{info.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Workout Plan */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >

                    <Card className="rounded-[20px] sm:rounded-[24px] border border-zinc-100 shadow-sm overflow-hidden bg-white">
                        {/* Product Image Section - Large & Centered */}
                        <div className="w-full bg-[#FAFAFA] pt-6 sm:pt-8 pb-3 sm:pb-4 flex justify-center">
                            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
                                <img
                                    src={selectedPlan.image}
                                    alt="Mojacaps Potes"
                                    className="w-full h-full object-contain drop-shadow-xl"
                                />
                            </div>
                        </div>

                        <CardHeader className="pb-2 border-b border-zinc-50 pt-0 px-4 sm:px-6 bg-white">
                            <CardTitle className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest py-3 sm:py-4">
                                <Activity className="w-4 h-4 text-purple-600" /> SEU TREINO PERSONALIZADO
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-5 sm:pt-6 px-4 sm:px-6 pb-6 sm:pb-8">
                            {/* Tabs */}
                            <div className="flex bg-zinc-100 p-1 rounded-xl mb-5 sm:mb-6 shadow-inner">
                                {[1, 2, 3].map((month) => (
                                    <button
                                        key={month}
                                        onClick={() => setActiveTab(month)}
                                        className={cn(
                                            "flex-1 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold rounded-lg transition-all",
                                            activeTab === month
                                                ? "bg-purple-600 text-white shadow-md border border-purple-500"
                                                : "text-zinc-400 hover:text-zinc-900"
                                        )}
                                    >
                                        Mês {month}
                                    </button>
                                ))}
                            </div>

                            <div className="mb-5 sm:mb-6 bg-purple-50 p-3 sm:p-4 rounded-xl border border-purple-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-4 h-4 rounded-full bg-purple-200 flex items-center justify-center">
                                        <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                                    </div>
                                    <h4 className="font-bold text-zinc-900 text-xs sm:text-sm">Mês {activeTab}: {monthInfo.title}</h4>
                                </div>
                                <p className="text-[10px] sm:text-[11px] text-zinc-500 ml-6 leading-relaxed">{monthInfo.description}</p>
                            </div>

                            {/* Schedule Headline */}
                            <div className="flex items-center gap-2 mb-3 sm:mb-4 text-zinc-400 font-bold text-[10px] uppercase tracking-widest px-1">
                                <Clock className="w-3 h-3" /> Agenda Semanal
                            </div>


                            {/* Clean Table */}
                            <div className="space-y-1 mb-6 sm:mb-8">
                                {workoutPlan.map((item, index) => (
                                    <div
                                        key={item.day}
                                        className={cn(
                                            "grid grid-cols-[70px_1fr_auto] sm:grid-cols-[90px_1fr_auto] items-center py-3 sm:py-4 border-b border-zinc-50 last:border-0",
                                            index % 2 === 1 ? "bg-zinc-50/50 rounded-xl px-3 sm:px-4 -mx-3 sm:-mx-4" : "px-0"
                                        )}
                                    >
                                        <span className="font-bold text-zinc-800 text-[11px] sm:text-xs tracking-tight">{item.day}</span>
                                        <span className="text-zinc-500 text-[10px] sm:text-[11px] text-center font-medium leading-tight px-1">{item.train}</span>
                                        <span className="text-zinc-400 text-[9px] sm:text-[10px] text-right font-bold tracking-tighter whitespace-nowrap">{item.time}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Dicas do Mês Section (Inside Workout Card) */}
                            <div className="pt-5 sm:pt-6 border-t border-zinc-50">
                                <div className="flex items-center gap-2 mb-3 sm:mb-4 text-zinc-400 font-bold text-[10px] uppercase tracking-widest px-1">
                                    💡 Dicas Personalizadas Para Você:
                                </div>
                                <ul className="space-y-2.5 sm:space-y-3">
                                    {personalizedTips.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 sm:gap-4 p-1">
                                            <div className="mt-0.5 rounded-full p-1.5 bg-purple-100 shrink-0">
                                                <item.icon className="w-3 h-3 text-purple-600" />
                                            </div>
                                            <span className="text-zinc-600 text-[10px] sm:text-[11px] leading-relaxed font-medium">{item.text}</span>
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
                    <Card className="rounded-[20px] sm:rounded-[24px] border border-zinc-100 shadow-sm overflow-hidden bg-white p-4 sm:p-6 mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 mb-4 sm:mb-6">
                            <ArrowRight className="w-4 h-4 text-purple-600 -rotate-45" />
                            <h3 className="text-xs sm:text-sm font-black text-[#1A1A1B] uppercase tracking-wide">COMO USAR MOJACAPS</h3>
                        </div>
                        <ul className="space-y-3 sm:space-y-4">
                            {[
                                "Tome 2 cápsulas 30min antes do almoço",
                                answers.cravings === 'afternoon' || answers.cravings === 'every_day'
                                    ? "Tome mais 1 cápsula às 16h se sentir compulsão"
                                    : "Nos dias de mais compulsão, adicione 1 cápsula antes do jantar",
                                "Mantenha o uso consistente por 90 dias para resultados duradouros"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                                    </div>
                                    <span className="text-[11px] sm:text-xs text-zinc-600 font-medium leading-relaxed">{item}</span>
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
                    <Card className="rounded-[20px] sm:rounded-[24px] border border-zinc-100 shadow-sm overflow-hidden bg-white p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-4 sm:mb-6">
                            <Utensils className="w-4 h-4 text-purple-600" />
                            <h3 className="text-xs sm:text-sm font-black text-[#1A1A1B] uppercase tracking-wide">ALIMENTAÇÃO PERSONALIZADA</h3>
                        </div>
                        <ul className="space-y-3 sm:space-y-4">
                            {[
                                answers.food_relationship === 'cant_stop'
                                    ? 'Use pratos menores e coma DEVAGAR - cada garfada deve durar 30 segundos'
                                    : 'Evite doces isolados - sempre combine com fibras ou proteínas',
                                answers.cravings === 'every_day' || answers.cravings === 'afternoon'
                                    ? 'Substitua açúcar por adoçantes naturais e adicione canela às receitas'
                                    : 'Inclua canela e especiarias que ajudam no controle glicêmico',
                                answers.food_relationship === 'snacking'
                                    ? 'Defina 5 horários fixos para comer - NADA de beliscar entre refeições'
                                    : `Faça um lanche proteico às ${answers.cravings === 'afternoon' ? '15h' : '16h'} para evitar a compulsão`
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                                    </div>
                                    <span className="text-[11px] sm:text-xs text-zinc-600 font-medium leading-relaxed">{item}</span>
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
                            className="w-full h-12 sm:h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-xl shadow-purple-200 font-black uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-between px-4 sm:px-8 mb-8 sm:mb-12"
                        >
                            <span className="flex-1 text-center">GARANTIR MEU PLANO COM DESCONTO</span>
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div id="plans-section"></div>

                    <div className="flex flex-col gap-3 sm:gap-4">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                onClick={() => handlePlanSelect(plan.id)}
                                className={cn(
                                    "relative p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] border transition-all duration-300 group shadow-sm bg-white overflow-hidden cursor-pointer",
                                    selectedPlanId === plan.id
                                        ? "border-purple-600 ring-1 ring-purple-600 shadow-lg shadow-purple-100 scale-[1.02] z-10"
                                        : "border-zinc-200 hover:border-purple-300"
                                )}
                            >
                                {plan.bestValue && (
                                    <div className="absolute top-0 right-0 bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-bl-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                                        Mais Vendido
                                    </div>
                                )}

                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-zinc-50 rounded-xl p-2 flex items-center justify-center border border-zinc-100">
                                        <img src={plan.image} alt={plan.pots} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>

                                    <div className="flex-1 space-y-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-purple-600">
                                                {plan.pots}
                                            </span>
                                        </div>
                                        <div className="text-sm sm:text-lg font-black text-[#1A1A1B] uppercase leading-tight">{plan.title}</div>
                                        <div className="text-[10px] sm:text-xs text-zinc-500 font-medium">{plan.description}</div>
                                        <div className="text-base sm:text-lg font-bold text-[#1A1A1B]">{plan.price}</div>
                                    </div>
                                </div>

                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(plan.link);
                                    }}
                                    className={cn(
                                        "w-full mt-3 sm:mt-4 rounded-xl font-bold uppercase tracking-wide h-10 sm:h-12 text-[11px] sm:text-sm",
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

                <div className="h-8 sm:h-12"></div>

            </div>
        </div>
    );
}
