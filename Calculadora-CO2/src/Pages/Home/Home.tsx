import React from 'react';
import { MainCard } from '../../Components/MainCard/MainCard'
import { MoreEmissionCard } from '../../Components/MoreEmissionCard/MoreEmissionCard'
import { Sidebar } from '../../Components/Sidebar/Sidebar'
import { Header } from '../../Components/Header/Header';
import { InfoCard } from '../../Components/InfoCard/InfoCard';
import { HelpCard } from '../../Components/HelpCard/HelpCard';

function Home() {

  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
    
      <div className='d-flex flex-grow-1'>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="m-5 d-flex flex-column main-content flex-grow-1">
          <div>
          </div>
          <div className='flex-fill d-flex justify-content-center gap-4'>
            <MainCard totalEmissions={124} />
            <MoreEmissionCard transportMode={'Carro a gasolina'} emissions={53} />
          </div>
        <InfoCard />
        <HelpCard/>
        </div>
      </div>
    </div>
  )
}

export default Home
