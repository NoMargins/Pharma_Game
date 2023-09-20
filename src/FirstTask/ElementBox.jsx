import React from "react";

const ElementBox = ({ elem, matched, isHighlighted, selectedTitle, handleDrop, setSelectedTitle  }) => {
   
  const handleClick = () => {
    if (selectedTitle && selectedTitle.title === elem.title) {
      handleDrop(selectedTitle, elem);
      setSelectedTitle(null);
    } else {
      setSelectedTitle(null);
    }
  }
    return (
      <button onClick={handleClick} className={`element_box ${matched ? 'matched' : 'highlighted'} ${isHighlighted ? 'highlighted' : ''}`}>
        {matched ? elem.title : ""}
      </button>
    );
  };
  

export default ElementBox;