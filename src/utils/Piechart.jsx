import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import '../pages/Page.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = () => {
  const data = {
    labels: ["HTML", "JS", "React", "Css"],
    datasets: [
      {
        label: "view",
        data: [12, 19, 7, 9],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: ["React", "JS", "HTML", "Css"],
    datasets: [
      {
        label: "level",
        data: [10, 15, 8, 13],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const data3 = {
    labels: ["JS", "HTML", "React", "Css"],
    datasets: [
      {
        label: "leave time",
        data: [14, 15, 20, 17],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    animation: {
      duration: 2000,
      easing: "easeInOutQuad",
    },
  };

  return (
    <div className="pie">
      <div style={{ width: "250px", margin: "0 auto" }}>
        <Pie data={data} options={options} />
      </div>
      <div style={{ width: "250px", margin: "0 auto" }}>
        <Pie data={data2} options={options} />
      </div>
      <div style={{ width: "250px", margin: "0 auto" }}>
        <Pie data={data3} options={options} />
      </div>
    </div>
  );
};

export default PieChartComponent;
