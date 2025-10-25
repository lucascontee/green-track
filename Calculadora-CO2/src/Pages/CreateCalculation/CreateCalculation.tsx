import { useState } from "react";
import { CalculateCard } from "../../Components/CalculateCard/CalculateCard";
import { ResultModal } from "../../Components/ResultModal/ResultModal"; // 1. Importe o ResultCard

// --- Tipos de Dados ---
// Interface para os dados que vêm do formulário
export interface CalculationData {
  distance: number;
  transport: string;
  fuelType: string;
  carType: string;
}

// Interface para os dados do resultado
export interface EmissionResult extends CalculationData {
  emission: number;
}

// --- Opções (Fonte Única da Verdade) ---
// Mova as opções para o componente pai para que possam ser compartilhadas
const transportOptions = [
  { value: "carro", label: "Carro" },
  { value: "moto", label: "Moto" },
  { value: "onibus", label: "Ônibus" },
  { value: "bicicleta", label: "Bicicleta" },
  { value: "patinete", label: "Patinete Elétrico" },
  { value: "ape", label: "A pé" },
  { value: "aviao", label: "Avião" },
];

const fuelOptions = [
  { value: "gasolina", label: "Gasolina" },
  { value: "alcool", label: "Álcool" },
  { value: "hibrido", label: "Híbrido" },
  { value: "eletrico", label: "Elétrico" },
];

const carTypeOptions = [
  { value: "pequeno", label: "Carro Pequeno" },
  { value: "medio", label: "Carro Médio" },
  { value: "suv", label: "SUV" },
];


export function CreateCalculation() {
  
  // 2. O estado do modal e do resultado vivem aqui, no pai
  const [showModal, setShowModal] = useState(false);
  const [emissionResult, setEmissionResult] = useState<EmissionResult | null>(null);

  // 3. Função que faz o cálculo (LÓGICA DE EXEMPLO)
  // (Você deve substituir isso pela sua lógica de cálculo real!)
  const calculateMyEmission = (data: CalculationData): EmissionResult => {
    let emission = 0;
    
    // LÓGICA DE CÁLCULO DE EXEMPLO (MUITO SIMPLIFICADA)
    if (data.transport === "carro") {
      if (data.fuelType === "gasolina") {
        emission = data.distance * 0.18; // Fator de exemplo
      } else if (data.fuelType === "eletrico") {
        emission = data.distance * 0.05;
      }
    } else if (data.transport === "bicicleta") {
      emission = 0;
    } else {
      emission = data.distance * 0.1; // Fator genérico
    }

    return { ...data, emission: emission };
  };

  // 4. Esta função é passada para o CalculateCard
  const handleCalculate = (data: CalculationData) => {
    const result = calculateMyEmission(data);
    setEmissionResult(result);
    setShowModal(true);
  };

  // 5. Esta função é passada para o ResultCard
  const handleCloseModal = () => {
    setShowModal(false);
    // Opcional: limpar o resultado ao fechar
    // setEmissionResult(null); 
  };

  return (
    <div className="container-fluid py-4">
      <div className="m-4">
        <div className="m-4 d-flex flex-column justify-content-center">
          
          <CalculateCard
            onCalculate={handleCalculate}
            transportOptions={transportOptions}
            fuelOptions={fuelOptions}
            carTypeOptions={carTypeOptions}
          />

        </div>
      </div>

      {showModal && (
        <ResultModal
          result={emissionResult}
          onClose={handleCloseModal}
          transportOptions={transportOptions}
          fuelOptions={fuelOptions}
          carTypeOptions={carTypeOptions}
        />
      )}
    </div>
  );
}
