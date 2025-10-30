import { FaLeaf } from "react-icons/fa";
// 1. Importe o tipo de dados
import type { EmissionResult } from "../../Pages/CreateCalculation/CreateCalculation";

// 2. Defina as props que o componente vai receber
interface Option {
  value: string;
  label: string;
}

interface ResultCardProps {
  result: EmissionResult | null; // O resultado do cálculo
  onClose: () => void; // Função para fechar o modal
  transportOptions: Option[];
  fuelOptions: Option[];
  carTypeOptions: Option[];
}

export function ResultModal({result,onClose}: ResultCardProps) {
  if (!result) {
    return null;
  }

  function capitalize(text: string) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className=" modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0">
              <div className="d-flex align-items-center gap-3">
                <div className="icon-square bg-eco-green p-2">
                  <FaLeaf className="text-white" size={24} />
                </div>
                <h5 className="modal-title mb-0">Resultado do Cálculo</h5>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body p-4">
              <div className="text-center mb-4 p-4 bg-eco-green-lighter rounded">
                <small className="text-muted-green d-block mb-2">
                  Emissão Total
                </small>
                <div className="d-flex align-items-baseline justify-content-center gap-2">
                  <span className="display-4 text-eco-green mb-0">
                    {result.emission}
                  </span>
                  <span className="h5 text-muted-green">kg CO₂e</span>
                </div>
              </div>

              <div className="mb-3">
                <small className="text-muted-green d-block mb-1">
                  Distância Percorrida
                </small>
                <p className="mb-0 fw-semibold">{result.distanceKm} km</p>
              </div>

              <div className="mb-3">
                <small className="text-muted-green d-block mb-1">
                  Meio de Transporte
                </small>
                <p className="mb-0 fw-semibold">
                  {capitalize(result.transportType)}
                </p>
              </div>

              {result.transportType === "carro" && (
                <>
                  <div className="mb-3">
                    <small className="text-muted-green d-block mb-1">
                      Combustível
                    </small>
                    <p className="mb-0 fw-semibold">
                      {capitalize(result.fuelType)}
                    </p>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted-green d-block mb-1">
                      Tipo do Carro
                    </small>
                    <p className="mb-0 fw-semibold">
                      {capitalize(result.transportSize)}
                    </p>
                  </div>
                </>
              )}
              
              {result.transportType === "moto" && (
                <>
                  <div className="mb-3">
                    <small className="text-muted-green d-block mb-1">
                      Tamanho da Moto
                    </small>
                    <p className="mb-0 fw-semibold">
                      {capitalize(result.transportSize)}
                    </p>
                  </div>
                </>
              )}

            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={onClose}
              >
                Fechar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
              >
                Novo Cálculo
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
