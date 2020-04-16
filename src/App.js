import React, { useEffect, useState } from "react";
import Recipe from "./recipe";
import "./App.css";

//Functional component that handles our entire application
const App = () => {
  //ID and Key for API authentification
  const APP_ID = "";
  const APP_KEY = "";

  //Hooks to handle state
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  //Making an HTTP request and using Aync await to handle promises.
  //We use string interpolation in the fetch request to insert our search query and authentication
  //Once we have our data we use our setRecipe hook to save the data in our recipes array
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  //useEffect essentially works like an event listenter. It works as the componentDidMount, componentDidUpdate, and componentWillUnmount combined.
  useEffect(() => {
    getRecipes();
  }, [query]); //Leaving this empty useEffect will only run when the application mounts. Therefore if it mounts with no query the page will display no results until somone makes a query.
  //But we want it to run each time there is a new query

  //function updates the state of the search
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  //function prevents the form from automatically submitting
  //sets the query to the search that was made
  //resets the search field to empty
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  //JSX to build the page
  return (
    <div className="container text-center">
      <img
        src="../recipeapplogo.png"
        alt="Recipe app logo"
        height="300px"
        width="300px"
      ></img>
      <h1 className="display-4 mb-4 ">Recipe sandbox</h1>
      <hr />
      <form onSubmit={getSearch} className="search-form">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            value={search}
            onChange={updateSearch}
            placeholder="Enter ingredient"
          ></input>
        </div>
        <div className="form-group ">
          <button className="btn btn-primary mr-4 " type="submit">
            search
          </button>
        </div>
      </form>
       
     {/* Map through the recipes array and grab the data we need to pass into our recipe component  */}
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
  );
};

export default App;
