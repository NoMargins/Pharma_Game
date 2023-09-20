import React, { useState } from 'react';
import './portionPopup.scss';

const PortionPopup = ({ clickedIngrName, onSubmit, onClose }) => {
  const [portion, setPortion] = useState(1);

  const handleIncrement = () => {
    setPortion(portion + 1);
  };

  const handleDecrement = () => {
    if (portion > 1) {
      setPortion(portion - 1);
    }
  };

  return (
    <div className="portion-popup">
      <div className="portion-popup-content">
        <h2>Скільки порцій {clickedIngrName} бажаєте додати?</h2> {/* Використовуємо ім'я інгредієнту тут */}
        <div className="portion-controls">
          <button onClick={handleDecrement}>←</button>
          <span>{portion}</span>
          <button onClick={handleIncrement}>→</button>
        </div>
        <div className="portion-buttons">
          {/* Передаємо ім'я інгредієнту та кількість у колбек */}
          <button onClick={() => onSubmit(portion)}>Підтвердити</button>
          <button onClick={onClose}>Закрити</button>
        </div>
      </div>
    </div>
  );
};

export default PortionPopup;
