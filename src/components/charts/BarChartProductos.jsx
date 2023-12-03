import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { productos } from "../../data/productos";

export const options = {
  chart: {
    title: "Productos",
  },
};

export default function BarChartProductos() {
  const [dataPro, setDataPro] = useState([]);

  const datos = () => {
    const chartData = [
      ["Producto", "Total venta"],
      ...productos.map((item) => [item.nombre, item.venta ]),
    ];
    setDataPro(chartData);
  }

  useEffect(() => {
    datos();
  }, []);


  return (
    <Chart
      chartType="Bar"
      width="95%"
      height="270px"
      data={dataPro}
      options={options}
    />
  );
}
