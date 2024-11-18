import React, { useState } from "react";

import {
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Card,
  Row,
  Col,
  Statistic,
} from "antd";

import {
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { dateUtils } from "../../utils/dateUtils";

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const { Option } = Select;

const LeaveRequestList = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  // Dữ liệu mẫu

  const leaveRequests = [
    {
      id: 1,

      employee: {
        name: "Nguyễn Văn A",

        department: "IT",
      },

      type: "annual",

      startDate: "2024-03-20",

      endDate: "2024-03-22",

      days: 3,

      reason: "Nghỉ phép năm",

      status: "pending",

      submitDate: "2024-03-15",
    },

    {
      id: 2,

      employee: {
        name: "Trần Thị B",

        department: "HR",
      },

      type: "sick",

      startDate: "2024-03-18",

      endDate: "2024-03-19",

      days: 2,

      reason: "Nghỉ ốm",

      status: "approved",

      submitDate: "2024-03-14",
    },
  ];

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
      title: "Loại nghỉ phép",

      dataIndex: "type",

      key: "type",

      render: (type) => {
        const types = {
          annual: { color: "blue", text: "Nghỉ phép năm" },

          sick: { color: "red", text: "Nghỉ ốm" },

          personal: { color: "orange", text: "Nghỉ việc riêng" },
        };

        return <Tag color={types[type].color}>{types[type].text}</Tag>;
      },
    },

    {
      title: "Thời gian nghỉ",

      key: "duration",

      render: (_, record) => (
        <>
          <div>
            {dateUtils.formatDate(record.startDate)} -{" "}
            {dateUtils.formatDate(record.endDate)}
          </div>

          <div className="text-gray-500 text-sm">{record.days} ngày</div>
        </>
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
        const statusConfig = {
          pending: { color: "warning", text: "Chờ duyệt" },

          approved: { color: "success", text: "Đã duyệt" },

          rejected: { color: "error", text: "Từ chối" },
        };

        return (
          <Tag color={statusConfig[status].color}>
            {statusConfig[status].text}
          </Tag>
        );
      },
    },

    {
      title: "Thao tác",

      key: "action",

      render: (_, record) => (
        <Space>
          {record.status === "pending" && (
            <>
              <Button type="primary" icon={<CheckOutlined />} size="small">
                Duyệt
              </Button>

              <Button danger icon={<CloseOutlined />} size="small">
                Từ chối
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Đơn Xin Nghỉ Phép</h2>

          <p className="text-gray-500">
            Quản lý đơn xin nghỉ phép của nhân viên
          </p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          Tạo đơn nghỉ phép
        </Button>
      </div>

      {/* Thống kê */}

      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic
              title="Đơn chờ duyệt"
              value={5}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Đơn đã duyệt"
              value={20}
              prefix={<CheckOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Đơn từ chối"
              value={3}
              prefix={<CloseOutlined />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng ngày nghỉ"
              value={45}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={leaveRequests}
        loading={loading}
        rowKey="id"
      />

      {/* Modal tạo đơn nghỉ phép */}

      <Modal
        title="Tạo Đơn Xin Nghỉ Phép"
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
          }}
        >
          <Form.Item
            name="type"
            label="Loại nghỉ phép"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="annual">Nghỉ phép năm</Option>

              <Option value="sick">Nghỉ ốm</Option>

              <Option value="personal">Nghỉ việc riêng</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="Thời gian nghỉ"
            rules={[{ required: true }]}
          >
            <RangePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  const days = dateUtils.dateDiff(dates[0], dates[1]);
                  form.setFieldsValue({
                    dateRange: dates,
                    days: days,
                  });
                }
              }}
            />
          </Form.Item>

          <Form.Item
            name="days"
            label="Số ngày nghỉ"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} disabled />
          </Form.Item>

          <Form.Item name="reason" label="Lý do" rules={[{ required: true }]}>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item className="text-right">
            <Space>
              <Button onClick={() => setModalVisible(false)}>Hủy</Button>

              <Button type="primary" htmlType="submit">
                Gửi đơn
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LeaveRequestList;
