export type Option = {
    label: string;
    value: string;
};

export type Question = {
    id: string;
    question: string;
    type: 'text' | 'number' | 'single-choice';
    options?: Option[];
    placeholder?: string;
    suffix?: string;
};

export const questions: Question[] = [
    {
        id: 'gender',
        question: 'Qual é o seu gênero?',
        type: 'single-choice',
        options: [
            { label: 'Homem', value: 'male' },
            { label: 'Mulher', value: 'female' },
        ],
    },
    {
        id: 'weight',
        question: 'Qual é o seu peso atual?',
        type: 'number',
        placeholder: 'Ex: 70',
        suffix: 'kg',
    },
    {
        id: 'height',
        question: 'Qual é a sua altura?',
        type: 'number',
        placeholder: 'Ex: 170',
        suffix: 'cm',
    },
    {
        id: 'goal',
        question: 'Quantos quilos você deseja perder?',
        type: 'single-choice',
        options: [
            { label: 'Até 5 kg', value: '5' },
            { label: '5 a 10 kg', value: '5-10' },
            { label: '10 a 20 kg', value: '10-20' },
            { label: 'Mais de 20 kg', value: '20+' },
        ],
    },
    {
        id: 'food_relationship',
        question: 'Como está sua relação com a alimentação?',
        type: 'single-choice',
        options: [
            { label: 'Como muito, não consigo parar', value: 'cant_stop' },
            { label: 'Belisco o dia todo, mesmo sem fome', value: 'snacking' },
            { label: 'Faço dieta mas desisto fácil', value: 'give_up' },
            { label: 'Tenho controle, mas quero melhorar', value: 'control' },
        ],
    },
    {
        id: 'cravings',
        question: 'Você sente muita vontade de comer doces ou carboidratos?',
        type: 'single-choice',
        options: [
            { label: 'Sim, todos os dias, é incontrolável', value: 'every_day' },
            { label: 'Sim, especialmente à tarde/noite', value: 'afternoon' },
            { label: 'Às vezes, quando estou estressado', value: 'stress' },
            { label: 'Raramente ou nunca', value: 'rarely' },
        ],
    },
    {
        id: 'age',
        question: 'Qual é a sua idade?',
        type: 'number',
        placeholder: 'Ex: 30',
        suffix: 'anos',
    },
    {
        id: 'activity',
        question: 'Qual é o seu nível de atividade física?',
        type: 'single-choice',
        options: [
            { label: 'Sedentário (pouco ou nenhum exercício)', value: 'sedentary' },
            { label: 'Leve (exercício 1-3 dias/semana)', value: 'light' },
            { label: 'Moderado (exercício 3-5 dias/semana)', value: 'moderate' },
            { label: 'Intenso (exercício 6-7 dias/semana)', value: 'intense' },
        ],
    },
];
