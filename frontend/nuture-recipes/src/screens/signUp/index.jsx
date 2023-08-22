import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "../../components/form/input";
import Button from "../../components/form/button";

import { Context } from "../../context/UserContext";

function Register() {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    register(user);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      <ToastContainer />
      <div className="flex flex-col w-full max-h-full">
        <h2 className="text-xl font-medium mb-5">Entrar</h2>

        <form className="flex flex-col">
          <Input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Nome Completo"
            className="py-2 px-2 my-2 border-2 rounded-sm outline-none border-stone-200 placeholder:text-sm"
          />
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Insira um E-mail válido"
            className="py-2 px-2 my-2 border-2 rounded-sm outline-none border-stone-200 placeholder:text-sm"
          />
          <Input
            type="text"
            name="phone"
            onChange={handleChange}
            placeholder="Telefone para contato"
            className="py-2 px-2 my-2 border-2 rounded-sm outline-none border-stone-200 placeholder:text-sm"
          />
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Nova Senha"
            className="py-2 px-2 my-2 border-2 rounded-sm outline-none border-stone-200 placeholder:text-sm"
          />
          <Input
            type="password"
            name="cfPassword"
            onChange={handleChange}
            placeholder="Confirme a Senha"
            className="py-2 px-2 my-2 mb-4 border-2 rounded-sm outline-none border-stone-200 placeholder:text-sm"
          />
          <span className="text-md text-stone-500">
            Já tem uma conta?{" "}
            <Link to="/Login" className="text-lime-950 font-medium">
              Entrar
            </Link>
          </span>
          <Button
            onClick={handleSubmit}
            className="my-4 py-2 text-white font-medium rounded-sm bg-lime-950 hover:bg-lime-900"
          >
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
