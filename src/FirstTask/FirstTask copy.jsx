




import React, { useState, useEffect } from 'react';
import Element from './Element';
import {elements} from './elements.js';

import './firstTask.scss';

const FirstTask = ({ onContinue}) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const handlePotionClick = (url) => {
    setImgUrl(url);
    setIsVisible(true);
}

const zoomClass = `first-task-desc_container__zoom ${isVisible ? 'visible' : 'unvisible'}`;

const allTitles = ['Океан любові', 'Крила легкості', 'Cяйво оптимізму', 'Пилок мудрості', 'Нектар енергії', 'Есенція гармонії']
  
return (
    <div className="first-task-desc_container">
        <div className={`first-task-desc_container__overlay ${isVisible ? 'visible' : 'unvisible'}`}></div>
      <div className='together'>
      <ul className='first-task-desc_container__list'>
      {elements.map(elem => {
       return <Element key={elem.id} id={elem.id} title={elem.title} url={elem.url} onClick={() => handlePotionClick(elem.url)}/>
      })}
      </ul>
 
    <div className='titles'>
      {allTitles.map(el => {
        return <div className='title'>{el}</div>
      })}
    </div>
    </div>
    <div className={zoomClass}>
      <img src={imgUrl} alt="img-zoomed" />
      <button className='close-btn' onClick={(e) => {
    e.stopPropagation();
    setIsVisible(false);
}}>X</button>
    </div>
    </div>
  );
};


export default FirstTask;