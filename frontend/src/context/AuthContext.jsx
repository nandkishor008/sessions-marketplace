import {
  createContext,
  useEffect,
  useState,
} from "react";

import { jwtDecode } from "jwt-decode";

import api from "../api/axios";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // LOAD USER

  useEffect(() => {

    const tokens =
      localStorage.getItem(
        "tokens"
      );

    const savedUser =
      localStorage.getItem(
        "user"
      );

    if (tokens && savedUser) {

      setUser(
        JSON.parse(savedUser)
      );
    }

    setLoading(false);

  }, []);

  // LOGIN

  const login = async (
    username,
    password
  ) => {

    try {

      const response =
        await api.post(
          "/auth/login/",
          {
            username,
            password,
          }
        );

      // SAVE TOKENS

      localStorage.setItem(
        "tokens",
        JSON.stringify(
          response.data
        )
      );

      // DECODE TOKEN

      const decoded =
        jwtDecode(
          response.data.access
        );

      // USER OBJECT

      const loggedUser = {
        username:
          decoded.username,
        role:
          decoded.role,
      };

      // SAVE USER

      setUser(loggedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(
          loggedUser
        )
      );

      return {
        success: true,
        user: loggedUser,
      };

    } catch (error) {

      return {
        success: false,
        error,
      };
    }
  };

  // REGISTER

  const register = async (
    data
  ) => {

    try {

      await api.post(
        "/auth/register/",
        data
      );

      return {
        success: true,
      };

    } catch (error) {

      return {
        success: false,
        error,
      };
    }
  };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem(
      "tokens"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};