import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";  
import Header from "./components/Header/Header"; 
import Footer from "./components/Footer/Footer"; 
import Banner from "./components/Banner/Banner";
import Section from "./components/Section/Section";
import Blog from "./components/Blog/Blog";
import Quiz from "./components/Quiz/Quiz";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header />  
      <Banner />
      <Quiz />
      <Section />
      <Blog />
      <Outlet /> {/* Renderiza las rutas anidadas como Bloggers y BloggerDetail */}
      <Footer /> 
    </div>
  );
};

export default App;
