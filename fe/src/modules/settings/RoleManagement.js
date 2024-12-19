import React, { useState } from "react";

import { Table, Button, Modal, Form, Input, Checkbox, Card, Space } from "antd";

import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Quản trị viên hệ thống",
      permissions: ["all"],
    },

    {
      id: 2,
      name: "HR Manager",
      description: "Quản lý nhân sự",
      permissions: ["view_employees", "edit_employees"],
    },

    {
      id: 3,
      name: "Employee",
      description: "Nhân viên",
      permissions: ["view_profile"],
    },
  ]);

  const isMobile = window.innerWidth <= 768;

  const columns = [
    {
      title: "Tên vai trò",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      responsive: ["md"],
    },
    {
      title: "Quyền hạn",
      dataIndex: "permissions",
      key: "permissions",
      ellipsis: true,
      render: (permissions) => permissions.join(", "),
      responsive: ["md"],
    },
    {
      title: "Thao tác",
      key: "action",
      width: isMobile ? 100 : 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size={isMobile ? "small" : "middle"}
          >
            {!isMobile && "Sửa"}
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            size={isMobile ? "small" : "middle"}
          >
            {!isMobile && "Xóa"}
          </Button>
        </Space>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const [editingRole, setEditingRole] = useState(null);

  const handleAdd = () => {
    setEditingRole(null);

    form.resetFields();

    setIsModalVisible(true);
  };

  const handleEdit = (role) => {
    setEditingRole(role);

    form.setFieldsValue(role);

    setIsModalVisible(true);
  };

  const handleDelete = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingRole) {
        setRoles(
          roles.map((role) =>
            role.id === editingRole.id ? { ...role, ...values } : role
          )
        );
      } else {
        setRoles([...roles, { ...values, id: roles.length + 1 }]);
      }

      setIsModalVisible(false);
    });
  };

  return (
    <div style={{ padding: isMobile ? "12px" : "24px" }}>
      <Card
        title="Quản lý phân quyền"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            size={isMobile ? "small" : "middle"}
          >
            {!isMobile && "Thêm vai trò mới"}
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={roles}
          rowKey="id"
          scroll={{ x: true }}
          size={isMobile ? "small" : "middle"}
          pagination={{
            size: isMobile ? "small" : "default",
            pageSize: isMobile ? 5 : 10,
          }}
        />
      </Card>

      <Modal
        title={editingRole ? "Sửa vai trò" : "Thêm vai trò mới"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên vai trò"
            rules={[{ required: true, message: "Vui lòng nhập tên vai trò!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="permissions" label="Quyền hạn">
            <Checkbox.Group
              options={[
                { label: "Xem nhân viên", value: "view_employees" },

                { label: "Chỉnh sửa nhân viên", value: "edit_employees" },

                { label: "Xem profile", value: "view_profile" },

                { label: "Tất cả quyền", value: "all" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManagement;
