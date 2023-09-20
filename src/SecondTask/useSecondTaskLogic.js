// useSecondTaskLogic.js
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { initialElements as elements } from './elements.js';
import { receipt } from './receipt.js';

export const useSecondTaskLogic = () => {
    const [isPapirusVisible, setIsPapirusVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState(null);
    const [ingredients, setIngredients] = useState({});
    const [currentElements, setCurrentElements] = useState(elements);
    const [currentIngredId, setCurrentIngredId] = useState(null);
    const [userFormula, setUserFormula] = useState([]);
    const [clickedIngrName, setClickedIngrName] = useState(null);

    
    const handlePopupSubmit = (portion) => {
        setUserFormula(userFormula => [...userFormula, { [clickedIngrName]: portion }]);
        setCurrentElements(currentElements => currentElements.filter(elem => elem.id !== currentIngredId));
        setIsPopupVisible(false);
        setCurrentIngredId(null);
        setClickedIngrName(null);
        console.log(userFormula);
        console.log(clickedIngrName, portion)
    }

    const handleQuestionClick = (e) => {
        e.stopPropagation();
        setIsPapirusVisible(true);
    };

    const closePapirus = (e) => {
        e.stopPropagation();
        setIsPapirusVisible(false);
    };

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'ELEMENT',
        drop: (item) => handleIngredientDrop(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const handleIngredientDrop = (draggedItem) => {
        const ingredient = currentElements.find(elem => elem.id === draggedItem.id);
        setCurrentIngredient(ingredient);
        setIsPopupVisible(true);
        setCurrentIngredId(draggedItem.id);
        // setClickedIngrName(draggedItem.clickedIngrName); // Зберігання імені інгредієнта'
        console.log('handleIngredientDrop is working', draggedItem.clickedIngrName, clickedIngrName, draggedItem.id )
    };

    const handleClear = () => {
        setIngredients({});
        setCurrentElements(elements);
    };

        const handleTaste = () => {
            const isCorrect = compareRecipes();
            console.log(isCorrect);
        };




    const compareRecipes = () => {
        for (let item of userFormula) {
            // Якщо інгредієнт з userFormula відсутній в recipe або його кількість відрізняється
            if (!recipe[item.ingredientName] || recipe[item.ingredientName] !== item.portion) {
                return false;
            }
        }
        // Перевіримо, чи є додаткові інгредієнти в recipe, яких немає в userFormula
        for (let key in recipe) {
            if (!userFormula.some(item => item.ingredientName === key)) {
                return false;
            }
        }
    
        return true;
    };
    
    return {
        isPapirusVisible,
        isPopupVisible,
        currentIngredient,
        ingredients,
        currentElements,
        drop,
        handleQuestionClick,
        closePapirus,
        handleClear,
        handleTaste,
        setCurrentIngredient,
        setIsPopupVisible,
        setIngredients,
        handlePopupSubmit,
        setCurrentIngredId,
        compareRecipes,
        setClickedIngrName
    };
};

