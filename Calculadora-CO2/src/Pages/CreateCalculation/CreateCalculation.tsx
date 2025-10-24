import { FaCalculator } from "react-icons/fa";


export function CreateCalculation(){

    return(
        <div className="container-fluid py-4">
            <div className="mb-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="bg-eco-green icon-square p-2">
                        <FaCalculator className="text-white" size={24} />
                    </div>
                    <div>
                        <h2 className="h4 mb-1 fw-semibold">Calcular Emissão</h2>
                        <p className="text-muted mb-0">Descubra a pegada de carbono da sua viagem</p>
                    </div>
                </div>
            </div>
        </div>
    )
}