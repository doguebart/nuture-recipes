import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (user) => {
    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      console.log(error);
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
  };

  return { isAuthenticated, register, login, logout };
};

export default useAuth;
