// src/App.tsx
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BackButton from "./components/BackButton/BackButton";
import ListaEsperaModal from "./components/ListaEsperaModal/ListaEsperaModal";
import "./index.css";

const App: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [isListaEsperaModalOpen, setIsListaEsperaModalOpen] = useState(false);

  return (
    <div className="app">
      <Header />
      {!isHome && <BackButton />}
      <Outlet context={{ setIsListaEsperaModalOpen }} />
      <Footer />
      <ListaEsperaModal
        isOpen={isListaEsperaModalOpen}
        onClose={() => setIsListaEsperaModalOpen(false)}
      />
    </div>
  );
};

export default App;
