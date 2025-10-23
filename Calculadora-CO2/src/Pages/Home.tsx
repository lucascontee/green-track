import React from 'react';
import { MainCard } from '../Components/MainCard/MainCard'
import { MoreEmissionCard } from '../Components/MoreEmissionCard/MoreEmissionCard'
import { Sidebar } from '../Components/Sidebar/Sidebar'
import { Header } from '../Components/Header/Header';

function App() {

  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen)
  // }

  return (
    <div>
      <Header/>
      <div className='d-flex'>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="main-content flex-grow-1">
          <div className='flex-fill d-flex justify-content-center gap-4 m-4'>
            <MainCard totalEmissions={124} />
            <MoreEmissionCard transportMode={'Carro a gasolina'} emissions={53} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
