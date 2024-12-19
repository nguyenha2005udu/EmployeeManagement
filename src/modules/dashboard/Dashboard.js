import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Table,
  Button,
  message,
} from "antd";
import {
  UserOutlined,
  BankOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import { useState, useEffect } from "react";
import { employeeService } from "../../services/employeeService";
import { departmentService } from "../../services/departmentService.js";
const Dashboard = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [statistics, setStatistics] = useState({
    present: 0,
    late: 0,
    absent: 0,
    onLeave: 0,
  });
  const [selectedDate, setSelectedDate] = useState(moment());
  const [loading, setLoading] = useState(false);

  const fetchTimesheets = async (day, month, year) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8386/management/attendances/${day}/${month}/${year}`
      );
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
  const calculateStatistics = (timesheets) => {
    return timesheets.reduce(
      (acc, curr) => {
        if (!curr.checkInTime) {
          acc.absent++;
        } else {
          const timePart = curr.checkInTime.split("T")[1];
          if (
            timePart &&
            moment(timePart, "HH:mm:ss").isBefore(
              moment("10:02:00", "HH:mm:ss")
            )
          ) {
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

  const fetchDepartments = async () => {
    const apiData = await departmentService.getAllDepartments();
    setDepartments(apiData);
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const apiData = await employeeService.getAllEmployees();
      console.log("Dữ liệu trả về từ API:", apiData);
      console.log(Array.isArray(apiData));
      // Chuyển đổi dữ liệu API sang định dạng cần thiết
      const transformedData = apiData.map((item) => ({
        employeeId: item.employeeId || "",
        name: item.name || "",
        departmentName: item.department?.departmentName || "",
        positionName: item.position?.positionName || "",
      }));

      setEmployees(transformedData); // Lưu dữ liệu đã chuyển đổi vào trạng thái
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      message.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã nhân viên",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Phòng ban",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "Vi trí",
      dataIndex: "positionName",
      key: "positionName",
    },
  ];

  return (
    <div style={{ padding: "32px", position: "relative", zIndex: 1 }}>
      <h2 className="text-2xl font-bold mb-8">Bảng điều khiển</h2>

      {/* Thống kê chính */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col span={6}>
          <Card hoverable className="h-full">
            <Statistic
              title="Tổng nhân viên"
              value={employees.length}
              prefix={<UserOutlined className="text-blue-500 mr-2" />}
              suffix={<span className="text-green-500 text-sm ml-2"></span>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Phòng ban"
              value={departments.length}
              prefix={<BankOutlined className="text-purple-500" />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Đi làm hôm nay"
              value={statistics.present + statistics.late}
              prefix={<ClockCircleOutlined className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Tổng lương tháng"
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
          <Card title="Thống kê chấm công hôm nay" hoverable className="h-full">
            <Row gutter={[32, 16]}>
              <Col span={8}>
                <Statistic
                  title="Đúng giờ"
                  value={statistics.present}
                  valueStyle={{ color: "#3f8600", marginBottom: "16px" }}
                />
                <Progress percent={80} status="success" />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Đi muộn"
                  value={statistics.late}
                  valueStyle={{ color: "#faad14" }}
                />
                <Progress percent={15} status="warning" />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Vắng mặt"
                  value={
                    employees.length - statistics.late - statistics.present
                  }
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
        <Col span={24}>
          <Card
            title="Nhân viên mới"
            hoverable
            className="h-full"
            extra={<a href="/employees">Xem tất cả</a>}
          >
            <Table
              dataSource={employees.slice(-3).reverse()}
              columns={columns}
              pagination={false}
              rowKey="id"
              className="mt-4"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
