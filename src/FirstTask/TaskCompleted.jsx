import React from "react";
import './taskCompleted.scss';

const TaskCompleted = ({onContinue}) => {
    return(
        <div className="completion-popup">
         <div className="completion-popup__text">
          <p>
          Чудово! Тепер ви знаєте всі назви інгредієнтів. 
          </p>
          <p>
            Пора уважно ознайомитись з рецептом та відтворити Формулу Здоров'я! 
          </p>
          <button className="completion-popup__arrow" onClick={onContinue} style={{'top': '85%'}}>
              Далі
            </button>
        </div>
        </div>
        )
}

export default TaskCompleted;