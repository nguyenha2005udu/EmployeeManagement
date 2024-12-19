import React, { useState, useEffect } from "react";

import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  DatePicker,
  InputNumber,
  Select,
  Row,
  Col,
  Statistic,
} from "antd";

import {
  PlusOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  UserOutlined,
} from "@ant-design/icons";

import moment from "moment";

import { overtimeData } from "../../utils/mockData";

const { Option } = Select;

const OvertimeList = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [overtimeRecords, setOvertimeRecords] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setOvertimeRecords(overtimeData);

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
      title: "Ngày",

      dataIndex: "date",

      key: "date",

      render: (date) => moment(date).format("DD/MM/YYYY"),
    },

    {
      title: "Số giờ",

      dataIndex: "hours",

      key: "hours",

      render: (hours) => (
        <Tag icon={<ClockCircleOutlined />} color="blue">
          {hours} giờ
        </Tag>
      ),
    },

    {
      title: "Hệ số",

      dataIndex: "rate",

      key: "rate",
    },

    {
      title: "Thành tiền",

      dataIndex: "amount",

      key: "amount",

      render: (amount) => (
        <span className="text-green-600 font-medium">
          {amount.toLocaleString()} VNĐ
        </span>
      ),
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
            <h2 className="text-2xl font-bold mb-2">Quản Lý Tăng Ca</h2>

            <p className="text-gray-500">
              Quản lý thời gian tăng ca và tính phụ cấp
            </p>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Thêm Tăng Ca
          </Button>
        </div>

        {/* Thống kê */}

        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng giờ tăng ca"
                value={125}
                prefix={<ClockCircleOutlined />}
                suffix="giờ"
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng chi phí"
                value={15000000}
                prefix={<DollarOutlined />}
                suffix="VNĐ"
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Đơn chờ duyệt"
                value={5}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={overtimeRecords}
          loading={loading}
          rowKey="id"
        />

        {/* Modal thêm tăng ca */}

        <Modal
          title="Thêm Tăng Ca"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              console.log(values);
              setModalVisible(false);
              form.resetFields();
            }}
          >
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

            <Form.Item
              name="date"
              label="Ngày tăng ca"
              rules={[{ required: true }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                onChange={(date) => {
                  if (date && moment.isMoment(date)) {
                    form.setFieldsValue({ date: date });
                  }
                }}
              />
            </Form.Item>

            <Form.Item name="hours" label="Số giờ" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="rate" label="Hệ số" rules={[{ required: true }]}>
              <Select>
                <Option value={1.5}>1.5</Option>

                <Option value={2}>2.0</Option>

                <Option value={3}>3.0</Option>
              </Select>
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

export default OvertimeList;
