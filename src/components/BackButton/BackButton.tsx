import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./BackButton.module.css";
import { ArrowLeft } from "lucide-react";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      <ArrowLeft size={20} color="white" />
    </button>
  );
};

export default BackButton;
