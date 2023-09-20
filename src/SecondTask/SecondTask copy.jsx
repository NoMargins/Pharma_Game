import React, { useState, useEffect } from 'react';
import { useSecondTaskLogic } from './useSecondTaskLogic';
import { useDrag, useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';
import { elements } from './elements.js';
import Healper from './Helper.jsx';
import PortionPopup from './PortionPopup.jsx';
import DraggableElement from './DraggableElement.jsx';
import './secondTask.scss';
import { recipe } from './receipt.js';

const SecondTask = ({ onContinue }) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsPapirusVisible(true);
  //   }, 3000);
  //   return () => clearTimeout(timer); // Очищення таймеру при розмонтуванні компонента
  // }, []);

  const {
    isPapirusVisible,
    isPopupVisible,
    currentIngredient,
    ingredients,
    currentElements,
    drop,
    handleQuestionClick,
    closePapirus,
    handleClear,
    handleTaste,
    setCurrentIngredient,
    setIsPopupVisible,
    setIngredients,
    handlePopupSubmit,
    setCurrentIngredId,
    clickedIngrName,
    setClickedIngrName
} = useSecondTaskLogic();

  return (
      <div className="second-task_container">
        <div className='together'>
        <div className="pot" ref={drop}>
            <div className='imgButton'>
            <img src="https://nezalezhnist.8.co.ua/img/pot.png" />
            <div className='buttons'>
            <button className={`taste ${currentElements.length === 0 ? 'pulse' : ''}`} onClick={() => handleTaste}>Зготувати!</button>
            <button className='clear' onClick={handleClear}>Очистити</button>
            </div>
            </div>
          </div>
          <ul className='second-task_container__list'>
          {currentElements.map((elem, index) => (
          <DraggableElement setClickedIngrName={setClickedIngrName} elem={elem} key={elem.id} />))}
          </ul>
       
        </div>
        {/* <div className="progress-bar">
        <div className="progress-fill" style={{width: `${progressValue}%`}}></div>
        </div> */}
        <div className='healper' onClick={handleQuestionClick}>
          <img src='https://nezalezhnist.8.co.ua/img/question.png' alt='healper-img' />
        </div>
        
        <div className={`overlay ${isPapirusVisible ? 'visible' : ''}`}></div>
       {isPapirusVisible && <Healper isPapirusVisible={isPapirusVisible} closePapirus={closePapirus}/>}
       {isPopupVisible && (
        <PortionPopup  clickedIngrName={clickedIngrName} onConfirm={handlePopupSubmit} onClose={() => setIsPopupVisible(false)}/>
)}
      </div>
  );
};

export default SecondTask;
