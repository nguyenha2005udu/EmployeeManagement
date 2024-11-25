import React from "react";
import { Card, Row, Col, Statistic, Progress, Table, Button } from "antd";
import {
  UserOutlined,
  BankOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  // Data mẫu cho bảng nhân viên mới
  const newEmployees = [
    {
      key: "1",
      id: 1,
      name: "Nguyễn Văn A",
      department: "IT",
      joinDate: "2024-03-01",
    },
    {
      key: "2",
      id: 2,
      name: "Trần Thị B",
      department: "HR",
      joinDate: "2024-03-05",
    },
  ];

  // Dữ liệu phòng ban với key
  const departments = [
    { key: "it", name: "Phòng IT", percent: 95 },
    { key: "hr", name: "Phòng HR", percent: 88 },
    { key: "marketing", name: "Phòng Marketing", percent: 92 },
  ];

  // Columns cho bảng nhân viên mới
  const columns = [
    {
      title: "Họ Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phòng Ban",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Ngày Vào",
      dataIndex: "joinDate",
      key: "joinDate",
    },
  ];

  return (
    <div style={{ padding: "32px", position: "relative", zIndex: 1 }}>
      <h2 className="text-2xl font-bold mb-8">Bảng Điều Khiển</h2>

      {/* Thống kê chính */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col span={6}>
          <Card hoverable className="h-full">
            <Statistic
              title="Tổng Nhân Viên"
              value={150}
              prefix={<UserOutlined className="text-blue-500 mr-2" />}
              suffix={
                <span className="text-green-500 text-sm ml-2">
                  <ArrowUpOutlined /> 5%
                </span>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Phòng Ban"
              value={8}
              prefix={<BankOutlined className="text-purple-500" />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Đi Làm Hôm Nay"
              value={142}
              prefix={<ClockCircleOutlined className="text-green-500" />}
              suffix="/150"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Tổng Lương Tháng"
              value={850000000}
              prefix={<DollarOutlined className="text-red-500" />}
              formatter={(value) => `${value.toLocaleString()} VNĐ`}
            />
          </Card>
        </Col>
      </Row>

      {/* Thống kê chấm công hôm nay */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col span={24}>
          <Card title="Thống Kê Chấm Công Hôm Nay" hoverable className="h-full">
            <Row gutter={[32, 16]}>
              <Col span={8}>
                <Statistic
                  title="Đúng Giờ"
                  value={120}
                  suffix="/150"
                  valueStyle={{ color: "#3f8600", marginBottom: "16px" }}
                />
                <Progress percent={80} status="success" />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Đi Muộn"
                  value={22}
                  suffix="/150"
                  valueStyle={{ color: "#faad14" }}
                />
                <Progress percent={15} status="warning" />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Vắng Mặt"
                  value={8}
                  suffix="/150"
                  valueStyle={{ color: "#cf1322" }}
                />
                <Progress percent={5} status="exception" />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Thống kê chi tiết */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col span={12}>
          <Card
            title="Tỷ Lệ Đi Làm Theo Phòng Ban"
            hoverable
            className="h-full"
          >
            <Row gutter={[24, 24]}>
              {departments.map((dept) => (
                <Col span={8} key={dept.key}>
                  <Progress
                    type="circle"
                    percent={dept.percent}
                    format={(percent) => `${percent}%`}
                    className="mb-4"
                  />
                  <div className="text-center mt-4">{dept.name}</div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Nhân Viên Mới"
            hoverable
            className="h-full"
            extra={<Button type="link">Xem tất cả</Button>}
          >
            <Table
              dataSource={newEmployees}
              columns={columns}
              pagination={false}
              rowKey="id"
              className="mt-4"
            />
          </Card>
        </Col>
      </Row>

      {/* Thống kê nhân sự */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="Thống Kê Nhân Sự" hoverable>
            <Row gutter={[32, 16]}>
              {[
                { key: "male", title: "Nam", value: 90, percent: 60 },
                { key: "female", title: "Nữ", value: 60, percent: 40 },
                {
                  key: "fulltime",
                  title: "Toàn thời gian",
                  value: 130,
                  percent: 87,
                },
                {
                  key: "parttime",
                  title: "Bán thời gian",
                  value: 20,
                  percent: 13,
                },
              ].map((item) => (
                <Col span={6} key={item.key}>
                  <Statistic
                    title={item.title}
                    value={item.value}
                    suffix="/150"
                    className="mb-4"
                  />
                  <Progress percent={item.percent} showInfo={false} />
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
