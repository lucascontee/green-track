/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaHistory, FaFilter, FaRegTrashAlt } from "react-icons/fa"
import { getTravelHistory, deleteTravelById } from "../../Service/TravelService"
import type { ITripHistory } from "../../Types/travel.types.ts"; // 4. Importe o tipo

import "./HistoryPage.css"

export function HistoryPage() {
const [trips, setTrips] = useState<ITripHistory[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [filterTransport, setFilterTransport] = useState("todos");

    useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await getTravelHistory();
        
        setTrips(data);
      } catch (err: any) {
        setError(err.message || "Falha ao carregar o histórico.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {    
    try {
      const success = await deleteTravelById(id);
      
      if (success) {
        // Remove a viagem do estado local para atualizar a UI
        setTrips(currentTrips => currentTrips.filter(trip => trip.id !== id));
      } else {
        setError("Não foi possível deletar a viagem.");
      }
    } catch (err: any) {
      setError(err.message || "Falha ao deletar a viagem.");
    }
  };

    const filteredTrips = filterTransport === "todos" 
    ? trips 
    : trips.filter(trip => trip.transportType.toLowerCase() === filterTransport.toLowerCase());

    function capitalize(text: string) {
      if (!text) return "";
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getEmissionColor = (emission: number) => {
    if (emission === 0) return "text-success";
    if (emission < 2) return "text-eco-green";
    if (emission < 5) return "text-eco-warning";
    return "text-danger";
  };

  const getEmissionBadge = (emission: number) => {
    if (emission === 0) return { text: "Zero Emissão", class: "bg-success" };
    if (emission < 2) return { text: "Baixa", class: "bg-eco-green" };
    if (emission < 5) return { text: "Média", class: "badge-eco-warning" };
    return { text: "Alta", class: "bg-danger" };
  };

  if (isLoading) {
    return (
      <div className="container-fluid py-4 text-center">
        <div className="spinner-border text-eco-green" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted-green mt-2">Carregando histórico...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger" role="alert">
          <strong>Erro:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    
    <div className="container-fluid py-4">

      <div className="mb-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="bg-eco-green icon-square p-2">
            <FaHistory className="text-white" size={24} />
          </div>
          <div>
            <h2 className="h4 mb-1 fw-semibold">Histórico de Viagens</h2>
            <p className="text-muted-green mb-0">Acompanhe todas as suas emissões registradas</p>
          </div>
        </div>
      </div>

      <div>
        <div className="card-body p-3 border-bottom">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-3 mb-md-0">
              <div className="d-flex align-items-center gap-2">
                <FaFilter size={18} className="text-muted-green" />
                <label htmlFor="filterTransport" className="form-label mb-0 me-2">
                  Filtrar por:
                </label>
                <select
                  id="filterTransport"
                  className="form-select"
                  value={filterTransport}
                  onChange={(e) => setFilterTransport(e.target.value)}
                >
                  <option value="todos">Todos os transportes</option>
                  <option value="carro">Carro</option>
                  <option value="moto">Moto</option>
                  <option value="ônibus">Ônibus</option>
                  <option value="bicicleta">Bicicleta</option>
                  <option value="patinete elétrico">Patinete Elétrico</option>
                  <option value="avião">Avião</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-eco-green-lighter">
                <tr>
                  <th className="border-0 py-3 ps-4">Data</th>
                  <th className="border-0 py-3">Transporte</th>
                  <th className="border-0 py-3 d-none d-md-table-cell">Detalhes</th>
                  <th className="border-0 py-3">Distância</th>
                  <th className="border-0 py-3">Emissão</th>
                  <th className="border-0 py-3">Nível</th>
                  <th className="border-0 py-3 pe-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrips.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-5 text-muted-green">
                      Nenhuma viagem encontrada com os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredTrips.map((trip) => {
                    const badge = getEmissionBadge(trip.emission);
                    return (
                      <tr key={trip.id}>
                        <td className="ps-4 align-middle">
                          <small className="text-muted-green">{formatDate(trip.date)}</small>
                        </td>
                        <td className="align-middle">
                          <span className="fw-semibold">{capitalize(trip.transportType)}</span>
                        </td>
                        <td className="align-middle d-none d-md-table-cell">
                          {trip.fuel && trip.transportType ? (
                            <small className="text-muted-green">
                              {capitalize(trip.fuel)} • {capitalize(trip.transportSize)}
                            </small>
                          ) : (
                            <small className="text-muted-green">—</small>
                          )}
                        </td>
                        <td className="align-middle">
                          <span>{trip.distance} km</span>
                        </td>
                        <td className="align-middle">
                          <span className={`fw-semibold emission-text ${getEmissionColor(trip.emission)}`}>
                            {trip.emission.toFixed(2)} kg
                          </span>
                        </td>
                        <td className="align-middle">
                          <span className={`badge ${badge.class}`}>
                            {badge.text}
                          </span>
                        </td>
                        <td className="align-middle pe-4">
                          <div className="d-flex gap-2 justify-content-center">
                            <button
                              className="btn btn-sm btn-outline-danger p-1"
                              title="Excluir"
                              onClick={() => handleDelete(trip.id)}
                            >
                              <FaRegTrashAlt size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
