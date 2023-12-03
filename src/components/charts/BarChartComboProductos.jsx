import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { marcas } from "../../data/productos";

export const options = {
    title: "Ventas de marcas por mes",
    vAxis: { title: "Total venta" },
    hAxis: { title: "Mes" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
};

export default function BarChartComboProductos() {
    const [dataMarca, setDataMarca] = useState([]);

    const datos = () => {
        const chartData = [
            ["Mes", "Samsung", "Apple", "Huawei", "Xiaomi",],
            ...marcas.map((item) => [item.mes, item.ventaS, item.ventaA, item.ventaH, item.ventaX]),
        ];
        setDataMarca(chartData);
    }

    useEffect(() => {
        datos();
    }, []);

    return (
        <Chart
            chartType="ComboChart"
            width="100%"
            height="270px"
            data={dataMarca}
            options={options}
        />
    );
}
