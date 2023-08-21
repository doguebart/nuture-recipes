import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { Context } from "../../../context/UserContext";

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(Context);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="p-5 bg-lime-950 shadow md:flex md:items-center md:justify-between relative">
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="text-2xl text-white font-bold">
          Nuture
        </Link>

        <span
          className="text-3xl text-white cursor-pointer mx-2 md:hidden block"
          onClick={toggleMenu}
        >
          <FiMenu />
        </span>
      </div>

      <ul
        className={`${
          menuOpen ? "block" : "hidden"
        } md:flex md:items-center md:bg-transparent md:p-0 py-4 md:w-auto md:opacity-100 transition-all ease-in duration-500`}
      >
        <li className="mx-4 my-6 md:my-0">
          <Link
            to="/"
            className="text-white text-md hover:text-stone-400 duration-100 whitespace-nowrap"
          >
            Início
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li className="mx-4 my-6 md:my-0">
              <Link
                to="#"
                className="text-white text-md hover:text-stone-400 duration-100 whitespace-nowrap"
              >
                Explorar Receitas
              </Link>
            </li>
            <li className="mx-4 my-6 md:my-0">
              <Link
                to="#"
                className="text-white text-md hover:text-stone-400 duration-100 whitespace-nowrap"
              >
                Criar Receita
              </Link>
            </li>
            <li className="mx-4 my-6 md:my-0">
              <Link
                onClick={logout}
                className="text-white text-md hover:text-stone-400 duration-100 whitespace-nowrap"
              >
                Sair
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="mx-4 my-6 md:my-0">
              <Link
                to="/Register"
                className={`${
                  menuOpen
                    ? "bg-white text-black hover:text-white hover:border-white hover:bg-lime-900"
                    : "bg-white text-black hover:text-white hover:border-white hover:bg-lime-900"
                } duration-100 px-4 md:px-6 py-2 whitespace-nowrap rounded`}
              >
                Criar Conta
              </Link>
            </li>

            <li className="mx-4 my-6 md:my-0">
              <Link
                to="/Login"
                className={`${
                  menuOpen
                    ? "bg-white text-black hover:text-white hover:border-white hover:bg-lime-900"
                    : "bg-white text-black hover:text-white hover:border-white hover:bg-lime-900"
                } duration-100 px-4 md:px-6 py-2 whitespace-nowrap rounded`}
              >
                Entrar
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
