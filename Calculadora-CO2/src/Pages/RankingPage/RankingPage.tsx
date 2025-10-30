import { FaLeaf, FaTrophy, FaMedal } from "react-icons/fa";

import "./RankingPage.css"

interface Vehicle {
  id: number;
  name: string;
  fuel: string;
  emissionFactor: number; 
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Bicicleta",
    fuel: "Nenhum",
    emissionFactor: 0,
  },
  {
    id: 1,
    name: "Bicicleta Elétrica",
    fuel: "Eletricidade",
    emissionFactor: 20,
  },
  {
    id: 2,
    name: "Carro Leve",
    fuel: "Eletricidade",
    emissionFactor: 6,
  },
  {
    id: 3,
    name: "Carro Leve",
    fuel: "Híbrido",
    emissionFactor: 0.05,
  },
  {
    id: 4,
    name: "Carro Leve",
    fuel: "Álcool",
    emissionFactor: 80,
  },
  {
    id: 5,
    name: "Carro Leve",
    fuel: "Gasolina",
    emissionFactor: 280,
  },
  {
    id: 6,
    name: "Carro Médio",
    fuel: "Eletricidade",
    emissionFactor: 7,
  },
  {
    id: 7,
    name: "Carro Médio",
    fuel: "Híbrido",
    emissionFactor: 29,
  },
  {
    id: 8,
    name: "Carro Médio",
    fuel: "Álcool",
    emissionFactor: 89,
  },
  {
    id: 9,
    name: "Carro Médio",
    fuel: "Gasolina",
    emissionFactor: 311,
  },
    {
    id: 10,
    name: "Carro Pesado",
    fuel: "Eletricidade",
    emissionFactor: 8,
  },
  {
    id: 11,
    name: "Carro Pesado",
    fuel: "Híbrido",
    emissionFactor: 33,
  },
  {
    id: 12,
    name: "Carro Pesado",
    fuel: "Álcool",
    emissionFactor: 106,
  },
  {
    id: 13,
    name: "Carro Pesado",
    fuel: "Gasolina",
    emissionFactor: 373,
  },
  {
    id: 14,
    name: "Moto Grande",
    fuel: "Não aplica",
    emissionFactor: 115,
  },
  {
    id: 15,
    name: "Moto Média",
    fuel: "Não aplica",
    emissionFactor: 82,
  },
  {
    id: 16,
    name: "Moto Pequena",
    fuel: "Não aplica",
    emissionFactor: 58,
  },
  {
    id: 17,
    name: "Onibus (Por passageiro)",
    fuel: "Diesel",
    emissionFactor: 32,
  },
  {
    id: 18,
    name: "Aviao (Por passageiro)",
    fuel: "Querosene de aviação",
    emissionFactor: 123,
  },
  {
    id: 19,
    name: "A pé",
    fuel: "Não aplica",
    emissionFactor: 0,
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
