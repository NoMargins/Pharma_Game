import React, { useState } from "react";


const ClickableElement = ({ elem, onClick }) => {
  return (
    <li 
    className='element' 
    key={elem.id} 
    onClick={() => onClick(elem)}
    >
      <img src={elem.url} alt='spell image' />
      <div className='element_box'>{elem.title}</div>
    </li>
  );
};

export default ClickableElement;