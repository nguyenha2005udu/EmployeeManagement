import React, { useState, useEffect } from "react";
import {
  Table,
  DatePicker,
  Button,
  Card,
  Space,
  message,
  Statistic,
  Row,
  Col,
  Tag,
  Calendar,
  Badge,
  Modal,
  Form,
  Input,
  Select,
  Avatar,
  Tabs,
} from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileExcelOutlined,
  CalendarOutlined,
  UserOutlined,
  TableOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { timesheetService } from "../../services/timesheetService";
import LeaveRequestList from "./LeaveRequestList";
import ScheduleList from "./ScheduleList";
import { dateUtils } from "../../utils/dateUtils";

const { TabPane } = Tabs;

const TimesheetList = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dateUtils.getCurrentDate());
  const [viewMode, setViewMode] = useState("list"); // list/calendar
  const [statistics, setStatistics] = useState({
    present: 0,
    late: 0,
    absent: 0,
    onLeave: 0,
  });

  useEffect(() => {
    fetchTimesheets();
  }, [selectedDate]);

  const fetchTimesheets = async () => {
    try {
      setLoading(true);
      const data = await timesheetService.getAllTimesheets();
      setTimesheets(data);
      calculateStatistics(data);
    } catch (error) {
      message.error("Không thể tải dữ liệu chấm công");
    } finally {
      setLoading(false);
    }
  };

  const calculateStatistics = (data) => {
    const stats = data.reduce(
      (acc, curr) => {
        if (curr.status === "present") acc.present++;
        else if (curr.status === "late") acc.late++;
        else if (curr.status === "absent") acc.absent++;
        else if (curr.status === "leave") acc.onLeave++;
        return acc;
      },
      { present: 0, late: 0, absent: 0, onLeave: 0 }
    );
    setStatistics(stats);
  };

  const handleCheckIn = async (employeeId) => {
    try {
      await timesheetService.checkIn(employeeId);
      message.success("Đã check-in thành công");
      fetchTimesheets();
    } catch (error) {
      message.error("Không thể check-in");
    }
  };

  const handleCheckOut = async (timesheetId) => {
    try {
      await timesheetService.checkOut(timesheetId);
      message.success("Đã check-out thành công");
      fetchTimesheets();
    } catch (error) {
      message.error("Không thể check-out");
    }
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      present: {
        color: "success",
        icon: <CheckCircleOutlined />,
        text: "Có mặt",
      },
      late: {
        color: "warning",
        icon: <ClockCircleOutlined />,
        text: "Đi muộn",
      },
      absent: {
        color: "error",
        icon: <CloseCircleOutlined />,
        text: "Vắng mặt",
      },
      leave: {
        color: "processing",
        icon: <CalendarOutlined />,
        text: "Nghỉ phép",
      },
    };
    const config = statusConfig[status];
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const columns = [
    {
      title: "Nhân viên",
      key: "employee",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.employee?.fullName}</div>
            <div className="text-gray-500 text-sm">{record.employee?.code}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Check-in",
      dataIndex: "checkInTime",
      key: "checkInTime",
      render: (time) => (time ? moment(time).format("HH:mm:ss") : "-"),
    },
    {
      title: "Check-out",
      dataIndex: "checkOutTime",
      key: "checkOutTime",
      render: (time) => (time ? moment(time).format("HH:mm:ss") : "-"),
    },
    {
      title: "Tổng giờ",
      key: "totalHours",
      render: (_, record) => {
        if (!record.checkInTime || !record.checkOutTime) return "-";
        const duration = moment.duration(
          moment(record.checkOutTime).diff(moment(record.checkInTime))
        );
        return `${duration.hours()}h ${duration.minutes()}m`;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          {!record.checkInTime && (
            <Button
              type="primary"
              onClick={() => handleCheckIn(record.employeeId)}
            >
              Check-in
            </Button>
          )}
          {record.checkInTime && !record.checkOutTime && (
            <Button onClick={() => handleCheckOut(record.id)}>Check-out</Button>
          )}
        </Space>
      ),
    },
  ];

  const calendarCellRender = (date) => {
    const dayData = timesheets.filter(
      (t) => moment(t.date).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
    );

    return (
      <ul className="events">
        {dayData.map((item, index) => (
          <li key={index}>
            <Badge status={item.status} text={item.employee?.fullName} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-6">
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Chấm công" key="1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Chấm Công</h2>
                <p className="text-gray-500">
                  Quản lý thời gian làm việc của nhân viên
                </p>
              </div>
              <Space>
                <Button
                  onClick={() =>
                    setViewMode(viewMode === "list" ? "calendar" : "list")
                  }
                  icon={
                    viewMode === "list" ? (
                      <CalendarOutlined />
                    ) : (
                      <TableOutlined />
                    )
                  }
                >
                  {viewMode === "list" ? "Xem lịch" : "Xem danh sách"}
                </Button>
                <Button type="primary" icon={<FileExcelOutlined />}>
                  Xuất báo cáo
                </Button>
              </Space>
            </div>

            {/* Thống kê */}
            <Row gutter={16} className="mb-6">
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Có mặt"
                    value={statistics.present}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Đi muộn"
                    value={statistics.late}
                    valueStyle={{ color: "#faad14" }}
                    prefix={<ClockCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Vắng mặt"
                    value={statistics.absent}
                    valueStyle={{ color: "#cf1322" }}
                    prefix={<CloseCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Nghỉ phép"
                    value={statistics.onLeave}
                    valueStyle={{ color: "#1890ff" }}
                    prefix={<CalendarOutlined />}
                  />
                </Card>
              </Col>
            </Row>

            {/* Bộ lọc */}
            <div className="mb-6">
              <Space>
                <DatePicker
                  value={dateUtils.fromAPIDate(selectedDate)}
                  onChange={(date) => {
                    setSelectedDate(dateUtils.toAPIDate(date));
                  }}
                  format="DD/MM/YYYY"
                />
              </Space>
            </div>

            {/* Nội dung chính */}
            {viewMode === "list" ? (
              <Table
                columns={columns}
                dataSource={timesheets}
                loading={loading}
                rowKey="id"
              />
            ) : (
              <Calendar
                value={dateUtils.fromAPIDate(selectedDate)}
                onChange={(date) => {
                  setSelectedDate(dateUtils.toAPIDate(date));
                }}
                dateCellRender={(date) => {
                  if (!dateUtils.isValidDate(date)) return null;
                  const dayData = timesheets.filter(
                    (t) =>
                      dateUtils.toAPIDate(t.date) === dateUtils.toAPIDate(date)
                  );
                  return (
                    <ul className="events">
                      {dayData.map((item, index) => (
                        <li key={index}>
                          <Badge
                            status={item.status}
                            text={item.employee?.fullName}
                          />
                        </li>
                      ))}
                    </ul>
                  );
                }}
              />
            )}
          </TabPane>

          <TabPane tab="Đơn xin nghỉ phép" key="2">
            <LeaveRequestList />
          </TabPane>

          <TabPane tab="Lịch làm việc" key="3">
            <ScheduleList />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default TimesheetList;
