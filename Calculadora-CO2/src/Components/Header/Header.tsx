import { FaCalculator, FaRegBell } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import "./Header.css"

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps){

    const navigate = useNavigate();
    const handleNavigateToHelp = () => {
        navigate('/calculate'); 
    };

    return(
        <header className="app-header">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between py-3">
                <div className="ms-2 d-flex gap-3">
                    <div className="d-flex align-items-center gap-3">
                        <button 
                        className="btn btn-link text-dark p-0 border-0"
                        onClick={onToggleSidebar}
                        >
                        <AiOutlineMenu size={24} />
                        </button>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div>
                        <h2 className="h6 mb-0 fw-semibold">Green Track</h2>
                        <p className="small text-muted-green mb-0">Calculadora de Carbono</p>
                        </div>
                    </div>
                </div>
              <div className="d-flex me-4 gap-4 align-items-center">
                <button className=" text-white btn btn-primary-green d-none d-sm-flex align-items-center gap-2 shadow" onClick={handleNavigateToHelp} >
                  <FaCalculator size={20} />
                  Calcular Emissão
                </button>
                <div>
                  <FaRegBell size={24} className="bell"/>
                </div>
              </div>
            </div>
          </div>
        </header>
    )
}