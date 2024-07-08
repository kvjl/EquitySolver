// InterestVsPrincipalChart.js
import React from "react";
import PropTypes from "prop-types";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { generateExtraPaymentSchedule } from "./MortgageCalculations";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const sortedPayload = [...payload].sort((a, b) => {
      if (a.dataKey === "cumulativePrincipal") return 1;
      if (b.dataKey === "cumulativePrincipal") return -1;
      return 0;
    });

    const tooltipStyles = {
      backgroundColor: "#ffffff",
      border: "1px solid #cccccc",
      padding: "10px",
      borderRadius: "5px",
    };

    return (
      <div className="custom-tooltip" style={tooltipStyles}>
        <p className="label">{`${label}`}</p>
        {sortedPayload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name} : ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};
function InterestVsPrincipalChart({
  calculated,
  paymentSchedule,
  paymentScheduleExtraPayments,
}) {
  return (
    <div>
      <div className="chart-grid">
        <div className="chart-item">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={paymentSchedule}>
              <XAxis dataKey="fiveYearIncrement" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine x="Year 1" stroke="green" label="Start" />
              <Area
                type="monotone"
                dataKey="cumulativePrincipal"
                name="Cumulative Principal"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />

              <Area
                type="monotone"
                dataKey="cumulativeInterest"
                name="Cumulative Interest"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-item">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={paymentScheduleExtraPayments}>
              <XAxis dataKey="fiveYearIncrement" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine x="Year 1" stroke="green" label="Start" />
              <Area
                type="monotone"
                i
                dataKey="cumulativePrincipalExtra"
                name="Cumulative Principal Extra Payments"
                stackId="1"
                stroke="#FF8042"
                fill="#FF8042"
              />

              <Area
                type="monotone"
                dataKey="cumulativeInterestExtra"
                name="Cumulative Interest Extra"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// InterestVsPrincipalChart.propTypes = {
//   calculated: PropTypes.bool.isRequired,
//   paymentSchedule: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       cumulativePrincipal: PropTypes.string.isRequired,
//       interest: PropTypes.string.isRequired,
//       cumulativeInterest: PropTypes.string.isRequired,
//       scheduledDate: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

export default InterestVsPrincipalChart;
