import React from "react";
import './taskCompleted.scss';

const TaskCompleted = ({onContinue}) => {
    return(
        <div className="completion-popup">
         <div className="completion-popup__text">
          <p>
          Блискуче!
          </p>
          <p>Тепер, коли ви впорядкували всі інгредієнти, прийшов час відтворити формулу здоров’я. </p>
          <p>Додавайте інгредієнти відповідно до рецепту – і отримаєте бажаний результат!</p>
        <button onClick={onContinue}>⯈⯈⯈</button>
        </div>
        </div>
        )
}

export default TaskCompleted;