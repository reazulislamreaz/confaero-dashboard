import React from 'react';
import { Card, Button } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, UserOutlined, CheckSquareOutlined, FileTextOutlined, ShopOutlined, SoundOutlined, TeamOutlined, CheckCircleOutlined } from '@ant-design/icons';

export default function ConferenceDashboard() {
  const stats = [
    { icon: <UserOutlined />, value: '2K', label: 'Total Registrations' },
    { icon: <CheckSquareOutlined />, value: '0', label: 'Checked In Attendees' },
    { icon: <FileTextOutlined />, value: '102', label: 'Pending Abstract Reviews' },
    { icon: <ShopOutlined />, value: '8', label: 'Pending Exhibitor Requests' }
  ];

  const actions = [
    { icon: <SoundOutlined />, label: 'Create Announcement' },
    { icon: <TeamOutlined />, label: 'Assign Reviewer' },
    { icon: <CheckCircleOutlined />, label: 'Approve Exhibitor' }
  ];

  return (
    <div className="  bg-gray-50">
      <Card className=" shadow-lg rounded-lg overflow-hidden border-0">
        {/* Header */}
        <div className="bg-[#32A69A] text-white p-6 -m-6 mb-6">
          <h1 className="text-2xl font-semibold mb-3">
            18th Lithium Supply & Battery Raw Materials Conference
          </h1>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CalendarOutlined />
              <span>Jun 22-25, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <EnvironmentOutlined />
              <span>Las Vegas, USA</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl text-gray-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  {stat.value}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                size="large"
                className="flex items-center justify-center gap-2 h-12 hover:border-teal-500 hover:text-teal-500"
              >
                {action.icon}
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}