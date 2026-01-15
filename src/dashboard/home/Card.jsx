import React from 'react';
import { Card, Row, Col } from 'antd';
import { 
  UserOutlined, 
  ScanOutlined, 
  SafetyOutlined,
  ExclamationCircleOutlined,
 
} from '@ant-design/icons';

const Cardd = () => { 
  const metricsData = [
    {
      title: 'Total User',
      value: '321',
      icon: <UserOutlined className="text-lg" />,
      color: 'text-gray-700',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Today Product Scan',
      value: '$350.40',
      icon: <ScanOutlined className="text-lg" />,
      color: 'text-gray-700',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      title: 'Ice Save(m2)',
      value: '692',
      icon: <SafetyOutlined className="text-lg" />,
      color: 'text-gray-700',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
     
  ];

  return (
    <div className="p-6 bg-gray-50">
      <Row gutter={[16, 16]}>
        {metricsData.map((metric, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card 
              className={`h-32 hover:shadow-lg transition-shadow duration-200 border-0 ${
                metric.isSpecial ? 'bg-green-600' : 'bg-white'
              }`}
              bodyStyle={{ 
                padding: '20px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`text-sm font-medium mb-3 ${
                    metric.isSpecial ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {metric.title}
                  </div>
                  <div className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </div>
                </div>
                
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metric.iconBg}`}>
                  <span className={metric.iconColor}>
                    {metric.icon}
                  </span>
                </div>
              </div>
              
              {metric.hasGrowthIcon && (
                <div className="flex items-center mt-2">
                  <svg 
                    className="w-3 h-3 text-white mr-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
                    />
                  </svg>
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cardd;