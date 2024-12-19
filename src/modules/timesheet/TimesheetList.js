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
  PlusOutlined
} from "@ant-design/icons";
import moment from "moment";

import { timesheetService } from "../../services/timesheetService";
import LeaveRequestList from "./LeaveRequestList";
import ScheduleList from "./ScheduleList";
const { TabPane } = Tabs;
import { employeeService } from "../../services/employeeService";

const TimesheetList = () => {
    const [timesheets, setTimesheets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(moment());
    const [viewMode, setViewMode] = useState("list");
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [employees, setEmployees] = useState([]);

    const [statistics, setStatistics] = useState({
        present: 0,
        late: 0,
        absent: 0,
        onLeave: 0,
    });

     const fetchTimesheets = async (day, month, year) => {
       try {
         setLoading(true);
         const response = await axios.get(`http://localhost:8386/management/attendances/${day}/${month}/${year}`);
         const timesheets = response.data.map((item) => ({
           id: item.id,
           employee: {
             employeeId: item.employee?.employeeId || "",
             name: item.employee?.name || "",
           },
           checkInTime: item?.checkIn || "",
           checkOutTime: item?.checkOut || "",
           date: item.date,
           onLeave: item.isLeave || false, // Set onLeave flag
         }));

         setTimesheets(timesheets);
         setStatistics(calculateStatistics(timesheets));
       } catch (error) {
         console.error("Lỗi khi tải dữ liệu:", error.message);
       } finally {
         setLoading(false);
       }
     };


      useEffect(() => {
        const day = selectedDate.date();
        const month = selectedDate.month() + 1;
        const year = selectedDate.year();

        fetchTimesheets(day, month, year);
      }, [selectedDate]);
      const fetchEmployees = async () => {
          try {
            setLoading(true);
            const apiData = await employeeService.getAllEmployees();
            setEmployees(apiData);
          } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            message.error("Không thể tải danh sách nhân viên");
          } finally {
            setLoading(false);
          }
        };

        useEffect(() => {
          fetchTimesheets();
          fetchEmployees();
        }, [selectedDate]);


    const handleAdd = () => {
        form.resetFields();

        setModalVisible(true);
      };

 const currentTime = new Date(); // Lấy thời gian hiện tại dưới dạng địa phương
const handleSubmit = async (values) => {
  const currentDate = moment(currentTime).format("YYYY-MM-DD");

  // Check if the employee already has a timesheet entry for the current date
  const existingRecord = timesheets.find(
    (t) => t.employee.employeeId === values.employeeId && currentDate === t.date
  );

  if (existingRecord) {
    message.warning('Bạn đã check-in trong ngày hôm nay.');
    setModalVisible(false);
    return;
  }

  const employeeCheckin = {

    id: timesheets.length + 1,
    employee: {
      employeeId: values.employeeId || '',
    },
    date:currentDate,
  };

  try {
    await axios.post('http://localhost:8386/management/attendances/add', employeeCheckin);
    setTimesheets([employeeCheckin, ...timesheets]); // Add new check-in to the state
    message.success('Check-in thành công!');
    setModalVisible(false);
  } catch (error) {
    console.error('Check-in error:', error);
    message.error('Không thể check-in');
    setModalVisible(false);
  }
};


  const calculateStatistics = (timesheets) => {
    return timesheets.reduce(
      (acc, curr) => {
        if (!curr.checkInTime) {
          acc.absent++;
        } else {
          const timePart = curr.checkInTime.split("T")[1];
          if (timePart && moment(timePart, "HH:mm:ss").isBefore(moment("10:02:00", "HH:mm:ss"))) {
            acc.present++;
          } else {
            acc.late++;
          }
        }
        if (curr.onLeave) {
          acc.onLeave++;
        }
        return acc;
      },
      { present: 0, late: 0, absent: 0, onLeave: 0 }
    );
  };


  const handleCheckIn = async (id) => {
    try {

      const checkInTime = moment(currentTime).format("YYYY-MM-DDTHH:mm:ss");
     console.log("Check-in ID:", id, "Local Time:", currentTime, "abc", checkInTime); // Thời gian check-in theo định dạng "YYYY-MM-DDTHH:mm:ss"


      await timesheetService.checkIn(id, checkInTime);

      setTimesheets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, checkInTime: checkInTime } : t
        )
      );

      console.log("Timesheets after Check-in:", timesheets); // Log toàn bộ timesheets sau khi check-in

      message.success("Check-in thành công!");
    } catch (error) {
      console.error("Check-in error:", error);
      message.error("Không thể check-in");
    }
  };


  const handleCheckOut = async (id) => {
    try {
      const currentTimesheet = timesheets.find((t) => t.id === id);

      if (!currentTimesheet || !currentTimesheet.checkInTime) {
        message.error("Không tìm thấy dữ liệu check-in để check-out.");
        return;
      }

      const checkInTime = currentTimesheet.checkInTime; // Lấy thời gian check-in cũ
      const checkOutTime = moment(currentTime).format("YYYY-MM-DDTHH:mm:ss");
      console.log("Check-out ID:", id, "Check-In Time:", checkInTime, "Local Time:", checkOutTime); // Log dữ liệu check-out với giờ địa phương

      await timesheetService.checkOut(id, checkInTime, checkOutTime);

      setTimesheets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, checkOutTime: checkOutTime } : t
        )
      );

      console.log("Updated Timesheets:", timesheets); // Log toàn bộ dữ liệu timesheets sau cập nhật

      message.success("Check-out thành công!");
    } catch (error) {
      console.error("Check-out error:", error);
      message.error("Không thể check-out");
    }
  };




  const columns = [
    {
      title: "Nhân viên",
      key: "employee",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.employee.employeeId}</div>
            <div className="text-gray-500 text-sm">{record.employee.name}</div>
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
      render: (_, record) => (
        <Space>
          {!record.checkInTime && (
            <Button
              type="primary"
              onClick={() => handleCheckIn(record.id)} // Gọi hàm Check-in
            >
              Check-in
            </Button>
          )}
          {record.checkInTime && !record.checkOutTime && (
            <Button
              type="default"
              onClick={() => handleCheckOut(record.id)} // Gọi hàm Check-out
            >
              Check-out
            </Button>
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
            <Badge status={item.status} text={item.employee?.name} />
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
                <Button
                    type="primary"
                    onClick={handleAdd}
                    icon={<PlusOutlined />}
                    size="medium"
                    className="min-w-[160px] ml-20"
                  >
                    Nhâp mã nhân viên
                </Button>
                <Modal
                  visible={modalVisible}
                  title="Nhâp mã nhân viên"
                  onCancel={() => setModalVisible(false)}
                  footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>
                      Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>
                      Thêm
                    </Button>,
                  ]}
                >
                  <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                      name="employeeId"
                      label="Mã nhân viên"
                      rules={[{ required: true, message: "Vui lòng nhập mã nhân viên" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Form>
                </Modal>

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
                    value={employees.length - statistics.present - statistics.late}
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
