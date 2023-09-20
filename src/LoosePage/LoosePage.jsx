import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {userName} from '../SecondTask/quiz.selectors'
import { connect } from 'react-redux';
import './loosePage.scss';

const LoosePage = ({userName}) => {
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);
  const [isArrowVisible, setIsArrowVisible] = useState(true);

  const [textToShow, setTextToShow] = useState('');

  const navigation = useNavigate();
  const onContinue = () => navigation('../secondTask');

  const paragraphs = [
    `Хмм, ${userName}...`,
    `Ви добре постарались, але трішки не вгадали з пропорціями інгредієнтів.`,
    `Результат? Жаб'яче зілля!😅`, 
    `Але нехай це стане для Вас невеликою пригодою!`,
    `Адже коли жаб'яче закляття мине, спробуйте знову.`,
    `Наступного разу у Вас точно все вийде!`,
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
    <div className="loose-page_container">
      <div className={`loose-page_container__papirus ${isPapirusVisible ? 'visible' : ''}`}>
        <img src='https://nezalezhnist.8.co.ua/img/papirus.png' alt="Papirus illustration"/>
        <div className='loose-page_container__papirus__text' id="typeEffect">
          {paragraphs.slice(0, currentParaIndex).map(para => (
            <p key={para}>{para}</p>
          ))}
          <p>{textToShow}</p>
        </div>
        {isArrowVisible && (
      <button className="loose-page_container__arrow" onClick={onContinue}>
        Спробувати ще раз!
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


export default connect(mapStateToProps)(LoosePage);