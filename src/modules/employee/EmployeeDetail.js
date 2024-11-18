import React from "react";
import {
  Descriptions,
  Card,
  Timeline,
  Table,
  Tag,
  Tabs,
  Statistic,
  Row,
  Col,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CalendarOutlined,
  BankOutlined,
  DollarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { TabPane } = Tabs;

const EmployeeDetail = ({ employee }) => {
  // Dữ liệu mẫu cho lịch sử làm việc
  const workHistory = [
    {
      date: "2024-01-01",
      title: "Thăng chức",
      description: "Được thăng chức lên Team Leader",
    },
    {
      date: "2023-06-15",
      title: "Chuyển phòng ban",
      description: "Chuyển từ phòng Marketing sang phòng IT",
    },
    {
      date: "2023-01-15",
      title: "Gia nhập công ty",
      description: "Bắt đầu làm việc tại vị trí Developer",
    },
  ];

  // Dữ liệu mẫu cho bảng lương gần đây
  const recentSalaries = [
    {
      month: "2024-02",
      baseSalary: 15000000,
      allowance: 2000000,
      overtime: 1000000,
      total: 18000000,
    },
    {
      month: "2024-01",
      baseSalary: 15000000,
      allowance: 2000000,
      overtime: 800000,
      total: 17800000,
    },
  ];

  // Dữ liệu mẫu cho chấm công
  const timesheets = [
    {
      date: "2024-03-15",
      checkIn: "08:00",
      checkOut: "17:30",
      status: "present",
    },
    {
      date: "2024-03-14",
      checkIn: "08:15",
      checkOut: "17:45",
      status: "late",
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thông tin cơ bản" key="1">
          {/* Thông tin cá nhân */}
          <Card title="Thông tin cá nhân" className="mb-6">
            <Descriptions column={2}>
              <Descriptions.Item
                label={
                  <>
                    <UserOutlined /> Họ và tên
                  </>
                }
              >
                {employee?.fullName}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <PhoneOutlined /> Số điện thoại
                  </>
                }
              >
                {employee?.phone}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <MailOutlined /> Email
                  </>
                }
              >
                {employee?.email}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <HomeOutlined /> Địa chỉ
                  </>
                }
              >
                {employee?.address}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <CalendarOutlined /> Ngày sinh
                  </>
                }
              >
                {moment(employee?.birthDate).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <BankOutlined /> Phòng ban
                  </>
                }
              >
                <Tag color="blue">{employee?.department?.name}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Lịch sử làm việc */}
          <Card title="Lịch sử làm việc" className="mb-6">
            <Timeline>
              {workHistory.map((history, index) => (
                <Timeline.Item key={index}>
                  <p className="font-medium">{history.title}</p>
                  <p className="text-gray-500">
                    {moment(history.date).format("DD/MM/YYYY")}
                  </p>
                  <p>{history.description}</p>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </TabPane>

        <TabPane tab="Chấm công" key="2">
          <Card title="Thống kê chấm công tháng này">
            <Row gutter={16} className="mb-6">
              <Col span={6}>
                <Statistic
                  title="Đi làm đúng giờ"
                  value={18}
                  suffix="/22"
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Đi muộn"
                  value={2}
                  suffix="/22"
                  valueStyle={{ color: "#faad14" }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Nghỉ phép"
                  value={1}
                  suffix="/22"
                  valueStyle={{ color: "#1890ff" }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Vắng mặt"
                  value={1}
                  suffix="/22"
                  valueStyle={{ color: "#cf1322" }}
                />
              </Col>
            </Row>

            <Table
              dataSource={timesheets}
              columns={[
                {
                  title: "Ngày",
                  dataIndex: "date",
                  key: "date",
                  render: (date) => moment(date).format("DD/MM/YYYY"),
                },
                {
                  title: "Check-in",
                  dataIndex: "checkIn",
                  key: "checkIn",
                },
                {
                  title: "Check-out",
                  dataIndex: "checkOut",
                  key: "checkOut",
                },
                {
                  title: "Trạng thái",
                  dataIndex: "status",
                  key: "status",
                  render: (status) => (
                    <Tag color={status === "present" ? "success" : "warning"}>
                      {status === "present" ? "Đúng giờ" : "Đi muộn"}
                    </Tag>
                  ),
                },
              ]}
              pagination={false}
            />
          </Card>
        </TabPane>

        <TabPane tab="Lương" key="3">
          <Card title="Thông tin lương">
            <Row gutter={16} className="mb-6">
              <Col span={8}>
                <Statistic
                  title="Lương cơ bản"
                  value={employee?.baseSalary}
                  precision={0}
                  prefix={<DollarOutlined />}
                  suffix="VNĐ"
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Phụ cấp"
                  value={2000000}
                  precision={0}
                  prefix={<DollarOutlined />}
                  suffix="VNĐ"
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Giờ tăng ca"
                  value={10}
                  prefix={<ClockCircleOutlined />}
                  suffix="giờ"
                />
              </Col>
            </Row>

            <Table
              title={() => "Lương 3 tháng gần nhất"}
              dataSource={recentSalaries}
              columns={[
                {
                  title: "Tháng",
                  dataIndex: "month",
                  key: "month",
                  render: (month) => moment(month).format("MM/YYYY"),
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
                    <span className="font-bold text-green-600">
                      {value.toLocaleString()} VNĐ
                    </span>
                  ),
                },
              ]}
              pagination={false}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default EmployeeDetail;
