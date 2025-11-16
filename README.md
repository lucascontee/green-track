# 🚀 Green Track: Calculadora de Emissão de Carbono
- O Green Track é uma aplicação web full-stack projetada para ajudar usuários a calcular, monitorar e gerenciar sua pegada de carbono, com foco principal nas emissões geradas por transportes.
- O projeto é construído com uma arquitetura moderna, dividida em:
- Backend API: Uma API RESTful robusta criada com .NET (C#) e Entity Framework Core.
- Frontend SPA: Um cliente web dinâmico e responsivo criado com React e TypeScript.
  <br>

## ✨ Funcionalidades Principais
- Cálculo Detalhado: Calcule a emissão de CO₂ para diferentes tipos de veículos (Carro, Moto, Caminhão), especificando tamanho (Pequeno, Médio, Grande) e tipo de combustível.
- Histórico de Viagens: Todas as viagens calculadas são salvas no banco de dados. O usuário pode visualizar, filtrar e excluir registros do seu histórico.
- Dashboard (Home): Uma página inicial que resume os dados mais importantes:
- Emissão total de todos os tempos.
- Emissão total do mês atual.
- Veículo que mais emitiu.
- Contagem de viagens "limpas" (emissão zero).
- Detalhes da última viagem realizada.
- Metas Mensais: O usuário pode definir uma meta global de emissão mensal (em kg de CO₂) e acompanhar seu progresso através de um gráfico de barras.
- Relatório Semanal: Uma página dedicada para analisar as emissões da semana atual em comparação com a semana anterior.
- Notificações (Header): Um popover no cabeçalho exibe um resumo rápido das emissões da semana atual vs. semana anterior.

## 💻 Tecnologias Utilizadas
Este projeto utiliza uma arquitetura moderna e robusta, separando claramente as responsabilidades do backend e do frontend.
- Backend (API)
- C# e .NET 8 (ou 6/7/8)
- ASP.NET Core Web API (para a arquitetura RESTful)
- Entity Framework Core (EF Core) (para o ORM e comunicação com o banco)
- SQL Server (Banco de dados relacional para persistência)
- Frontend (Cliente)
- React 18
- TypeScript
- Bootstrap 
- CSS
