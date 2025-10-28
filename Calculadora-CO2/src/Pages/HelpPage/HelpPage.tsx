import { 
  FiBookOpen, 
  FiAlertCircle, 
  FiZap 
} from "react-icons/fi";

import { 
  FaCalculator, 
  FaChartBar
} from "react-icons/fa";

import { 
  LuSparkles 
} from "react-icons/lu";

import "./HelpPage.css"

export function HelpPage() {
  return (
    <div className="container-fluid py-4 main-div">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="mb-4">
            <p className="text-muted mb-0">
              Aprenda a usar a calculadora e entenda os conceitos de emissão de carbono
            </p>
          </div>

          <div className="card mb-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div>
                  <FiBookOpen size={24} />
                </div>
                <div>
                  <h5 className="mb-0">1. Conceitos-Chave</h5>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="mb-2">O que é "Pegada de Carbono"?</h6>
                <p className="text-muted mb-0">
                  É a quantidade total de gases de efeito estufa (GEE) que uma pessoa, organização ou produto 
                  emite, direta ou indiretamente. No nosso caso, calculamos a pegada de carbono das suas viagens.
                </p>
              </div>

              <div className="alert alert-info d-flex align-items-start gap-2 mb-0">
                <FiAlertCircle size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <h6 className="mb-2">O que significa "kg CO₂e"?</h6>
                  <p className="small mb-2">
                    Você verá esta medida em todo o aplicativo. <strong>"CO₂e"</strong> significa <strong>Dióxido de 
                    Carbono Equivalente</strong>.
                  </p>
                  <p className="small mb-2">
                    Usamos "equivalente" porque existem vários gases de efeito estufa (como o Metano - CH₄), 
                    e cada um tem um potencial de aquecimento global diferente. O CO₂e é uma métrica universal 
                    que converte o impacto <br/> de todos esses gases para o equivalente de impacto do CO₂.
                  </p>
                  <p className="small mb-0">
                    Simplificando, é a <strong>"moeda" universal do carbono</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div>
                  <FaCalculator size={24} />
                </div>
                <div>
                  <h5 className="mb-0">2. Como Fazemos o Cálculo?</h5>
                  <p className="text-muted small mb-0">
                    Nossa metodologia é baseada no padrão internacional usado por inventários de GEE
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="mb-3">A Fórmula Principal</h6>
                <p className="text-muted mb-2">
                  A fórmula para calcular a emissão de uma viagem é:
                </p>
                <div className="bg-eco-green-lighter border rounded p-3 mb-2">
                  <code className="formula-text-eco-green d-block text-center">
                    <strong>Emissão Total (g) = Distância (km) × Fator de Emissão (g/km)</strong>
                  </code>
                </div>
                <p className="text-muted small mb-0">
                  O seu resultado final é apenas este valor dividido por 1000 para ser exibido em quilogramas (kg).
                </p>
              </div>

              <div className="mb-4">
                <h6 className="mb-2">O que é o "Fator de Emissão (FE)"?</h6>
                <p className="text-muted mb-2">
                  Este é o <strong>coração do cálculo</strong>. O Fator de Emissão é o "preço ambiental" de uma atividade.
                </p>
                <p className="text-muted mb-3">
                  É um valor cientificamente determinado que representa quantos gramas de CO₂e são emitidos para 
                  cada quilômetro percorrido por um veículo específico.
                </p>
                
                <div className="bg-light border rounded p-3 mb-3">
                  <p className="small mb-2"><strong>Por que ele muda?</strong></p>
                  <p className="small text-muted mb-0">
                    Um SUV a gasolina emite muito mais CO₂e por quilômetro do que um carro pequeno. 
                    Da mesma forma, um carro elétrico emite menos que um híbrido.
                  </p>
                </div>

                <div className="bg-light border rounded p-3">
                  <p className="small mb-2"><strong>De onde vêm os nossos Fatores?</strong></p>
                  <p className="small text-muted mb-0">
                    Nossos Fatores de Emissão são baseados em uma compilação de dados de fontes oficiais, 
                    como o <strong>IPEA</strong> (Instituto de Pesquisa Econômica Aplicada), 
                    o <strong>ICCT</strong> (Conselho Internacional de Transporte Limpo) e dados <br/> da matriz energética brasileira.
                  </p>
                </div>
              </div>

              <div className="border rounded p-4 bg-eco-green-lighter">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <LuSparkles className="text-eco-green" size={20} />
                  <h6 className="mb-0">O Caso Especial: Carros Elétricos e Etanol</h6>
                </div>

                <div className="mb-3">
                  <p className="small mb-2">
                    <strong>Carro Elétrico não emite zero?</strong>
                  </p>
                  <p className="small text-muted mb-0">
                    A emissão do tubo de escape é zero. Porém, o cálculo correto (chamado de "Poço-à-Roda") 
                    considera a emissão gerada para produzir a eletricidade que carrega o carro. 
                    Felizmente, a matriz elétrica do Brasil <br/> é uma das mais limpas do mundo (rica em hidrelétricas), 
                    então o Fator de Emissão de um carro elétrico aqui é baixíssimo, mas não é zero.
                  </p>
                </div>

                <div>
                  <p className="small mb-2">
                    <strong>Etanol (Álcool):</strong>
                  </p>
                  <p className="small text-muted mb-0">
                    O etanol é um biocombustível. A queima em si é "neutra" (pois a cana-de-açúcar absorveu CO₂ 
                    para crescer). No entanto, consideramos as emissões do processo de produção e transporte do etanol, 
                    por isso ele <br/> também tem um Fator de Emissão (embora muito menor que o da gasolina).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Quick Guide */}
          <div className="card mb-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div>
                  <FiZap size={24} />
                </div>
                <div>
                  <h5 className="mb-0">3. Guia Rápido: Como Cadastrar um Cálculo</h5>
                  <p className="text-muted small mb-0">
                    Siga estes passos simples para registrar a sua viagem
                  </p>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-eco-green text-white">1</span>
                      <p className="small mb-0">No menu, clique em <strong>"Calcular Emissão"</strong>.</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-eco-green text-white">2</span>
                      <p className="small mb-0"><strong>Informe a Distância (km):</strong> Insira a distância total que você percorreu ou percorrerá.</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-eco-green text-white">3</span>
                      <p className="small mb-0"><strong>Selecione o Meio de Transporte:</strong> Escolha da lista (Carro, Moto, Ônibus, etc.).</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-eco-green text-white">4</span>
                      <p className="small mb-0"><strong>Se for Carro...</strong> Selecione o Combustível e o Tipo do Carro. Estes campos são vitais!</p>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="bg-eco-green text-white rounded p-3 text-center">
                    <p className="mb-0">
                      <strong>5. Clique em "Calcular Emissão".</strong> Pronto! O resultado aparecerá e a viagem será salva automaticamente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div>
                  <FaChartBar size={24} />
                </div>
                <div>
                  <h5 className="mb-0">4. Explicando as Métricas</h5>
                </div>
              </div>

              <div className="border-bottom pb-3 mb-3">
                <h6 className="mb-2">Total de Emissão (Dashboard)</h6>
                <p className="text-muted small mb-0">
                  É a soma simples de todas as emissões de todas as viagens que você registrou no seu Histórico.
                </p>
              </div>

              <div className="border-bottom pb-3 mb-3">
                <h6 className="mb-2">Veículo Mais Poluente (Dashboard)</h6>
                <p className="text-muted small mb-0">
                  Analisamos o seu histórico e agrupamos as emissões por tipo de transporte. 
                  Este card mostra qual transporte foi o maior responsável pela sua pegada de carbono.
                </p>
              </div>

              <div className="border-bottom pb-3 mb-3">
                <h6 className="mb-2">Meta de Emissão</h6>
                <p className="text-muted small mb-0">
                  Um objetivo que você pode definir para si mesmo, para tentar reduzir suas emissões mês a mês.
                </p>
              </div>

              <div className="border-bottom pb-3 mb-3">
                <h6 className="mb-2">Relatório Semanal</h6>
                <p className="text-muted small mb-0">
                  Uma visão comparativa do seu desempenho. Ele soma suas emissões do Domingo até o dia atual 
                  e compara com o mesmo período da semana anterior.
                </p>
              </div>

              <div className="mb-0">
                <h6 className="mb-2">Viagens Limpas</h6>
                <p className="text-muted small mb-0">
                  Um incentivo! Contamos quantas vezes você escolheu andar <strong>A Pé</strong> ou de <strong>Bicicleta</strong>, 
                  que têm um Fator de Emissão zero.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-eco-green-lighter border rounded p-4">
            <h6 className="mb-2">Dica Final</h6>
            <p className="text-muted small mb-0">
              Cada pequena ação conta! Use o aplicativo regularmente para monitorar seus hábitos e 
              identificar oportunidades de reduzir sua pegada de carbono. Lembre-se: o futuro do planeta  <br/>
              começa com as escolhas que fazemos hoje.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
