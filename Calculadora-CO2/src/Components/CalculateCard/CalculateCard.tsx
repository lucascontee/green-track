import { useState } from "react";
import { FaCalculator } from "react-icons/fa";

import type { CalculationData } from "../../Pages/CreateCalculation/CreateCalculation";

import "./CalculateCard.css"

interface Option {
  value: string;
  label: string;
}

interface CalculateCardProps {
  onCalculate: (data: CalculationData) => void;
  transportOptions: Option[];
  fuelOptions: Option[];
  carTypeOptions: Option[];
}

export function CalculateCard({ 
    onCalculate, 
    transportOptions, 
    fuelOptions, 
    carTypeOptions 
}: CalculateCardProps) {

    const [distance, setDistance] = useState("");
    const [transport, setTransport] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [carType, setCarType] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      distance: parseFloat(distance) || 0, // Converte para número
      transport,
      fuelType,
      carType,
    });
  };

    return(
        <>
        <div className="mt-4 card card-border">
            <div className="card-body p-4">
                <div className="mb-4 d-flex align-items-center gap-3">
                    <div className="bg-eco-green icon-square p-2">
                        <FaCalculator className="text-white" size={24} />
                    </div>
                    <div>
                        <h2 className="h4 mb-1 fw-semibold">Calcular Emissão</h2>
                        <p className="text-muted mb-0">Descubra a pegada de carbono da sua viagem</p>
                    </div>
                </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="distance" className="form-label fw-semibold">
                    Distância a Percorrer
                  </label>
                  <div className="input-group input-group-lg">
                    <input
                      type="number"
                      className="form-control"
                      id="distance"
                      placeholder="Ex: 25"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      required
                    />
                    <span className="input-group-text bg-eco-green-lighter text-eco-green fw-semibold">
                      km
                    </span>
                  </div>
                  <small className="text-muted-green">Informe a distância total da viagem</small>
                </div>

                <div className="mb-4">
                  <label htmlFor="transport" className="form-label fw-semibold">
                    Meio de Transporte
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="transport"
                    value={transport}
                    onChange={(e) => {
                      setTransport(e.target.value);
                      if (e.target.value !== "carro") {
                        setFuelType("");
                        setCarType("");
                      }
                    }}
                    required
                  >
                    <option value="">Selecione o meio de transporte</option>
                    {transportOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {transport === "carro" && (
                  <div className="mb-4 animate-fade-in">
                    <label htmlFor="fuelType" className="form-label fw-semibold">
                      Combustível
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="fuelType"
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      required
                    >
                      <option value="">Selecione o tipo de combustível</option>
                      {fuelOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {transport === "carro" && (
                  <div className="mb-4 animate-fade-in">
                    <label htmlFor="carType" className="form-label fw-semibold">
                      Tipo do Carro
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="carType"
                      value={carType}
                      onChange={(e) => setCarType(e.target.value)}
                      required
                    >
                      <option value="">Selecione o tipo do carro</option>
                      {carTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="d-flex flex-row-reverse gap-3 mt-5">
                  <button
                    type="submit"
                    className=" w-25 btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2">
                    Calcular Emissão 
                  </button>
                </div>
              </form>
            </div>
        </div>
        </>
    )
}