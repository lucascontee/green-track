/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaRoute, FaCar } from "react-icons/fa";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";

// 1. Importar o serviço e o tipo
import { getTravelHistory } from "../../Service/TravelService";

import "./WeeklyReport.css" 

// 2. Definir uma interface para os dados processados
interface IWeeklyData {
  totalEmission: number;
  totalDistance: number;
  topVehicle: {
    name: string;
    emission: number;
    percentage: number;
  };
  startDate: string;
  endDate: string;
  comparison: {
    vsLastWeek: number;
  };
}

export function WeeklyReport() {
  const [weeklyData, setWeeklyData] = useState<IWeeklyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeeklyReport = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const allHistory = await getTravelHistory();

        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); 
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(); 
        endOfWeek.setHours(23, 59, 59, 999);

        const startOfLastWeek = new Date(startOfWeek);
        startOfLastWeek.setDate(startOfWeek.getDate() - 7); 

        const endOfLastWeek = new Date(startOfWeek);
        endOfLastWeek.setDate(startOfWeek.getDate() - 1); 
        endOfLastWeek.setHours(23, 59, 59, 999);
        
        const tripsThisWeek = allHistory.filter(trip => {
          const tripDate = new Date(trip.date);
          return tripDate >= startOfWeek && tripDate <= endOfWeek;
        });

        const tripsLastWeek = allHistory.filter(trip => {
          const tripDate = new Date(trip.date);
          return tripDate >= startOfLastWeek && tripDate <= endOfLastWeek;
        });

        const totalEmissionThisWeek = tripsThisWeek.reduce((sum, trip) => sum + trip.emission, 0);
        const totalDistanceThisWeek = tripsThisWeek.reduce((sum, trip) => sum + trip.distance, 0);
        const totalEmissionLastWeek = tripsLastWeek.reduce((sum, trip) => sum + trip.emission, 0);

        let vsLastWeekPercent = 0;
        if (totalEmissionLastWeek > 0) {
          vsLastWeekPercent = ((totalEmissionThisWeek - totalEmissionLastWeek) / totalEmissionLastWeek) * 100;
        } else if (totalEmissionThisWeek > 0) {
          vsLastWeekPercent = 100; 
        }

        const emissionsByVehicle = tripsThisWeek.reduce((acc, trip) => {
          const label = trip.transportLabel || "Desconhecido";
          acc[label] = (acc[label] || 0) + trip.emission;
          return acc;
        }, {} as Record<string, number>);

        const [topVehicleName, topVehicleEmission] = Object.entries(emissionsByVehicle)
          .sort(([, a], [, b]) => b - a)[0] || ["Nenhum", 0];

        const topVehiclePercentage = totalEmissionThisWeek > 0 ? (topVehicleEmission / totalEmissionThisWeek) * 100 : 0;
        
        const startDateStr = startOfWeek.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });

        setWeeklyData({
          totalEmission: totalEmissionThisWeek,
          totalDistance: totalDistanceThisWeek,
          startDate: startDateStr,
          endDate: "Hoje",
          comparison: {
            vsLastWeek: vsLastWeekPercent,
          },
          topVehicle: {
            name: topVehicleName,
            emission: topVehicleEmission,
            percentage: topVehiclePercentage,
          }
        });

      } catch (err: any) {
        setError(err.message || "Falha ao carregar relatório semanal.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeeklyReport();
  }, []);

  // 6. Lidar com os estados de Loading e Erro
  if (isLoading) {
    return (
      <div className="container-fluid py-4 text-center">
        <div className="spinner-border text-eco-green" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted-green mt-2">Calculando relatório semanal...</p>
      </div>
    );
  }

  if (error || !weeklyData) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger" role="alert">
          <strong>Erro:</strong> {error || "Não foi possível carregar os dados."}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="mb-4">
            <p className="text-muted mb-0">
              Resumo das suas emissões de {weeklyData.startDate} até {weeklyData.endDate}
            </p>
          </div>

          <div className="row g-4 mb-4">
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
                      {weeklyData.totalEmission.toFixed(1)}
                    </span>
                    <span className="text-muted">kg CO₂</span>
                  </div>
                  {weeklyData.comparison.vsLastWeek < 0 && (
                    <div className="mt-3">
                      <span className="badge bg-success d-inline-flex align-items-center gap-1">
                        <BiTrendingDown size={14} />
                        {Math.abs(weeklyData.comparison.vsLastWeek).toFixed(0)}% vs semana passada
                      </span>
                    </div>
                  )}
                  {weeklyData.comparison.vsLastWeek > 0 && (
                    <div className="mt-3">
                      <span className="badge bg-danger d-inline-flex align-items-center gap-1">
                        <BiTrendingUp size={14} />
                        +{weeklyData.comparison.vsLastWeek.toFixed(0)}% vs semana passada
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                      {weeklyData.totalDistance.toFixed(0)}
                    </span>
                    <span className="text-muted">km</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-muted small mb-0">
                      Média de {(weeklyData.totalDistance / (new Date().getDay() + 1)).toFixed(1)} km/dia
                    </p>
                  </div>
                </div>
              </div>
            </div>

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
                      {weeklyData.topVehicle.emission.toFixed(1)}
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
                    {weeklyData.topVehicle.percentage.toFixed(0)}% do total semanal
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
                  {Math.abs(weeklyData.comparison.vsLastWeek).toFixed(0)}% em relação à semana passada. 
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
