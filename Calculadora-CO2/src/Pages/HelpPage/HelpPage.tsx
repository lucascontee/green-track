import { FiHelpCircle } from 'react-icons/fi';
import './HelpPage.css';

export function HelpPage() {
  return (
    // O div extra foi removido. O container-fluid é agora o elemento principal.
    <div className="container-fluid py-4">
      <div className="mb-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="bg-eco-green icon-square p-2 align-self-start">
            <FiHelpCircle className="text-white" size={24} />
          </div>
          <div>
            <h2 className="h4 mb-1 fw-semibold">Central de Ajuda</h2>
            <p className="text-muted mb-0">Entenda a nossa metodologia de cálculo.</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7">
          
          <h3 className="h5 mt-4 fw-semibold">1. Conceitos-Chave</h3>
          
          <h4 className="h6 mt-3 fw-semibold">O que é "Pegada de Carbono"?</h4>
          {/* A classe "text-muted" (do seu CSS) foi re-aplicada */}
          <p className="text-muted">
            É a quantidade total de gases de efeito estufa (GEE) que uma pessoa, organização ou produto emite, direta ou indiretamente. No nosso caso, calculamos a pegada de carbono das <em>suas viagens</em>.
          </p>

          <h4 className="h6 mt-3 fw-semibold">O que significa "kg CO₂e"?</h4>
          <p className="text-muted">
            Você verá esta medida em todo o aplicativo. "CO₂e" significa <strong className="text-dark">Dióxido de Carbono Equivalente</strong>.
          </p>
          <p className="text-muted">
            Usamos "equivalente" porque existem vários gases de efeito estufa (como o Metano - CH₄), e cada um tem um potencial de aquecimento global diferente. O CO₂e é uma métrica universal que converte o impacto de todos esses gases para o equivalente de impacto do CO₂. Simplificando, é a "moeda" universal do carbono.
          </p>

          <hr className="my-4" />

          <h3 className="h5 mt-4 fw-semibold">2. Como Fazemos o Cálculo?</h3>
          <p className="text-muted">
            Nossa metodologia é baseada no padrão internacional usado por inventários de GEE, que é surpreendentemente direto.
          </p>

          <h4 className="h6 mt-3 fw-semibold">A Fórmula Principal</h4>
          <p className="text-muted">
            A fórmula para calcular a emissão de uma viagem é:
          </p>
          <pre className="code-block">
            Emissão Total (g) = Distância (km) × Fator de Emissão (g/km)
          </pre>
          <p className="text-muted mt-3">
            O seu resultado final é apenas este valor dividido por 1000 para ser exibido em quilogramas (kg).
          </p>

          <h4 className="h6 mt-3 fw-semibold">O que é o "Fator de Emissão (FE)"?</h4>
          <p className="text-muted">
            Este é o coração do cálculo. <strong className="text-dark">O Fator de Emissão é o "preço ambiental" de uma atividade.</strong>
          </p>
          <p className="text-muted">
            É um valor cientificamente determinado que representa quantos gramas de CO₂e são emitidos para cada quilómetro percorrido por um veículo específico.
          </p>
          <ul className="text-muted">
            <li><strong>Por que ele muda?</strong> Um SUV a gasolina emite muito mais CO₂e por quilómetro do que um carro pequeno. Da mesma forma, um carro elétrico emite menos que um híbrido.</li>
            <li><strong>De onde vêm os nossos Fatores?</strong> Nossos Fatores de Emissão são baseados em uma compilação de dados de fontes oficiais, como o <strong>IPEA</strong> (Instituto de Pesquisa Econômica Aplicada), o <strong>ICCT</strong> (Conselho Internacional de Transporte Limpo) e dados da <strong>matriz energética brasileira</strong>.</li>
          </ul>

          <h4 className="h6 mt-3 fw-semibold">O Caso Especial: Carros Elétricos e Etanol</h4>
          <ul className="text-muted">
            <li><strong>Carro Elétrico não emite zero?</strong> A emissão do <em>tubo de escape</em> é zero. Porém, o cálculo correto (chamado de "Poço-à-Roda") considera a emissão gerada para <em>produzir</em> a eletricidade que carrega o carro. Felizmente, a matriz elétrica do Brasil é uma das mais limpas do mundo (rica em hidrelétricas), então o Fator de Emissão de um carro elétrico aqui é baixíssimo, mas não é zero.</li>
            <li><strong>Etanol (Álcool):</strong> O etanol é um biocombustível. A queima em si é "neutra" (pois a cana-de-açúcar absorveu CO₂ para crescer). No entanto, consideramos as emissões do processo de produção e transporte do etanol, por isso ele também tem um Fator de Emissão (embora muito menor que o da gasolina).</li>
          </ul>

          <hr className="my-4" />

          <h3 className="h5 mt-4 fw-semibold">3. Guia Rápido: Como Cadastrar um Cálculo</h3>
          <p className="text-muted">
            Siga estes passos simples para registar a sua viagem:
          </p>
          <ol className="text-muted">
            <li>No menu, clique em <strong>"Calcular Emissão"</strong>.</li>
            <li><strong>Informe a Distância (km):</strong> Insira a distância total que você percorreu ou percorrerá.</li>
            <li><strong>Selecione o Meio de Transporte:</strong> Escolha da lista (Carro, Moto, Ônibus, etc.).</li>
            <li><strong>Se for Carro...:</strong> O formulário mostrará opções adicionais. Selecione o <strong>Combustível</strong> (Gasolina, Álcool, Elétrico...) e o <strong>Tipo do Carro</strong> (Pequeno, Médio, SUV). Estes campos são vitais para que possamos usar o Fator de Emissão correto.</li>
            <li><strong>Clique em "Calcular Emissão".</strong></li>
            <li>Pronto! O seu resultado aparecerá num modal e a viagem será automaticamente guardada no seu <strong>"Histórico de Viagens"</strong>.</li>
          </ol>

          <hr className="my-4" />

          <h3 className="h5 mt-4 fw-semibold">4. Explicando as Métricas</h3>
          <ul className="text-muted">
            <li><strong>Total de Emissão (Dashboard):</strong> É a soma simples de todas as emissões de todas as viagens que você registou no seu Histórico.</li>
            <li><strong>Veículo Mais Poluente (Dashboard):</strong> Analisamos o seu histórico e agrupamos as emissões por tipo de transporte. Este card mostra qual transporte foi o maior responsável pela sua pegada de carbono.</li>
            <li><strong>Meta de Emissão (Relatório):</strong> Um objetivo que você pode definir para si mesmo, para tentar reduzir suas emissões mês a mês.</li>
            <li><strong>Relatório Semanal:</strong> Uma visão comparativa do seu desempenho. Ele soma suas emissões do Domingo até o dia atual e compara com o mesmo período da semana anterior.</li>
            <li><strong>Viagens Limpas (Relatório):</strong> Um incentivo! Contamos quantas vezes você escolheu andar <strong>A Pé</strong> ou de <strong>Bicicleta</strong>, que têm um Fator de Emissão zero.</li>
          </ul>

        </div>
      </div>
    </div>
  );
}

