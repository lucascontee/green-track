/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { FiTarget, FiCheckCircle } from "react-icons/fi";
import { getGoal, setGoal } from "../../Service/GoalService";
import { getTravelHistory } from "../../Service/TravelService";
import type { ITripHistory } from "../../Types/travel.types";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./GoalPage.css";

export function GoalPage() {
  const [goalValue, setGoalValue] = useState(""); 
  const [savedGoal, setSavedGoal] = useState<number | null>(null); 

  const [thisMonthEmissions, setThisMonthEmissions] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);

  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setIsFetching(true);
        setError(null);

        const [goal, history] = await Promise.all([
          getGoal(),
          getTravelHistory(),
        ]);

        let currentGoal: number | null = null;
        let currentMonthEmissions: number = 0;

        if (goal) {
          currentGoal = goal.monthlyEmissionGoalKg;
          setSavedGoal(currentGoal);
          setGoalValue(currentGoal.toString());
        }

        if (history) {
          const now = new Date();
          const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

          const thisMonthHistory = history.filter((trip: ITripHistory) => {
            const tripDate = new Date(trip.date);
            return (
              tripDate >= firstDayOfMonth &&
              tripDate.getFullYear() === now.getFullYear()
            );
          });

          currentMonthEmissions = thisMonthHistory.reduce(
            (accumulator, trip) => {
              return accumulator + trip.emission;
            },
            0
          );
          setThisMonthEmissions(currentMonthEmissions);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchPageData();
  }, []);

  useEffect(() => {
    const emissionValue = parseFloat(thisMonthEmissions.toFixed(2));
    const goalValue = savedGoal || 0;

    setChartData([
      {
        name: "Comparativo Mensal",
        Meta: goalValue,
        Emitido: emissionValue,
      },
    ]);
  }, [savedGoal, thisMonthEmissions]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(goalValue);

    if (!value || value <= 0) {
      setError("O valor da meta deve ser um número positivo.");
      return;
    }

    setIsSaving(true);
    setError(null);
    setShowSuccess(false);

    try {
      const savedGoalFromApi = await setGoal({ monthlyEmissionGoalKg: value });

      setSavedGoal(savedGoalFromApi.monthlyEmissionGoalKg);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-6">
          <div className="mb-4">
            <p className="text-muted-green mb-0">
              Defina sua meta mensal de emissão de carbono para acompanhar seu
              progresso
            </p>
          </div>

          {showSuccess && (
            <div
              className="alert alert-success d-flex align-items-center gap-3 animate-fade-in"
              role="alert"
            >
              <FiCheckCircle size={24} />
              <div>
                <strong>Meta salva com sucesso!</strong>
                <p className="mb-0 small">Sua meta mensal foi atualizada.</p>
              </div>
            </div>
          )}

          {error && (
            <div
              className="alert alert-danger d-flex align-items-center gap-3 animate-fade-in"
              role="alert"
            >
              <div>
                <strong>Erro:</strong> {error}
              </div>
            </div>
          )}

          {isFetching && (
            <div className="text-center p-4">
              <div className="spinner-border text-eco-green" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          )}

          {savedGoal && !isFetching && (
            <div className="card card-eco-green card-eco-gradient-green mb-4">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div>
                    <FiTarget className="" size={24} />
                  </div>
                  <div>
                    <h5 className="mb-0">Meta Mensal Ativa</h5>
                    <p className="text-muted small mb-0">
                      Objetivo de emissão máxima
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-baseline gap-2">
                  <span className="display-4 text-eco-green">
                    {savedGoal}
                  </span>
                  <span className="text-muted">kg CO₂ / mês</span>
                </div>
              </div>
            </div>
          )}

          {!isFetching && (
            <div className="card">
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
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Salvando...
                      </>
                    ) : (
                      <>
                        <FiTarget size={20} />
                        {savedGoal ? "Atualizar Meta" : "Salvar Meta"}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

           {!isFetching && chartData.length > 0 && (
            <div className="card mt-4 mb-4">
              <div className="card-body p-4">
                <h5 className="card-title mb-4">Progresso Mensal</h5>
                <div style={{ width: "100%", height: 300 }}>
                  
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        label={{
                          value: "kg CO₂",
                          angle: -90,
                          position: "insideLeft",
                          offset: 10,
                        }}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(230, 245, 238, 0.5)" }}
                        contentStyle={{
                          borderRadius: "0.5rem",
                          borderColor: "#e6f1ee",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="Emitido" fill="var(--eco-warning)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Meta" fill="var(--eco-green)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 bg-eco-green-lighter border rounded p-4">
            <h6 className="mb-2">💡 Dica</h6>
            <p className="text-muted small mb-0">
              Uma meta realista ajuda a manter o foco na redução gradual das
              emissões.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

