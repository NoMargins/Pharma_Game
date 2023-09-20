import React from "react";
import './healper-box.scss';

const Healper = ({isPapirusVisible, closePapirus}) => {
    return (
        <div className={`healper-box_papirus ${isPapirusVisible ? 'visible' : 'unvisible'}`}>
        <div className='healper-box_papirus__text'>
          <img src='https://nezalezhnist.8.co.ua/img/question.png' alt='healper-img' />
          <p>
          Натисніть на назву інгредієнта, контур його поля має змінитись на зелений.
 </p>
 <p>Після цього натисніть на порожнє поле поруч із вибраним інгредієнтом.</p>
          <p>
          Ви також можете переглянути збільшене зображення інгредієнта, клікнувши на нього.
          </p>
          <button className='healper-box_papirus__close-btn' onClick={(e) => closePapirus(e)}>X</button>
        </div>
        </div>
    )
}

export default Healper;