import Image from "next/image";
import React, {
  RefObject,
  useState,
  useEffect,
  FC,
  useRef,
  PropsWithChildren,
  CSSProperties
} from "react";
import {
  DocumentCheckIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,

  NewspaperIcon,
  UserGroupIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import Link from "next/link";

function useElementOnScreen(ref: RefObject<Element>, rootMargin = "0px") {
  const [isIntersecting, setIsIntersecting] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return isIntersecting;
}

const AnimateIn: FC<PropsWithChildren<{ from: CSSProperties; to: CSSProperties, time: Number }>> = ({ from, to, time, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(ref);
  const defaultStyles: CSSProperties = {
    transition: `${time}ms ease-in-out`
  };
  return (
    <div
      ref={ref}
      style={
        onScreen
          ? {
            ...defaultStyles,
            ...to
          }
          : {
            ...defaultStyles,
            ...from
          }
      }
    >
      {children}
    </div>
  );
};

const FadeIn: FC<PropsWithChildren> = ({ children }) => (
  <AnimateIn
    from={{ opacity: 0 }}
    to={{ opacity: 1 }}
    time={1500}>
    {children}
  </AnimateIn>
);

const FadeUp: FC<PropsWithChildren> = ({ children }) => (
  <AnimateIn
    from={{ opacity: 0, translate: "0 2rem" }}
    to={{ opacity: 1, translate: "none" }}
    time={1500}
  >
    {children}
  </AnimateIn>
);

const ScaleIn: FC<PropsWithChildren> = ({ children }) => (
  <AnimateIn from={{ scale: "0" }} to={{ scale: "1" }} time={100}>
    {children}
  </AnimateIn>
);

const MoveIn: FC<PropsWithChildren> = ({ children }) => (
  <AnimateIn
    from={{ transform: "translateY(300px)" }}
    to={{ transform: "translateY(0px)" }}
    time={1000}>
    {children}
  </AnimateIn>
);

const MoveRight: FC<PropsWithChildren> = ({ children }) => (
  <AnimateIn
    from={{ transform: "translateX(300px)" }}
    to={{ transform: "translateX(0px)" }}
    time={1000}>
    {children}
  </AnimateIn>
);

const Animate = {
  FadeIn,
  FadeUp,
  ScaleIn,
  MoveIn,
  MoveRight
};

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col">
        <section className="relative w-full h-full bg-lime-500/10 flex justify-center overflow-hidden py-20 lg:pt-36 lg:pb-32">
          <Animate.FadeIn>
            <div className="bubbles-box fade-in">
              <div className="inner">
                <div className="bubble-1"></div>
                <div className="bubble-sm-1"></div>
                <div className="bubble-2"></div>
                <div className="bubble-sm-2"></div>
                <div className="bubble-3"></div>
                <div className="bubble-sm-3"></div>
              </div>
            </div>
          </Animate.FadeIn>
          <div className="flex h-full w-full relative items-center">
            <div className="container lg:px-32">
              <div className="flex flex-col-reverse lg:flex-row items-center">
                <div className="w-full lg:w-1/2 px-5 h-full">
                  <Animate.FadeUp>
                    <div className="bg-gray-100 rounded-lg p-8 w-full md:text-left md:pr-10 shadow-lg fade-in">
                      <h1 className="title mb-4 text-3xl  font-bold " >
                        Por Unidades Educativas Seguras
                      </h1>
                      <p className="leading-relaxed mb-6" style={{ textAlign: "justify" }}>
                        Únete a Schoolar Security, donde estudiantes y autoridades se cuidan mutuamente, brindan apoyo y tienen un interés compartido en el bienestar de todos. Juntos, trabajemos para crear un entorno educativo más seguro.
                      </p>
                      <p className="text-center">
                        {/* SE REDIRECCIONA A UNA PÁGINA DE DESCARGA DE CUENTA DE DRIVE DE BRYAN CRUZ */}
                        <a href="https://drive.google.com/file/d/1MPFyVksnPHRM9paqvc0AjdNPe09HTJYT/view?usp=sharing" download target="_blank" className="bg-green-800 text-white font-semibold py-2 px-4 rounded hover:bg-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Descargar la aplicación
                        </a>
                      </p>


                    </div>
                  </Animate.FadeUp>
                </div>
                <div className="w-full lg:w-1/2 h-full overflow-hidden">
                  <Animate.MoveIn>
                    <div className="flex h-full justify-center">
                      <Image src="https://res.cloudinary.com/dfitq38dk/image/upload/v1698101064/dosCelularesWeb.png"
                        width={500} height={500}
                        className="object-contain move-in"
                        alt="logo" />
                    </div>
                  </Animate.MoveIn>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-color-secundario pt-16 text-white">
          <div className="flex flex-col w-full overflow-hidden">
            {/* <Animate.FadeIn>
              <div className="text-center mb-12">
                <h1 className="text-center title">Seguridad ESPE  <br /></h1> <h1 className="text-2xl">Tu solución para la protección ciudadana</h1>
              </div>
              <div className="px-10 lg:px-32 flex justify-center mb-12">
                <video controls className="w-full" style={{ maxWidth: "820px", height: "auto" }}>
                  <source src="/schoolarSecurity/images/SeguridadESPE-03.mp4" type="video/mp4" />
                  Tu navegador no admite el elemento de video.
                </video>
              </div>
            </Animate.FadeIn> */}
            <Animate.FadeIn>
              <div className="text-center mb-10">
                <h1 className="text-center title mb-2">Empieza ya!</h1>
                <span className="text-center">Solo necesitas descargar la aplicación</span>
              </div>
            </Animate.FadeIn>

            <Animate.MoveIn>
              <div className="w-full flex flex-col justify-center gap-y-10 lg:gap-y-0 items-center lg:flex-row">
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end overflow-hidden">
                  <Image width={550} height={500} src="https://res.cloudinary.com/dfitq38dk/image/upload/v1698101712/inicioMovil_mitad_pept53.png" className="move-in" alt="phone3" />
                </div>
                <div className="w-full lg:w-1/2 h-full flex items-center lg:items-end pb-16 overflow-hidden">
                  <div className="text-start px-10 lg:px-0 h-full w-full move-in">
                    <h1 className="title mb-10 ">¿Cómo funciona?</h1>
                    <ul>
                      <li className="mb-8 flex items-center">
                        <span className="bg-gray-100 px-5 py-3 rounded-full mr-3 text-color-espe font-bold text-2xl">1</span>
                        <span className="text-2xl">Descarga la aplicación de Schoolar Security</span>
                      </li>
                      <li className="mb-8 flex items-center">
                        <span className="bg-gray-100 px-5 py-3 rounded-full mr-3 text-color-espe font-bold text-2xl">2</span>
                        <span className="text-2xl">Realiza un reporte y publícalo</span>
                      </li>
                      <li className="mb-8 flex items-center">
                        <span className="bg-gray-100 px-5 py-3 rounded-full mr-3 text-color-espe font-bold text-2xl">3</span>
                        <span className="text-2xl">Revisa el reporte publicado en noticias</span>
                      </li>
                      <li className="mb-8 flex items-center">
                        <span className="bg-gray-100 px-5 py-3 rounded-full mr-3 text-color-espe font-bold text-2xl">4</span>
                        <span className="text-2xl">Crea grupos personalizados</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Animate.MoveIn>
          </div>
        </section>
        <section className="w-full">
          <div className="container lg:py-12 md:py-8 py-4 px-10 lg:px-19 text-center">
            <Animate.FadeIn>
              <div className="lg:mb-8">
                <div className="w-full flex flex-col lg:flex-row lg:gap-x-10 gap-y-5">
                  <div className="flex flex-col w-full lg:w-1/2 text-justify">
                    <h1 className="mb-6 md:mb-6 lg:mb-8 title">
                      Características aplicación móvil
                    </h1>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-row">
                        <div className="w-1/5 flex justify-center">
                          <img className="mb-1" width="55" height="55" src="https://res.cloudinary.com/ddodvvqcq/image/upload/v1698090172/images/ReportesLogo.png" />
                        </div>
                        <div className="w-4/5 px-2">
                          <span>
                            Facilita la realización de reportes en tiempo real, adjuntando descripción, foto y ubicación del suceso.
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/5 flex justify-center">
                          <img className="mb-1" width="55" height="55" src="/schoolarSecurity/images/sos.png" />
                        </div>
                        <div className="w-4/5 px-2">
                          <span>
                            Incorpora un botón de enviar ayuda &ldquo;Send Out Soccour&ldquo; (SOS) en la interfaz principal.
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/5 flex justify-center">
                          <img className="mb-1" width="55" height="55" src="/schoolarSecurity/images/logo_noticias.png" />
                        </div>
                        <div className="w-4/5 px-2">
                          <span>
                            Ofrece una sección de noticias que muestra las diferentes emergencias que ocurren a diario.
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/5 flex justify-center">
                          <img className="mb-1" width="55" height="55" src="/schoolarSecurity/images/logo_grupos.png" />
                        </div>
                        <div className="w-4/5 px-2">
                          <span>
                            Permite crear grupos personalizados para comunicarse mediante mensajes de texto.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full lg:w-1/2 text-justify">
                    <h1 className="mb-6 md:mb-6 lg:mb-8 title text-center">
                      Impactos esperados
                    </h1>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-row">
                        <div className="w-1/5 flex justify-center">
                          <img className="mb-1" width="60" height="60" src="/schoolarSecurity/images/comunidad.png" />
                        </div>
                        <div className="w-4/5 px-2">
                          <span>
                            Mantener a la comunidad informada a diario de los diferentes tipos de emergencias.
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/5 flex justify-center">
                          <img className="mb-1" width="55" height="55" src="/schoolarSecurity/images/estadisticas.png" />
                        </div>
                        <div className="w-4/5 px-2">
                          <span>
                            Enviar estadísticas de seguridad a la comunidad sobre emergencias y sectores destacados.
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/5 flex justify-center">
                          <img className="mb-1" width="60" height="60" src="/schoolarSecurity/images/smsimpacto.png" />
                        </div>
                        <div className="w-4/5 px-2">
                          <span>
                            Facilitar la comunicación entre los miembros de la comunidad a través de un sistema de mensajería.
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/5 flex justify-center">
                          <img className="mb-1" width="60" height="60" src="/schoolarSecurity/images/alarma.png" />
                        </div>
                        <div className="w-4/5 px-2">
                          <span>
                            Proporcionar notificaciones instantáneas al activar el SOS, asegurando una respuesta rápida y eficaz.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Animate.FadeIn>
          </div>
        </section>


        <section className="w-full">
          <Animate.FadeIn>
            <h1 className="title mb-5 text-center md:mb-10 ml-10">
              ¿De dónde nace?
            </h1>
          </Animate.FadeIn>
          <div className="flex flex-wrap mt-5 ml-2 mr-2 text-center md:ml-5 md:mr-5 text-justify">
            <div className="w-full md:w-1/2 lg:w-1/2 p-2 md:p-4">
              {/* <p>
                En la Universidad de las Fuerzas Armadas ESPE Sede Santo Domingo, un grupo de docentes y los tesistas Vinicio Borja y Maria José Párraga expresaron su preocupación por la seguridad de la comunidad de Luz de América. Después de llevar a cabo encuestas en dicha comunidad con el objetivo de identificar sus necesidades técnicas, tomaron la decisión de desarrollar una aplicación denominada "Seguridad ESPE". Esta aplicación tiene como finalidad permitir a los usuarios reportar incidentes de seguridad en tiempo real a través de una plataforma web y una aplicación móvil.</p>
             */}
              <p>
                A inicios del mes de marzo del 2023, en la Universidad de las Fuerzas Armadas ESPE, Sede Santo Domingo de
                los Tsáchilas, se da inicio a la Fase I del proyecto de vinculación  titulado "IMPLEMENTACIÓN DE
                APLICACIONES WEB Y MÓVILES PARA LA GESTIÓN DE EMERGENCIAS COMUNITARIAS EN LA PROVINCIA DE SANTO DOMINGO DE
                LOS TSÁCHILAS", donde un grupo de docentes en un trabajo colaborativo con estudiantes de la carrera de
                Ingeniería en Tecnologías de la Información, se inició en la comunidad de la parroquia de Luz de América.
                Para atender esta necesidad, se llevaron a cabo encuestas como parte de un muestreo con el fin de
                identificar los incidentes más comunes. Estas encuestas revelaron diversas problemáticas de seguridad,
                incluyendo robos, vandalismo, desorden público y emergencias médicas, entre otras.
                <br />
                Con los datos recopilados en la Fase I, en el mes de mayo dos estudiantes de la carrera
                desarrollaron el proyecto de Unidad de Integración Curricular denominado "Desarrollo de una aplicación
                web y móvil para la gestión de alertas de emergencia comunitaria bajo el enfoque de metodologías ágiles",
                la misma sirvió como punto de partida para el desarrollo de la aplicación "Seguridad ESPE". La
                información recopilada se empleó para diseñar funciones y servicios específicos en la aplicación.

              </p>

            </div>
            <div className="w-full md:w-1/2 lg:w-1/2 p-2 md:p-4">

              {/* <p>
                Con el tiempo, Seguridad ESPE se ha convertido en una herramienta esencial para mejorar la seguridad y fortalecer la comunidad. Basándose en las aplicaciones desarrolladas por los tesistas, se llevó a cabo la Fase II del proyecto de Vinculación con la Sociedad, denominado "IMPLEMENTACIÓN DE APLICACIONES WEB Y MÓVILES PARA LA GESTIÓN DE EMERGENCIAS COMUNITARIAS EN LA PROVINCIA DE SANTO DOMINGO DE LOS TSÁCHILAS". En esta ocasión, el enfoque se dirigió hacia las Unidades Educativas de las parroquias Puerto Limón y El Esfuerzo.</p>
            */}

              <p>
                La principal meta de esta aplicación fue fortalecer la seguridad de la comunidad, fomentando la comunicación,
                coordinación y respuesta ante situaciones de emergencia, y aprovechando el uso de dispositivos móviles e internet.
                La aplicación ofrece una solución innovadora en el ámbito de la protección ciudadana.
                <br />
                Basándonos en las aplicaciones desarrolladas anteriormente, a inicios de septiembre del 2023 inició la Fase
                II del Proyecto de Vinculación con la Sociedad, en esta fase, un grupo de diez estudiantes y tres docentes
                de la UFA - ESPE Sede Santo Domingo de los Tsáchilas, recolectó datos mediante encuestas realizadas en
                Unidades Educativas de la parroquia Puerto Limón y El Esfuerzo, estos datos se utilizaron como base para
                desarrollar la aplicación <strong>"Schoolar Security”</strong>.
                <br />
                El propósito principal de esta aplicación es administrar y gestionar incidentes en las unidades
                educativas, comenzando con las parroquias asignadas. Estas aplicaciones proveen información en tiempo real
                sobre los incidentes, a las autoridades de dichas instituciones, además de generar estadísticas que
                facilitan la toma de decisiones futuras para mejorar la calidad de vida, comunicación, seguridad de
                todos los integrantes de la comunidad.

              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/2 p-2 md:p-4">
              <img
                src="https://res.cloudinary.com/dfitq38dk/image/upload/v1698103740/integrantesFase1.webp"
                width={500}
                height={500}
                alt="Primera foto"
                className="mx-auto rounded" ></img>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/2 p-2 md:p-4">
              <img
                src="https://res.cloudinary.com/dfitq38dk/image/upload/v1698104602/fotoFase_II.jpg"
                width={500}
                height={500}
                alt="Segunda foto"
                className="mx-auto rounded" ></img>
            </div>

          </div>
        </section>
      </div >
    </>
  );
};

export default HomePage;
