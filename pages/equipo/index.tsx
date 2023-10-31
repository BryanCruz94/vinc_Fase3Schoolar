import React, { FC, PropsWithChildren } from "react";
import { Layout } from "../../components/layouts/Layout";
import { EnvelopeIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { text } from "stream/consumers";

const EquipoPage: FC<PropsWithChildren<{}>> = ({ }) => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Layout title="Nuestro Equipo">
        <section className="text-gray-600 body-font">
          <div className="container px-10 py-12 md:py-20 mx-auto ml-0 ">
            <div className="text-justify mb-10">
              <br />
              <h1 className="text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Miembros de nuestro equipo</h1>
              <p className="mx-auto leading-relaxed text-base">
                La Universidad de las Fuerzas Armadas ESPE es una institución académica reconocida por su excelencia en la formación de profesionales altamente capacitados en diversas áreas del conocimiento. Su compromiso con la calidad educativa, su amplia trayectoria y su vinculación con las Fuerzas Armadas la convierten en una institución destacada en el ámbito educativo. Como estudiantes de la carrera de Ingeniería de Tecnologías de la Información, nos enorgullece apoyar a iniciativas como esta que buscan mejorar el bienestar de las comunidades. Hemos trabajado arduamente para desarrollar una aplicación efectiva que contribuya a la seguridad y protección de los habitantes. ¡Estamos comprometidos en crear un entorno seguro y brindar soluciones innovadoras para enfrentar los desafíos de seguridad en la provincia!
              </p>
            </div>
            <div className="flex flex-wrap -m-2 justify-center">
              <div className="w-full h-10"></div>
              <h3 className="w-full text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-500 ">Docentes</h3>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/dmkvix7ds/image/upload/v1695635408/LuisCastillo_hg2kj1.png" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Luis Castillo</h2>
                    <p className="text-gray-500">Director de Proyecto</p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/dmkvix7ds/image/upload/v1695635408/VeronicaMartinez_jvqovf.png" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Verónica Martinez</h2>
                    <p className="text-gray-500">Docente de apoyo</p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/dmkvix7ds/image/upload/v1695635407/Edwin_Camino_xfm0xx.jpg" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Edwin Camino</h2>
                    <p className="text-gray-500">Docente de apoyo</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-10"></div>
              <h3 className="w-full text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-500">Tesistas</h3>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/ddodvvqcq/image/upload/v1696447805/images/MariaParraga.jpg" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">María Párraga</h2>
                    <p className="text-gray-500">Tesista</p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/ddodvvqcq/image/upload/v1696447805/images/VinicioBorja.jpg" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Vinicio Borja</h2>
                    <p className="text-gray-500">Tesista</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-10"></div>
              <h4 className=" w-full text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-500">Estudiantes Desarrolladores WEB de Vinculación Fase II</h4>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/dmkvix7ds/image/upload/v1695633551/VergaraDayana_gpnb2j.png" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Dayana Vergara</h2>
                    <p className="text-gray-500">Estudiante</p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/dmkvix7ds/image/upload/v1695633551/Bryan_Cruz_mijxrp.png" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Bryan Cruz</h2>
                    <p className="text-gray-500">Estudiante</p>
                  </div>
                </div>
              </div>

              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/dmkvix7ds/image/upload/v1695633551/Stefy_Erazo_pset76.jpg" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Stefany Erazo</h2>
                    <p className="text-gray-500">Estudiante</p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/dmkvix7ds/image/upload/v1695633551/StefyHernandez_aqpquo.png" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Stefanny Hernandez</h2>
                    <p className="text-gray-500">Estudiante</p>
                  </div>
                </div>
              </div>

              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/dmkvix7ds/image/upload/v1695633551/Kevin_Azua_oqurju.png" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Kevin Azua</h2>
                    <p className="text-gray-500">Estudiante</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-10"></div>
              <h3 className="w-full text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-500">Estudiantes Desarrolladores Móvil de Vinculación Fase II</h3>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/ddodvvqcq/image/upload/v1696952233/images/MateoBeltran.jpg" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Mateo Beltrán</h2>
                    <p className="text-gray-500">Estudiante</p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/ddodvvqcq/image/upload/v1696952233/images/JosueChica.jpg" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Jhosue Chica</h2>
                    <p className="text-gray-500">Estudiante</p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/ddodvvqcq/image/upload/v1696952233/images/JairSanchez.jpg" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Jaír Sanchez</h2>
                    <p className="text-gray-500">Estudiante</p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/ddodvvqcq/image/upload/v1696952233/images/SteveenRiofrio.jpg" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Steeven Riofrío</h2>
                    <p className="text-gray-500">Estudiante</p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://res.cloudinary.com/ddodvvqcq/image/upload/v1696952233/images/LaylinBohorquez.jpg" />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">Laylin Bohorquez</h2>
                    <p className="text-gray-500">Estudiante</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* <section>
          <div className="w-full h-full bg-gray-100 pt-12 lg:pt-32 lg:pb-12 lg:px-20 mb-0">
            <div className=" w-full h-full">
              <div className="w-full h-full flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 p-10 lg:p-20 flex items-center">
                  <div>
                    <h1 className="title mb-10 text-color-primario">Miembros de nuestro equipo</h1>
                    <p className="text-sm text-justify">
                      La Universidad de las Fuerzas Armadas ESPE es una institución
                      académica reconocida por su excelencia en la formación de
                      profesionales altamente capacitados en diversas áreas del
                      conocimiento. Su compromiso con la calidad educativa, su
                      amplia trayectoria y su vinculación con las Fuerzas Armadas la
                      convierten en una institución destacada en el ámbito
                      educativo. Como estudiantes de la carrera de Ingeniera de
                      Tecnologías de la Información, nos enorgullece apoyar a
                      iniciativas como esta que buscan mejorar el bienestar de las
                      comunidades. Hemos trabajado arduamente para desarrollar una
                      aplicación efectiva que contribuya a la seguridad y protección
                      de los habitantes. ¡Estamos comprometidos en crear un entorno
                      seguro y brindar soluciones innovadoras para enfrentar los
                      desafíos de seguridad en la provincia!
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col bg-white">
                  <div className="w-full flex flex-col lg:flex-row h-full lg:h-1/2 overflow-hidden">
                    <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center text-center gap-y-4 px-6 py-4">
                      <LightBulbIcon className="text-color-secondary h-14 w-14" />
                      <p className="font-bold text-color-primario second-title">Vinicio Leonardo Borja</p>
                    </div>
                    <div className="w-full lg:w-1/2 h-full ">
                      <div className=" flip-card ">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <Image
                              width={500}
                              height={500}
                              src="/schoolarSecurity/images/vinicio.jpg"
                              className="object-fill"
                              alt="Persona 1"
                            />
                          </div>
                          <div className="flip-card-back bg-color-primario">
                            <div className="flex flex-col justify-center items-center text-center w-full h-full">
                              <p className="second-title text-white text-sm">
                                Desarrollador de Software
                              </p>
                              <a
                                className="block text-white italic hover:underline text-center"
                                href="mailto:vinicio.borja10@gmail.com"
                              >
                                vinicio.borja10@gmail.com
                              </a>
                              <a
                                className="block text-white italic hover:underline text-center"
                                href="https://github.com/Vinici0"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Ver Perfil de github
                              </a>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col-reverse lg:flex-row h-full lg:h-1/2 overflow-hidden">
                    <div className="w-full lg:w-1/2 h-full">
                      <div className="flip-card ">
                        <div className="flip-card-inner">
                          <div className="flip-card-front flex justify-end">
                            <Image
                              width={500}
                              height={100}
                              src="/schoolarSecurity/images/majo.jpg"
                              alt="Persona 1"
                              className="object-cover object-top"
                            />
                          </div>
                          <div className="flip-card-back bg-color-secondary">
                            <div className="flex flex-col justify-center items-center text-center w-full h-full">
                              <p className="second-title text-white text-sm">
                                Desarrollador de Software
                              </p>
                              <a
                                className="block text-white italic hover:underline text-center"
                                href="mailto:mariaparraga2000@gmail.com"
                              >
                                mariaparraga2000@gmail.com
                              </a>
                              <a
                                className="block text-white italic hover:underline text-center"
                                href="https://github.com/majito02"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Ver Perfil de github
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center text-center gap-y-4 px-6 py-4">
                      <LightBulbIcon className="text-color-secondary h-14 w-14 " />
                      <p className="font-bold text-color-primario second-title">María José Párraga</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </Layout>
    </>
  );
};

export default EquipoPage;
