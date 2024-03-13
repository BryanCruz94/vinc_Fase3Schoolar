import React, { useState, useEffect,forwardRef, useImperativeHandle } from "react"
import axios from 'axios';
import dynamic from 'next/dynamic';
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });



const HeatmapChart = (ciudad: any, barrio: any, titulo: any, anio: any, mes: any, dia: any, horaInicio: any, horaFin: any) => {
    const [total, setTotal] = useState(10);

    const [heatmapData, sethHeatmapData] = useState([
        {
            name: 'Lunes',
            data: [
                10, 2, 30, 40, 5, 60, 70
            ],
        },
        {
            name: 'Lunes',
            data: [
                0, 0, 0,0, 0, 0,10, 2, 30, 40, 5, 60, 70
            ],
        },
        {
            name: 'Lunes',
            data: [
                0, 0, 0,0, 0, 0,10, 0, 0, 0, 30, 40, 5, 60, 70
            ],
        },
        {
            name: 'Heatmap',
            data:
                [0, 0, 0,0, 0, 0,10, 20, 0, 0, 0, 40, 50, 60, 70],


        },
        {
            name: 'Heatmap',
            data: [
                [0, 0, 0, 20,0, 0, 0,0, 0, 0,0, 0, 0,],
            ],
        },
        {
            name: 'Heatmap',
            data: [
                [10, 0, 0, 0,0, 0, 0,0, 0, 0,]
            ],
        },
        {
            name: 'Heatmap',
            data: [
                [0, 0, 0, 20, 30, 40, 0, 0, 0,50, 60, 70],
            ],
        },
    ]);
    const [heatmapOptions, setHeatmapOptions] = useState<ApexOptions>({
        chart: {
            type: 'heatmap',
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
                            name: 'Bajo',
                            color: '#008FFB',
                        },
                        {
                            from: 31,
                            to: 60,
                            name: 'Medio',
                            color: '#efa94a',
                        },
                        {
                            from: 61,
                            to: 100,
                            name: 'Alto',
                            color: '#FF4560',
                        },
                    ],
                },
            },
        },
        xaxis: {
            categories: [
                '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
                '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
                '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        },
        dataLabels: {
            enabled: false,
        },
    });
    const [ciudadSelected, setCiudadSelected] = useState(ciudad);
    useEffect(() => {
        obtenerMapaCalor();
    }, [ciudadSelected]);
 
    const obtenerMapaCalor = () => {
        axios.post('http://10.3.1.101:3000/api/v2/reportes/obtenerMapaCalor', { ciudad, barrio, titulo, anio, mes, dia, horaInicio, horaFin })
            .then(response => {
                sethHeatmapData(response.data.data.heatmapData)
                setHeatmapOptions({
                    chart: {
                        type: 'heatmap',
                        toolbar: {
                            show: true,
                        },
                    },
                    plotOptions: {
                        heatmap: {
                            shadeIntensity: 0.5,
                            colorScale: {
                                ranges:response.data.data.ranges,
                            },
                        },
                    },
                    xaxis: {
                        categories: [
                            '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
                            '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
                            '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                    },
                    dataLabels: {
                        enabled: false,
                    },
                })
                setTotal(response.data.data.total)
               console.log(response.data)
            })
            .catch(error => { console.error(error); });
    };
    return (
        <div>

            <div className="heatmap-chart">
              
                <h6>Total de publicaciones registradas: {total}</h6>
                
               <Chart options={heatmapOptions} series={heatmapData} type="heatmap"  width="100%" />
            </div>

        </div>
    );
};

export default HeatmapChart;
