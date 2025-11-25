# 🌳 Green Track: Calculadora de Emissão de Carbono
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

## ⚙️ Como Rodar o Projeto Localmente (Guia de Instalação)<br>
Para rodar este projeto em modo de desenvolvimento, você precisará configurar o Backend (API) e o Frontend (React) separadamente.
<br><br>
Pré-requisitos
- Node.js 
- Visual Studio 2022 (Durante a instalação, marque "Desenvolvimento ASP.NET e Web".)
- .NET SDK (Versão 8)
- SQL Server Express 2022 (Banco de dados).
- SSMS (SQL Server Management Studio) (Caso queira gerenciar o banco de dados).

## Configuração do Backend (API .NET)

Clone o repositório:

git clone https://github.com/lucascontee/green-track.git



Abra o Backend:

1. Navegue até a pasta do backend (Calculadora_CO2.API).

2. Abra o arquivo da solução (.sln) com o Visual Studio 2022.

3. Configure o Banco de Dados (SQL Server):

4. Este projeto espera uma conexão com um SQL Server. O erro error: 26 é comum se o servidor não for encontrado.

5. Verifique se seu SQL Server Express está rodando:

6. Pressione Win+R, digite services.msc.

7. Garanta que os serviços SQL Server (ex: SQLEXPRESS01) e (SQL Server Browser) estejam "Em Execução".

8. Habilite o TCP/IP -> Pressione Win+R, digite C:\Windows\SysWOW64\SQLServerManager16.msc (para SQL 2022) e pressione Enter.

9. Vá para Configuração de Rede do SQL Server -> Protocolos para SUA_INSTANCIA.

10. Clique com o botão direito em TCP/IP e selecione "Habilitar".

11. Volte ao services.msc e reinicie o serviço SQL Server (SUA_INSTANCIA).

12. Atualize a String de Conexão: Abra o arquivo appsettings.json na raiz do projeto da APIe modifique a variável ConnectionStrings no arquivo appsettings.Development.json <br>
"ConnectionStrings": {
  "DefaultConnection": "Server=SEU_COMPUTADOR\\SUA_INSTANCIA;Database=GreenTrackDB;Trusted_Connection=True;TrustServerCertificate=True;"
}

13. No Visual Studio, vá em Ferramentas -> Gerenciador de Pacotes do NuGet -> Console do Gerenciador de Pacotes. Execute o comando: "Update-Database" - para criar o banco de dados e suas tabelas

14. Rode a API -> Pressione F5 (ou o botão "Play") no Visual Studio. A API deve iniciar (ex: https://localhost:7036). <br>

## Configuração do Frontend (React)

1. Navegue até a pasta do seu frontend (Calculadora_CO2).

2. Instale as dependências com o comando "npm install" no console

3. Rode o Cliente React: npm run dev

Abra a Aplicação: O terminal mostrará o endereço local (ex: http://localhost:5173). Abra-o no seu navegador.
