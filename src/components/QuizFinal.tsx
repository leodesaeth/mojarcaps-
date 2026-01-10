import { useState } from "react";
import { Landing } from "./Landing";
import { questions } from "@/data/questions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Quiz() {
    const navigate = useNavigate();
    const [started, setStarted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const answersState = useState({}) as any;
    const setAnswers = answersState[1];
    const [inputValue, setInputValue] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    const handleStart = () => {
        setStarted(true);
    };

    const handleNext = () => {
        if (currentQuestion.type === 'number' || currentQuestion.type === 'text') {
            if (!inputValue) return;
            setAnswers((prev: any) => ({ ...prev, [currentQuestion.id]: inputValue }));
            setInputValue("");
        }

        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            finishQuiz();
        }
    };

    const handleSelect = (value: string) => {
        setAnswers((prev: any) => ({ ...prev, [currentQuestion.id]: value }));
        if (currentStep < questions.length - 1) {
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 250); // Small delay for visual feedback
        } else {
            finishQuiz();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        } else {
            setStarted(false);
        }
    };

    const finishQuiz = () => {
        setIsAnalyzing(true);
        // Simulate analysis steps
        setTimeout(() => {
            setIsAnalyzing(false);
            navigate("/resultados", { state: { answers: answersState[0] } });
        }, 3500);
    };

    if (isAnalyzing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 space-y-8 bg-white font-inter">
                <div className="relative">
                    <div className="w-24 h-24 border-8 border-zinc-50 rounded-full shadow-inner"></div>
                    <div className="w-24 h-24 border-purple-600 border-t-transparent border-solid rounded-full animate-spin absolute top-0 left-0 border-8 shadow-sm"></div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">Analisando seu perfil...</h2>
                    <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest animate-pulse">Cruzando dados metabólicos...</p>
                </div>

                <div className="max-w-xs w-full bg-zinc-100 rounded-full h-3 overflow-hidden border border-zinc-100 shadow-inner">
                    <motion.div
                        className="h-full bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "easeInOut" }}
                    />
                </div>
            </div>
        );
    }

    if (!started) {
        return <Landing onStart={handleStart} />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full font-inter bg-white">
            <div className="max-w-[450px] w-full">
                {/* Header / Progress */}
                <div className="w-full mb-12 space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                        <button onClick={handleBack} className="hover:text-purple-600 flex items-center gap-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Voltar
                        </button>
                        <span>Passo {currentStep + 1} / {questions.length}</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-50 shadow-inner">
                        <motion.div
                            className="h-full bg-purple-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.02, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full"
                    >
                        <Card className="border border-zinc-100 shadow-2xl shadow-zinc-100/50 rounded-[32px] overflow-hidden">
                            <CardContent className="pt-12 pb-12 px-8 md:px-12">
                                <h2 className="text-2xl md:text-3xl font-black text-center mb-10 text-zinc-900 uppercase tracking-tighter leading-tight">
                                    {currentQuestion.question}
                                </h2>

                                {currentQuestion.type === 'single-choice' && (
                                    <div className="space-y-3">
                                        {currentQuestion.options?.map((option) => {
                                            const isSelected = answersState[0][currentQuestion.id] === option.value;
                                            return (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleSelect(option.value)}
                                                    className={`w-full p-4 md:p-5 text-left rounded-2xl border transition-all duration-200 group flex items-center justify-between shadow-sm active:scale-[0.99]
                                                    ${isSelected
                                                            ? 'bg-[#F3E8FF] border-[#8B5CF6] border-2'
                                                            : 'bg-white border-zinc-200 hover:border-purple-300 hover:bg-zinc-50'
                                                        }
                                                `}
                                                >
                                                    <span className={`font-bold text-base md:text-lg transition-colors uppercase tracking-tight
                                                    ${isSelected ? 'text-purple-900' : 'text-[#1A1A1B] group-hover:text-purple-700'}
                                                `}>
                                                        {option.label}
                                                    </span>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                                                    ${isSelected
                                                            ? 'border-[#8B5CF6] bg-[#8B5CF6]'
                                                            : 'border-zinc-200 group-hover:border-purple-400'
                                                        }
                                                `}>
                                                        <div className={`w-2.5 h-2.5 rounded-full bg-white transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {(currentQuestion.type === 'number' || currentQuestion.type === 'text') && (
                                    <div className="space-y-8">
                                        <div className="relative max-w-xs mx-auto group">
                                            <Input
                                                type="number"
                                                autoFocus
                                                placeholder={currentQuestion.placeholder}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                                className="text-4xl md:text-5xl h-24 font-black text-center bg-[#F8F9FA] text-[#1A1A1B] border border-[#E2E8F0] placeholder:text-[#A0AEC0] focus-visible:ring-0 focus-visible:border-[#8B5CF6] focus-visible:border-2 rounded-2xl transition-all"
                                            />
                                            {currentQuestion.suffix && (
                                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-300 font-black text-xl md:text-2xl uppercase">
                                                    {currentQuestion.suffix}
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            onClick={handleNext}
                                            size="lg"
                                            fullWidth
                                            className="text-base h-16 rounded-2xl font-black uppercase tracking-widest bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-500/20 active:scale-[0.98] transition-all"
                                        >
                                            Continuar
                                            <ChevronRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </div>
                                )}

                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
