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
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function InterestVsPrincipalChart({ calculated, paymentSchedule }) {
  return (
    <div>
      {calculated && (
        <div className="chart-grid">
          <div className="chart-item">
            <h3>Area Graph for Interest vs Principal Over the Years</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={paymentSchedule}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
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
                  dataKey="cumulativePrincipalExtraPayments"
                  name="Extra Payments"
                  stackId="1"
                  stroke="#FF8042"
                  fill="#FF8042"
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
        </div>
      )}
    </div>
  );
}

{
  /* <div className="chart-item">
            <h3>Pie Chart of Interest Distribution</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={paymentSchedule}
                  dataKey="interest"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#82ca9d"
                >
                  {paymentSchedule.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div> */
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
