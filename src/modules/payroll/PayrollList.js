import React, { useState, useEffect } from "react";
import {
  Table,
  DatePicker,
  Button,
  Card,
  Row,
  Col,
  Statistic,
  Space,
  Tag,
  Tooltip,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import {
  DollarOutlined,
  CalculatorOutlined,
  FileExcelOutlined,
  UserOutlined,
  BankOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

const { MonthPicker } = DatePicker;
const { Option } = Select;

const PayrollList = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calculateModalVisible, setCalculateModalVisible] = useState(false);

  const columns = [
    {
      title: "Thông tin nhân viên",
      key: "employee",
      render: (_, record) => (
        <Space>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <UserOutlined className="text-blue-500" />
          </div>
          <div>
            <div className="font-medium">{record.fullName}</div>
            <div className="text-gray-500 text-sm">Mã: {record.employeeId}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Phòng Ban",
      dataIndex: "department",
      key: "department",
      render: (text) => (
        <Tag icon={<BankOutlined />} color="blue">
          {text}
        </Tag>
      ),
    },
    {
      title: "Ngày Công",
      children: [
        {
          title: "Thực tế",
          dataIndex: "workingDays",
          key: "workingDays",
        },
        {
          title: "Tiêu chuẩn",
          dataIndex: "standardDays",
          key: "standardDays",
        },
      ],
    },
    {
      title: "Lương & Phụ Cấp",
      children: [
        {
          title: "Lương cơ bản",
          dataIndex: "baseSalary",
          key: "baseSalary",
          render: (value) => value.toLocaleString() + " VNĐ",
        },
        {
          title: "Phụ cấp",
          dataIndex: "allowance",
          key: "allowance",
          render: (value) => value.toLocaleString() + " VNĐ",
        },
      ],
    },
    {
      title: "Tăng ca",
      children: [
        {
          title: "Số giờ",
          dataIndex: "overtimeHours",
          key: "overtimeHours",
        },
        {
          title: "Thành tiền",
          dataIndex: "overtimePay",
          key: "overtimePay",
          render: (value) => value.toLocaleString() + " VNĐ",
        },
      ],
    },
    {
      title: "Thực Lãnh",
      dataIndex: "totalSalary",
      key: "totalSalary",
      render: (value) => (
        <span className="text-lg font-bold text-green-600">
          {value.toLocaleString()} VNĐ
        </span>
      ),
    },
  ];

  // Thêm dữ liệu mẫu
  const samplePayrolls = [
    {
      employeeId: "NV001",
      fullName: "Nguyễn Văn A",
      department: "Phòng IT",
      workingDays: 22,
      standardDays: 22,
      baseSalary: 15000000,
      allowance: 2000000,
      overtimeHours: 10,
      overtimePay: 1000000,
      totalSalary: 18000000,
    },
    {
      employeeId: "NV002",
      fullName: "Trần Thị B",
      department: "Phòng HR",
      workingDays: 20,
      standardDays: 22,
      baseSalary: 18000000,
      allowance: 3000000,
      overtimeHours: 5,
      overtimePay: 500000,
      totalSalary: 21500000,
    },
    {
      employeeId: "NV003",
      fullName: "Lê Văn C",
      department: "Phòng Marketing",
      workingDays: 21,
      standardDays: 22,
      baseSalary: 12000000,
      allowance: 1500000,
      overtimeHours: 8,
      overtimePay: 800000,
      totalSalary: 14300000,
    },
  ];

  useEffect(() => {
    if (selectedMonth) {
      setLoading(true);
      // Giả lập API call
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [selectedMonth]);

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Quản Lý Lương</h2>
            <p className="text-gray-500">
              Quản lý và tính toán lương nhân viên
            </p>
          </div>
          <Space>
            <Button icon={<FileExcelOutlined />}>Xuất Excel</Button>
            <Button
              type="primary"
              icon={<CalculatorOutlined />}
              onClick={() => setCalculateModalVisible(true)}
            >
              Tính Lương
            </Button>
          </Space>
        </div>

        {/* Thống kê tổng quan */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Tổng quỹ lương"
                value={1250000000}
                precision={0}
                valueStyle={{ color: "#cf1322" }}
                prefix={<DollarOutlined />}
                suffix="VNĐ"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Lương trung bình"
                value={15000000}
                precision={0}
                valueStyle={{ color: "#3f8600" }}
                prefix={<DollarOutlined />}
                suffix="VNĐ"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="So với tháng trước"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Số người tăng lương"
                value={25}
                prefix={<ArrowUpOutlined />}
                suffix="/ 150"
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Bộ lọc */}
        <div className="mb-6">
          <Space>
            <MonthPicker
              placeholder="Chọn tháng"
              onChange={setSelectedMonth}
              style={{ width: 200 }}
            />
            <Select defaultValue="all" style={{ width: 200 }}>
              <Option value="all">Tất cả phòng ban</Option>
              <Option value="it">Phòng IT</Option>
              <Option value="hr">Phòng HR</Option>
            </Select>
          </Space>
        </div>

        {/* Bảng lương */}
        <Table
          columns={columns}
          dataSource={samplePayrolls}
          loading={loading}
          rowKey="employeeId"
          bordered
          scroll={{ x: true }}
          summary={(pageData) => {
            let totalSalary = 0;
            pageData.forEach(({ totalSalary: salary }) => {
              totalSalary += salary || 0;
            });

            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={2}>
                    <strong>Tổng cộng</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={2}
                    colSpan={6}
                  ></Table.Summary.Cell>
                  <Table.Summary.Cell index={8}>
                    <strong>{totalSalary.toLocaleString()} VNĐ</strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />

        {/* Modal tính lương */}
        <Modal
          title="Tính Lương Tháng"
          visible={calculateModalVisible}
          onCancel={() => setCalculateModalVisible(false)}
          footer={[
            <Button key="back" onClick={() => setCalculateModalVisible(false)}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" loading={loading}>
              Tính Lương
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Tháng tính lương" required>
              <MonthPicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Phòng ban">
              <Select>
                <Option value="all">Tất cả phòng ban</Option>
                <Option value="it">Phòng IT</Option>
                <Option value="hr">Phòng HR</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Ghi chú">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default PayrollList;
