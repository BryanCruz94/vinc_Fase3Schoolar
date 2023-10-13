import React, { useState, useEffect, useContext, use, useReducer } from "react";
import dynamic from "next/dynamic";
import { saveAs } from "file-saver";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Layout } from "../../components/layouts/Layout";
const Map = dynamic(() => import("./Map"), {
  loading: () => <p>Map is loading</p>,
  ssr: false,
});
import es from "./date-fns.locale.es"; // Importa la configuración en español
import {
  defaultStaticRanges,
  defaultInputRanges,
} from "react-date-range/dist/defaultRanges";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import moment from "moment";
import { DocumentArrowDownIcon } from "@heroicons/react/20/solid";
import {
  UserGroupIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { ApexOptions } from "apexcharts";
import { DateRangePicker } from "react-date-range";
import { AuthContext, AuthState, authReducer } from "@/context/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { log } from "console";

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface DataUer {
  role: string;
  unidadEducativa: string;
}

const baseUrl = "http://192.188.58.82:3000/api/v2";

const defaultPosition = {
  lat: 35.7407872,
  lng: 51.4375991,
  zoom: 13,
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
const fechaActual = new Date();

// Restar un mes a la fecha actual
fechaActual.setMonth(fechaActual.getMonth() - 1);

const ReportsPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // Inicialmente, establezca loading en true
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const [dataUser, setDataUser] = useState({
    role: "dg",
    unidadEducativa: "",
  });

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
      console.log(" console.log(token, usuario.unidadEducativa);");

      console.log(token, usuario.unidadEducativa, usuario.role, 'HOLA MUNDO');
      const newDataUser = {
        role: usuario.role,
        unidadEducativa: usuario.unidadEducativa,
      };

      Cookies.set("token", token);
      // Actualizar dataUser.role con el nuevo rol de usuario.role
      setDataUser(newDataUser);
      
      console.log("dataUser", dataUser);
      console.log("Solo ROL", newDataUser.role);
      dispatch({ type: "[Auth] - Login", payload: usuario });
      setLoading(false);
    } catch (error) {
      Cookies.remove("token");
      router.replace("/auth/login.html").then(() => setLoading(false));
    }
  };

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: fechaActual,
    endDate: new Date(),
    key: "selection",
  });

  const handleDateChange = (range: any) => {
    if (range.selection) {
      console.log(range.selection != undefined);
      setSelectedDateRange(range.selection);
    } else {
      setSelectedDateRange(range.range1);
    }
    console.log(range.selection);
    console.log(range);
  };

  const [openTab, setOpenTab] = useState(1);
  const [activeElement, setActiveElement] = useState("");
  const [dataBarras, setDataBarras] = useState([
    {
      name: "Series 1",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    },
  ]);
  const [optionsBarras, setOptionsBarras] = useState<ApexOptions>({
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    // title: {
    //   text: 'Gráfico linel de emergencias',
    //   align: 'left'
    // },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  });
  const [selectedCiudad, setSelectedCiudad] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [selectedUnidadEducativa, setSelectedUnidadEducativa] = useState("");
  const [unidadesEducativas, setUnidadEducativa] = useState([]);
  const [selectedBarrio, setSelectedBarrio] = useState("");
  const [barrios, setBarrios] = useState([]);
  const [selectedEmergencia, setSelectedEmergencia] = useState("");
  const [emergencias, setEmergencias] = useState([]);
  const [anios, setAnios] = useState([]);
  const [selectedAnio, setSelectedAnio] = useState("");
  const [selectedMes, setSelectedMes] = useState("");
  const [selectedDia, setSelectedDia] = useState("");
  const [selectedHoraInicio, setSelectedHoraInicio] = useState("");
  const [selectedHoraFin, setSelectedHoraFin] = useState("");
  const [publicacionesRegistradas, setPublicacionesRegistradas] = useState(0);
  const [usuariosRegistros, setUsuariosRegistros] = useState(0);
  const [publicacionesDelMes, setPublicacionesDelMes] = useState(0);
  const [publicacionesDelDia, setPublicacionesDelDia] = useState(0);

  const [horasFinMostrar, setHorasFinMostrar] = useState([
    { value: "1", label: "01:00 AM" },
    { value: "2", label: "02:00 AM" },
    { value: "3", label: "03:00 AM" },
    { value: "4", label: "04:00 AM" },
    { value: "5", label: "05:00 AM" },
    { value: "6", label: "06:00 AM" },
    { value: "7", label: "07:00 AM" },
    { value: "8", label: "08:00 AM" },
    { value: "9", label: "09:00 AM" },
    { value: "10", label: "10:00 AM" },
    { value: "11", label: "11:00 AM" },
    { value: "12", label: "12:00 PM" },
    { value: "13", label: "13:00 PM" },
    { value: "14", label: "14:00 PM" },
    { value: "15", label: "15:00 PM" },
    { value: "16", label: "16:00 PM" },
    { value: "17", label: "17:00 PM" },
    { value: "18", label: "18:00 PM" },
    { value: "19", label: "19:00 PM" },
    { value: "20", label: "20:00 PM" },
    { value: "21", label: "21:00 PM" },
    { value: "22", label: "22:00 PM" },
    { value: "23", label: "23:00 PM" },
    { value: "24", label: "24:00 PM" },
  ]);
  const [dataBarrasNumber, setDataBarrasNumber] = useState([]);
  const [primeraVez, setPrimeraVez] = useState(true);

  const [dataPastel, setDataPastel] = useState([
    { data: [25, 15, 44, 55, 41, 17] },
  ]);
  const [heatmapOptionsPie, setHeatmapOptionsPie] = useState<ApexOptions>({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["25", "15", "44", "55", "41", "17"],
    },
    colors: ["#FF5733", "#3366CC", "#66CC66"],
  });
  const [labelsBarras, setLabelsBarras] = useState([]);
  const ReporteCard = ({ titulo, descripcion, valor }: any) => {
    return (
      <div className="h-full flex flex-col justify-between rounded-md p-3">
        <div>
          <h3 className="text-lg font-semibold text-color-secundario">
            {titulo}
          </h3>
          <p className="text-gray-500">{descripcion}</p>
        </div>
        <div className="mt-1">
          <span className="text-3xl font-bold text-color-espe">{valor}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    datosIniciales();
    console.log(dataUser, "dataUser");
  }, [
    selectedCiudad,
    selectedBarrio,
    selectedEmergencia,
    selectedDateRange.startDate,
    selectedDateRange.endDate,
    selectedHoraInicio.$d,
    selectedHoraFin.$d,
  ]);
  /*-----------------------------------------------------------
  |                                                           |
  |             FUNCIONES                                     |
  |                                                           |
  ------------------------------------------------------------|*/
  //TODO: obtener datos de unidades eduvativas
  const datosIniciales = async () => {
    await obtenerciudades();
    await obtenerUnidadesEducativas();
    await obtenerBarrios(selectedCiudad);
    await obtenerEmergencias(selectedCiudad, selectedBarrio);
    await obtenerAnios(selectedCiudad, selectedBarrio, selectedEmergencia);
    await obtenerDatosCards();
    await generearGraficos();
    setPrimeraVez(false);
  };

  /* ciudad */
  const obtenerciudades = () => {
    axios
      .get("http://192.188.58.82:3000/api/v2/reportes/obtenerCiudades") //api obtener ciudades
      .then((response) => {
        console.log("obtenerUnidadesEducativas");

        setCiudades(response.data.data);
        if (primeraVez) {
          setSelectedCiudad(response.data.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* Unidad Educativa */
  const obtenerUnidadesEducativas = () => {
    axios
      .get(
        "http://192.188.58.82:3000/api/v2/reportes/obtenerUnidadesEducativas"
      ) //api obtener ciudades
      .then((response) => {
        setUnidadEducativa(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cambiarCiudad = async (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    await setSelectedCiudad(event.target.value);
    await obtenerBarrios(selectedCiudad);
    await obtenerEmergencias(selectedCiudad, selectedBarrio);
    await obtenerAnios(selectedCiudad, selectedBarrio, selectedAnio);
    await generearGraficos();
    await setSelectedBarrio("");
    await setSelectedEmergencia("");
  };

  // const obtenerUnidadesEducativas = (ciudad: any) => {
  //   axios
  //     .post("http://192.188.58.82:3000/api/v2/reporte/obtenerUnidadesEducativas", { ciudad }) //api obtener ciudades
  //     .then((response) => {
  //       setUnidadEducativa(response.data.data);
  //       console.log(response.data.data);
  //     }
  //     )
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  /* Barrio */
  const cambiarBarrio = async (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    await setSelectedBarrio(event.target.value);
    await obtenerEmergencias(selectedCiudad, selectedBarrio);
    await obtenerAnios(selectedCiudad, selectedBarrio, selectedAnio);
    await generearGraficos();
  };

  const cambiarUnidadEducativa = async (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    if (state.user?.role === "ADMIN_ROLE") {
      await setSelectedUnidadEducativa(selectedUnidadEducativa);
    }

    if (state.user?.role === "SUPER_ADMIN_ROLE") {
      await setSelectedUnidadEducativa(event.target.value);
    }
    // await setSelectedUnidadEducativa(selectedCiudad);
    await obtenerEmergencias(selectedCiudad, selectedBarrio);
    await obtenerAnios(selectedCiudad, selectedBarrio, selectedAnio);
    console.log(selectedUnidadEducativa);

    await generearGraficos();
  };

  const cambiarUnidadEducativaV2 = async (data: any) => {
     setSelectedUnidadEducativa(data);
     

    // await setSelectedUnidadEducativa(selectedCiudad);
    await obtenerEmergencias(selectedCiudad, selectedBarrio);
    await obtenerAnios(selectedCiudad, selectedBarrio, selectedAnio);
 
    console.log(selectedUnidadEducativa);

    await obtenerMapaCalor(
      selectedCiudad,
      selectedBarrio,
      selectedEmergencia,
      selectedDateRange.startDate,
      selectedDateRange.endDate,
      selectedHoraInicio.$d,
      selectedHoraFin.$d,
      data
    );

    await obtenerReporteBarras(
      selectedCiudad,
      selectedBarrio,
      selectedEmergencia,
      selectedDateRange.startDate,
      selectedDateRange.endDate,
      selectedHoraInicio.$d,
      selectedHoraFin.$d,
      data
    );

    await obtenerReportPastel(
      selectedCiudad,
      selectedBarrio,
      selectedEmergencia,
      selectedDateRange.startDate,
      selectedDateRange.endDate,
      selectedHoraInicio.$d,
      selectedHoraFin.$d,
      data
    );

    await obtenerCoordenadas(
      selectedCiudad,
      selectedBarrio,
      selectedEmergencia,
      selectedDateRange.startDate,
      selectedDateRange.endDate,
      selectedHoraInicio.$d,
      selectedHoraFin.$d,
      data
    );
    debugger;
  };

  useEffect(() => {
    // Función para obtener unidades educativas con un retraso de 1 segundo
    const obtenerUnidadesEducativasConRetraso = () => {
      // Retrasar la llamada a obtenerUnidadesEducativas en 1 segundo
      setTimeout(() => {
        obtenerUnidadesEducativas();
      }, 1000); // 1000 milisegundos (1 segundo)
    };

    obtenerUnidadesEducativasConRetraso(); // Llama a la función con retraso

    // Función para obtener unidades educativas
    const obtenerUnidadesEducativas = async () => {
      try {
        // Hacer la solicitud para obtener las unidades educativas
        let unidadEducativa = [];
        const response = await axios.get(
          "http://192.188.58.82:3000/api/v2/reportes/obtenerUnidadesEducativas"
        );

        // Verificar si existe un usuario y su unidad educativa
        if (state.user && state.user.unidadEducativa) {
          if (state.user.role === "ADMIN_ROLE") {
            // Filtrar las unidades educativas que coinciden con la unidad del usuario
            unidadEducativa = response.data.data.filter(
              (unidad: any) => unidad === state.user!.unidadEducativa
            );
            setUnidadEducativa(unidadEducativa);
            console.log(unidadEducativa);
            console.log("cambiarUnidadEducativa");

            await setSelectedUnidadEducativa(unidadEducativa[0]);
            console.log(unidadEducativa[0]);
            console.log("unidadEducativa[0]");
            debugger;
        
          } else if (state.user.role === "SUPER_ADMIN_ROLE") {
            // Traer todas las unidades educativas si el usuario tiene rol SUPER_ADMIN_ROLE
            setUnidadEducativa(response.data.data);
          }
        }

        await cambiarUnidadEducativaV2(unidadEducativa[0]);
      } catch (error) {
        // Manejar los errores aquí, por ejemplo, mostrar un mensaje de error al usuario
        console.error(error);
      }
    };
  }, [state.user, selectedCiudad]);

  const obtenerBarrios = (ciudad: any) => {
    axios
      .post("http://192.188.58.82:3000/api/v2/reportes/obtenerBarrios", {
        ciudad,
      }) //api obtener barrios de la provincia
      .then((response) => {
        setBarrios(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  /* Emergencia */
  const cambiarEmergencia = async (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    await setSelectedEmergencia(event.target.value);
    await obtenerAnios(selectedCiudad, selectedBarrio, selectedAnio);
    await generearGraficos();
  };
  const obtenerEmergencias = (ciudad: any, barrio: any) => {
    axios
      .post("http://192.188.58.82:3000/api/v2/reportes/obtenerEmergencias", {
        ciudad,
        barrio,
      })
      .then((response) => {
        setEmergencias(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  /* Anio */
  const cambiarAnio = async (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    await setSelectedAnio(event.target.value);
    await generearGraficos();
  };

  const obtenerAnios = (ciudad: any, barrio: any, titulo: any) => {
    axios
      .post("http://192.188.58.82:3000/api/v2/reportes/obtenerAnios", {
        ciudad,
        barrio,
        titulo,
      }) //Api obtener años
      .then((response) => {
        setAnios(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  /* HORAS */
  const cambiarHoraInicio = async (seleted: any) => {
    await setSelectedHoraInicio(seleted);
    await generearGraficos();
  };
  const cambiarHoraFin = async (seleted: any) => {
    await setSelectedHoraFin(seleted);
    await generearGraficos();
  };
  const cambiarMes = async (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    await setSelectedMes(event.target.value);
    await generearGraficos();
  };
  const cambiarDia = async (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    await setSelectedDia(event.target.value);
    await generearGraficos();
  };

  /* TODO: Graficas */
  const generearGraficos = async () => {
    debugger;

    console.log(`  selectedCiudad,
    selectedBarrio,
    selectedEmergencia,
    selectedDateRange.startDate,
    selectedDateRange.endDate,
    selectedHoraInicio.$d,
    selectedHoraFin.$d,
    selectedUnidadEducativa`);

    console.log(
      selectedCiudad,
      selectedBarrio,
      selectedEmergencia,
      selectedDateRange.startDate,
      selectedDateRange.endDate,
      selectedHoraInicio.$d,
      selectedHoraFin.$d,
      selectedUnidadEducativa
    );

    debugger;

    await obtenerMapaCalor(
      selectedCiudad,
      selectedBarrio,
      selectedEmergencia,
      selectedDateRange.startDate,
      selectedDateRange.endDate,
      selectedHoraInicio.$d,
      selectedHoraFin.$d,
      selectedUnidadEducativa
    );

    await obtenerReporteBarras(
      selectedCiudad,
      selectedBarrio,
      selectedEmergencia,
      selectedDateRange.startDate,
      selectedDateRange.endDate,
      selectedHoraInicio.$d,
      selectedHoraFin.$d,
      selectedUnidadEducativa
    );

    await obtenerReportPastel(
      selectedCiudad,
      selectedBarrio,
      selectedEmergencia,
      selectedDateRange.startDate,
      selectedDateRange.endDate,
      selectedHoraInicio.$d,
      selectedHoraFin.$d,
      selectedUnidadEducativa
    );

    await obtenerCoordenadas(
      selectedCiudad,
      selectedBarrio,
      selectedEmergencia,
      selectedDateRange.startDate,
      selectedDateRange.endDate,
      selectedHoraInicio.$d,
      selectedHoraFin.$d,
      selectedUnidadEducativa
    );
  };

  const obtenerReporteBarras = (
    ciudad: any,
    barrio: any,
    titulo: any,
    fechaInicio: any,
    fechaFin: any,
    horaInicio: any,
    horaFin: any,
    unidadEducativa: any
  ) => {
    axios
      .post("http://192.188.58.82:3000/api/v2/reportes/obtenerReporteBarras", {
        ciudad,
        barrio,
        titulo,
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        unidadEducativa,
      })
      .then((response) => {
        setDataBarrasNumber(response.data.data);
        console.log(response.data.data);
        const values: any = Object.keys(response.data.data);
        const conteos: any = Object.values(response.data.data);
        const labels: any = values.map((value: any) => value);

        setDataBarras([
          {
            name: "Total de emergencias por día",
            data: conteos.map((data: any) => data),
          },
        ]);
        setOptionsBarras({
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "Gráfico de lineal de emergencias",
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"],
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: labels,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const obtenerReportPastel = (
    ciudad: any,
    barrio: any,
    titulo: any,
    fechaInicio: any,
    fechaFin: any,
    horaInicio: any,
    horaFin: any,
    unidadEducativa: any
  ) => {
    axios
      .post("http://192.188.58.82:3000/api/v2/reportes/obtenerReportePastel", {
        ciudad,
        barrio,
        titulo,
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        unidadEducativa,
      })
      .then((response) => {
        /* setDataBarrasNumber(response.data.data); */
        const values: any = Object.keys(response.data.data);
        const conteos: any = Object.values(response.data.data);
        console.log("obtenerReportePastel");

        console.log(conteos);
        const colores = [
          "#FF5733",
          "#3366CC",
          "#66CC66",
          "#FFC300",
          "#FF9933",
          "#9966CC",
          "#FF3399",
          "#00CC99",
          "#FF6600",
          "#0099CC",
          "#FF9966",
          "#003366",
          "#CC9900",
          "#FF3300",
          "#339933",
          "#FF6600",
          "#006699",
          "#FF0033",
          "#00CCFF",
          "#FFCC33",
          // ... y así sucesivamente
        ];

        setHeatmapOptionsPie({
          chart: {
            type: "bar",
            height: 380,
          },
          plotOptions: {
            bar: {
              barHeight: "100%",
              distributed: true,
              horizontal: true,
              dataLabels: {
                position: "bottom",
              },
            },
          },
          colors: [
            "#CC9900",
            "#3366CC",
            "#66CC66",
            "#FFC300",
            "#FF9933",
            "#9966CC",
            "#FF3399",
            "#00CC99",
            "#FF6600",
            "#0099CC",
            "#FF9966",
            "#003366",
            "#CC9900",
            "#FF3300",
            "#339933",
            "#FF6600",
            "#006699",
            "#FF0033",
            "#00CCFF",
            "#FFCC33",
          ],
          dataLabels: {
            enabled: true,
            textAnchor: "start",
            style: {
              colors: ["#fff"],
            },
            formatter: function (val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
            },
            offsetX: 0,
            dropShadow: {
              enabled: true,
            },
          },
          stroke: {
            width: 1,
            colors: ["#fff"],
          },
          xaxis: {
            categories: values,
          },
          yaxis: {
            labels: {
              show: false,
            },
          },
          title: {
            text: "Reportes de Barras de Emergencias",
            align: "center",
            floating: true,
          },
          subtitle: {
            text: "Cantidad de Emergencias",
            align: "center",
          },
          tooltip: {
            theme: "dark",
            x: {
              show: false,
            },
            y: {
              title: {
                formatter: function () {
                  return "";
                },
              },
            },
          },
        });

        setDataPastel([{ data: conteos }]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const randomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  /*-------------------------------------------------------------
    |                                                           |
    |             CONSTANTES                                    |
    |                                                           |
    ------------------------------------------------------------|*/

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Reporte de emergencias",
      },
    },
  };

  const meses = [
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  const dias = [
    { value: "1", label: "Lunes" },
    { value: "2", label: "Martes" },
    { value: "3", label: "Miercoles" },
    { value: "4", label: "Jueves" },
    { value: "5", label: "Viernes" },
    { value: "6", label: "Sabado" },
    { value: "7", label: "Domingo" },
  ];

  const horas = [
    { value: "0", label: "00:00 AM" },
    { value: "1", label: "01:00 AM" },
    { value: "2", label: "02:00 AM" },
    { value: "3", label: "03:00 AM" },
    { value: "4", label: "04:00 AM" },
    { value: "5", label: "05:00 AM" },
    { value: "6", label: "06:00 AM" },
    { value: "7", label: "07:00 AM" },
    { value: "8", label: "08:00 AM" },
    { value: "9", label: "09:00 AM" },
    { value: "10", label: "10:00 AM" },
    { value: "11", label: "11:00 AM" },
    { value: "12", label: "12:00 PM" },
    { value: "13", label: "13:00 PM" },
    { value: "14", label: "14:00 PM" },
    { value: "15", label: "15:00 PM" },
    { value: "16", label: "16:00 PM" },
    { value: "17", label: "17:00 PM" },
    { value: "18", label: "18:00 PM" },
    { value: "19", label: "19:00 PM" },
    { value: "20", label: "20:00 PM" },
    { value: "21", label: "21:00 PM" },
    { value: "22", label: "22:00 PM" },
    { value: "23", label: "23:00 PM" },
    { value: "24", label: "24:00 PM" },
  ];

  const handleMesChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedMes(event.target.value);
  };
  const [total, setTotal] = useState(10);
  const [coordenadas, setCoordenadas] = useState([
    { titulo: 1, position: [-1.197, -78.508] },
  ]);

  const [heatmapData, sethHeatmapData] = useState([
    {
      name: "Lunes",
      data: [10, 2, 30, 40, 5, 60, 70],
    },
    {
      name: "Martes",
      data: [0, 0, 0, 0, 0, 0, 10, 2, 30, 40, 5, 60, 70],
    },
    {
      name: "Miércoles",
      data: [0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 30, 40, 5, 60, 70],
    },
    {
      name: "Jueves",
      data: [0, 0, 0, 0, 0, 0, 10, 20, 0, 0, 0, 40, 50, 60, 70],
    },
    {
      name: "Viernes",
      data: [[0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    },
    {
      name: "Sábado",
      data: [[10, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    },
    {
      name: "Domingo",
      data: [[0, 0, 0, 20, 30, 40, 0, 0, 0, 50, 60, 70]],
    },
  ]);
  const [heatmapOptions, setHeatmapOptions] = useState<ApexOptions>({
    chart: {
      type: "heatmap",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: 1,
              to: 30,
              name: "Bajo",
              color: "#A1D7C9",
            },
            {
              from: 31,
              to: 60,
              name: "Medio",
              color: "#efa94a",
            },
            {
              from: 61,
              to: 100,
              name: "Alto",
              color: "#FF4560",
            },
          ],
        },
      },
    },
    xaxis: {
      categories: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],
    },
    dataLabels: {
      enabled: false,
    },
  });

  const obtenerMapaCalor = (
    ciudad: any,
    barrio: any,
    titulo: any,
    fechaInicio: any,
    fechaFin: any,
    horaInicio: any,
    horaFin: any,
    unidadEducativa: any
  ) => {
    axios
      .post("http://192.188.58.82:3000/api/v2/reportes/obtenerMapaCalor", {
        ciudad,
        barrio,
        titulo,
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        unidadEducativa,
      })
      .then((response) => {
        const tooltip: any = response.data.data.tooltip;
        const tooltiptime: any = response.data.data.tooltiptime;

        const diasSemana = [
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo",
        ];

        let heatmapdataTemp = response.data.data.heatmapData;

        // Remover el primer elemento y guardarlo en una variable temporal
        let primerDia = heatmapdataTemp.shift();

        // Agregar el primer día al final del array
        heatmapdataTemp.push(primerDia);
        // Remover el primer elemento y guardarlo en una variable temporal
        let tooltiptimeTemp = tooltiptime.shift();

        // Agregar el primer día al final del array
        tooltiptime.push(tooltiptimeTemp); /**/

        let tooltipTemp = tooltip.shift();

        // Agregar el primer día al final del array

        sethHeatmapData(heatmapdataTemp);
        setHeatmapOptions({
          chart: {
            type: "heatmap",
            toolbar: {
              show: true,
            },
          },
          tooltip: {
            custom: function ({ seriesIndex, dataPointIndex }) {
              let existenDatos = false;
              const hora = dataPointIndex;

              const emergencias = tooltip[seriesIndex].data[hora];
              let tooltipContent = `<div class="custom-tooltip">`;
              for (const [titulo, total] of Object.entries(emergencias)) {
                existenDatos = true;
                tooltipContent += `<div>${titulo}: ${total}</div>`;
              }

              if (existenDatos) {
                tooltipContent += `<div> ${tooltiptime[seriesIndex].data[hora].fechaMinima} - ${tooltiptime[seriesIndex].data[hora].fechaMaxima}</div>`;
              }
              tooltipContent += `</div>`;
              return tooltipContent;
            },
          },
          plotOptions: {
            heatmap: {
              shadeIntensity: 0.5,
              colorScale: {
                ranges: response.data.data.ranges,
              },
            },
          },
          xaxis: {
            categories: [
              "00:00",
              "01:00",
              "02:00",
              "03:00",
              "04:00",
              "05:00",
              "06:00",
              "07:00",
              "08:00",
              "09:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
              "20:00",
              "21:00",
              "22:00",
              "23:00",
            ],
          },
          dataLabels: {
            enabled: false,
          },
        });
        setTotal(response.data.data.total);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const obtenerDatosCards = () => {
    axios
      .get("http://192.188.58.82:3000/api/v2/reportes/obtenerDatosCards")
      .then((response) => {
        setPublicacionesRegistradas(
          response.data.data.publicacionesRegistradas
        );
        setUsuariosRegistros(response.data.data.usuariosRegistros);
        setPublicacionesDelMes(response.data.data.publicacionesDelMes);
        setPublicacionesDelDia(response.data.data.publicacionesDelDia);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const obtenerCoordenadas = (
    ciudad: any,
    barrio: any,
    titulo: any,
    fechaInicio: any,
    fechaFin: any,
    horaInicio: any,
    horaFin: any,
    unidadEducativa: any
  ) => {
    debugger;
    axios
      .post("http://192.188.58.82:3000/api/v2/reportes/obtenerCoordenadas", {
        ciudad,
        barrio,
        titulo,
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        unidadEducativa,
      })
      .then((response) => {
        setCoordenadas(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const descargarExcel = () => {
    axios
      .post(
        "http://192.188.58.82:3000/api/v2/reportes/descargarXLSX",
        {
          ciudad: selectedCiudad,
          barrio: selectedBarrio,
          titulo: selectedEmergencia,
          fechaInicio: selectedDateRange.startDate,
          fechaFin: selectedDateRange.endDate,
          horaInicio: selectedHoraInicio.$d,
          horaFin: selectedHoraFin.$d,
          unidadEducativa: selectedUnidadEducativa,
        },
        {
          responseType: "blob", // Indicar que la respuesta es de tipo blob (binario)
        }
      )
      .then((response) => {
        // Crear una URL a partir del blob de la respuesta
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "datos.xlsx"); // Nombre del archivo de descarga
        document.body.appendChild(link);

        // Hacer clic en el enlace para iniciar la descarga
        link.click();

        // Liberar la URL creada
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error al descargar el archivo:", error);
      });
  };

  const descargarPDF = () => {
    console.log("selectedCiudad", selectedCiudad);

    axios
      .post(
        "http://192.188.58.82:3000/api/v2/reportes/descargarPDF",
        {
          ciudad: selectedCiudad,
          barrio: selectedBarrio,
          titulo: selectedEmergencia,
          fechaInicio: selectedDateRange.startDate,
          fechaFin: selectedDateRange.endDate,
          horaInicio: selectedHoraInicio.$d,
          horaFin: selectedHoraFin.$d,
          unidadEducativa: selectedUnidadEducativa,
        },
        {
          responseType: "blob", // Indicar que la respuesta es de tipo blob (binario)
        }
      )
      .then((response) => {
        // Crear una URL a partir del blob de la respuesta
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log(response.data);

        axios
          .get("http://192.188.58.82:3000/api/v2/documents", {
            responseType: "arraybuffer",
          })
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(pdfBlob);

            // Abrir una nueva ventana del navegador con la URL del PDF
            // Descargar el archivo
            const a = document.createElement("a");
            a.download = "archivo.pdf";
            a.href = url;
            a.click();
          })

          .catch((error) => {
            console.error(
              "Error al abrir el archivo en una nueva pestaña:",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Error al descargar el archivo:", error);
      });
  };

  const verPDF = () => {
    axios
      .post(
        "http://192.188.58.82:3000/api/v2/reportes/descargarPDF",
        {
          ciudad: selectedCiudad,
          barrio: selectedBarrio,
          titulo: selectedEmergencia,
          fechaInicio: selectedDateRange.startDate,
          fechaFin: selectedDateRange.endDate,
          horaInicio: selectedHoraInicio.$d,
          horaFin: selectedHoraFin.$d,
          unidadEducativa: selectedUnidadEducativa,
        },
        {
          responseType: "arraybuffer", // Indicar que la respuesta es un ArrayBuffer
        }
      )
      .then((response) => {
        // Convertir la respuesta en un Blob
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });

        // Crear una URL a partir del Blob
        const url = window.URL.createObjectURL(pdfBlob);

        // Abrir una nueva ventana del navegador con la URL del PDF
        window.open(url, "_blank");
      })
      .catch((error) => {
        console.error("Error al mostrar la vista previa del PDF:", error);
      });
  };

  const descargarCSV = () => {
    axios
      .post(
        "http://192.188.58.82:3000/api/v2/reportes/descargarCSV",
        {
          ciudad: selectedCiudad,
          barrio: selectedBarrio,
          titulo: selectedEmergencia,
          fechaInicio: selectedDateRange.startDate,
          fechaFin: selectedDateRange.endDate,
          horaInicio: selectedHoraInicio.$d,
          horaFin: selectedHoraFin.$d,
          unidadEducativa: selectedUnidadEducativa,
        },
        {
          responseType: "blob", // Indicar que la respuesta es de tipo blob (binario)
        }
      )
      .then((response) => {
        // Crear una URL a partir del blob de la respuesta
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "datos.csv"); // Nombre del archivo de descarga
        document.body.appendChild(link);

        // Hacer clic en el enlace para iniciar la descarga
        link.click();

        // Liberar la URL creada
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error al descargar el archivo CSV:", error);
      });
  };

  const [printing, setPrinting] = useState(false);

  const handlePrint = () => {
    setPrinting(true); // Cambiar el estado para mostrar el efecto de impresión
    window.print();
    // Esperar un breve tiempo (3 segundos en este ejemplo) antes de restaurar las clases originales
    setTimeout(() => {
      setPrinting(false);
    }, 100); // Cambiar a la cantidad de tiempo deseada para el efecto de impresión
  };

  const staticRangesLabels = {
    Today: "Hoy",
    Yesterday: "Ayer",
    "This Week": "Esta semana",
    "Last Week": "Semana pasada",
    "This Month": "Este mes",
    "Last Month": "Mes pasado",
  };

  if (loading) {
    // Muestra el mensaje de carga mientras loading es true
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando...
      </div>
    );
  }
  const inputRangesLabels = {
    "days up to today": "días hasta hoy",
    "days starting today": "días a partir de hoy",
  };

  function translateRange(dictionary: any) {
    return (item: any) =>
      dictionary[item.label]
        ? { ...item, label: dictionary[item.label] }
        : item;
  }

  const esStaticRanges = defaultStaticRanges.map(
    translateRange(staticRangesLabels)
  );
  const esInputRanges = defaultInputRanges.map(
    translateRange(inputRangesLabels)
  );

  return (
    <>
      <Layout title="Reportes">
        <div className="w-full h-full bg-gray-100 pt-16 lg:pt-28 lg:pb-12 px-4 mb-0">
          <div className="text-center w-full px-4 py-4 bg-white rounded-lg shadow-lg mb-4">
            <h1 className="title text-3xl color-gray-light font-bold">
              Analítica de Incidentes Unidades Educativas
            </h1>
          </div>

          {/* AQUI EMPIEZAN LAS TARJETAS INFORMATIVAS */}
          {isLoggedIn && dataUser.role === 'SUPER_ADMIN_ROLE' && (
          <div className="flex flex-col lg:flex-row w-full gap-2 lg:gap-6 mb-4">
            <div className="w-full xl:w-1/4 bg-color-primary rounded-lg px-4 shadow-lg flex items-center">
              <ReporteCard
                titulo="Usuarios registrados"
                descripcion="Total de usuarios registrados"
                valor={usuariosRegistros}
              />
              <UserGroupIcon className="h-16 w-16 text-color-secundario ml-2" />
            </div>
            <div className="w-full xl:w-1/4 bg-color-primary rounded-lg px-4 shadow-lg flex items-center">
              <ReporteCard
                titulo="Publicaciones registradas"
                descripcion="Total de publicaciones registradas"
                valor={publicacionesRegistradas}
              />
              <DocumentCheckIcon className="h-12 w-16 text-color-secundario ml-2" />
            </div>
            <div className="w-full xl:w-1/4 bg-color-primary rounded-lg px-4 shadow-lg flex items-center">
              <ReporteCard
                titulo="Publicaciones del mes"
                descripcion="Total de publicaciones hechas en este mes"
                valor={publicacionesDelMes}
              />
              <DocumentChartBarIcon className="h-16 w-16 text-color-secundario ml-2" />
            </div>
            <div className="w-full xl:w-1/4 bg-color-primary rounded-lg px-4 shadow-lg flex items-center">
              <ReporteCard
                titulo="Publicaciones del día"
                descripcion="Total de publicaciones hechas el día de hoy"
                valor={publicacionesDelDia}
              />
              <ClipboardDocumentListIcon className="h-16 w-16 text-color-secundario ml-2" />
            </div>
          </div>
          )}

          {/* AQUI TERMINAN LAS TARJETAS INFORMATIVAS */}


          <div className="w-full flex flex-col-reverse lg:flex-row gap-6">
            <div className="w-full sm:w-full lg:w-1/2 2xl:w-2/3">
              <div className="flex flex-col lg:flex-row w-full gap-2 lg:gap-6 mb-4">
                <div className="w-full lg:w-1/3">
                  <button
                    onClick={descargarPDF}
                    className="bg-red-500 w-full h-full text-white px-4 py-2 rounded-lg hover:scale-110 transition-all shadow-lg"
                  >
                    <span className="flex justify-center">
                      {printing ? "Descargando..." : "Descargar PDF Datos"}
                      <DocumentArrowDownIcon className="h-5 w-5 ml-1 text-color-white" />
                    </span>
                  </button>
                </div>
                {/* <div className="w-full lg:w-1/4">
                  <button onClick={handlePrint} className="bg-red-500 w-full text-white px-4 py-2 rounded-lg hover:scale-110 transition-all shadow-lg">
                    <span className="flex justify-center">
                      {printing ? 'Descargando...' : 'Descargar PDF Graficos'}
                      <DocumentArrowDownIcon className="h-5 w-5 ml-1 text-color-white" />
                    </span>
                  </button>
                </div> */}
                <div className="w-full lg:w-1/3">
                  <button
                    onClick={descargarCSV}
                    className="bg-green-500 w-full h-full text-white px-4 py-2 rounded-lg hover:scale-110 transition-all shadow-lg"
                  >
                    <span className="flex justify-center">
                      Descargar CSV
                      <DocumentArrowDownIcon className="h-5 w-5 ml-1 text-color-white" />
                    </span>
                  </button>
                </div>
                <div className="w-full lg:w-1/3">
                  <button
                    onClick={descargarExcel}
                    className="bg-green-500 w-full h-full text-white px-4 py-2 rounded-lg hover:scale-110 transition-all shadow-lg"
                  >
                    <span className="flex justify-center">
                      Descargar EXCEL
                      <DocumentArrowDownIcon className="h-5 w-5 ml-1 text-color-white" />
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-full gap-6">
                <div
                  className="w-full bg-color-primary rounded-lg shadow-lg p-4"
                  style={{ height: "400px" }}
                >
                  <h1 className="text-center text-color-secundario text-lg font-semibold mb-2">
                    Mapa de calor de publicaciones
                  </h1>
                  <Chart
                    options={heatmapOptions}
                    series={heatmapData}
                    type="heatmap"
                    width="90%"
                    height="85%"
                  />
                </div>
                <div
                  className="w-full bg-color-primary rounded-lg shadow-lg p-4"
                  style={{ height: "475px" }}
                >
                  <h1 className="text-center text-color-secundario text-lg font-semibold mb-2">
                    Ubicación exacta de las publicaciones
                  </h1>
                  <Map coordinates={coordenadas} />
                </div>
              </div>
              <div className="flex flex-col w-full gap-6 mt-4">
                <div
                  className="w-full bg-color-primary rounded-lg shadow-lg p-4"
                  style={{ height: "400px" }}
                >
                  <h1 className="text-center text-color-secundario text-lg font-semibold mb-2">
                    Gráfico lineal de emergencias
                  </h1>
                  <Chart
                    options={optionsBarras}
                    series={dataBarras}
                    type="line"
                    width="100%"
                    height="85%"
                  />
                </div>
                <div
                  className="w-full bg-color-primary rounded-lg shadow-lg p-4"
                  style={{ height: "500px" }}
                >
                  <h1 className="text-center text-color-secundario text-lg font-semibold mb-2">
                    Gráfico de barras
                  </h1>
                  <Chart
                    options={heatmapOptionsPie}
                    series={dataPastel}
                    type="bar"
                    width="100%"
                    height="85%"
                  />
                </div>
              </div>
            </div>
            <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/3 relative">
              <div className="sticky top-0 left-0 w-full">
                <div className="flex flex-col w-full px-8 py-4 bg-color-primary rounded-lg shadow-lg overflow-x-auto">
                  <h1 className="text-color-secundario text-lg font-semibold mb-2">
                    Filtros
                  </h1>
                  <div className="w-full flex flex-col-2 lg:flex-row gap-3 mb-2">
                    <div className="w-full">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Ciudad
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        value={selectedCiudad}
                        onChange={cambiarCiudad}
                        className="w-full py-2 rounded-md border-0 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                      >
                        {ciudades.map((ciudad: any) => (
                          <option key={ciudad} value={ciudad}>
                            {ciudad}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* TODO: Unidades educaticas */}
                    <div className="w-full">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Unidades educativas
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        value={selectedUnidadEducativa}
                        onChange={cambiarUnidadEducativa}
                        className="w-full py-2 rounded-md border-0 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                      >
                        <option >SELECCIONAR UNIDAD EDUCATIVA</option>
                        {unidadesEducativas.map((unidad: any) => (
                          <option key={unidad} value={unidad}>
                            {unidad}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full flex flex-col lg:flex-row gap-3 mb-2">
                    {/* <div className="w-full lg:w-1/2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Zona / Barrio
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        value={selectedBarrio}
                        onChange={cambiarBarrio}
                        className="w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                      >
                        <option disabled>SELECCIONAR ZONA</option>
                        <option>TODAS</option>
                        {barrios.map((barrio: any) => (
                          <option key={barrio} value={barrio}>
                            {barrio}
                          </option>
                        ))}
                      </select>
                    </div> */}
                    <div className="w-full lg:w-full">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Tipo de emergencia
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        value={selectedEmergencia}
                        onChange={cambiarEmergencia}
                        className="w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                      >
                        <option disabled>SELECCIONAR TIPO DE EMERGENCIA</option>
                        <option key="" value="">
                          TODAS
                        </option>
                        {emergencias.map((emergencia: any) => (
                          <option key={emergencia} value={emergencia}>
                            {emergencia}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full mb-2">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      RANGO DE DÍAS
                    </label>
                    <DateRangePicker
                      locale={es}
                      staticRanges={esStaticRanges}
                      inputRanges={esInputRanges}
                      showSelectionPreview={false}
                      ranges={[selectedDateRange]}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div className="w-full flex flex-col lg:flex-row gap-3">
                    <div className="w-full lg:w-1/2">
                      <label
                        htmlFor="hora"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Hora de inicio
                      </label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          className="w-full"
                          value={selectedHoraInicio}
                          onChange={cambiarHoraInicio}
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="w-full lg:w-1/2">
                      <label
                        htmlFor="hora"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Hora de fin
                      </label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          className="w-full"
                          value={selectedHoraFin}
                          onChange={cambiarHoraFin}
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ReportsPage;
