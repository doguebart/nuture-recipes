import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../screens/home";
import Login from "../screens/signIn";
import Register from "../screens/signUp";
// import DashBoard from "../screens/dashboard";
// import UserPets from "../screens/pets/userPets";
// import AddPet from "../screens/pets/addPet";
// import EditPet from "../screens/pets/editPet";
import RecipeDetails from "../screens/recipeDetail";
// import Adoptions from "../screens/adoptions";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
  );
};

export default Router;
