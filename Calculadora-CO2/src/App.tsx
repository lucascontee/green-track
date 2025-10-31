import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import { MainLayout } from './Layouts/MainLayout'
import { CreateCalculation } from './Pages/CreateCalculation/CreateCalculation'
import { HistoryPage } from './Pages/HistoryPage/HistoryPage'
import { GoalPage } from './Pages/GoalPage/GoalPage'
import { RankingPage } from './Pages/RankingPage/RankingPage'
import { WeeklyReport } from './Pages/WeeklyReport/WeeklyReport'
import { HelpPage } from './Pages/HelpPage/HelpPage'



function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        
        <Route path="" element={<Home />} />
        <Route path="calculate" element={<CreateCalculation />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="goal" element={<GoalPage />} />
        <Route path="ranking" element={<RankingPage />} />
        <Route path="report" element={<WeeklyReport />} />
        <Route path="help" element={<HelpPage />} />

      </Route>
    </Routes>
  )
}

export default App
