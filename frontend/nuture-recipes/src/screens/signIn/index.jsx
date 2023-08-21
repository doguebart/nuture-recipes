import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/form/input";
import Button from "../../components/form/button";

import { Context } from "../../context/UserContext";

function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(user);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-h-full">
        <h2 className="text-xl font-medium mb-5">Entrar</h2>

        <form className="flex flex-col">
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="E-mail"
            className="py-2 px-2 border-2 rounded-sm outline-none border-stone-200 placeholder:text-sm"
          />
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Senha"
            className="py-2 px-2 my-4 border-2 rounded-sm outline-none border-stone-200 placeholder:text-sm"
          />
          <span className="text-md text-stone-500">
            Ainda não tem uma conta?{" "}
            <Link to="/Register" className="text-lime-950 font-medium">
              Criar
            </Link>
          </span>
          <Button
            onClick={handleSubmit}
            className="my-4 py-2 text-white font-medium rounded-sm bg-lime-950 hover:bg-lime-900"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
