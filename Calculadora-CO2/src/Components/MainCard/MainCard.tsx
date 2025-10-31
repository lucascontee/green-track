import './MainCard.css'

interface EmissionCardProps {
  totalEmissions: number;
}

export function MainCard({ totalEmissions }: EmissionCardProps) {
  return (
    <div className="p-4 shadow-sm rounded-4 main-card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="card-title mb-2">Total de Emissões</p>
            <div className="mb-4">
              <span className="h-1 text-eco-green" style={{ fontWeight: 700, lineHeight: 1 }}>
                {totalEmissions.toFixed(2)}
              </span>
              <span className="text-green-info ms-3">
                kg CO₂e
              </span>
            </div>
          </div>
            <hr className="green-line"/>
        </div>
          <p className="text-description">
            Sua pegada de carbono atual
          </p>
    </div>
  );
}
