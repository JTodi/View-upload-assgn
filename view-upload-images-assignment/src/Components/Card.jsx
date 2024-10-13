/* Developer - Jayash Todi
Developed for Klikshik as an assignment for a front end role.*/
import React from "react";
import '../Stylesheets/Card.css';

function Card(data) {
    // console.log(data.data);
  return (
    <div className="card_div">
      <img src={data.data.src}/>
      <p>{data.data.thumbnail}</p>
    </div>
  );
}

export default Card;
