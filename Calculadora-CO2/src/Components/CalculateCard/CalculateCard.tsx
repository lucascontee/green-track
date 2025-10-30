import { useState } from "react";
import { FaCalculator } from "react-icons/fa";
// Importe a interface correta do seu componente pai
import type { CalculationData } from "../../Pages/CreateCalculation/CreateCalculation";
import "./CalculateCard.css";

interface Option {
  value: string;
  label: string;
}

interface CalculateCardProps {
  onCalculate: (data: CalculationData) => void;
  isLoading: boolean; // Você não está usando isLoading, mas vou manter
  transportOptions: Option[];
  fuelOptions: Option[];
  carSizeOptions: Option[];
  motorcycleSizeOptions: Option[]; // <-- MUDANÇA: Estava faltando
}

export function CalculateCard({
  onCalculate,
  transportOptions,
  fuelOptions,
  carSizeOptions,
  motorcycleSizeOptions, // <-- MUDANÇA: Adicionado na desestruturação
}: CalculateCardProps) {

  const [distance, setDistance] = useState("");
  const [transport, setTransport] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [carType, setCarType] = useState("");
  const [motorcycleSize, setMotorcycleSize] = useState(""); // <-- MUDANÇA: Novo estado para moto

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let transportSize = "";
    if (transport === "carro") {
      transportSize = carType;
    } else if (transport === "moto") {
      transportSize = motorcycleSize;
    }

    const selectedTransport = transportOptions.find(
      (opt) => opt.value === transport
    );
    const transportLabel = selectedTransport ? selectedTransport.label : "";
    
    const data: CalculationData = {
      distanceKm: distance,
      transportType: transport,
      transportSize: transportSize,
      transportLabel: transportLabel,
      fuelType: fuelType,
    };

    onCalculate(data);
  };

  return (
    <>
      <div className="mt-4 card card-border">
        <div className="card-body p-4">
          <div className="mb-4 d-flex align-items-center gap-3">
            <div className="bg-eco-green icon-square p-2">
              <FaCalculator className="text-white" size={24} />
            </div>
            <div>
              <h2 className="h4 mb-1 fw-semibold">Calcular Emissão</h2>
              <p className="text-muted mb-0">
                Descubra a pegada de carbono da sua viagem
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* ... (Campo Distância - sem mudanças) ... */}
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
              <small className="text-muted-green">
                Informe a distância total da viagem
              </small>
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
                  setFuelType("");
                  setCarType("");
                  setMotorcycleSize(""); 
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
                  required={transport === "carro"} 
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
                  required={transport === "carro"} // Só é obrigatório se for carro
                >
                  <option value="">Selecione o tipo do carro</option>
                  {carSizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {transport === "moto" && (
              <div className="mb-4 animate-fade-in">
                <label htmlFor="motorcycleSize" className="form-label fw-semibold">
                  Tamanho da Moto
                </label>
                <select
                  className="form-select form-select-lg"
                  id="motorcycleSize"
                  value={motorcycleSize}
                  onChange={(e) => setMotorcycleSize(e.target.value)}
                  required={transport === "moto"} 
                >
                  <option value="">Selecione o tamanho da moto</option>
                  {motorcycleSizeOptions.map((option) => (
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
                className=" w-25 btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2"
                // disabled={isLoading} // <-- MUDANÇA: Use o prop isLoading aqui
              >
                Calcular Emissão
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}