/* Developer - Jayash Todi
Developed for Klikshik as an assignment for a front end role.*/
import React from "react";
import dummyData from "../Model/Dummy.json";
import Card from "./Card";
import '../Stylesheets/Carousel.css';

function Carousel() {

  const getImages = () => {
    // GET request to fetch all the images in JSON
    // const response = await fetch('https://api.example.com/data'); 
    // function call to get the data from api
    // In this case we will be using DummyData 
    let result = JSON.parse(JSON.stringify(dummyData));
    // console.log(result.data)
    return result.data;
  }

  let data = getImages();

  return (
    <div class="carousel_main" >
      {data.map((item)=>{
        // console.log(item);
        return (<Card data={item}/>)
      })}
    </div>
  );
}

export default Carousel;