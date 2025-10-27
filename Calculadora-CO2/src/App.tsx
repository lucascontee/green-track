import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import { MainLayout } from './Layouts/MainLayout'
import { CreateCalculation } from './Pages/CreateCalculation/CreateCalculation'
import { HistoryPage } from './Pages/HistoryPage/HistoryPage'
import { GoalPage } from './Pages/GoalPage/GoalPage'



function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        
        <Route path="home" element={<Home />} />
        <Route path="calcular" element={<CreateCalculation />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="goal" element={<GoalPage />} />


      </Route>
    </Routes>
  )
}

export default App
