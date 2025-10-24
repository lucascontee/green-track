import { FaTree, FaMapMarkerAlt } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

import "./InfoCard.css"

export function InfoCard(){

    const stats = [
    {
      icon: FiTarget,
      label: "Meta de emissão máxima por mês",
      isGoal: true,
      goalValue: "200.0",
      emittedValue: "145.7",
      emittedColor: "text-emitted",
      color: "text-eco-green"
    },
    {
      icon: FaTree,
      label: "Você já fez",
      value: "12",
      description: "viagens limpas no total",
      color: "text-eco-green"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Última viagem",
      value: "15.2 kg CO₂e",
      description: "com Carro Elétrico",
      color: "text-eco-green"
    }
  ];


    return (
    <div className="row mt-5">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="col-12 col-md-4">
            <div className="card rounded-4 info-card h-100">
              <div className="p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <Icon className={stat.color} size={20} />
                  <p className="small text-muted-green mb-0">{stat.label}</p>
                </div>
                {stat.isGoal ? (
                  <div>
                    <p className="small mb-2">
                      <span className="text-muted-green">Sua meta:</span>{' '}
                      <span className="fw-semibold">{stat.goalValue} kg CO₂e</span>
                    </p>
                    <p className="small mb-0">
                      <span className="text-muted-green">Emitido:</span>{' '}
                      <span className={`fw-semibold ${stat.emittedColor}`}>{stat.emittedValue} kg CO₂e</span>
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="fw-semibold mb-2" style={{ fontSize: '1.75rem', lineHeight: 1 }}>
                      {stat.value}
                    </p>
                    <p className="small text-muted-green mb-0">{stat.description}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}