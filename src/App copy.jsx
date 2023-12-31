import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import DescPage from './DescPage/DescPage';
import AuthPage from './AuthPage/AuthPage';
import FirstTaskDesk from './FirstTaskDesc/FirstTaskDesc';
import FirstTask from './FirstTask/FirstTask';
import SecondTask from './SecondTask/SecondTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import WinPage from './WinPage/WinPage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LoosePage from './LoosePage/LoosePage';


// import QuizDescription from './QuizDescription/QuizDescription';

const App = () => {
    const [stage, setStage] = useState('main');
    const [startTime, setStartTime] = useState(null); // для фіксації часу початку
    const [endTime, setEndTime] = useState(null); // для фіксації часу завершення

    const userData = useSelector(state => ({
        name: state.quiz.name,
        phone: state.quiz.phone,
        result: state.quiz.result
      }));

      const secondTaskOnContinue = () => {
        userData.result === "win" ? true : false;
      }

      const [gameRes, setGameRes] = useState(userData.result);

    useEffect(() => {
        if (stage === 'main') {
            setStartTime(Date.now()); // Запускаємо таймер на стадії 'main'
        }
        // Якщо ваша гра закінчується на іншій стадії, використовуйте її назву замість 'secondTaskDesc'
        else if (stage === 'winPage' || stage === 'loosePage' ) {
            setEndTime(Date.now()); // Фіксуємо час завершення, коли гра закінчена
        }
    }, [stage]); // цей ефект запускається при зміні стадії гри

    const getTimeSpent = () => {
        if (startTime && endTime) {
            return (endTime - startTime) / 1000; // Повертаємо час в секундах
        }
        return 0;
    }

    useEffect(() => {
        const sendDataToAPI = async () => {
            if (stage === 'winPage' || stage === 'loosePage') {
                const gameTime = getTimeSpent();
                try {
                    const response = await fetch('https://team-911.com.ua/rx/data.php', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ ...userData, gameTime }) // Об'єднуємо userData і gameTime
                    });
                
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                
                    const responseData = await response.json();
                    console.log('Data saved successfully:', responseData);
                
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error.message);
                }
            }
        };
    
        sendDataToAPI();
    }, [stage, userData]); // Залежності для useEffect (як
    
    const chooseOptions = () => secondTaskOnContinue() ? setStage('winPage') : setStage('loosePage')

   
        }
    }

    return (
     <DndProvider backend={HTML5Backend}>
        <Router>
        <div className='first-ever-div'>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/description" exact component={DescPage} />
        <Route path="/auth" exact component={AuthPage} />
        <Route path="/firstTaskDesc" exact component={FirstTaskDesk} />
        <Route path="/firstTask" exact component={FirstTask} />
        <Route path="/secondTask" exact component={SecondTask} />
        <Route path="/win" exact component={WinPage} />
        <Route path="/loose" exact component={LoosePage} />
      </Switch>
       </div>
    </Router>
  </DndProvider>

    );
}

export default App;

// return (
//     <DndProvider backend={HTML5Backend}>
//     <div className='first-ever-div'>
//         {renderComponent()}
//     </div>
//     </DndProvider>
// );