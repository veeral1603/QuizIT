import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ correct, incorrect }) => {
  const data = {
    labels: ["Correct Answers", "Incorrect Answers"],
    datasets: [
      {
        data: [correct, incorrect], // Data from props
        backgroundColor: ["rgb(81, 182, 81)", "rgb(255, 94, 94)"], // Colors for chart segments
        hoverBackgroundColor: ["#17a863", "#e63939"], // Colors on hover
        borderWidth: 2, // Border width of segments
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        display: true,
        onClick: () => {}, // Position of the legend
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: "350px", height: "350px", margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};
