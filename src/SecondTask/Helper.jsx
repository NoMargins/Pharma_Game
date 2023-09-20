import React from "react";
import './healper-box.scss';

const Healper = ({isPapirusVisible, closePapirus}) => {
    return (
        <div className={`receipt_papirus ${isPapirusVisible ? 'visible' : 'unvisible'}`}>
                    <button className='receipt_papirus__close-btn' onClick={(e) => closePapirus(e)}>X</button>
        <div className='receipt_papirus__text'>
    <h2 className="recipe-title">Рецепт зілля здоров’я</h2>
    <p className="recipe-intro">Для того, щоб створити чарівне зілля, слідкуйте за кожним кроком уважно.</p>
    <p className="recipe-intro">Візьміть:</p>

    
    <ul className="recipe-ingredients">
        <li> <b>5 порцій Океану Любові</b>. Серце, що пульсує сповненим любові, завжди буде здоровим.</li>
        <li><b>3 порції Пилку Мудрості</b>. Це допоможе вам бачити світ ясніше.</li>
        <li><b>3 порції Сяйва Оптимізму</b>, щоб Ваш дух був завжди піднесеним.</li>
        <li><b>4 порції Нектару Енергії</b> - для сили і витривалості.</li>
        <li><b>2 порції Крил Легкості</b>. Вони допоможуть вам відчути, що крилатим ґрунту не треба. </li>
        <li><b>4 порції Есенції Гармонії</b> на завершення, щоб бачити у всьому баланс.</li>
    </ul>

    <p className="recipe-outro">Добре перемішайте та випийте зілля під мерехтливим світлом зірок. Ваше тіло одразу відчує оновлення, а серце наповниться щастям.</p>
        </div>
        </div>
    )
}

export default Healper;