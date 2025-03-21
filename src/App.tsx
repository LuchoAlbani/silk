import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./App.module.css";  
import Header from "./components/Header/Header"; 
import Footer from "./components/Footer/Footer"; 
import Banner from "./components/Banner/Banner";
import Section from "./components/Section/Section";
import Blog from "./components/Blog/Blog";
import Quiz from "./components/Quiz/Quiz";

const App: React.FC = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className={styles.app}>
      <Header />  
      {isHome && (  // Solo muestra estos componentes en la página de inicio
        <>
          <Banner />
          <Quiz />
          <Section />
          <Blog />
        </>
      )}
      <Outlet /> {/* Aquí se renderizan las demás rutas como "Servicios", "Bloggers", etc. */}
      <Footer /> 
    </div>
  );
};

export default App;
