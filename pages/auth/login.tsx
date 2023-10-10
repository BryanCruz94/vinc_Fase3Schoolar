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
    router.replace("/reports.html");
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
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <>
      <br />
      <Layout title="Auth">
        <div className="flex flex-col lg:flex-row">
          {/* Div para información sobre la página en la parte izquierda */}
          <div className="lg:w-1/2 pr-2 mb-5 lg:mb-0">
            <div className="text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl dark:text-slate-700 p-0 text-center text-green-700 mt-12">
                <br />
                Bienvenidos a la página de Reportes
              </h2>
            </div>
            <div className="text-justify mt-5 ml-5">
              <p className="text-lg text-gray-800 dark:text-gray-400">
                ¡Bienvenido a Schoolar Security - Reportes!
              </p>
              <p className="mt-3 text-md text-gray-600 dark:text-gray-400">
                Nuestro sistema de inicio de sesión te permite acceder a los
                reportes de incidentes de las Unidades Educativas. Para
                continuar, por favor, ingresa tu correo electrónico de
                administrador registrado a continuación. Esto te permitirá
                acceder a las funciones de gestión de incidentes.
              </p>
              <p className="mt-3 text-md text-gray-600 dark:text-gray-400">
                En caso de que no dispongas de un correo electrónico de
                administrador o si perteneces a una de las unidades educativas y
                necesitas acceso, por favor, comunícate con nosotros a través
                del siguiente correo electrónico de contacto:{" "}
                <a
                  className="text-green-300 dark:text-blue-400"
                  href="mailto:lacastillo12@espe.edu.ec"
                >
                  lacastillo12@espe.edu.ec
                </a>
                . Estaremos encantados de ayudarte a obtener acceso a los
                reportes obtenidos sobre los incidentes.
              </p>
            </div>
            <br />
            <div className="flex justify-center ">
              <div className="bg-gray-200 rounded-lg p-6 shadow-md h-32 flex justify-center items-center text-center ml-5">
                <img
                  src="https://res.cloudinary.com/dmkvix7ds/image/upload/v1695635408/LuisCastillo_hg2kj1.png"
                  alt="Imagen del ingeniero"
                  className="w-19 h-20 rounded-full mr-3"
                />
                <div className="text-left text-black mt-5">
                  <div>
                    <p className="text-lg font-semibold">Ing. Luis Castillo</p>
                  </div>
                  <div>
                    <p className="mt-1 text-sm">0987800194</p>
                  </div>
                  <div>
                    <p className="mt-1 text-sm font-semibold text-black-700">
                      DIRECTOR DE PROYECTO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de inicio de sesión a la derecha */}
          <div className="lg:w-1/2 pl-4 mr-4">
            <AuthLayout title="Ingresar">
              {/* Contenido del formulario */}
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
                        Dirección de correo electrónico
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
                        Contraseña
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
                        {/* Mensaje de si has olvidado la contraseña */}
                        <div className="flex justify-start">
                          <a
                            href="/seguridadVinculaciontwo/recover/recover.html"
                            className="text-xs font-medium text-gray-900 dark:text-gray-900 hover:text-primary-600 mt-2"
                          >
                            ¿Olvidaste tu contraseña?
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm bg-lime-500/10 rounded-lg pt-1 pb-1 mt-0 mb-0 text-center">
                        Esta sección es exclusiva de usuarios administradores.
                        Inicie sesión como administrador para acceder.
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-color-primario hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white shadow"
                      >
                        Iniciar sesión
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </AuthLayout>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AuthP;
