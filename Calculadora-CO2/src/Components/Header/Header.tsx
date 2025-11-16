import { useState, useEffect } from "react"; 
import { FaCalculator, FaRegBell } from "react-icons/fa";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi"; 
import { useNavigate } from "react-router-dom";

import { getTravelHistory } from "../../Service/TravelService";
import { getGoal } from "../../Service/GoalService";

import "./Header.css";

export function Header() {
  const navigate = useNavigate();
  const handleNavigateToHelp = () => {
    navigate("/calculate");
  };

  const [monthlyEmissions, setMonthlyEmissions] = useState<number>(0); 
  const [monthlyGoal, setMonthlyGoal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [weeklyEmissions, setWeeklyEmissions] = useState<number>(0);
  const [lastWeekEmissions, setLastWeekEmissions] = useState<number>(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    const fetchHeaderData = async () => {
      setIsLoading(true);
      try {
        const [history, goalResponse] = await Promise.all([
          getTravelHistory(),
          getGoal(),
        ]);

        if (history) {
          const now = new Date();
          
          const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const thisMonthHistory = history.filter((trip) => {
            const tripDate = new Date(trip.date);
            return (
              tripDate >= firstDayOfMonth &&
              tripDate.getFullYear() === now.getFullYear()
            );
          });
          const thisMonthSum = thisMonthHistory.reduce(
            (acc, trip) => acc + trip.emission,
            0
          );
          setMonthlyEmissions(thisMonthSum);

          const today = new Date();
          const dayOfWeek = today.getDay();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - dayOfWeek);
          startOfWeek.setHours(0, 0, 0, 0);

          const endOfWeek = new Date(today);
          endOfWeek.setHours(23, 59, 59, 999);

          const startOfLastWeek = new Date(startOfWeek);
          startOfLastWeek.setDate(startOfWeek.getDate() - 7);

          const endOfLastWeek = new Date(startOfWeek);
          endOfLastWeek.setDate(startOfWeek.getDate() - 1);
          endOfLastWeek.setHours(23, 59, 59, 999);
          
          const tripsThisWeek = history.filter(trip => {
            const tripDate = new Date(trip.date);
            return tripDate >= startOfWeek && tripDate <= endOfWeek;
          });
          const tripsLastWeek = history.filter(trip => {
            const tripDate = new Date(trip.date);
            return tripDate >= startOfLastWeek && tripDate <= endOfLastWeek;
          });

          const totalEmissionThisWeek = tripsThisWeek.reduce((sum, trip) => sum + trip.emission, 0);
          const totalEmissionLastWeek = tripsLastWeek.reduce((sum, trip) => sum + trip.emission, 0);

          setWeeklyEmissions(totalEmissionThisWeek);
          setLastWeekEmissions(totalEmissionLastWeek);
        }

        if (goalResponse) {
          setMonthlyGoal(goalResponse.monthlyEmissionGoalKg);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do header:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  const getProgress = () => {
    if (!monthlyGoal || monthlyGoal === 0) return 0;
    const progress = (monthlyEmissions / monthlyGoal) * 100; 
    return Math.min(progress, 100);
  };

  const progressPercent = getProgress();
  const isOverGoal = monthlyGoal ? monthlyEmissions > monthlyGoal : false;

  const getWeeklyComparison = () => {
    if (lastWeekEmissions > 0) {
      return ((weeklyEmissions - lastWeekEmissions) / lastWeekEmissions) * 100;
    }
    if (weeklyEmissions > 0) {
      return 100;
    }
    return 0;
  };
  const weeklyComparePercent = getWeeklyComparison();

  return (
    <header className="app-header">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between py-3">
          
          <div className="ms-2 d-flex gap-3 align-items-center">
            <div>
              <h2 className="h6 mb-0 fw-semibold">Green Track</h2>
              <p className="small text-muted-green mb-0">
                Calculadora de Carbono
              </p>
            </div>
          </div>

          <div className="flex-grow-1 mx-4 d-none d-lg-block">
            <div className="mx-auto" style={{ maxWidth: "350px" }}>
              {isLoading ? (
                <div className="progress" style={{ height: "10px" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated bg-eco-green"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              ) : (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small fw-semibold">Progresso Mensal</span>
                    <span
                      className={`small ${
                        isOverGoal ? "text-danger fw-semibold" : "text-muted-green"
                      }`}
                    >
                      {monthlyEmissions.toFixed(1)}kg / {monthlyGoal || "N/A"}kg
                    </span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className={`progress-bar ${
                        isOverGoal ? "bg-danger" : "bg-eco-green"
                      }`}
                      role="progressbar"
                      style={{ width: `${progressPercent}%` }}
                      aria-valuenow={progressPercent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="d-flex me-4 gap-4 align-items-center">
            <button
              className=" text-white btn btn-primary-green d-none d-sm-flex align-items-center gap-2 shadow"
              onClick={handleNavigateToHelp}
            >
              <FaCalculator size={20} />
              Calcular Emissão
            </button>
            
            <div className="notification-wrapper" style={{ position: "relative" }}>
              <FaRegBell 
                size={24} 
                className="bell" 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)} // Alterna o popover
              />
              
              {isNotificationOpen && (
                <div 
                  className="notification-popover card shadow-lg border-0"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)', 
                    right: 0,
                    width: '320px',
                    zIndex: 1050,   
                  }}
                >
                  <div className="card-body p-3">
                    <p className="small text-muted mb-1">Resumo da Semana</p>
                    <div className="d-flex align-items-baseline gap-2">
                      <span className="h4 text-eco-green mb-0">
                        {weeklyEmissions.toFixed(1)}
                      </span>
                      <span className="small text-muted-green">kg CO₂</span>
                    </div>
                    {weeklyComparePercent > 0 && (
                      <span className="badge bg-danger-light text-danger d-inline-flex align-items-center gap-1 mt-2">
                        <BiTrendingUp size={14} />
                        +{weeklyComparePercent.toFixed(0)}% vs semana passada
                      </span>
                    )}
                    {weeklyComparePercent < 0 && (
                      <span className="badge bg-success-light text-success d-inline-flex align-items-center gap-1 mt-2">
                        <BiTrendingDown size={14} />
                        {weeklyComparePercent.toFixed(0)}% vs semana passada
                      </span>
                    )}
                    {weeklyComparePercent === 0 && (
                      <span className="badge bg-secondary-light text-secondary d-inline-flex align-items-center gap-1 mt-2">
                        Sem alteração
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}