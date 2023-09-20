import React  from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './mainPage.scss';

const MainPage = () => {
  const navigation = useNavigate();
  const onContinue = () => navigation('./description');

  return (
    <div className="main-page_container">
      <div className='main-page_container__together'>
      <div className='main-page_container__logo'>
        <img src='https://nezalezhnist.8.co.ua/img/911-logo.png' className='apteka-logo'/>
        <img src='https://nezalezhnist.8.co.ua/img/aoc-logo.png' className='aoc-logo'/>
      </div>
      <div className='main-page_container__together__title'>
        <h1>ФОРМУЛА ЗДОРОВ'Я</h1>
        <div className="h3-overlay"><h3>ВІТАЄМО У СВІТІ ОНЛАЙН-ГРИ!</h3></div>
        </div>
        <button className='btn btn-primary main-page_container__together__button' onClick={onContinue}>РОЗПОЧАТИ!</button>
        </div>
        </div>
  );
};

export default MainPage;
