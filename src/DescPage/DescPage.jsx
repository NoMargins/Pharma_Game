import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './descPage.scss';

const DescPage = () => {
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const [textToShow, setTextToShow] = useState('');

  const navigation = useNavigate();
  const onContinue = () => navigation('../auth');

  const paragraphs = [
    `У далекому королівстві, де кожен житель мав особливий дар, була диво-лабораторія. Тут фарм-мольфари створювали чарівні зілля.`,
    `Серед всіх вирізнялося одне, яке дарувало вічне здоров'я людині.`,
    `Тільки найрозумніші та найдосвідченіші мольфари відали, як його приготувати.`,
    `Сьогодні вам випала унікальна нагода дізнатися його рецепт та відтворити власноруч!`
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
        setIsArrowVisible(true); // показати стрілку, коли увесь текст надруковано
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
    <div className="desc-page_container">
      <div className={`desc-page_container__papirus ${isPapirusVisible ? 'visible' : ''}`}>
        <img src='https://nezalezhnist.8.co.ua/img/papirus.png' alt="Papirus illustration"/>
        <div className='desc-page_container__papirus__text' id="typeEffect">
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

export default DescPage;
