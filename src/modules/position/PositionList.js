import React, { useState, useEffect } from "react";

import {
  Table,
  Button,
  Space,
  Card,
  Tag,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Tooltip,
  Row,
  Col,
  Statistic,
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  DollarOutlined,
  BankOutlined,
} from "@ant-design/icons";

import { positionService } from "../../services/positionService.js";
const { Option } = Select;

const PositionList = () => {
  const [positions, setPositions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [editingPosition, setEditingPosition] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchPositions = async () => {
      try {
            setLoading(true);
            const apiData = await positionService.getAllPositions();
            console.log("Dữ liệu trả về từ API:", apiData);

            // Chuyển đổi dữ liệu API sang định dạng cần thiết
            const transformedData = apiData.map((item) => ({
              id: item.id,
              code: item.positionCode || "",
              name: item.positionName || ""
              }))

            setPositions(transformedData);
          } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            message.error("Không thể tải danh sách nhân viên");
          } finally {
            setLoading(false);
          }
        };


    fetchPositions();
  }, []);

  const handleAdd = () => {
    setEditingPosition(null);

    form.resetFields();

    setModalVisible(true);
  };

  const handleEdit = (position) => {
    setEditingPosition(position);

    form.setFieldsValue(position);

    setModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa chức vụ này?",

      content: "Hành động này không thể hoàn tác",

      okText: "Xóa",

      okType: "danger",

      cancelText: "Hủy",

      onOk() {
        // Xử lý xóa

        const newPositions = positions.filter((item) => item.id !== id);

        setPositions(newPositions);

        message.success("Đã xóa chức vụ");
      },
    });
  };

  const handleSubmit = (values) => {
    if (editingPosition) {
      // Xử lý cập nhật

      const newPositions = positions.map((item) =>
        item.id === editingPosition.id ? { ...item, ...values } : item
      );

      setPositions(newPositions);

      message.success("Đã cập nhật chức vụ");
    } else {
      // Xử lý thêm mới

      const newPosition = {
        id: positions.length + 1,

        ...values,

        employeeCount: 0,

        status: true,
      };

      setPositions([...positions, newPosition]);

      message.success("Đã thêm chức vụ mới");
    }

    setModalVisible(false);
  };

  const columns = [
    {
      title: "Mã chức vụ",

      dataIndex: "code",

      key: "code",

      width: 120,
    },

    {
      title: "Tên chức vụ",

      dataIndex: "name",

      key: "name",
    },

    {
      title: "Phòng ban",

      dataIndex: "department",

      key: "department",

      render: (text) => (
        <Tag color="blue" icon={<BankOutlined />}>
          {text}
        </Tag>
      ),
    },

    {
      title: "Lương cơ bản",

      dataIndex: "baseSalary",

      key: "baseSalary",

     render: (value) => (
       <span className="text-green-600 font-medium">
        {typeof value === "number" ? value.toLocaleString("vi-VN") + " VNĐ" : "N/A"}
       </span>
     )

    },

    {
      title: "Phụ cấp",

      dataIndex: "allowance",

      key: "allowance",

      render: (value) => (
        <span className="text-green-600 font-medium">
          {typeof value === "number" ? value.toLocaleString("vi-VN") + " VNĐ" : "N/A"}
        </span>
      )

    },

    {
      title: "Số nhân viên",

      dataIndex: "employeeCount",

      key: "employeeCount",

      render: (count) => (
        <Tag color="purple" icon={<TeamOutlined />}>
          {count} người
        </Tag>
      ),
    },

    {
      title: "Trạng thái",

      dataIndex: "status",

      key: "status",

      render: (status) => (
        <Tag color={status ? "success" : "error"}>
          {status ? "Đang sử dụng" : "Ngừng sử dụng"}
        </Tag>
      ),
    },

    {
      title: "Thao tác",

      key: "action",

      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          <Tooltip title="Xóa">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Quản Lý Chức Vụ</h2>

            <p className="text-gray-500">
              Quản lý thông tin chức vụ trong công ty
            </p>
          </div>

          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm Chức Vụ
          </Button>
        </div>

        {/* Thống kê */}

        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng số chức vụ"
                value={positions.length}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Mức lương trung bình"
                value={
                  positions.reduce((acc, curr) => acc + curr.baseSalary, 0) /
                  positions.length
                }
                precision={0}
                prefix={<DollarOutlined />}
                suffix="VNĐ"
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng nhân viên"
                value={positions.reduce(
                  (acc, curr) => acc + curr.employeeCount,
                  0
                )}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={positions}
          loading={loading}
          rowKey="id"
        />

        <Modal
          title={editingPosition ? "Sửa Chức Vụ" : "Thêm Chức Vụ Mới"}
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="code"
              label="Mã chức vụ"
              rules={[{ required: true, message: "Vui lòng nhập mã chức vụ" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="name"
              label="Tên chức vụ"
              rules={[{ required: true, message: "Vui lòng nhập tên chức vụ" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="department"
              label="Phòng ban"
              rules={[{ required: true, message: "Vui lòng chọn phòng ban" }]}
            >
              <Select>
                <Option value="Phòng IT">Phòng IT</Option>

                <Option value="Phòng HR">Phòng HR</Option>

                <Option value="Phòng Marketing">Phòng Marketing</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="baseSalary"
              label="Lương cơ bản"
              rules={[
                { required: true, message: "Vui lòng nhập lương cơ bản" },
              ]}
            >

              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                addonAfter="VNĐ"
              />
            </Form.Item>



            <Form.Item className="text-right">
              <Space>
                <Button onClick={() => setModalVisible(false)}>Hủy</Button>

                <Button type="primary" htmlType="submit">
                  {editingPosition ? "Cập nhật" : "Thêm mới"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default PositionList;
