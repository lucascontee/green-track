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
  onClose: () => void;           // Função para fechar o modal
  transportOptions: Option[];
  fuelOptions: Option[];
  carTypeOptions: Option[];
}

export function ResultModal({
  result,
  onClose,
  transportOptions,
  fuelOptions,
  carTypeOptions
}: ResultCardProps) {

  // 3. Remova o estado local (showModal, emissionResult)
  // 4. Remova os arrays de opções locais

  // 5. Se não houver resultado, não renderize nada
  if (!result) {
    return null;
  }

  // (Corrigi a opção de debug que você tinha em carTypeOptions)
  const safeCarTypeOptions = carTypeOptions.filter(opt => typeof opt.value === 'string');

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
                onClick={onClose} // 6. Use a prop onClose
              ></button>
            </div>

            <div className="modal-body p-4">
              {/* 7. Use a prop "result" para os dados */}
              <div className="text-center mb-4 p-4 bg-eco-green-lighter rounded">
                <small className="text-muted-green d-block mb-2">Emissão Total</small>
                <div className="d-flex align-items-baseline justify-content-center gap-2">
                  <span className="display-4 text-eco-green mb-0">
                    {result.emission.toFixed(2)}
                  </span>
                  <span className="h5 text-muted-green">kg CO₂e</span>
                </div>
              </div>

              {/* Detalhes da Viagem */}
              <div className="mb-3">
                <small className="text-muted-green d-block mb-1">Distância Percorrida</small>
                <p className="mb-0 fw-semibold">{result.distance} km</p>
              </div>

              <div className="mb-3">
                <small className="text-muted-green d-block mb-1">Meio de Transporte</small>
                <p className="mb-0 fw-semibold">
                  {/* 8. Use as props de opções para achar o label */}
                  {transportOptions.find((t) => t.value === result.transport)?.label}
                </p>
              </div>

              {result.transport === "carro" && (
                <>
                  <div className="mb-3">
                    <small className="text-muted-green d-block mb-1">Combustível</small>
                    <p className="mb-0 fw-semibold">
                      {fuelOptions.find((f) => f.value === result.fuelType)?.label}
                    </p>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted-green d-block mb-1">Tipo do Carro</small>
                    <p className="mb-0 fw-semibold">
                      {safeCarTypeOptions.find((c) => c.value === result.carType)?.label}
                    </p>
                  </div>
                </>
              )}

              {/* Dica de Sustentabilidade */}
              <div className="mt-4 p-3 bg-eco-warning-light rounded">
                <div className="d-flex align-items-start gap-2">
                  <div>
                    <p className="small mb-0">
                      <strong>Dica:</strong> {result.emission > 5
                        ? "Considere usar transporte público ou compartilhado para reduzir suas emissões."
                        : "Parabéns! Esta viagem tem baixa emissão de carbono."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={onClose} // 6. Use a prop onClose
              >
                Fechar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose} // 6. Use a prop onClose
              >
                Novo Cálculo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
