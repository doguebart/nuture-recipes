import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Api
import api from "../utils/api";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;
      setIsAuthenticated(true);
    }
  }, []);

  const register = async (user) => {
    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });

      await authUser(data);
      toast.success("Conta criada com sucesso!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const login = async (user) => {
    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const authUser = async (data) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));
    navigate("/");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    api.headers.authorization = undefined;

    navigate("/");
    toast.info("Logout realizado com sucesso.");
  };

  return { isAuthenticated, register, login, logout };
};

export default useAuth;
