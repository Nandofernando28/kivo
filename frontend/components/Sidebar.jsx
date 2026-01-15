import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import HamburgerIcon from './icons/HamburgerIcon';
import './Sidebar.css';

// Exportamos el estado y toggle para que otros componentes puedan usarlo
export function useSidebarState() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return { isOpen, setIsOpen, toggleSidebar };
}

function Sidebar({ isOpen, toggleSidebar }) {
  // Cerrar sidebar en móvil al navegar
  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Overlay para cerrar sidebar en mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => window.innerWidth <= 768 && toggleSidebar()}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Logo con botón toggle al lado */}
        <div className="sidebar-logo">
          <button 
            className="sidebar-toggle-inside"
            onClick={toggleSidebar}
            aria-label="Cerrar menú"
          >
            <HamburgerIcon />
          </button>
          <span className="sidebar-brand">Kivo</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            onClick={closeSidebarOnMobile}
            end
          >
            <svg fill="currentColor" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M14.172 7.878 8 2.52 1.828 7.878l-.656-.756 6.5-5.641h.656l6.5 5.641-.656.756Z"></path><path fillRule="evenodd" d="M4 8.101V13h2.125V9.759l.5-.5h2.75l.5.5V13H12V8.101h1V13.5l-.5.5h-9l-.5-.5V8.101h1ZM8.875 13h-1.75v-2.741h1.75V13Z"></path></svg>
            <span>Home</span>
          </NavLink>

          {/* Aquí puedes agregar más navegación según el PRD */}
          {/* Ejemplo: Materias, Calendario, etc. */}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {/* Espacio para login/usuario futuro */}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
