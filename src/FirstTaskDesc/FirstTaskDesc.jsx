import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {userName} from '../SecondTask/quiz.selectors'
import { connect } from 'react-redux';

import './firstTaskDesc.scss';

const FirstTaskDesk = ({ userName}) => {
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const [textToShow, setTextToShow] = useState('');

  const navigation = useNavigate();
  const onContinue = () => navigation('../firstTask');

  
  const paragraphs = [
    `Вітаємо, ${userName}!`,
    `Ви у серці таємничої фарм-лабораторії.`, 
    `Але от халепа! Зловісна буря розкидала все навколо, тож підписи інгредієнтів розлетілися...`, 
    `Лише справжній фармацевт може відновити тут порядок.`, 
   `Чи готові Ви проявити свої знання й інтуїцію, щоб відтворити назви цих чарівних речовин?`
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsPapirusVisible(true);
      setTimeout(() => {
        setStartTyping(true);
      }, 1500); // Затримка перед початком друку після з'явлення папіруса
    }, 500); // Затримка перед з'явленням папіруса
  }, []);


  useEffect(() => {
    if (startTyping) {
      if (currentParaIndex < paragraphs.length) {
        if (textToShow.length < paragraphs[currentParaIndex].length) {
          setTimeout(() => {
            setTextToShow(paragraphs[currentParaIndex].substring(0, textToShow.length + 1));
          }, 50);
        } else {
          setCurrentParaIndex(currentParaIndex + 1);
          setTextToShow('');
        }
      } else {
        setTimeout(() => {
          setIsArrowVisible(true);
        }, 1000);// показати стрілку, коли увесь текст надруковано
      }
    }
  }, [textToShow, currentParaIndex, startTyping]);
  

  const [isPapirusVisible, setIsPapirusVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsPapirusVisible(true);
    }, 2000);
  }, []);

  
  return (
    <div className="first-task-desc_container">
      <div className={`first-task-desc_container__papirus ${isPapirusVisible ? 'visible' : ''}`}>
        <img src='https://nezalezhnist.8.co.ua/img/papirus.png' alt="Papirus illustration"/>
        <div className='first-task-desc_container__papirus__text' id="typeEffect">
          {paragraphs.slice(0, currentParaIndex).map(para => (
            <p key={para}>{para}</p>
          ))}
          <p>{textToShow}</p>
        </div>
        {isArrowVisible && (
         <button onClick={onContinue}>
         Далі
       </button>
    )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
	return {
		userName: userName(state),
	};
};


export default connect(mapStateToProps)(FirstTaskDesk);