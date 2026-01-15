import React, { useState } from 'react';
import { 
  Table, 
  Input, 
  DatePicker, 
  Button, 
  Typography, 
  Space,
  Pagination,
  Modal,
  Descriptions
} from 'antd';
import { SearchOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const UserListsPage = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [searchDate, setSearchDate] = useState(null);
  const [searchUser, setSearchUser] = useState('');
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Sample data
  const userData = [
    { key: 1, id: '234445', userName: 'tamim', email: 'tamim@gmail.com', joinDate: '16 Apr 2025', scans: '433' },
    { key: 2, id: '234445', userName: 'hasan', email: 'tamim@gmail.com', joinDate: '16 Apr 2025', scans: '5644' },
    { key: 3, id: '234445', userName: 'Robin', email: 'tamim@gmail.com', joinDate: '16 Apr 2025', scans: '5433' },
    { key: 4, id: '234445', userName: 'Shakib', email: 'tamim@gmail.com', joinDate: '16 Apr 2025', scans: '6543' },
    { key: 5, id: '234445', userName: 'hamza', email: 'tamim@gmail.com', joinDate: '16 Apr 2025', scans: '5444' },
    { key: 6, id: '234445', userName: 'Ridoy', email: 'tamim@gmail.com', joinDate: '16 Apr 2025', scans: '5433' },
    { key: 7, id: '234445', userName: 'Ridoy', email: 'tamim@gmail.com', joinDate: '16 Apr 2025', scans: '6755' },
    { key: 8, id: '234445', userName: 'Ridoy', email: 'tamim@gmail.com', joinDate: '16 Apr 2025', scans: '7665' },
    { key: 9, id: '234445', userName: 'Ridoy', email: 'tamim@gmail.com', joinDate: '16 Apr 2025', scans: '6555' },
    { key: 10, id: '234445', userName: 'Ridoy', email: 'tamim@gmail.com', joinDate: '16 Apr 2025', scans: '6555' },
    { key: 11, id: '234445', userName: 'Ridoy', email: 'tamim@gmail.com', joinDate: '16 Apr 2025', scans: '7654' },
    { key: 12, id: '234445', userName: 'Ridoy', email: 'tamim@gmail.com', joinDate: '16 Apr 2025', scans: '7654' }
  ];

  const handleSearch = () => {
    // Handle search logic here
    console.log('Search clicked', { searchDate, searchUser });
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewModalVisible(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    // Handle delete logic here
    console.log('Deleting user:', userToDelete);
    setIsDeleteModalVisible(false);
    setUserToDelete(null);
    // Add your delete API call here
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setUserToDelete(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: 'Tr. ID',
      dataIndex: 'id',
      key: 'id',
      className: 'text-blue-600 font-medium',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      className: 'text-blue-600 font-medium',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      className: 'text-blue-600 font-medium',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      className: 'text-gray-600',
    },
    {
      title: 'Scans',
      dataIndex: 'scans',
      key: 'scans',
      className: 'text-gray-600 text-center',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleViewUser(record)}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            size="small"
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDeleteUser(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <Title level={3} className="mb-4 text-gray-800">
            User Lists
          </Title>
          
          {/* Search Section */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Date</span>
              <DatePicker 
                value={searchDate}
                onChange={setSearchDate}
                className="w-40"
                placeholder="Select date"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-600">User Name</span>
              <Input 
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Enter user name"
                className="w-48"
              />
            </div>
            
            <Button 
              type="primary" 
              icon={<SearchOutlined />}
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <Table 
            columns={columns}
            dataSource={userData}
            pagination={false}
            className="mb-6"
            size="middle"
          />
          
          {/* Custom Pagination */}
          <div className="flex justify-center">
            <Pagination
              current={currentPage}
              total={50}
              pageSize={10}
              onChange={setCurrentPage}
              showSizeChanger={false}
              className="text-center"
            />
          </div>
        </div>

        {/* View User Modal */}
        <Modal
          title="User Details"
          open={isViewModalVisible}
          onCancel={handleCloseViewModal}
          footer={[
            <Button key="close" onClick={handleCloseViewModal}>
              Close
            </Button>
          ]}
          width={600}
        >
          {selectedUser && (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Transaction ID">
                {selectedUser.id}
              </Descriptions.Item>
              <Descriptions.Item label="User Name">
                {selectedUser.userName}
              </Descriptions.Item>
              <Descriptions.Item label="Email Address">
                {selectedUser.email}
              </Descriptions.Item>
              <Descriptions.Item label="Join Date">
                {selectedUser.joinDate}
              </Descriptions.Item>
              <Descriptions.Item label="Total Scans">
                {selectedUser.scans}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          title="Confirm Delete"
          open={isDeleteModalVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText="Yes"
          cancelText="No"
          okType="danger"
          className="text-center"
        >
          <div className="py-4">
            <p className="text-gray-600 text-base">
              Are you sure you want to delete user <strong>{userToDelete?.userName}</strong>?
            </p>
            <p className="text-gray-500 text-sm mt-2">
              This action cannot be undone.
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserListsPage;

 