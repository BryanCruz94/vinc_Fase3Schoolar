/* eslint-disable react/jsx-filename-extension */
import { IUser } from "@/interfaces/user";
import React, { useReducer, useEffect } from "react";
import { authReducer } from "./AuthReducer";
import tesloApi from "@/api/tesloApi";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/router";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

interface Props {
  children: React.ReactNode;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

const baseUrl = "http://192.188.58.82:3000/api/v2";

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  // const { data, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     console.log({ user: data?.user });
  //     dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
  //   }
  //   // console.log("No hay sesion");
  // }, [status, data]);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/login/renew`, {
        headers: {
          "x-token": Cookies.get("token"),
        },
      });
      const { token, usuario } = data;
      console.log(token, usuario);
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: usuario });
    } catch (error) {
      Cookies.remove("token");
      // router.replace("/auth/login");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      console.log(email, password);
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });
      
      debugger;
      const { token, usuario } = response.data;
      //Si es USER_ROLE no puede entrar
      if (usuario.role === "USER_ROLE") {
        return false;
      }
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: usuario });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  const logoutUser = () => {
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');
    
    // signOut();
    router.reload();
    Cookies.remove('token');

}

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
