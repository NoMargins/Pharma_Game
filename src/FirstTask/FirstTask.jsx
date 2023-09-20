import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { elements, initialTitles } from './elements.js';
import ElementBox from './ElementBox.jsx';
import Title from './Title.jsx';
import Healper from './Helper.jsx';
import TaskCompleted from './TaskCompleted.jsx';
import './firstTask.scss';

const FirstTask = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [isZoomVisible, setIsZoomVisible] = useState(false);
  const [isPapirusVisible, setIsPapirusVisible] = useState(false);
  const [isCompletionVisible, setIsCompletionVisible] = useState(false);
  const [highlightedElementId, setHighlightedElementId] = useState(null);


const handleDrop = (item, elem) => {
    if (item.title === elem.title) {
        console.log('Matched!');
        setMatchedTitles(prev => [...prev, item.title]);
        const updatedTitles = allTitles.filter(title => title !== item.title);
        setAllTitles(updatedTitles);
    } else {
        setHighlightedElementId(elem.id); // Set the element to be highlighted
    }
};



useEffect(() => {
    if (highlightedElementId !== null) {
        const timer = setTimeout(() => {
            setHighlightedElementId(null); // Reset the highlighted element after 3 seconds
        }, 3000);
        return () => clearTimeout(timer);
    }
}, [highlightedElementId]);
  
  const navigation = useNavigate();
  const onContinue = () => navigation('../secondTask');

   const handlePotionClick = (url) => {
    setImgUrl(url);
    setIsZoomVisible(true);
  };

  const handleQuestionClick = (e) => {
    e.stopPropagation();
    setIsPapirusVisible(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPapirusVisible(true);
    }, 2000);
    return () => clearTimeout(timer); // Очищення таймеру при розмонтуванні компонента
  }, []);

  const closePapirus = (e) => {
    e.stopPropagation();
    setIsPapirusVisible(false);
  };

  const zoomClass = `zoom ${
    isZoomVisible ? 'visible' : 'unvisible'
  }`;


const [allTitles, setAllTitles] = useState(initialTitles);
const [matchedTitles, setMatchedTitles] = useState([]);


useEffect(() => {
  if (allTitles.length === 0) {
    setTimeout(() => {
      setIsCompletionVisible(true);
    }, 1500);
  }
}, [allTitles]);

const [selectedTitle, setSelectedTitle] = useState(null);

  return (
      <div className="first-task_container">
        <div className={`first-task_container__overlay ${isZoomVisible ? 'visible' : 'unvisible'}`}></div>
        <div className='together'>
        <ul className='first-task_container__list'>
        {elements.map((elem, index) => (
  <li
    className={`element`}
    key={elem.id}
  > 
            <img src={elem.url} alt='spell image' onClick={() => handlePotionClick(elem.url)} />
            <ElementBox
  elem={elem}
  handleDrop={handleDrop}
  matched={matchedTitles.includes(elem.title)}
  isHighlighted={highlightedElementId === elem.id}
  selectedTitle={selectedTitle}
  setSelectedTitle={setSelectedTitle}
/>
  </li>
))}
        </ul>

        <div className='titles'>
  {allTitles.map((el, index) => (
    <Title
      key={index}
      title={el}
      id={index}
      handleSelect={setSelectedTitle}
      selectedTitle={selectedTitle}
    />
  ))}
</div>
        </div>
        <div className={zoomClass}>
          <img src={imgUrl} alt="img-zoomed" />
          <button className='zoom_close-btn' onClick={(e) => {
            e.stopPropagation();
            setIsZoomVisible(false);
          }}>
          </button>
        </div>
        
        <div className='healper' onClick={handleQuestionClick}>
          <img src='https://nezalezhnist.8.co.ua/img/question.png' alt='healper-img' />
        </div>
        
        <div className={`overlay ${isPapirusVisible ? 'visible' : ''}`}></div>
       {isPapirusVisible && <Healper isPapirusVisible={isPapirusVisible} closePapirus={closePapirus}/>}
       {isCompletionVisible && <TaskCompleted onContinue={onContinue} /> }
       {isCompletionVisible && <div className={`first-task_container__overlay visible`}></div>}

      </div>
  );
};

export default FirstTask;
