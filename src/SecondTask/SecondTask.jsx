import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGameResult } from './actions';
import { initialElements } from './elements.js';
import Healper from './Helper.jsx';
import PortionPopup from './PortionPopup.jsx';
import ClickableElement from './DraggableElement.jsx';
import './secondTask.scss';
import {receipt} from './receipt.js';
import WinPage from '../WinPage/WinPage';
import LoosePage from '../LoosePage/LoosePage';

const SecondTask = () => {
  const [isPapirusVisible, setIsPapirusVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [userFormula, setUserFormula] = useState([]);
  const [currentElements, setCurrentElements] = useState(initialElements); // Припустимо, що INITIAL_ELEMENTS це ваш початковий список інгредієнтів
  const [isHelperVisible, setIsHelperVisible] = useState(false);

  const navigation = useNavigate();

  const handleElementClick = (elem) => {
    console.log("Елемент вибрано:", elem);
    setSelectedIngredient(elem);
    setIsPopupVisible(true);
  };



useEffect(() => {
    const timer = setTimeout(() => {
      setIsPapirusVisible(true);
    }, 1500);
    return () => clearTimeout(timer); // Очищення таймеру при розмонтуванні компонента
  }, []);

  const dispatch = useDispatch();

  const userData = useSelector(state => ({
    name: state.quiz.name,
    phone: state.quiz.phone
  }));


  const handlePopupSubmit = (portion) => {
    if (selectedIngredient) {
      const newFormula = [...userFormula, { ...selectedIngredient, portion }];
      console.log("Додано новий інгредієнт:", { ...selectedIngredient, portion });
      setUserFormula(newFormula);
      setCurrentElements((prevElements) =>
      prevElements.filter((elem) => elem.id !== selectedIngredient.id)
    );
      setIsPopupVisible(false);
      setSelectedIngredient(null);
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setSelectedIngredient(null); // Очищаємо selectedIngredient при закритті попапу
};

const clearAll = () => {
  setUserFormula([]); // Очищаємо користувацьку формулу
  setCurrentElements(initialElements); // Повертаємо всі елементи на місце. Я припускаю, що у вас є початковий масив initialElements з усіма інгредієнтами.
};

const toggleHelperVisibility = () => {
  setIsHelperVisible(prevState => !prevState);
};

const closePapirus = (e) => {
  e.stopPropagation();
  setIsPapirusVisible(false);
};

const isUserFormulaCorrect = () => {
  if (userFormula.length !== receipt.length) {
      return false;
  }
      if (userFormula.length === 0) {
        return null;
      }
  

  // Перебираємо кожен елемент з userFormula
  for (let userIngredient of userFormula) {
      // Знаходимо відповідний елемент у receipt
      const receiptIngredient = receipt.find(ing => ing.techtitle === userIngredient.techtitle);

      if (!receiptIngredient) {
          return false;
      }

      if (receiptIngredient.portion !== userIngredient.portion) {
          return false;
      }
  }

  return true;
}

const handleGameFinish = async (result) => {
  dispatch(setGameResult(result));

  // Створюємо об'єкт з даними для відправлення на сервер
  const dataToSend = {
    ...userData,
    result,
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

const isFormulaCorrect = isUserFormulaCorrect();

const handleCookButtonClick = () => {
  if (isUserFormulaCorrect()) {
     handleGameFinish('win');
     navigation("/win");
  } else {
     handleGameFinish('false');
     navigation("/loose");
  }
}

const handlePotClick = () => {
  if (selectedIngredient) {
    console.log("Елемент додано до горщика:", selectedIngredient);
    setIsPopupVisible(true);
  }
};

 
  return (
      <div className="second-task_container">
        <div className='together'>
        <div className="pot" onClick={handlePotClick}>
            <div className='imgButton'>
            <img src="https://nezalezhnist.8.co.ua/img/pot.png" />
            <div className='buttons'>
            <button className={`taste ${currentElements.length === 0 ? 'pulse' : ''}`} onClick={handleCookButtonClick}>Зготувати!</button>
            <button className='clear' onClick={clearAll}>Очистити</button>
            </div>
            </div>
          </div>
          <ul className='second-task_container__list'>
        {currentElements.map((elem, index) => (
          <ClickableElement elem={elem} onClick={() => handleElementClick(elem)} key={elem.id} />
        ))}
      </ul>
       
        </div>
  
        <div className='healper' onClick={() => setIsPapirusVisible(true)}>
    <img src='https://nezalezhnist.8.co.ua/img/question.png' alt='healper-img' />
</div>

        
        <div className={`overlay ${isPapirusVisible ? 'visible' : ''}`}></div>
       {isPapirusVisible  && <Healper isPapirusVisible={isPapirusVisible} closePapirus={closePapirus}/>}
       {isPopupVisible && (
        <PortionPopup onSubmit={handlePopupSubmit} onClose={closePopup}/>
      )}
      </div>
  );
};

export default SecondTask;
