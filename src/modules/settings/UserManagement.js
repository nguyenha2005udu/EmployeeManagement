import React, { useState } from "react";

import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Statistic,
  Avatar,
  Switch,
} from "antd";

import {
  PlusOutlined,
  UserOutlined,
  LockOutlined,
  TeamOutlined,
  KeyOutlined,
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,

      username: "admin",

      fullName: "Administrator",

      email: "admin@company.com",

      role: "admin",

      department: "IT",

      status: true,

      lastLogin: "2024-03-15 09:00:00",
    },

    {
      id: 2,

      username: "hr_manager",

      fullName: "HR Manager",

      email: "hr@company.com",

      role: "manager",

      department: "HR",

      status: true,

      lastLogin: "2024-03-15 08:30:00",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const [passwordForm] = Form.useForm();

  const handleAdd = () => {
    setSelectedUser(null);

    form.resetFields();

    setModalVisible(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);

    form.setFieldsValue(user);

    setModalVisible(true);
  };

  const handleDelete = (userId) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa người dùng này?",

      content: "Hành động này không thể hoàn tác",

      okText: "Xóa",

      okType: "danger",

      cancelText: "Hủy",

      onOk() {
        setUsers(users.filter((user) => user.id !== userId));
      },
    });
  };

  const handleChangePassword = (user) => {
    setSelectedUser(user);

    passwordForm.resetFields();

    setPasswordModalVisible(true);
  };

  const handleSubmit = (values) => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...values } : user
        )
      );
    } else {
      const newUser = {
        id: users.length + 1,

        ...values,

        status: true,

        lastLogin: null,
      };

      setUsers([...users, newUser]);
    }

    setModalVisible(false);
  };

  const handlePasswordSubmit = (values) => {
    // Xử lý đổi mật khẩu

    setPasswordModalVisible(false);

    passwordForm.resetFields();
  };

  const columns = [
    {
      title: "Thông tin người dùng",

      key: "user",

      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />

          <div>
            <div className="font-medium">{record.fullName}</div>

            <div className="text-gray-500 text-sm">{record.username}</div>
          </div>
        </Space>
      ),
    },

    {
      title: "Email",

      dataIndex: "email",

      key: "email",
    },

    {
      title: "Vai trò",

      dataIndex: "role",

      key: "role",

      render: (role) => {
        const colors = {
          admin: "red",

          manager: "blue",

          user: "green",
        };

        return <Tag color={colors[role]}>{role.toUpperCase()}</Tag>;
      },
    },

    {
      title: "Phòng ban",

      dataIndex: "department",

      key: "department",

      render: (dept) => <Tag color="purple">{dept}</Tag>,
    },

    {
      title: "Trạng thái",

      dataIndex: "status",

      key: "status",

      render: (status, record) => (
        <Switch
          checked={status}
          checkedChildren="Hoạt động"
          unCheckedChildren="Khóa"
          onChange={(checked) => {
            setUsers(
              users.map((user) =>
                user.id === record.id ? { ...user, status: checked } : user
              )
            );
          }}
        />
      ),
    },

    {
      title: "Thao tác",

      key: "action",

      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>

          <Button
            type="text"
            icon={<KeyOutlined />}
            onClick={() => handleChangePassword(record)}
          >
            Đổi mật khẩu
          </Button>

          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Quản Lý Người Dùng</h2>

            <p className="text-gray-500">
              Quản lý tài khoản và phân quyền người dùng
            </p>
          </div>

          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm người dùng
          </Button>
        </div>

        {/* Thống kê */}

        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng số người dùng"
                value={users.length}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Đang hoạt động"
                value={users.filter((u) => u.status).length}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tài khoản bị khóa"
                value={users.filter((u) => !u.status).length}
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="id"
        />

        {/* Modal thêm/sửa người dùng */}

        <Modal
          title={selectedUser ? "Sửa người dùng" : "Thêm người dùng mới"}
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[{ required: true }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            {!selectedUser && (
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true }]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
            )}

            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
              <Select>
                <Option value="admin">Admin</Option>

                <Option value="manager">Manager</Option>

                <Option value="user">User</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="department"
              label="Phòng ban"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="IT">Phòng IT</Option>

                <Option value="HR">Phòng HR</Option>

                <Option value="Marketing">Phòng Marketing</Option>
              </Select>
            </Form.Item>

            <Form.Item className="text-right">
              <Space>
                <Button onClick={() => setModalVisible(false)}>Hủy</Button>

                <Button type="primary" htmlType="submit">
                  {selectedUser ? "Cập nhật" : "Thêm mới"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal đổi mật khẩu */}

        <Modal
          title="Đổi mật khẩu"
          visible={passwordModalVisible}
          onCancel={() => setPasswordModalVisible(false)}
          footer={null}
        >
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handlePasswordSubmit}
          >
            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              rules={[
                { required: true },

                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={["newPassword"]}
              rules={[
                { required: true },

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp")
                    );
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item className="text-right">
              <Space>
                <Button onClick={() => setPasswordModalVisible(false)}>
                  Hủy
                </Button>

                <Button type="primary" htmlType="submit">
                  Đổi mật khẩu
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default UserManagement;
