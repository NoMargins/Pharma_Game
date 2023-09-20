import React, { useState, useEffect } from 'react';
import { userName } from '../SecondTask/quiz.selectors';
import { connect } from 'react-redux';
import FacebookShareButton from './FacebookShareBtn';
import './winPage.scss';

const WinPage = ({ userName }) => {
    const [currentParaIndex, setCurrentParaIndex] = useState(0);
    const [startTyping, setStartTyping] = useState(false);
    const [isArrowVisible, setIsArrowVisible] = useState(true);
    const [textToShow, setTextToShow] = useState('');
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [isPapirusVisible, setIsPapirusVisible] = useState(false);

    const paragraphs = [
      `Вітаємо, ${userName}!`,
      `Ваше серце і розум злилися в єдине ціле і Ви змогли створити легендарне Зілля Здоров'я!`, 
      `Ваша увага до деталей та знання не могли залишити Вас без нагороди. Ви - справжній майстер своєї справи, фармацевт, який може робити неможливе.`, 
      `Нехай ця перемога буде символом Вашого незламного духу і стане натхненням для подальших досягнень!`, 
    ];

    useEffect(() => {
        setTimeout(() => {
            setIsPapirusVisible(true);
            setTimeout(() => {
                setStartTyping(true);
            }, 1500);
        }, 500);
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
                }, 1000);
                setTimeout(() => {
                    setIsButtonVisible(true);
                }, 2500);
            }
        }
    }, [textToShow, currentParaIndex, startTyping]);

    return (
        <div className="win-page_container">
            <div className={`win-page_container__papirus ${isPapirusVisible ? 'visible' : ''}`}>
                <img src='https://nezalezhnist.8.co.ua/img/papirus.png' alt="Papirus illustration" />
                <div className='win-page_container__papirus__text' id="typeEffect">
                    {paragraphs.slice(0, currentParaIndex).map(para => (
                        <p key={para}>{para}</p>
                    ))}
                    <p>{textToShow}</p>
                </div>
                {isButtonVisible && (
                    <FacebookShareButton />
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

export default connect(mapStateToProps)(WinPage);

