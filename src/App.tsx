import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header"; 
import Footer from "./components/Footer/Footer"; 
import Banner from "./components/Banner/Banner";
import Section from "./components/Section/Section";
import Blog from "./components/Blog/Blog";
import Quiz from "./components/Quiz/Quiz";
import Modal from "./components/Modal/Modal"; // Importamos el Modal
import "./index.css";

const App: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  
  // Estado del Modal para que sea global
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app"> {/* Usa una clase global en index.css */}
      <Header />  
      {isHome && ( 
        <>
          <Banner onOpenModal={() => setIsModalOpen(true)} /> {/* Pasamos la función */}
          <Quiz />
          <Section />
          <Blog />
        </>
      )}
      <Outlet /> 
      <Footer /> 
      
      {/* Modal fuera del Banner para que cubra toda la página */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
