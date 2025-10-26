import { useState } from "react";
import { FaHistory, FaFilter, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa"

import "./HistoryPage.css"

interface Trip {
  id: string;
  date: string;
  distance: number;
  transport: string;
  fuelType?: string;
  carType?: string;
  emission: number;
}

export function HistoryPage() {
  // Mock data - em produção, isso viria de um banco de dados
  const [trips] = useState<Trip[]>([
    {
      id: "1",
      date: "2025-10-20",
      distance: 35,
      transport: "Carro",
      fuelType: "Gasolina",
      carType: "Médio",
      emission: 5.25,
    },
    {
      id: "2",
      date: "2025-10-18",
      distance: 12,
      transport: "Bicicleta",
      emission: 0,
    },
    {
      id: "3",
      date: "2025-10-15",
      distance: 45,
      transport: "Ônibus",
      emission: 1.8,
    },
    {
      id: "4",
      date: "2025-10-12",
      distance: 28,
      transport: "Carro",
      fuelType: "Híbrido",
      carType: "Pequeno",
      emission: 1.68,
    },
    {
      id: "5",
      date: "2025-10-10",
      distance: 8,
      transport: "Patinete Elétrico",
      emission: 0.08,
    },
    {
      id: "6",
      date: "2025-10-08",
      distance: 150,
      transport: "Avião",
      emission: 37.5,
    },
    {
      id: "7",
      date: "2025-10-05",
      distance: 22,
      transport: "Moto",
      emission: 1.76,
    },
  ]);

  const [filterTransport, setFilterTransport] = useState("todos");

  // const totalEmissions = trips.reduce((sum, trip) => sum + trip.emission, 0);
  // const totalDistance = trips.reduce((sum, trip) => sum + trip.distance, 0);
  // const averageEmission = totalEmissions / trips.length;

  const filteredTrips = filterTransport === "todos" 
    ? trips 
    : trips.filter(trip => trip.transport.toLowerCase() === filterTransport.toLowerCase());

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

      {/* Filters and Table */}
      <div>
        {/* Filters */}
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
                          <span className="fw-semibold">{trip.transport}</span>
                        </td>
                        <td className="align-middle d-none d-md-table-cell">
                          {trip.fuelType && trip.carType ? (
                            <small className="text-muted-green">
                              {trip.fuelType} • {trip.carType}
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
                              className="btn btn-sm btn-outline-success p-1"
                              title="Ver detalhes"
                            >
                              <FaPencilAlt size={16} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger p-1"
                              title="Excluir"
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
