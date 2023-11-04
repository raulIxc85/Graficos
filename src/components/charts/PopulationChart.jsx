import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export default function PopulationChart() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        const data = await response.json();
        setApiData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = [
    ["City", "Population"],
    ...apiData.map((item) => [item.Year, item.Population]),
  ];

  const options = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
    // colores degadados
    colors: ["rgb(53,138,148)","rgb(40,34,70)"],
  };

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="270px"
      data={chartData}
      options={options}
    />
  );
}
