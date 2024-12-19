import React, { useState, useEffect } from "react";
import {
  Card,
  Tabs,
  Table,
  DatePicker,
  Button,
  Space,
  Row,
  Col,
  Statistic,
  Progress,
  Select,
  Tag,
} from "antd";
import {
  BarChartOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  UserOutlined,
  DownloadOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const ReportList = ({ activeTab = "attendance" }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  // Dữ liệu mẫu cho báo cáo chấm công
  const attendanceData = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      department: "IT",
      onTime: 20,
      late: 2,
      absent: 0,
      leave: 1,
      attendance: 95,
    },
    {
      id: 2,
      name: "Trần Thị B",
      department: "HR",
      onTime: 18,
      late: 3,
      absent: 1,
      leave: 1,
      attendance: 85,
    },
  ];

  // Dữ liệu mẫu cho báo cáo lương
  const salaryData = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      department: "IT",
      baseSalary: 15000000,
      allowance: 2000000,
      overtime: 1000000,
      total: 18000000,
    },
    {
      id: 2,
      name: "Trần Thị B",
      department: "HR",
      baseSalary: 18000000,
      allowance: 3000000,
      overtime: 500000,
      total: 21500000,
    },
  ];

  // Dữ liệu mẫu cho đánh giá nhân viên
  const performanceData = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      department: "IT",
      position: "Developer",
      kpi: 95,
      attitude: 90,
      overall: 92,
    },
    {
      id: 2,
      name: "Trần Thị B",
      department: "HR",
      position: "HR Manager",
      kpi: 88,
      attitude: 95,
      overall: 90,
    },
  ];

  const attendanceColumns = [
    {
      title: "Nhân viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Đúng giờ",
      dataIndex: "onTime",
      key: "onTime",
    },
    {
      title: "Đi muộn",
      dataIndex: "late",
      key: "late",
    },
    {
      title: "Vắng mặt",
      dataIndex: "absent",
      key: "absent",
    },
    {
      title: "Nghỉ phép",
      dataIndex: "leave",
      key: "leave",
    },
    {
      title: "Tỷ lệ chuyên cần",
      dataIndex: "attendance",
      key: "attendance",
      render: (value) => (
        <Progress
          percent={value}
          size="small"
          status={value >= 90 ? "success" : "normal"}
        />
      ),
    },
  ];

  const salaryColumns = [
    {
      title: "Nhân viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Lương cơ bản",
      dataIndex: "baseSalary",
      key: "baseSalary",
      render: (value) => `${value.toLocaleString()} VNĐ`,
    },
    {
      title: "Phụ cấp",
      dataIndex: "allowance",
      key: "allowance",
      render: (value) => `${value.toLocaleString()} VNĐ`,
    },
    {
      title: "Tăng ca",
      dataIndex: "overtime",
      key: "overtime",
      render: (value) => `${value.toLocaleString()} VNĐ`,
    },
    {
      title: "Tổng nhận",
      dataIndex: "total",
      key: "total",
      render: (value) => (
        <span className="text-green-600 font-medium">
          {value.toLocaleString()} VNĐ
        </span>
      ),
    },
  ];

  const performanceColumns = [
    {
      title: "Nhân viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Chức vụ",
      dataIndex: "position",
      key: "position",
      render: (text) => <Tag color="purple">{text}</Tag>,
    },
    {
      title: "KPI",
      dataIndex: "kpi",
      key: "kpi",
      render: (value) => <Progress percent={value} size="small" />,
    },
    {
      title: "Thái độ",
      dataIndex: "attitude",
      key: "attitude",
      render: (value) => <Progress percent={value} size="small" />,
    },
    {
      title: "Đánh giá chung",
      dataIndex: "overall",
      key: "overall",
      render: (value) => (
        <Progress
          percent={value}
          size="small"
          status={value >= 90 ? "success" : "normal"}
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Báo Cáo & Thống Kê</h2>
            <p className="text-gray-500">Xem và xuất báo cáo theo từng mục</p>
          </div>
        </div>

        {/* Thống kê chung */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Tổng nhân viên"
                value={150}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Tỷ lệ đi làm"
                value={95}
                prefix={<ClockCircleOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Tổng quỹ lương"
                value={850000000}
                prefix={<DollarOutlined />}
                suffix="VNĐ"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="KPI trung bình"
                value={88}
                prefix={<BarChartOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>

        {/* Bộ lọc */}
        <div className="mb-6">
          <Space>
            <RangePicker />
            <Select defaultValue="all" style={{ width: 200 }}>
              <Option value="all">Tất cả phòng ban</Option>
              <Option value="it">Phòng IT</Option>
              <Option value="hr">Phòng HR</Option>
            </Select>
            <Button icon={<FileExcelOutlined />}>Xuất Excel</Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              Tải báo cáo
            </Button>
          </Space>
        </div>

        {/* Tabs báo cáo */}
        <Tabs activeKey={currentTab} onChange={setCurrentTab}>
          <TabPane tab="Báo cáo chấm công" key="attendance">
            <Table
              columns={attendanceColumns}
              dataSource={attendanceData}
              loading={loading}
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="Báo cáo lương" key="salary">
            <Table
              columns={salaryColumns}
              dataSource={salaryData}
              loading={loading}
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="Đánh giá nhân viên" key="performance">
            <Table
              columns={performanceColumns}
              dataSource={performanceData}
              loading={loading}
              rowKey="id"
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ReportList;
