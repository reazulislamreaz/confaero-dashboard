import React, { useState } from 'react';
import { Select } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { useEventOverviewQuery } from '../../redux/features/eventSlice/eventSlice';

export default function RegistrationTrendChart({ eventId }) {
  const [period, setPeriod] = useState('weekly');

  const { data: overviewData, isLoading, isError } = useEventOverviewQuery(eventId);

  const rawTrend = overviewData?.data?.registrationTrend ?? [];

  // Format date based on selected period
  const formatLabel = (dateStr) => {
    const date = new Date(dateStr);
    switch (period) {
      case 'daily':
        return date.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue...
      case 'monthly':
        return date.toLocaleDateString('en-US', { month: 'short' });   // Jan, Feb...
      default:
        return date.toLocaleDateString('en-US', { weekday: 'short' }); // weekly: Mon...
    }
  };

  // Map API data to chart format
  const chartData = rawTrend.map((item) => ({
    day: formatLabel(item.date),
    registrations: item.count
  }));

  // Dynamically compute Y-axis ticks from actual data
  const getYAxisTicks = () => {
    if (chartData.length === 0) return [0];
    const max = Math.max(...chartData.map((d) => d.registrations));
    const step = Math.ceil(max / 4 / 50) * 50 || 50;
    return Array.from({ length: 5 }, (_, i) => i * step);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 shadow-lg rounded border border-gray-200">
          <p className="text-sm font-medium text-gray-900">
            {payload[0].value.toLocaleString()} registrations
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 p-8">
        <div className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-center h-48">
          <p className="text-gray-400 text-sm">Loading chart...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gray-50 p-8">
        <div className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-center h-48">
          <p className="text-red-400 text-sm">Failed to load registration trend.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8">
      <div className="">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-normal text-gray-700">
              Registration Trend
            </h2>
            <Select
              value={period}
              onChange={setPeriod}
              style={{ width: 100 }}
              size="small"
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' }
              ]}
            />
          </div>

          {chartData.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              No registration data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="49%" stopColor="#32A69A" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#32A69A" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  dy={5}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
                  ticks={getYAxisTicks()}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#5eead4', strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="registrations"
                  stroke="#5eead4"
                  strokeWidth={2}
                  fill="url(#colorRegistrations)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}