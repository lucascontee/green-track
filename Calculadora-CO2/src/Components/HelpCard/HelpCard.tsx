import "./HelpCard.css"

export function HelpCard(){
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
                <button className="btn btn-outline-success">
                Saiba Mais
                </button>
                <button className="btn btn-link text-eco-green text-decoration-none">
                Ver Metodologia
                </button>
            </div>
            </div>
        </div>
    )
}