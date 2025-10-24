import { FaHome, FaCalculator, FaCar, FaHistory } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";

import "./Sidebar.css"


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Página principal",
    icon: FaHome,
    url: "#home"
  },
  {
    title: "Calcular emissão",
    icon: FaCalculator,
    url: "#calcular",
  },
  {
    title: "Cadastrar veículo",
    icon: FaCar,
    url: "#cadastrar",
  },
  {
    title: "Histórico de viagens",
    icon: FaHistory,
    url: "#historico",
  },
  {
    title: "Como usar?",
    icon: FiHelpCircle,
    url: "#ajuda",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div 
          className="sidebar-backdrop d-md-none" 
          onClick={onClose}
        />
      )}
      
      <div className={`sidebar ${isOpen ? 'show' : ''}`}>
        
        
        <div className="sidebar-content">

          <ul className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="sidebar-menu-item">
                  <a href={item.url} 
                      className="sidebar-menu-link"
                      onClick={onClose}>
                    <Icon size={20} />
                    <span>{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
