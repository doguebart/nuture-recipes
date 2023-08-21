import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaClock, FaUtensils } from "react-icons/fa";

import api from "../../utils/api";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data.recipe);
        setUser(response.data.recipe.user);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(recipe);
  }, [id]);

  return (
    <div className="w-full h-max">
      <div className="w-full max-h-full">
        <img src={recipe.image} alt={recipe.name} />
      </div>
      <div className="flex flex-col p-2">
        <span className="text-2xl font-medium">{recipe.name}</span>
        <span className="text-sm text-stone-500">
          receita criada por{" "}
          <strong className="text-lime-900">{user.name}</strong>
        </span>
        <div className="flex mt-5">
          <span className="flex items-center text-stone-500">
            <FaClock className="mr-2 text-lime-950" />
            {recipe.preparationTime}
          </span>
          <span className="flex items-center ml-4 text-stone-500">
            <FaUtensils className="mr-2 text-lime-950" />
            {recipe.level}
          </span>
        </div>
        <p className="text-md text-stone-500 mt-4">{recipe.description}</p>
      </div>
      <div className="flex flex-col p-2">
        <span className="mt-5 mb-4 text-xl font-medium">Ingredientes</span>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          recipe.ingredients.map((ingredient) => (
            <span key={ingredient.name} className="text-md text-stone-500 mb-2">
              - {ingredient.qty}{" "}
              {ingredient.unit ? `${ingredient.unit} de` : ""} {ingredient.name}
            </span>
          ))
        ) : (
          <p>Nenhum ingrediente encontrado.</p>
        )}
      </div>
      <div className="flex flex-col p-2">
        <span className="mt-5 mb-4 text-xl font-medium">Modo de Preparo</span>
        {recipe.preparationMode && recipe.preparationMode.length > 0 ? (
          recipe.preparationMode.map((mode) => (
            <span key={mode.stepNumber} className="text-md text-stone-500 mb-2">
              {mode.stepNumber}. {mode.stepDescription}
            </span>
          ))
        ) : (
          <p>Modo de preparo não foi encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
