import React from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Legend } from "recharts";

export function UsagePie({ legend, usage, total }) {
  const data = [
    {
      name: legend,
      value: usage,
      fill: "#ff0000"
    },
    {
      name: "Remaining",
      value: total - usage,
      fill: "#8884d8"
    }
  ];

  return (
    <PieChart width={300} height={200}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} label />
      <Legend verticalAlign="top" height={36} />
    </PieChart>
  );
}

UsagePie.propTypes = {
  legend: PropTypes.string.isRequired,
  usage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};
