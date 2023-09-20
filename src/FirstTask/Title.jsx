import React from "react";

const Title = ({ title, id, handleSelect, selectedTitle }) => {
  const handleClick = () => {
    handleSelect({ title, id });
  }

  const isSelected = selectedTitle && selectedTitle.id === id;

  return (
    <div
      onClick={handleClick}
      className={`title ${isSelected ? 'selected' : ''}`}
    >
      {title}
    </div>
  );
};


export default Title;
