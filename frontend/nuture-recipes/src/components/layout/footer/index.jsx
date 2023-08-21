import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white p-4 md:p-8">
      <nav className="flex flex-col md:flex-row justify-center max-w-7xl mx-auto">
        <ul className="mr-10">
          <h4 className="text-lime-950 text-l font-bold mb-3">Menu</h4>
          <li>
            <Link
              to="/"
              className="text-black transition delay-50 hover:text-lime-900 text-sm md:text-base"
            >
              Início
            </Link>
          </li>
          <li className="mt-2">
            <Link
              to="#"
              className="text-black transition delay-50 hover:text-lime-900 text-sm md:text-base"
            >
              Receitas
            </Link>
          </li>
        </ul>
        <ul className="mr-10 mt-6 md:mt-0">
          <h4 className="text-lime-950 text-l font-bold mb-3">Ajuda</h4>
          <li>
            <Link
              to="#"
              className="text-black transition delay-50 hover:text-lime-900 text-sm md:text-base"
            >
              Privacidade
            </Link>
          </li>
          <li className="mt-2">
            <Link
              to="#"
              className="text-black transition delay-50 hover:text-lime-900 text-sm md:text-base"
            >
              Termos de uso
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center border-t-2 w-full max-h-full mt-5 bg-white p-2">
        <span className="text-stone-500 text-sm text-center">
          Copyright © 2023 Nuture Labs Inc.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
