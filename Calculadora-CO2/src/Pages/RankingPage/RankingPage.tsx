import { FaLeaf, FaTrophy, FaMedal } from "react-icons/fa";

import "./RankingPage.css"

interface Vehicle {
  id: number;
  name: string;
  fuel: string;
  emissionFactor: number; // kg CO2 per km
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Bicicleta",
    fuel: "Nenhum",
    emissionFactor: 0,
  },
  {
    id: 2,
    name: "Carro Elétrico",
    fuel: "Eletricidade",
    emissionFactor: 0.05,
  },
  {
    id: 3,
    name: "Moto",
    fuel: "Gasolina",
    emissionFactor: 0.07,
  },
  {
    id: 4,
    name: "Carro a Etanol",
    fuel: "Etanol",
    emissionFactor: 0.11,
  },
  {
    id: 5,
    name: "Carro a Gasolina",
    fuel: "Gasolina",
    emissionFactor: 0.18,
  },
  {
    id: 6,
    name: "Carro a Diesel",
    fuel: "Diesel",
    emissionFactor: 0.20,
  },
].sort((a, b) => a.emissionFactor - b.emissionFactor);

export function RankingPage() {
  const getMedalIcon = (position: number) => {
    if (position === 0) return <FaTrophy className="text-warning" size={24} />;
    if (position === 1) return <FaMedal className="text-muted-green" size={24} />;
    if (position === 2) return <FaMedal className="text-eco-warning" size={24} />;
    return <FaLeaf className="text-eco-green-light" size={20} />;
  };

  const getPositionBadge = (position: number) => {
    const badges = [
      "bg-warning text-dark",
      "bg-secondary text-white",
      "bg-eco-warning-light text-eco-warning",
    ];
    return badges[position] || "bg-eco-green-lighter text-eco-green";
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          {/* Header */}
          <div className="mb-4">
            <p className="text-muted mb-0">
              Conheça os veículos ordenados do menor para o maior emissor de CO₂
            </p>
          </div>

          <div className="card">
            <div className="card-body p-0">
              <div className="p-4 border-bottom">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <FaTrophy size={24}/>
                  </div>
                  <div>
                    <h5 className="mb-0">Ranking de Veículos</h5>
                    <p className="text-muted small mb-0">Emissão de CO₂ por quilômetro</p>
                  </div>
                </div>
              </div>

              {/* Table - Desktop */}
              <div className="table-responsive d-none d-md-block">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4 py-3" style={{ width: "80px" }}>Posição</th>
                      <th className="py-3">Veículo</th>
                      <th className="py-3">Combustível</th>
                      <th className="py-3 text-end px-4">CO₂ por KM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle, index) => (
                      <tr key={vehicle.id}>
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center gap-2">
                            {getMedalIcon(index)}
                            <span
                              className={`badge ${getPositionBadge(index)} px-2 py-1`}
                            >
                              {index + 1}º
                            </span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="fw-medium">{vehicle.name}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-muted">{vehicle.fuel}</span>
                        </td>
                        <td className="py-3 text-end px-4">
                          <span className="badge bg-eco-green-lighter text-eco-green px-3 py-2">
                            {vehicle.emissionFactor.toFixed(2)} kg CO₂/km
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cards - Mobile */}
              <div className="d-md-none p-3">
                {vehicles.map((vehicle, index) => (
                  <div
                    key={vehicle.id}
                    className="card mb-3 border hover-shadow"
                  >
                    <div className="card-body p-3">
                      <div className="d-flex align-items-start justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                          {getMedalIcon(index)}
                          <span
                            className={`badge ${getPositionBadge(index)} px-2 py-1`}
                          >
                            {index + 1}º
                          </span>
                        </div>
                        <span className="badge bg-eco-green-lighter text-eco-green px-2 py-1">
                          {vehicle.emissionFactor.toFixed(2)} kg CO₂/km
                        </span>
                      </div>
                      <h6 className="mb-1">{vehicle.name}</h6>
                      <p className="text-muted small mb-0">
                        Combustível: {vehicle.fuel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-4 bg-eco-green-lighter border rounded p-4">
            <h6 className="mb-2">💡 Sobre os dados</h6>
            <p className="text-muted small mb-0">
              Os fatores de emissão são valores médios aproximados e podem variar 
              dependendo do modelo específico do veículo, condições de uso e manutenção. 
              Optar por veículos com menor emissão contribui significativamente para 
              a redução da sua pegada de carbono.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
