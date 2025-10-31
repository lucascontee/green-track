import { FaTree, FaMapMarkerAlt } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import type { ITripHistory } from "../../Types/travel.types";


import "./InfoCard.css"

interface InfoCardProps {
  cleanTripsCount: number;
  lastTrip: ITripHistory | null;
  monthlyGoal: number | null;
  totalEmitted: number | null;
}

export function InfoCard({ cleanTripsCount, lastTrip, monthlyGoal, totalEmitted }: InfoCardProps){

  const stats = [
    {
      icon: FiTarget,
      label: "Meta de emissão máxima por mês",
      isGoal: true,
      goalValue: monthlyGoal?.toFixed(2), 
      emittedValue: totalEmitted?.toFixed(2),
      emittedColor: "text-emitted",
      color: "text-eco-green"
    },
    {
      icon: FaTree,
      label: "Você já fez",
      value: cleanTripsCount.toString(), 
      description: "viagens limpas no total",
      color: "text-eco-green"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Última viagem",
      value: lastTrip ? `${lastTrip.emission.toFixed(1)} kg CO₂e` : "N/A",
      description: lastTrip ? `veículo: ${lastTrip.transportType}` : "Nenhuma viagem registrada",
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
