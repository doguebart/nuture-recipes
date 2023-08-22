import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../utils/api";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api
      .get("/recipes")
      .then((response) => setRecipes(response.data.recipes))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full h-max">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="w-full max-h-full p-4 bg-lime-950 text-center md:text-left">
        <h1 className="lg:w-6/12 transform text-white text-3xl md:text-6xl lg:text-8xl w-full md:w-64 font-bold mx-auto md:ml-0">
          Compartilhe a melhor maneira de fazer o seu prato favorito!
        </h1>
        <Link
          to="#"
          className="transition delay-50 mt-6 md:mt-10 inline-block w-64 md:w-80 text-sm md:text-lg text-lime-900 text-center mx-auto md:ml-0 p-2 md:p-4 bg-white border font-bold rounded-md hover:bg-lime-900 hover:text-white"
        >
          Criar Receita
        </Link>
      </div>
      <div className="p-2 w-full max-h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
            <div className="card bg-white p-4 rounded-md">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="rounded-sm"
              />
              <div className="flex flex-col">
                <span className="text-xl font-medium">{recipe.name}</span>
                <span className="text-sm text-stone-500">
                  receita criada por {recipe.user.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
