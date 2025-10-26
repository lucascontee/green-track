import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import { MainLayout } from './Layouts/MainLayout'
import { CreateCalculation } from './Pages/CreateCalculation/CreateCalculation'
import { HistoryPage } from './Pages/HistoryPage/HistoryPage'



function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        
        <Route path="home" element={<Home />} />
        <Route path="calcular" element={<CreateCalculation />} />
        <Route path="history" element={<HistoryPage />} />

      </Route>
    </Routes>
  )
}

export default App
