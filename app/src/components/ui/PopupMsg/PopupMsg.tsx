import React, { useState, useEffect } from "react";
import styles from "./PopupMsg.module.scss";

interface PopupMsgProps {
  message: string;
  duration: number; // Duración en milisegundos
  showPopup: boolean; // Nuevo prop para controlar la visibilidad del popup
}

const PopupMsg: React.FC<PopupMsgProps> = ({
  message,
  duration,
  showPopup,
}) => {
  const [isVisible, setIsVisible] = useState(false); // Inicialmente oculto

  useEffect(() => {
    if (showPopup) {
      setIsVisible(true); // Mostrar el popup cuando showPopup es verdadero
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showPopup, duration]);

  return (
    <div className={isVisible ? styles.popupVisible : styles.popupHidden}>
      {message}
    </div>
  );
};

export default PopupMsg;
