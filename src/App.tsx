// src/App.tsx
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Banner from "./components/Banner/Banner";
import Section from "./components/Section/Section";
import Blog from "./components/Blog/Blog";
import Quiz from "./components/Quiz/Quiz";
import Modal from "./components/Modal/Modal"; // Tu modal existente
import BackButton from "./components/BackButton/BackButton";
import ListaEsperaModal from "./components/ListaEsperaModal/ListaEsperaModal"; 
import "./index.css";

const App: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isListaEsperaModalOpen, setIsListaEsperaModalOpen] = useState(false); // <--- NUEVO

  return (
    <div className="app">
      <Header />
      {!isHome && <BackButton />}

      {isHome && (
        <>
          <Banner onOpenModal={() => setIsModalOpen(true)} />
          <Quiz />
          <Section />
          <Blog />
        </>
      )}
      <Outlet context={{ setIsListaEsperaModalOpen }} /> {/* <--- Pasa el setter a las rutas hijas */}
      <Footer />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Renderiza el nuevo modal de Lista de Espera */}
      <ListaEsperaModal
        isOpen={isListaEsperaModalOpen}
        onClose={() => setIsListaEsperaModalOpen(false)}
      />
    </div>
  );
};

export default App;