import React, { useState, useEffect } from "react";
import axios from "axios";
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
const { TabPane } = Tabs;

const TimesheetList = () => {
    const [timesheets, setTimesheets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(moment());
    const [viewMode, setViewMode] = useState("list");
    const [statistics, setStatistics] = useState({
        present: 0,
        late: 0,
        absent: 0,
        onLeave: 0,
    });

    const fetchTimesheets = async () => {
      try {
        setLoading(true);
        const apiData = await timesheetService.getAllTimesheets();
        if (!Array.isArray(apiData)) {
          throw new Error("Dữ liệu trả về không phải là một mảng");
        }
        const transformedData = apiData.map((item) => ({
          code: item?.employee?.employeeId || "",
          name: item?.employee?.name || "Unknown",
          checkInTime: item?.checkIn || "",
          checkOutTime: item?.checkOut || "",
          totalHours: 0,
        }));
        setTimesheets(transformedData);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        message.error("Không thể tải danh sách chấm công");
      } finally {
        setLoading(false);
      }
    };


    useEffect(() => {
      fetchTimesheets();
    }, [selectedDate]);

//  const calculateStatistics = (data) => {
//    const stats = data.reduce(
//      (acc, curr) => {
//        if (curr.status === "present") acc.present++;
//        else if (curr.status === "late") acc.late++;
//        else if (curr.status === "absent") acc.absent++;
//        else if (curr.status === "leave") acc.onLeave++;
//        return acc;
//      },
//      { present: 0, late: 0, absent: 0, onLeave: 0 }
//    );
//    setStatistics(stats);
//  };
//
//  const handleCheckIn = async (employeeId) => {
//    try {
//      const currentTime = moment().toISOString(); // Lấy thời gian hiện tại
//      await timesheetService.checkIn(employeeId, currentTime); // Gửi thời gian lên server
//      message.success("Đã check-in thành công");
//      fetchTimesheets();
//    } catch (error) {
//      message.error("Không thể check-in");
//    }
//  };
//
//  const handleCheckOut = async (timesheetId) => {
//    try {
//      const currentTime = moment().toISOString();
//      await timesheetService.checkOut(timesheetId, currentTime);
//      message.success("Đã check-out thành công");
//      fetchTimesheets();
//    } catch (error) {
//      message.error("Không thể check-out");
//    }
//  };

  const columns = [
    {
      title: "Nhân viên",
      key: "employee",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-gray-500 text-sm">{record.code}</div>
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
      title: "Thao tác",
      key: "actions",
//      render: (_, record) => (
//        <Space>
//          {!record.checkInTime && (
//            <Button
//              type="primary"
//
//            >
//              Check-in
//            </Button>
//          )}
//          {record.checkInTime && !record.checkOutTime && (
//
//          )}
//        </Space>
//      ),
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
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
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
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateCellRender={calendarCellRender}
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
