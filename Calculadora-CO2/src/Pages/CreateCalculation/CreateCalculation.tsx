/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { CalculateCard } from "../../Components/CalculateCard/CalculateCard";
import { ResultModal } from "../../Components/ResultModal/ResultModal";
import { calculateEmissions } from "../../Service/TravelService"; 
import type { ITravelRequest, ITravelResult } from '../../Types/travel.types';


export interface CalculationData {
  distanceKm: string;
  transportType: string;
  transportSize: string;
  transportLabel: string;
  fuelType: string;
}

export interface EmissionResult {
  distanceKm: string;
  transportType: string;
  transportSize: string;
  transportLabel: string;
  fuelType: string;
  emission: number;
}

const transportOptions = [
  { value: "carro", label: "Carro" },
  { value: "moto", label: "Moto" },
  { value: "onibus", label: "Ônibus" },
  { value: "bicicleta", label: "Bicicleta" },
  { value: "bicicleta-eletrica", label: "Bicicleta Elétrica" },
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

const carSizeOptions = [
  { value: "pequeno", label: "Carro Pequeno" },
  { value: "medio", label: "Carro Médio" },
  { value: "grande", label: "Carro Grande" },
];

const motorcycleSizeOptions = [
  { value: "pequena", label: "Moto Pequena" },
  { value: "media", label: "Moto Média" },
  { value: "grande", label: "Moto Grande" },
]

export function CreateCalculation() {
  
  const [showModal, setShowModal] = useState(false);
  const [emissionResult, setEmissionResult] = useState<EmissionResult | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleCalculate = async (data: CalculationData) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiRequest: ITravelRequest = {
        distanceKm: data.distanceKm,
        transportType: data.transportType,
        transportSize: data.transportSize,
        transportLabel: data.transportLabel,
        fuelType: data.fuelType,
      };
      const resultFromApi: ITravelResult = await calculateEmissions(apiRequest);
      const modalResult: EmissionResult = {
        distanceKm: resultFromApi.distanceKm,
        fuelType: resultFromApi.fuelType,
        emission: resultFromApi.emited,
        transportType: resultFromApi.transportType,
        transportSize: resultFromApi.transportSize,
        transportLabel: resultFromApi.transportLabel
      };

      setEmissionResult(modalResult);
      setShowModal(true);

    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-fluid py-4">
      <div className="m-4">
        <div className="m-4 d-flex flex-column justify-content-center">
          
          <CalculateCard
            onCalculate={handleCalculate}
            isLoading={isLoading}
            transportOptions={transportOptions}
            fuelOptions={fuelOptions}
            carSizeOptions={carSizeOptions}
            motorcycleSizeOptions={motorcycleSizeOptions}
          />

        </div>
      </div>

      {error && (
        <div>
          <h1>deu ruim</h1>
        </div>
      )}

      {showModal && (
        <ResultModal
          result={emissionResult}
          onClose={handleCloseModal}
          transportOptions={transportOptions}
          fuelOptions={fuelOptions}
          carTypeOptions={carSizeOptions}
        />
      )}
    </div>
  );
}
