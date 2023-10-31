import React, {
  RefObject,
  useState,
  useEffect,
  FC,
  useRef,
  PropsWithChildren,
  CSSProperties
} from "react";
import { Layout } from "../../components/layouts/Layout";
import {
  EyeIcon,
  FlagIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


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

const AnimateIn: FC<PropsWithChildren<{ from: CSSProperties; to: CSSProperties, time: String }>> = ({ from, to, time, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(ref);
  const defaultStyles: CSSProperties = {
    transition: `${time} ease-in-out`
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
    time="1500ms">
    {children}
  </AnimateIn>
);

const MoveIn: FC<PropsWithChildren> = ({ children }) => (
  <AnimateIn
    from={{ transform: "translateY(300px)" }}
    to={{ transform: "translateY(0px)" }}
    time="1000ms">
    {children}
  </AnimateIn>
);

const MoveRight: FC<PropsWithChildren> = ({ children }) => (
  <AnimateIn
    from={{ transform: "translateX(300px)" }}
    to={{ transform: "translateX(0px)" }}
    time="1000ms">
    {children}
  </AnimateIn>
);

const Animate = {
  FadeIn,
  MoveIn,
  MoveRight
};

const FilosofiaPage = () => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <>
      <Layout title="Filosofía">
        <section className="bg-color-white">

          <div className="pt-28">
            <div className="flex flex-col items-center justify-center gap-4 px-6 fade-in">
              <div className="overflow-hidden">
                <Image width={260} height={250} className="move-in" src="/schoolarSecurity/images/espe.png" alt="espe" />
              </div>

              <h1 className="title">Universidad de las Fuerzas Armadas ESPE</h1>
              <p className="text-slate-500">Filosofía Institucional</p>
            </div>
            <div className="lg:px-20 container flex flex-col py-10 lg:pt-10 lg:pb-28 fade-in">
              <div className="container flex flex-col lg:flex-row">
                <div className="lg:w-1/2 text-center lg:pr-4">
                  <p className="text-gray-700 text-sm text-justify mt-2 mb-2 leading-relaxed">
                    La institución se debe fundamentalmente a la sociedad y Fuerzas Armadas, a ellas orienta su esfuerzo, contribuyendo a la solución de sus necesidades de desarrollo, mediante la formación profesional, técnica y científica, la investigación, planteamiento e implementación de soluciones en el ámbito de sus dominios académicos. Con la búsqueda permanente de la excelencia como institución centenaria y referente en la sociedad, mediante la práctica de los principios: respeto por la dignidad humana, identidad ESPE, excelencia académica; y los valores: disciplina, integridad, liderazgo, creatividad, cohesión y efectividad, en todas sus actividades 
                  </p>
                </div>

                <div className="lg:w-1/2 text-center lg:pl-4">
                  <p className="text-gray-700 text-sm text-justify mt-2 mb-2 leading-relaxed">
                  académicas y administrativas, aplicando métodos y herramientas efectivas  para la integración de la docencia, investigación y vinculación con la sociedad. La formación de profesionales se fundamenta en proyectos multidisciplinarios relacionados al paradigma “Smart University” que incluye el desarrollo de una universidad postmoderna con énfasis en la aplicación del gobierno electrónico (e-gobierno), internacionalización y modelo educativo innovador, tendiente a continuar como institución de educación superior de las Fuerzas Armadas, referente en el ámbito nacional e internacional.
                  </p>
                </div>
              </div>
           

            <br /><br />
            <div className="mt-10 flex-col lg:flex-row relative">
              <div className="bg-lime-500/10 w-full p-4 lg:p-10 lg:w-2/3 lg:py-16 lg:pl-16 lg:pr-56 shadow-xl">
                <h1 className="second-title mb-4">Misión</h1>
                <p className="text-gray-700 text-sm text-justify">
                  La Universidad de las Fuerzas Armadas-ESPE forma personas en el campo científico y tecnológico bajo un marco de principios y valores; y, genera  conocimiento transferible para contribuir al progreso del país y Fuerzas Armadas, a través de la docencia, investigación y vinculación con la sociedad.
                </p>
                <h1 className="second-title mt-10 mb-4">Visión al 2025</h1>
                <p className="text-gray-700 text-sm text-justify">
                  Al 2025, ser reconocidos a nivel nacional e internacional como una institución de educación superior de calidad en docencia, investigación y vinculación bajo el paradigma de una universidad inteligente, articulando la transferencia de ciencia y tecnología, a través de procesos de I+D+i; y, convirtiéndonos en un referente de pensamiento en seguridad y defensa, al servicio del país y Fuerzas Armadas.
                </p>
              </div>
              <div className="lg:absolute lg:top-20 lg:left-2/4 lg:ml-10">
                <Carousel autoPlay={true} interval={3000} infiniteLoop={true}>

                  <div>
                    <Image src="/schoolarSecurity/images/sede.jpg" width={700} height={100} alt="image" />
                  </div>
                  <div>
                    <Image src="/schoolarSecurity/images/Espe-Sede-Santo-Domingo-2.jpg" width={700} height={100} alt="image" />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
          <br /><br />

          <div className="lg:px-20  py-10">
            <Animate.FadeIn>
              <h1 className="mb-4 text-3xl color-gray-light font-bold " style={{ textAlign: "center" }}>
                Principios y valores
              </h1>
              <div className="flex justify-center">
                <img className="mb-1 " width="900" height="900" src="/schoolarSecurity/images/PrincipiosYValoresESPE.png" />
              </div>
            </Animate.FadeIn>
          </div>

          <div className="lg:px-20 container relative mt-10 py-10">
            <div className="flex flex-col items-center justify-center gap-4 px-6 fade-in">
              <h1 className="title">Carrera de Ingeniería en Tecnologías de la Información y Comunicación</h1>
            </div>

            <div className="text-sm font-medium text-center mt-6 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                <li className="mr-2">
                  <a
                    href="#"
                    className={"inline-block p-4 " + (openTab === 1 ? "text-color-secundario border-b-2 border-lime-500 rounded-t-lg  active" : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300")}
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                  >
                    Carrera
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="#"
                    className={"inline-block p-4 " + (openTab === 2 ? "text-color-secundario border-b-2 border-lime-500 rounded-t-lg  active" : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300")} aria-current="page"
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                  >
                    Visión y Misión
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="#"
                    className={"inline-block p-4 " + (openTab === 3 ? "text-color-secundario border-b-2 border-lime-500 rounded-t-lg  active" : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300")}
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                  >
                    Objetivos
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="#"
                    className={"inline-block p-4 " + (openTab === 4 ? "text-color-secundario border-b-2 border-lime-500 rounded-t-lg  active" : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300")}
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(4);
                    }}
                  >
                    Requisitos de ingreso
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="#"
                    className={"inline-block p-4 " + (openTab === 5 ? "text-color-secundario border-b-2 border-lime-500 rounded-t-lg  active" : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300")}
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(5);
                    }}
                  >
                    Perfil profesional
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="#"
                    className={"inline-block p-4 " + (openTab === 6 ? "text-color-secundario border-b-2 border-lime-500 rounded-t-lg  active" : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300")}
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(6);
                    }}
                  >
                    Requisitos de Egreso
                  </a>
                </li>
              </ul>
            </div>
            <div className={"flex justify-center p-2 " + (openTab === 1 ? "block" : "hidden")}>
              <div className="lg:px-20 flex flex-col py-4 fade-in">
                <div className="text-center">
                  <p className="text-gray-700 text-sm text-justify">
                    El Departamento de Ciencias de la Computación de la Universidad de las Fuerzas Armadas ESPE, ofrece en la provincia de Santo Domingo de los Tsáchilas y zonas de influencia la carrera de Ingeniería en Tecnologías de la Información (TI), en ocho (8) semestres forma Ingenieros en TI capaces de seleccionar, crear, aplicar, integrar y administrar eficientemente las tecnologías de la información orientadas a satisfacer las necesidades de los usuarios dentro de un entorno social, organizacional y humanista (ACM, 2008).
                  </p>
                </div>
                <div className="mt-4 flex-col lg:flex-row relative">
                  <div className=" w-full p-4 lg:p-10 lg:w-2/3 lg:py-10 lg:pl-10 lg:pr-56 shadow-xl">
                    <p className="text-gray-700 text-sm text-justify mb-6">
                      En este contexto, la Carrera busca la transformación del modelo de desarrollo económico y social del país en base a la selección, creación, aplicación, integración y administración de tecnologías computacionales innovadoras, que contribuyan a la consecución de la sociedad del conocimiento y la disminuyendo de la brecha digital con condiciones técnicas para la expansión del acceso universal a la información.
                    </p>
                    <p className="text-gray-700 text-sm text-justify">
                      La currícula del Ingeniero en TI se compone de itinerarios teóricos, metodológicos y prácticos, de tal forma que se cubra íntegramente el entorno de formación del profesional. Los itinerarios teóricos se conforman de contenidos básicos y profesionales, que brindan al estudiante las herramientas teóricas básicas para comprender el fundamento ingenieril de las TI desde la perspectiva de las matemáticas.
                    </p>
                  </div>
                  <div className="lg:absolute lg:top-20 lg:left-2/4 lg:ml-10 shadow-xl">
                    <Image src="/schoolarSecurity/images/DOCENTES ESPE.jpg" width={500} height={100} alt="image" />
                  </div>
                </div>
              </div>
            </div>
            <div className={"flex justify-center p-2 " + (openTab === 2 ? "block" : "hidden")}>
              <div className="lg:px-20 flex flex-col fade-in py-4">
                <div className="flex flex-col lg:flex-row gap-x-4 mb-4">
                  <div className=" w-full p-4 lg:p-10 lg:w-1/2">
                    <h1 className="second-title mb-4">Misión</h1>
                    <div className="text-justify">
                      <p className="text-gray-700 text-sm">
                        Formar académicos, profesionales e investigadores de excelencia, creativos, humanistas, con capacidad de liderazgo, pensamiento crítico y alta conciencia ciudadana; generar, aplicar y difundir el conocimiento y, proporcionar e implementar alternativas de solución a los problemas del país, acordes con el plan Nacional de Desarrollo.
                      </p>
                    </div>
                  </div>
                  <div className=" w-full p-4 lg:p-10 lg:w-1/2">
                    <h1 className="second-title mb-4">Visión</h1>
                    <div className="text-justify">
                      <p className="text-gray-700 text-sm">
                        Líder en la gestión del conocimiento y de la tecnología en el Sistema Nacional de Educación Superior, con prestigio Internacional y referente de práctica de valores éticos, cívicos y de servicio a la sociedad.
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" w-full p-4 lg:p-10">
                  <h1 className="second-title mb-4">Misión en Régimen Orgánico de Gestión por Procesos (ROGOP) (Art. 55.- Gestión de la formación de grado)</h1>
                  <div className="text-justify">
                    <p className="text-gray-700 text-sm">
                      Gestionar la ejecución de los sílabos de las asignaturas de las carreras y de los trabajos de titulación así como orientar la atención a las necesidades estudiante, mediante la aplicación de métodos y procedimientos ágiles, dinámicos y sencillos, a fin de promover la formación de académicos, profesionales e investigadores de excelencia, creativos, humanistas, con capacidad de liderazgo, pensamiento crítico y alta conciencia ciudadana.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"flex justify-center p-2 " + (openTab === 3 ? "block" : "hidden")}>
              <div>
                <img className="mx-auto my-4" width="640" height="720" src="/schoolarSecurity/images/objetivos.svg" alt="Objetivos"></img>
              </div>
            </div>
            <div className={"flex justify-center p-2  " + (openTab === 4 ? "block" : "hidden")}>
              <div className="bg-lila-100 w-full lg:p-10">
                <div className="text-justify">
                  <p className="text-gray-700 text-sm mb-4 ">
                    La Constitución de la República del Ecuador en el segundo inciso del artículo 356, señala que: “El ingreso a las instituciones públicas de educación superior se regulará a través de un sistema de nivelación y admisión, definido en la ley”.
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    Así como también el artículo 182 de la Ley Orgánica de Educación Superior, dispone que: “La secretaria Nacional de Educación Superior Ciencia, Tecnología e innovación, es el órgano que tiene por objeto ejercer la rectoría de la política pública de educación superior y coordinar las acciones entre la Función Ejecutiva y las instituciones del Sistema de Educación Superior. . .”;
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    Complementariamente el artículo 183 de la Ley Orgánica de Educación Superior, dispone entre las funciones de la Secretaria Nacional de Educación Superior, Ciencia, Tecnología e innovación, la de: “Diseñar, implementar administrar y coordinar el Sistema Nacional de información de la Educación Superior del Ecuador y el Sistema Nacional de Nivelación y Admisión”.
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    Por lo tanto, es completa atribución del SENESCYT, seleccionar a los aspirantes a las universidades públicas, aplicar el Examen Nacional para la Educación Superior (ENES) y asignar en función de los cupos declarados por las IES, el número de estudiantes que ingresan a las distintas carreras.
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    Lo que le compete a esta institución, lo que tiene que hacer en estudiante seleccionado, en cumplimiento al Art. 68 del Reglamento Interno, Régimen Académico y de Estudiantes de la Universidad de las Fuerzas Armadas ESPE 2014, es la legalización de la matrícula, para lo cual se solicita al aspirante lo siguiente:
                  </p>
                  <ul className="list-disc text-sm font-bold ml-5">
                    <li>1. Poseer título de bachiller o su equivalente</li>
                    <li>
                      2. Haber cumplido los requisitos normados por el sistema nacional de nivelación y admisión
                    </li>
                    <li>
                      3. El proceso de inscripción, evaluación y selección de aspirantes a las diferentes carreras de tercer nivel, será regentada en el estamento que corresponda.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={"flex justify-center p-2 " + (openTab === 5 ? "block" : "hidden")}>
              <div className="bg-lila-100 w-full lg:p-10">
                <div className="text-justify">
                  <p className="text-gray-700 text-sm mb-4">
                    El Ingeniero en Tecnologías de la Información (TI), responde a una necesidad nacional como un profesional competente para aportar directamente en la materialización del cambio de modelo de producción del país, y en el soporte transversal que pueda brindar a las políticas expresadas en el Plan Nacional de Desarrollo.
                  </p>
                  <h3 className="font-bold mb-4">Perfil de Egreso</h3>
                  <p className="font-bold text-sm">Caracterización del Ingeniero en Tecnologías de la Información (TI):</p>
                  <ul className="list-disc text-sm ml-5">
                    <li>
                      Diseña, implementa, y evalúa: sistemas, procesos, componentes o programas basados en computadoras cuyo uso permitirá satisfacer las necesidades identificadas en las organizaciones.
                    </li>
                    <li>
                      Crea planes de proyectos de TI efectivos.
                    </li>
                    <li>
                      Trabaja de forma efectiva en equipo para lograr un objetivo común
                    </li>
                    <li>
                      Aplica los conocimientos de la informática y las matemáticas apropiadas a la disciplina.
                    </li>
                    <li>
                      Demuestra capacidad de identificar y analizar un problema; así como de definir los requisitos informáticos adecuados para su solución. • Utiliza las herramientas necesarias para la práctica de la informática demostrando habilidad y aplicando técnicas actuales.
                    </li>
                    <li>
                      Diseña, implementa y evalúa sistemas, procesos, componentes o programas basados en computadoras, cuyo uso permitirá satisfacer las necesidades identificadas en las organizaciones.
                    </li>
                    <li>
                      Identifica y analiza las necesidades identificadas en las organizaciones durante la selección, creación, evaluación y administración de sistemas informáticos.
                    </li>
                    <li>
                      Integra efectivamente las soluciones basadas en TI en el entorno de usuario.
                    </li>
                    <li>
                      Conoce y aplica las mejores prácticas, normas y estándares en el campo de las TI.
                    </li>
                    <li>
                      Analiza el impacto local y global de la informática en los individuos, las organizaciones y la sociedad.
                    </li>
                    <li>
                      Comprende los aspectos relacionados con la profesión: éticos, legales, de seguridad, las cuestiones sociales y sus responsabilidades.
                    </li>
                    <li>
                      Utiliza y aplica los conceptos técnicos y prácticas actuales de las tecnologías de la información como base de las soluciones informáticas implementadas.
                    </li>
                    <li>
                      Integra efectivamente las soluciones basadas en TI en el entorno de usuario.
                    </li>
                  </ul>
                  <p className="font-bold text-sm mt-5">Cognitivas:</p>
                  <ul className="list-disc text-sm ml-5">
                    <li>
                      Fundamentos matemáticos para el desarrollo de habilidades de abstracción y modelamiento formal
                    </li>
                    <li>
                      Fundamentos de ingeniería de software
                      Uso de herramientas tecnológicas: sistemas operativos, lenguajes de programación, bases de datos, herramientas CASE
                    </li>
                    <li>
                      Fundamentos y principios de inteligencia artificial
                    </li>
                    <li>
                      Fundamentos de telecomunicaciones y redes de datos
                    </li>
                    <li>
                      Principios de gestión de tecnologías de información
                    </li>
                    <li>
                      Fundamentos de investigación científica
                    </li>
                    <li>
                      Preceptos de gestión y de las disciplinas de diseño
                    </li>
                  </ul>
                  <p className="font-bold text-sm mt-5">Procedimentales:</p>
                  <ul className="list-disc text-sm ml-5">
                    <li>
                      Desarrollar, evaluar y mantener software, en base de fundamentos sólidos de ingeniería
                    </li>
                    <li>
                      Diseñar, implementar, mantener y evaluar redes de comunicación
                    </li>
                    <li>
                      Identificar y proponer soluciones informáticas integradas
                    </li>
                    <li>
                      Participar en el diseño y mejoramiento de sistemas y procesos
                    </li>
                    <li>
                      Dirigir equipos de trabajo en el ámbito informático
                    </li>
                    <li>
                      Planificar, coordinar y gestionar proyectos tecnológicos
                    </li>
                    <li>
                      Investigar nuevas tecnologías
                    </li>
                    <li>
                      Brindar soporte a usuarios (Help Desk y backoffice).
                    </li>
                  </ul>
                  <p className="text-gray-700 text-sm my-4">
                    Adicionalmente, el Ingeniero en TI contribuirá indirectamente con fortalecer las capacidades y potencialidades de la ciudadanía, a través del desarrollo de la capacidad de investigación, emprendimiento e innovación en el campo de las TI, como parte de un proceso formativo que garantice el desarrollo de las tres funciones sustantivas de la universidad: Docencia, investigación y vinculación con la sociedad.
                  </p>
                  <p className="font-bold text-sm mt-5">Procedimentales:</p>
                  <ul className="list-disc text-sm ml-5">
                    <li>
                      Demostrar un comportamiento ético sobre todas las cosas a través de la práctica de valores.
                    </li>
                    <li>
                      Evidenciar habilidades de negociación y buenas relaciones interpersonales
                    </li>
                    <li>
                      Tener buena predisposición para adaptarse a los cambios
                    </li>
                    <li>
                      Evidenciar autodisciplina en el trabajo y capacidad de autoaprendizaje
                    </li>
                    <li>
                      Poseer un alto espíritu emprendedor
                    </li>
                    <li>
                      Evidenciar capacidades de: solidaridad, cooperación, responsabilidad, autonomía, alta conciencia ciudadana y espíritu de innovación y creatividad
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={"flex justify-center p-2 " + (openTab === 6 ? "block" : "hidden")}>
              <div className="bg-lila-100 w-full lg:p-10">
                <div className="text-justify">
                  <h3 className="text-gray-700 font-bold mb-4">
                    Requisitos de Egreso
                  </h3>
                  <ul className="list-disc text-sm ml-5">
                    <li>
                      Aprobar el currículo de la correspondiente carrera, incluidas las prácticas pre profesionales de conformidad con los reglamentos institucionales vigentes.
                    </li>
                    <li>
                      Presentar el informe de aprobación del currículo y practicas pre – profesionales emitido por el Director de Carrera.
                    </li>
                    <li>
                      Presentar el certificado de haber completado el currículo emitido por Admisión y Registro.
                    </li>
                    <li>
                      Elaborar el trabajo de titulación o rendir el examen de grado.
                    </li>
                    <li>
                      Aprobar el trabajo de titulación.
                    </li>
                    <li>
                      Defender públicamente el trabajo de titulación.
                    </li>
                    <li>
                      Pagar los derechos cuando correspondan.
                    </li>
                    <li>
                      No registrar alguna novedad en ninguna dependencia de la Universidad de las Fuerzas Armadas ESPE.
                    </li>
                    <li>
                      Aprobar las asignaturas del Programa de actualización de conocimientos, para los casos establecidos en el Reglamento.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>
    </Layout >
    </>
  );
};

export default FilosofiaPage;

