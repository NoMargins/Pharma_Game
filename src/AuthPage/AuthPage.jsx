import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../SecondTask/actions.js';
import './authPage.scss';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateInputs = () => {
    if (username.length < 5) {
      alert('Ой! Схоже, Ваше ім*я занадто коротке...');
      return false;
    }

    const numericPhone = phone.replace(/\D/g, ''); // Видаляємо всі нецифрові символи
    if (isNaN(numericPhone) || numericPhone.length < 8) {
      alert('Перевірте введений номер телефону');
      return false;
    }

    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (!validateInputs()) return;

    dispatch(setUserData(username, phone));
    sendAuthToAPI(username, phone);
    navigate('../firstTaskDesc')
  };

  const sendAuthToAPI = async (username, phone) => {
    const dataToSend = {
      username,
      phone,
      result: 'auth'
    };
  
    try {
      const response = await fetch('https://team-911.com.ua/rx/data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log('Data saved successfully:', responseData);
  
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
    }
  };

  return (
    <div className="auth-page_container">
      <div className="auth-page_container__papirus">
        <img src='https://nezalezhnist.8.co.ua/img/papirus.png' alt="Papirus illustration"/>
        <div className='together'>
          <div className='auth-page_container__papirus__text'>
            <h3>Ласкаво просимо до таємничої лабораторії фарм-мольфарів! </h3>
            <p>Щоб розпочати свою чарівну пригоду та отримати шанс виграти подарунки, будь ласка, заповніть цю картку:</p>
          </div>
          <div className='form-and-btn'>
          <form>
            <div className="form-group">
              <label htmlFor="username">Ім'я гравця:</label>
              <input 
                type="text" 
                className="form-control" 
                id="username" 
                placeholder="ПІБ" 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Номер телефону:</label>
              <input 
                type="text" 
                className="form-control" 
                id="phone" 
                placeholder="+380" 
                onChange={(e) => setPhone(e.target.value)} 
                required 
              />
            </div>
          </form>
          <button className="auth-page_container__btn" onClick={(e) => handleLogin(e)}>
              Далі
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
