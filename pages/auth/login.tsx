/* eslint-disable react/jsx-filename-extension */

import React, { useContext, useState, useEffect, useReducer } from "react";
import { Layout } from "../../components/layouts/Layout";
import { useForm } from "../../hooks/useForm";
import { GetServerSideProps } from "next";
import axios from "axios";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
// import { signIn, getSession, getProviders } from "next-auth/react";
const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

const baseUrl = "http://192.188.58.82:3000/api/v2";
import { AuthContext, AuthState, authReducer } from "@/context/auth";
import Image from "next/image";
interface FormValues {
  email: string;
  password: string;
}
function AuthP() {
  const router = useRouter();
  const { user, loginUser, isLoggedIn } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true); // Inicialmente, establezca loading en true

  const { handleChange, formulario } = useForm<FormValues>({
    email: "",
    password: "",
  });

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setShowError(false);

    const isValidLogin = await loginUser(formulario.email, formulario.password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    router.replace("/reports");
  };

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

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
      router.replace("/reports.html").then(() => setLoading(false));
    } catch (error) {
      Cookies.remove("token");
      // router.replace("/auth/login.html").then(() => setLoading(false));
      setLoading(false)
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando...
      </div>
    );
  }

  //Si no está autenticado, devuelva un mensaje

  return (
    <Layout title="Auth">
      <AuthLayout title="Ingresar">

        <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl dark:text-slate-700 p-0">
          Iniciar sesión
        </h2>
        <div className="mt-0">
          <div className="mt-1">
            <form
              action="#"
              method="POST"
              className="space-y-6"
              onSubmit={onSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="bblock mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                >
                  {" "}
                  Dirección de correo electrónico{" "}
                </label>
                <div className="mt-1">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Tu correo electrónico"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                >
                  {" "}
                  Contraseña{" "}
                </label>
                <div className="mt-1">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Tu contraseña"
                    onChange={handleChange}
                  />
                </div>
              </div>

              

              <div className="flex items-center justify-between">
                <div className="text-sm bg-lime-500/10 rounded-lg pt-1 pb-1 mt-0 mb-0 text-center">
                Esta sección es exclusiva de usuarios administradores. Inicie sesión como administrador para acceder.
                </div>
              </div>



              <div>
                <button
                  type="submit"
                  className="w-full  bg-color-primario hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center  text-white shadow "
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </AuthLayout>
    </Layout>
  );
}

export default AuthP;
