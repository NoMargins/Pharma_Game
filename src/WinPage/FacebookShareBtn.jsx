import React from "react";
import { useNavigate } from "react-router-dom";

export default function FacebookShareButton({ imageUrl }) {
    const siteUrl = encodeURIComponent("https://team-911.com.ua");
    const description = encodeURIComponent(`Я фарма-мольфар, що знає рецепт Зілля Здоров'я!`);
    const pictureUrl = encodeURIComponent('https://nezalezhnist.8.co.ua/img/Welcome-to-911.jpg');
    const navigation = useNavigate();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${siteUrl}&quote=${description}&picture=${pictureUrl}`;
   
    const onClick = () => {
        window.open(facebookUrl, '_blank');
    }

    return (
        <button onClick={onClick}>
            Поділитися в Facebook
  
        </button>
       
    );
}