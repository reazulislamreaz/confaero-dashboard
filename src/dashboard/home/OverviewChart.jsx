import React, { useState } from 'react';
import { Select } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export default function RegistrationTrendChart() {
  const [period, setPeriod] = useState('weekly');

  const weeklyData = [
    { day: 'Sat', registrations: 3200 },
    { day: 'Sun', registrations: 4500 },
    { day: 'Mon', registrations: 3800 },
    { day: 'Tue', registrations: 5200 },
    { day: 'Wed', registrations: 6200 },
    { day: 'Thu', registrations: 4800 },
    { day: 'Fri', registrations: 5800 },
    { day: 'Sat', registrations: 6500 }
  ];

  const dailyData = [
    { day: 'Mon', registrations: 850 },
    { day: 'Tue', registrations: 920 },
    { day: 'Wed', registrations: 1100 },
    { day: 'Thu', registrations: 980 },
    { day: 'Fri', registrations: 1250 },
    { day: 'Sat', registrations: 1450 },
    { day: 'Sun', registrations: 1350 }
  ];

  const monthlyData = [
    { day: 'Jan', registrations: 12000 },
    { day: 'Feb', registrations: 15000 },
    { day: 'Mar', registrations: 13500 },
    { day: 'Apr', registrations: 18000 },
    { day: 'May', registrations: 21000 },
    { day: 'Jun', registrations: 19500 }
  ];

  const getData = () => {
    switch(period) {
      case 'daily':
        return dailyData;
      case 'monthly':
        return monthlyData;
      default:
        return weeklyData;
    }
  };

  const getYAxisTicks = () => {
    switch(period) {
      case 'daily':
        return [0, 500, 1000, 1500];
      case 'monthly':
        return [0, 5000, 10000, 15000, 20000, 25000];
      default:
        return [0, 1000, 2000, 3000, 4000, 5000, 6000];
    }
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

  return (
    <div className="  bg-gray-50 p-8">
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
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={getData()} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="49%" stopColor="#32A69A" stopOpacity={0.6}/>
                  <stop offset="100%" stopColor="#32A69A" stopOpacity={0.1}/>
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
                tickFormatter={(value) => `${value / 1000}k`}
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
        </div>
      </div>
    </div>
  );
}