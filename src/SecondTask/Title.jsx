import React from "react";

const Title = ({ title, id, onClick }) => {
    return (
      <div onClick={() => onClick(id)} className='title'>
        {title}
      </div>
    );
};

export default Title;
