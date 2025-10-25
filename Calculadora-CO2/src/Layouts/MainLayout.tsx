import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../Components/Header/Header';
import { Sidebar } from '../Components/Sidebar/Sidebar';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className='d-flex flex-grow-1'>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="main-content flex-grow-1 d-flex flex-column">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}