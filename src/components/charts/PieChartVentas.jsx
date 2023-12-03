import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Productos", "Ventas"],
  ["Mouse", 11],
  ["Teclado", 2],
  ["Bocina JBL", 2],
  ["TV 52' SAMSUNG", 2],
  ["Bateria portatil", 7],
];

export const options = {
  title: "Ventas por producto",
  is3D: true,
};

export default function PieVentas() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
