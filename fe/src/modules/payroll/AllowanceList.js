import React, { useState, useEffect } from "react";

import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Statistic,
} from "antd";

import {
  PlusOutlined,
  DollarOutlined,
  UserOutlined,
  GiftOutlined,
} from "@ant-design/icons";

import { allowanceData } from "../../utils/mockData";

const { Option } = Select;

const { TextArea } = Input;

const AllowanceList = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [allowances, setAllowances] = useState([]);

  useEffect(() => {
    setLoading(true);

    // Giả lập API call với dữ liệu mẫu

    setTimeout(() => {
      setAllowances(allowanceData);

      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      title: "Nhân viên",

      key: "employee",

      render: (_, record) => (
        <Space>
          <UserOutlined />

          <div>
            <div>{record.employee.name}</div>

            <div className="text-gray-500 text-sm">
              {record.employee.department}
            </div>
          </div>
        </Space>
      ),
    },

    {
      title: "Loại",

      dataIndex: "type",

      key: "type",

      render: (type) => (
        <Tag color={type === "bonus" ? "gold" : "blue"}>
          {type === "bonus" ? "Thưởng" : "Phụ cấp"}
        </Tag>
      ),
    },

    {
      title: "Số tiền",

      dataIndex: "amount",

      key: "amount",

      render: (amount) => (
        <span className="text-green-600 font-medium">
          {amount.toLocaleString()} VNĐ
        </span>
      ),
    },

    {
      title: "Lý do",

      dataIndex: "reason",

      key: "reason",
    },

    {
      title: "Trạng thái",

      dataIndex: "status",

      key: "status",

      render: (status) => {
        const config = {
          approved: { color: "success", text: "Đã duyệt" },

          pending: { color: "warning", text: "Chờ duyệt" },

          rejected: { color: "error", text: "Từ chối" },
        };

        return <Tag color={config[status].color}>{config[status].text}</Tag>;
      },
    },

    {
      title: "Thao tác",

      key: "action",

      render: (_, record) => (
        <Space>
          {record.status === "pending" && (
            <>
              <Button type="primary" size="small">
                Duyệt
              </Button>

              <Button danger size="small">
                Từ chối
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Phụ Cấp & Thưởng</h2>

            <p className="text-gray-500">
              Quản lý phụ cấp và thưởng cho nhân viên
            </p>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Thêm Mới
          </Button>
        </div>

        {/* Thống kê */}

        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng phụ cấp"
                value={25000000}
                prefix={<DollarOutlined />}
                suffix="VNĐ"
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng thưởng"
                value={35000000}
                prefix={<GiftOutlined />}
                suffix="VNĐ"
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Đơn chờ duyệt"
                value={3}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={allowances}
          loading={loading}
          rowKey="id"
        />

        {/* Modal thêm mới */}

        <Modal
          title="Thêm Phụ Cấp/Thưởng"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form layout="vertical">
            <Form.Item
              name="employee"
              label="Nhân viên"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn nhân viên">
                <Option value="1">Nguyễn Văn A</Option>

                <Option value="2">Trần Thị B</Option>
              </Select>
            </Form.Item>

            <Form.Item name="type" label="Loại" rules={[{ required: true }]}>
              <Select>
                <Option value="bonus">Thưởng</Option>

                <Option value="allowance">Phụ cấp</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Số tiền"
              rules={[{ required: true }]}
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

            <Form.Item name="reason" label="Lý do" rules={[{ required: true }]}>
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item className="text-right">
              <Space>
                <Button onClick={() => setModalVisible(false)}>Hủy</Button>

                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default AllowanceList;
