import { useState } from "react";
import { FiTarget, FiCheckCircle } from "react-icons/fi";

import "./GoalPage.css"

export function GoalPage() {
  const [goalValue, setGoalValue] = useState("");
  const [savedGoal, setSavedGoal] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(goalValue);
    
    if (value && value > 0) {
      setSavedGoal(value);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-6">
          <div className="mb-4">
            <p className="text-muted-green mb-0">
              Defina sua meta mensal de emissão de carbono para acompanhar seu progresso
            </p>
          </div>

          {showSuccess && (
            <div className="alert alert-success d-flex align-items-center gap-3 animate-fade-in" role="alert">
              <FiCheckCircle size={24} />
              <div>
                <strong>Meta salva com sucesso!</strong>
                <p className="mb-0 small">Sua meta mensal foi atualizada.</p>
              </div>
            </div>
          )}

          {savedGoal && (
            <div className="card card-eco-green card-eco-gradient-green mb-4">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="icon-circle bg-eco-green">
                    <FiTarget className="text-white" size={24} />
                  </div>
                  <div>
                    <h5 className="mb-0">Meta Mensal Ativa</h5>
                    <p className="text-muted small mb-0">Objetivo de emissão máxima</p>
                  </div>
                </div>
                <div className="d-flex align-items-baseline gap-2">
                  <span className="display-4 text-eco-green">{savedGoal}</span>
                  <span className="text-muted">kg CO₂ / mês</span>
                </div>
              </div>
            </div>
          )}

          {/* Goal Form Card */}
          <div className="card card-eco-green">
            <div className="card-body p-4">
              <h5 className="card-title mb-4">
                {savedGoal ? "Atualizar Meta Mensal" : "Definir Meta Mensal"}
              </h5>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="goalValue" className="form-label">
                    Meta de Emissão Máxima (kg CO₂)
                  </label>
                  <div className="input-group input-group-lg">
                    <input
                      type="number"
                      className="form-control"
                      id="goalValue"
                      value={goalValue}
                      onChange={(e) => setGoalValue(e.target.value)}
                      placeholder="Ex: 100"
                      step="0.1"
                      min="0"
                      required
                    />
                    <span className="input-group-text">kg CO₂</span>
                  </div>
                  <div className="form-text">
                    Digite o valor máximo de emissão que deseja alcançar por mês
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <FiTarget size={20} />
                  {savedGoal ? "Atualizar Meta" : "Salvar Meta"}
                </button>
              </form>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-4 bg-eco-green-lighter border rounded p-4">
            <h6 className="mb-2">💡 Dica</h6>
            <p className="text-muted small mb-0">
              Uma meta realista ajuda a manter o foco na redução gradual das emissões. 
              A média brasileira é de aproximadamente 150 kg CO₂ por pessoa/mês em transporte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
