

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Table, 
  DatePicker, 
  Select, 
  Button, 
  Tag, 
  Progress,
  Tabs,
  Empty,
  Spin,
  Input,
  Space
} from 'antd';
import {
  DollarOutlined,
  
  CalendarOutlined,
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

const EarningsPage = () => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([dayjs().subtract(30, 'days'), dayjs()]);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with actual API calls
  const [earningsData, setEarningsData] = useState({
    totalEarnings: 12450.75,
    thisMonthEarnings: 3240.50,
    pendingEarnings: 850.25,
    withdrawnEarnings: 11600.50,
    growthRate: 15.2,
    transactionCount: 147
  });

  // Chart data
   

  // Transaction data
  const [transactions, setTransactions] = useState([
    {
      key: '1',
      id: 'TXN001',
      date: '2024-12-15',
      description: 'Sales Commission - Order #12345',
      amount: 250.00,
      status: 'completed',
      type: 'commission',
      source: 'sales'
    },
    {
      key: '2',
      id: 'TXN002',
      date: '2024-12-14',
      description: 'Referral Bonus - New Customer',
      amount: 100.00,
      status: 'completed',
      type: 'bonus',
      source: 'referral'
    },
    {
      key: '3',
      id: 'TXN003',
      date: '2024-12-13',
      description: 'Performance Bonus - Monthly Target',
      amount: 500.00,
      status: 'pending',
      type: 'bonus',
      source: 'performance'
    },
    {
      key: '4',
      id: 'TXN004',
      date: '2024-12-12',
      description: 'Withdrawal Request',
      amount: -1000.00,
      status: 'completed',
      type: 'withdrawal',
      source: 'bank'
    },
    {
      key: '5',
      id: 'TXN005',
      date: '2024-12-11',
      description: 'Sales Commission - Order #12344',
      amount: 180.00,
      status: 'completed',
      type: 'commission',
      source: 'sales'
    }
  ]);

  const getStatusColor = (status) => {
    const colors = {
      completed: 'success',
      pending: 'warning',
      failed: 'error',
      cancelled: 'default'
    };
    return colors[status] || 'default';
  };

  const getTypeIcon = (type) => {
    const icons = {
      commission: '💼',
      bonus: '🎯',
      withdrawal: '💸',
      refund: '↩️'
    };
    return icons[type] || '💰';
  };

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span className="font-mono text-blue-600">{text}</span>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => dayjs(date).format('MMM DD, YYYY')
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <span>{getTypeIcon(record.type)}</span>
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => (
        <span className={amount >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
          {amount >= 0 ? '+' : ''}${Math.abs(amount).toFixed(2)}
        </span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Completed', value: 'completed' },
        { text: 'Pending', value: 'pending' },
        { text: 'Failed', value: 'failed' },
        { text: 'Cancelled', value: 'cancelled' }
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={getStatusColor(status)} className="capitalize">
          {status}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleViewTransaction(record)}
        >
          View
        </Button>
      )
    }
  ];

  const handleViewTransaction = (record) => {
    console.log('View transaction:', record);
    // Implement transaction detail modal
  };

  const handleExport = () => {
    console.log('Export earnings data');
    // Implement export functionality
  };

  const handleWithdraw = () => {
    console.log('Withdraw earnings');
    // Implement withdrawal functionality
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchText.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings Dashboard</h1>
            <p className="text-gray-600">Track your earnings, transactions, and performance</p>
          </div>
          <Space>
            <Button 
              icon={<DownloadOutlined />} 
              onClick={handleExport}
            >
              Export
            </Button>
            <Button 
              type="primary" 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleWithdraw}
            >
              Withdraw Earnings
            </Button>
          </Space>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <Statistic
                title="Total Earnings"
                value={earningsData.totalEarnings}
                precision={2}
                prefix={<DollarOutlined className="text-green-600" />}
                valueStyle={{ color: '#16a34a', fontSize: '24px' }}
              />
              <div className="text-sm text-gray-500 mt-2">All time earnings</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <Statistic
                title="This Month"
                value={earningsData.thisMonthEarnings}
                precision={2}
                prefix={<DollarOutlined className="text-blue-600" />}
                valueStyle={{ color: '#2563eb', fontSize: '24px' }}
              />
              <div className="flex items-center justify-center mt-2">
           
                <span className="text-green-500 text-sm">+{earningsData.growthRate}%</span>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <Statistic
                title="Pending"
                value={earningsData.pendingEarnings}
                precision={2}
                prefix={<DollarOutlined className="text-orange-600" />}
                valueStyle={{ color: '#ea580c', fontSize: '24px' }}
              />
              <div className="text-sm text-gray-500 mt-2">Awaiting processing</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <Statistic
                title="Withdrawn"
                value={earningsData.withdrawnEarnings}
                precision={2}
                prefix={<DollarOutlined className="text-gray-600" />}
                valueStyle={{ color: '#4b5563', fontSize: '24px' }}
              />
              <div className="text-sm text-gray-500 mt-2">{earningsData.transactionCount} transactions</div>
            </Card>
          </Col>
        </Row> 
        {/* Transactions Table */}
        <Card title="Recent Transactions" className="mb-6">
          <div className="mb-4 flex flex-wrap gap-4">
            <Input
              placeholder="Search transactions..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-64"
            />
            <Select
              placeholder="Filter by status"
              value={filterStatus}
              onChange={setFilterStatus}
              className="w-48"
            >
              <Option value="all">All Status</Option>
              <Option value="completed">Completed</Option>
              <Option value="pending">Pending</Option>
              <Option value="failed">Failed</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              className="w-64"
            />
          </div>
          
          <Table
            columns={columns}
            dataSource={filteredTransactions}
            pagination={{
              total: filteredTransactions.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} transactions`
            }}
            scroll={{ x: 800 }}
            loading={loading}
          />
        </Card>

        {/* Performance Metrics */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="Monthly Progress">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Monthly Target: $5,000</span>
                    <span>{((earningsData.thisMonthEarnings / 5000) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    percent={(earningsData.thisMonthEarnings / 5000) * 100} 
                    strokeColor="#52c41a"
                    trailColor="#f5f5f5"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Quarterly Target: $15,000</span>
                    <span>{((earningsData.thisMonthEarnings * 3 / 15000) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    percent={(earningsData.thisMonthEarnings * 3 / 15000) * 100} 
                    strokeColor="#1890ff"
                    trailColor="#f5f5f5"
                  />
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Quick Stats">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average Daily Earnings</span>
                  <span className="font-semibold text-green-600">
                    ${(earningsData.thisMonthEarnings / 30).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Best Performing Month</span>
                  <span className="font-semibold">November ($4,800)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Transactions</span>
                  <span className="font-semibold">{earningsData.transactionCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Success Rate</span>
                  <span className="font-semibold text-green-600">98.5%</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EarningsPage;