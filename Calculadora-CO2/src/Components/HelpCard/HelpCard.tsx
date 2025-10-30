import { useNavigate } from "react-router-dom";


import "./HelpCard.css"

export function HelpCard(){

    const navigate = useNavigate();
    const handleNavigateToHelp = () => {
        navigate('/help'); // '/help' é a rota da sua página de ajuda
    };

    return(
        <div className="help-card mt-5 bg-eco-green-lighter border rounded p-4">
            <div style={{ maxWidth: '48rem' }}>
            <h3 className="h5 mb-3">Como funciona?</h3>
            <p className="text-muted-green mb-4">
                Nossa calculadora analisa seus hábitos de transporte, consumo de energia e estilo de vida 
                para estimar sua pegada de carbono. Com base nos resultados, oferecemos recomendações 
                personalizadas para reduzir suas emissões.
            </p>
            <div className="d-flex flex-wrap gap-3">
                <button className="btn btn-outline-success" onClick={handleNavigateToHelp}>
                Como funciona?
                </button>
            </div>
            </div>
        </div>
    )
}