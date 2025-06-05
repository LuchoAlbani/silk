import React, { useState } from "react";
import Banner from "./components/Banner/Banner";
import Quiz from "./components/Quiz/Quiz";
import Section from "./components/Section/Section";
import Blog from "./components/Blog/Blog";
import Modal from "./components/Modal/Modal";


const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Banner onOpenModal={() => setIsModalOpen(true)} />
      <Quiz />
      <Section />
      <Blog />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Home;
