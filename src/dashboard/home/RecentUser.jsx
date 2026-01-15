
import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const RejectedProductsPage = () => {
  const rejectedProducts = [
    {
      id: 1,
      name: "Coca-Cola Plastic Bottle",
      rejectionRate: "89%"
    },
    {
      id: 2,
      name: "Coca-Cola Plastic Bottle",
      rejectionRate: "89%"
    },
    {
      id: 3,
      name: "Coca-Cola Plastic Bottle",
      rejectionRate: "89%"
    },
    {
      id: 4,
      name: "Coca-Cola Plastic Bottle",
      rejectionRate: "89%"
    },
    {
      id: 5,
      name: "Coca-Cola Plastic Bottle",
      rejectionRate: "89%"
    }
  ];

  return (
    <div className="p-6 bg-gray-50">
      <div className="  mx-auto">
        <Title level={2} className="mb-6 text-gray-800 font-semibold">
          Top 5 Rejected Products
        </Title>
        
        <div className="space-y-3">
          {rejectedProducts.map((product, index) => (
            <Card
              key={product.id}
              className="bg-rose-100 border-rose-200 hover:bg-rose-150 transition-colors duration-200"
              bodyStyle={{ padding: '20px 24px' }}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <Text className="text-gray-800 font-medium text-base">
                    {product.name}
                  </Text>
                </div>
                <div className="flex flex-col items-end">
                  <Text className="text-2xl font-bold text-gray-800 mb-0">
                    {product.rejectionRate}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Rejection rate
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RejectedProductsPage;