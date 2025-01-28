import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const EnhancedChart = ({ data } : {data:any}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="name"
          angle={-30}
          textAnchor="end"
          height={70}
          tick={{ fill: '#64748b' }}
        />
        <YAxis
          domain={[0, 5]}
          tick={{ fill: '#64748b' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="score"
          fill="#3b82f6"
          stroke="#2563eb"
          fillOpacity={0.3}
        />
        <Bar
          dataKey="score"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
          barSize={20}
          fillOpacity={0.8}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#1d4ed8"
          strokeWidth={2}
          dot={{ fill: '#1d4ed8', strokeWidth: 2 }}
          activeDot={{ r: 8 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default EnhancedChart;