import React from "react";

//Recipe component builds the cards for each recipe
const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div className="card card-body mb-3 bg-secondary border-primary">
      <img src={image} className="rounded mx-auto d-block" alt="" />
      <h1>{title}</h1>
      <ul className="list-group mb-3">
        {ingredients.map((ingredient) => (
          <li className="list-group-item">{ingredient.text}</li>
        ))}
      </ul>
      <p className="list-group-item">Calories: {calories}</p>
      
    </div>
  );
};

export default Recipe;
