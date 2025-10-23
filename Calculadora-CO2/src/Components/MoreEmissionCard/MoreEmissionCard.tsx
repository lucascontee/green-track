import { FaCar } from "react-icons/fa";
import {FiAlertCircle} from "react-icons/fi"

import "./MoreEmissionCard.css"

interface MoreEmissionCardProps {
  transportMode: string;
  emissions: number;
}

export function MoreEmissionCard({ transportMode, emissions }: MoreEmissionCardProps) {
  return (
    <div className="shadow-sm rounded-4 w-50 card card-eco card-eco-gradient-warning">
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <FiAlertCircle  className="text-eco-warning" size={20} />
          <p className="text-muted mb-0">Seu Vilão da Emissão</p>
        </div>
        
        <div className="d-flex align-items-center gap-3">
          <div className="bg-eco-warning-light icon-square p-3">
            <FaCar className="text-eco-warning" size={40} />
          </div>
          
          <div className="flex-grow-1">
            <h3 className="h6 mb-2">{transportMode}</h3>
            <span className="badge badge-eco-warning">
              {emissions.toFixed(1)} kg CO₂e
            </span>
          </div>
        </div>
        
        <div className="mt-2 pt-4">
          <p className="small text-muted mb-0">Modo de transporte mais poluente</p>
        </div>
      </div>
    </div>
  );
}
