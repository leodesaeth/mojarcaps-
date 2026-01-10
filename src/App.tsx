import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Quiz } from './components/QuizFinal';
import { Results } from './components/Results';
import { OfferPage } from './components/OfferPage';

// Images for offers
import image1Pot from "@/assets/1pot.png";
import image2Pots from "@/assets/2pots.png";
import image3Pots from "@/assets/3pots.png";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/resultados" element={<Results />} />

        {/* Revamped Offer Pages */}
        <Route
          path="/oferta-1-frasco"
          element={
            <OfferPage
              title="GARANTA SEU PLANO 30 DIAS COM 10% DE DESCONTO"
              subtitle="Uma ótima iniciativa para começar a ver resultados"
              pots="1 POTE"
              price="R$ 197"
              oldPrice="R$ 297,00"
              savings="Economia de R$ 100,00"
              image={image1Pot}
              discount="10% OFF"
              checkoutLink="https://ev.braip.com/checkout/plaq414l/che5wqrn?currency=BRL"
              benefits={[
                "Início da adaptação metabólica",
                "Controle leve da ansiedade",
                "Melhora na disposição física",
                "100% natural e sem glúten"
              ]}
            />
          }
        />

        <Route
          path="/oferta-2-frascos"
          element={
            <OfferPage
              title="GARANTA SEU PLANO 60 DIAS COM 15% DE DESCONTO"
              subtitle="Dobro de potência para queimar gordura localizada"
              pots="2 POTES"
              price="R$ 279"
              oldPrice="R$ 397,00"
              savings="Economia de R$ 118,00"
              image={image2Pots}
              discount="15% OFF"
              checkoutLink="https://ev.braip.com/checkout/pla89291/che5wqrn?currency=BRL"
              benefits={[
                "Queima de gordura constante",
                "Controle total de compulsão",
                "Foco e energia para treinar",
                "Resultados visíveis no espelho"
              ]}
            />
          }
        />

        <Route
          path="/oferta-3-frascos"
          element={
            <OfferPage
              title="GARANTA SEU PLANO 90 DIAS COM 20% DE DESCONTO"
              subtitle="A decisão ideal para resultados definitivos e duradouros"
              pots="3 POTES"
              price="R$ 379"
              oldPrice="R$ 497,00"
              savings="Economia de R$ 118,00"
              image={image3Pots}
              discount="20% OFF"
              checkoutLink="https://ev.braip.com/checkout/plae6266/che5wqrn?currency=BRL"
              benefits={[
                "3x mais energia durante o dia",
                "Controle de compulsão por doces",
                "Metabolismo acelerado naturalmente",
                "Consolidação definitiva dos resultados"
              ]}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
