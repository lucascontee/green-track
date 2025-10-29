const fatoresEmissao = {
  trem: 19,                          // g CO₂ / passageiro-km
  aviao: 123,                        // g CO₂ / passageiro-km
  carro_pequeno_medio: 148,          // g CO₂ / passageiro-km
  bicicleta: 0,                      // g CO₂ / km
  bicicleta_eletrica: 22,            // g CO₂ / passageiro-km
  navio_cargueiro: 1.3 * 10 ** 3,    // 1,3 * 10³ g CO₂ / tonelada-km
  onibus_urbano_diesel: 0.24 * 1000, // 0.24 kg → 240 g CO₂ / tonelada-km
  onibus_rodoviario_diesel: 0.15 * 1000 // 0.15 kg → 150 g CO₂ / tonelada-km
};

// FUNÇÃO PRINCIPAL DE CÁLCULO
function calcularEmissao(tipoTransporte, distanciaKm, passageiros = 1, cargaToneladas = 1) {
  if (distanciaKm <= 0) {
    return "Erro: a distância deve ser maior que zero.";
  }

  const fator = fatoresEmissao[tipoTransporte];

  if (fator === undefined) {
    return "Erro: tipo de transporte inválido.";
  }

  let emissaoTotal;

  // Verifica se o transporte é de carga (usa tonelada-km)
  if (tipoTransporte === "navio_cargueiro" || 
      tipoTransporte === "onibus_urbano_diesel" || 
      tipoTransporte === "onibus_rodoviario_diesel") {
    emissaoTotal = distanciaKm * cargaToneladas * fator;
  } else {
    emissaoTotal = distanciaKm * passageiros * fator;
  }

  // Converte para kg e retorna os resultados formatados
  const emissaoKg = emissaoTotal / 1000;

  return {
    transporte: tipoTransporte,
    distancia_km: distanciaKm,
    emissao_g: emissaoTotal.toFixed(2),
    emissao_kg: emissaoKg.toFixed(3),
    unidade: "CO2"
  };
}
             
