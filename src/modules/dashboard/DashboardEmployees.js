
import { Card, Row, Col, Statistic, Progress, Table, Button,message  } from "antd";
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
import {Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashboardEmployees = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
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


  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const { data: employee } = await axios.get(
            `http://localhost:8386/management/employees/${employeeId}`
          );

      const transformedData = {
              employeeId: employee.employeeId || "",
              name: employee.name || "",
              department: {
                departmentCode: employee.department?.departmentCode || "",
                departmentName: employee.department?.departmentName || "",
              },
              position: {
                positionCode: employee.position?.positionCode || "",
                positionName: employee.position?.positionName || "",
                basicSalary: employee.position?.basicSalary || "",
              },

            };

      setEmployees(transformedData); // Lưu dữ liệu đã chuyển đổi vào trạng thái
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      message.error("Không thể tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {

    fetchEmployees();
  }, []);

  const fetchTimesheets = async (month, year) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8386/management/attendances/employee/${employeeId}/${month}/${year}`
      );
      const timesheets = response.data.map((item) => ({
        id: item.id,
        checkInTime: item?.checkIn || "",
        checkOutTime: item?.checkOut || "",
        date: item.date,
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
    const month = selectedDate.month() + 1;
    const year = selectedDate.year();
    fetchTimesheets(month, year);
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
            moment(timePart, "HH:mm:ss").isBefore(moment("10:02:00", "HH:mm:ss"))
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


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    message.success("Bạn đã đăng xuất thành công");
  };
  const columns = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
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
  ];

  return (
    
    <div style={{ padding: "32px", position: "relative", zIndex: 1 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 className="text-2xl font-bold mb-8">Bảng Điều Khiển</h2>
      <Button type="primary" danger onClick={handleLogout}>
        Đăng Xuất
      </Button>
    </div>
      
      {/* Thống kê chính */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Tên nhân viên"
              value={employees?.name || "N/A"}
              prefix={<ClockCircleOutlined className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Phòng ban"
              value={employees?.department?.departmentName || "N/A"}
              prefix={<ClockCircleOutlined className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Vị trí"
              value={employees?.position?.positionName || "N/A"}
              prefix={<ClockCircleOutlined className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Statistic
              title="Lương cơ bản"
              value={employees?.position?.basicSalary || 0}
              prefix={<DollarOutlined className="text-red-500" />}
              formatter={(value) => `${Number(value).toLocaleString()} VNĐ`}
            />
          </Card>
        </Col>
      </Row>


      {/* Thống kê chấm công hôm nay */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col span={24}>
          <Card title="Thống Kê Chấm Công" hoverable className="h-full">
            <Row gutter={[32, 16]}>
              <Col span={8}>
                <Statistic
                  title="Đúng Giờ"
                  value={statistics.present}
                  valueStyle={{ color: "#3f8600", marginBottom: "16px" }}
                />
                <Progress percent={80} status="success" />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Đi Muộn"
                  value={statistics.late}

                  valueStyle={{ color: "#faad14" }}
                />
                <Progress percent={15} status="warning" />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Vắng Mặt"
                  value={ 26 - statistics.late - statistics.present}

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
            title="Thời gian chấm công"
            hoverable
            className="h-full"
            extra={
                <Link to={`/user/${employeeId}/payroll`}>Xem Bảng Lương</Link>
              }
          >
            <Table
              dataSource={timesheets}
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

export default DashboardEmployees;
