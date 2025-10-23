import React from "react";
import { FaCalculator } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";

import "./Header.css"

export function Header(){
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
      const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

    return(
        <header className="app-header">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between py-3">
                <div className="d-flex gap-3 sidebar-header">
                    <div className="d-flex align-items-center gap-3">
                        <AiOutlineMenu size={24} />
                        <div>
                        <h2 className="h6 mb-0 fw-semibold">EcoCalc</h2>
                        <p className="small text-muted-green mb-0">Calculadora de Carbono</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <button 
                        className="btn btn-link text-dark p-0 border-0"
                        onClick={toggleSidebar}
                        >
                        </button>
                    </div>
                </div>
              <button className="text-white btn btn-primary-green d-none d-sm-flex align-items-center gap-2 shadow">
                <FaCalculator size={20} />
                Calcular Emissão
              </button>
            </div>
          </div>
        </header>
    )
}