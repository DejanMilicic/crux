import React from "react";
import PropTypes from "prop-types";
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from "recharts";

export function DayLine({ data }) {
  return (
    <LineChart width={900} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="daycode" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="total" stroke="#8884d8" />
    </LineChart>
  );
}

DayLine.propTypes = {
  data: PropTypes.array.isRequired,
};
