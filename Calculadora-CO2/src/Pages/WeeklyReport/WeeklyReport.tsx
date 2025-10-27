import { FaCalendarAlt, FaRoute, FaCar } from "react-icons/fa";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";

import "./WeeklyReport.css" 

// Mock data - substituir por dados reais futuramente
const weeklyData = {
  totalEmission: 42.5, // kg CO2
  totalDistance: 236, // km
  topVehicle: {
    name: "Carro a Gasolina",
    emission: 28.8, // kg CO2
    percentage: 67.8,
  },
  startDate: "Domingo, 20 Out",
  endDate: "Hoje",
  comparison: {
    vsLastWeek: -12.3, // percentual de redução
  },
  dailyBreakdown: [
    { day: "Dom", emission: 8.2, distance: 45 },
    { day: "Seg", emission: 7.1, distance: 40 },
    { day: "Ter", emission: 5.4, distance: 30 },
    { day: "Qua", emission: 6.8, distance: 38 },
    { day: "Qui", emission: 7.2, distance: 40 },
    { day: "Sex", emission: 5.3, distance: 29 },
    { day: "Sáb", emission: 2.5, distance: 14 },
  ],
};

export function WeeklyReport() {
  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          {/* Header */}
          <div className="mb-4">
            <p className="text-muted mb-0">
              Resumo das suas emissões de {weeklyData.startDate} até {weeklyData.endDate}
            </p>
          </div>

          {/* Main Stats Cards */}
          <div className="row g-4 mb-4">
            {/* Total Emission Card */}
            <div className="col-12 col-md-4">
              <div className="card card-eco-green h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div>
                      <FaCalendarAlt className="text-eco-green" size={24} />
                    </div>
                    <div>
                      <p className="text-muted small mb-0">Total Emitido</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-baseline gap-2">
                    <span className="display-4 text-eco-green">
                      {weeklyData.totalEmission}
                    </span>
                    <span className="text-muted">kg CO₂</span>
                  </div>
                  {weeklyData.comparison.vsLastWeek < 0 && (
                    <div className="mt-3">
                      <span className="badge bg-success d-inline-flex align-items-center gap-1">
                        <BiTrendingDown size={14} />
                        {Math.abs(weeklyData.comparison.vsLastWeek)}% vs semana passada
                      </span>
                    </div>
                  )}
                  {weeklyData.comparison.vsLastWeek > 0 && (
                    <div className="mt-3">
                      <span className="badge bg-danger d-inline-flex align-items-center gap-1">
                        <BiTrendingUp size={14} />
                        +{weeklyData.comparison.vsLastWeek}% vs semana passada
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Total Distance Card */}
            <div className="col-12 col-md-4">
              <div className="card card-eco-green h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="icon-circle bg-eco-blue">
                      <FaRoute className="text-eco-green" size={24} />
                    </div>
                    <div>
                      <p className="text-muted small mb-0">Distância Percorrida</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-baseline gap-2">
                    <span className="display-4 text-eco-blue">
                      {weeklyData.totalDistance}
                    </span>
                    <span className="text-muted">km</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-muted small mb-0">
                      Média de {(weeklyData.totalDistance / 7).toFixed(1)} km/dia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Vehicle Card */}
            <div className="col-12 col-md-4">
              <div className="card card-eco card-eco-gradient-warning h-100 w-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div>
                      <FaCar className="text-eco-warning" size={24} />
                    </div>
                    <div>
                      <p className="text-muted small mb-0">Mais Poluente</p>
                    </div>
                  </div>
                  <h5 className="mb-2">{weeklyData.topVehicle.name}</h5>
                  <div className="d-flex align-items-baseline gap-2 mb-2">
                    <span className="h4 text-eco-warning mb-0">
                      {weeklyData.topVehicle.emission}
                    </span>
                    <span className="text-muted">kg CO₂</span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${weeklyData.topVehicle.percentage}%`,
                        backgroundColor: "var(--eco-warning)",
                      }}
                      aria-valuenow={weeklyData.topVehicle.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <p className="text-muted small mt-2 mb-0">
                    {weeklyData.topVehicle.percentage}% do total semanal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-eco-green-lighter border rounded p-4">
            <h6 className="mb-2">📊 Análise Semanal</h6>
            <p className="text-muted small mb-0">
              {weeklyData.comparison.vsLastWeek < 0 ? (
                <>
                  Parabéns! Você reduziu suas emissões em{" "}
                  {Math.abs(weeklyData.comparison.vsLastWeek)}% em relação à semana passada. 
                  Continue assim para alcançar suas metas ambientais.
                </>
              ) : (
                <>
                  Suas emissões aumentaram nesta semana. Considere usar meios de transporte 
                  mais sustentáveis ou planejar melhor suas rotas para reduzir a pegada de carbono.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
