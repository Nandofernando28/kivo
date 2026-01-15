import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy loading para código splitting
const Home = lazy(() => import('./pages/Home'));

// Loader consistente con el diseño
const Loader = () => (
  <div className="route-loader">
    <LoadingSpinner size="lg" text="Cargando..." />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Rutas con Layout Persistente */}
        <Route element={<Layout />}>
          {/* Home */}
          <Route path="/" element={<Home />} />
          
          {/* Aquí puedes agregar más rutas según el PRD */}
          {/* Ejemplo: */}
          {/* <Route path="/materias" element={<Materias />} /> */}
          {/* <Route path="/calendario" element={<Calendario />} /> */}
          
          {/* Fallback - redirigir a inicio */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
