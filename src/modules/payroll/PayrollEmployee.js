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
  message,
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
import { employeeService } from "../../services/employeeService";
import axios from "axios";
const { MonthPicker } = DatePicker;
const { Option } = Select;
import { useParams } from "react-router-dom";
const PayrollEmployee = () => {
    const { employeeId } = useParams();
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [loading, setLoading] = useState(false);
    const [calculateModalVisible, setCalculateModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);


    const fetchTimesheets = async (month, year) => {
      try {
        setLoading(true);

        // Lấy thông tin nhân viên
        const { data: employee } = await axios.get(
          `http://localhost:8386/management/employees/${employeeId}`
        );

        // Lấy tổng giờ làm
        const totalHoursResponse = await axios.get(
          `http://localhost:8386/management/attendances/total-hours/${employeeId}/${month}/${year}`
        );

        // Lấy danh sách ngày làm việc
        const workingDaysResponse = await axios.get(
          `http://localhost:8386/management/attendances/employee/${employeeId}/${month}/${year}`
        );

        // Chuyển đổi dữ liệu
        const transformedData = [
          {
            employeeId: employee.employeeId || "",
            fullName: employee?.name || "Không rõ",
            department: employee?.department?.departmentName || "Không rõ",
            workingDays: workingDaysResponse.data?.length || 0,
            standardDays: employee?.standardDays || 22,
            basicSalary: employee?.position?.basicSalary || 0,
            allowance: employee?.allowance || 0,
            totalHours: totalHoursResponse.data || 0,
            overtimePay: 0, // Sẽ được tính sau
            totalSalary: 0, // Sẽ được tính sau
          },
        ];

        // Tính lương
        const processTotalSalaries = (employeeData) => {
          const { totalHours, basicSalary } = employeeData;
          let overtimePay = 0;
          let totalSalary = basicSalary + employeeData.allowance;

          if (totalHours > 40) {
            overtimePay = 1.5 * (totalHours - 40) * (basicSalary / 40);
            totalSalary += overtimePay;
          }

          return { totalSalary, overtimePay };
        };

        // Làm giàu dữ liệu
        const enrichedData = transformedData.map((item) => ({
          ...item,
          ...processTotalSalaries(item),
        }));

        // Lưu dữ liệu vào state
        setDataSource(enrichedData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error.message);
        message.error("Không thể tải danh sách chấm công: " + error.message);
      } finally {
        setLoading(false);
      }
    };



// Xử lý khi chọn tháng
  const handleMonthChange = (date) => {
    if (date) {
      const selectedMonth = date.month() + 1; // Tháng bắt đầu từ 0 nên cần +1
      const selectedYear = date.year();
      setSelectedMonth(date);
      fetchTimesheets(selectedMonth, selectedYear); // Gọi lại API với tháng/năm được chọn
    } else {
      setSelectedMonth(null);
      setDataSource([]); // Xóa dữ liệu nếu không chọn tháng
    }
  };


  useEffect(() => {
    if (!selectedMonth) {
      const currentDate = new Date();
      fetchTimesheets(currentDate.getMonth() + 1, currentDate.getFullYear());
    }
  }, [selectedMonth]);


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
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
      render: (text) => (
        <Tag icon={<BankOutlined />} color="blue">
          {text}
        </Tag>
      ),
    },
    {
      title: "Ngày công",
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
      title: "Lương & Phụ cấp",
      children: [
        {
          title: "Lương cơ bản",
          dataIndex: "basicSalary",
          key: "basicSalary",
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
          dataIndex: "totalHours",
          key: "totalHours",
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
      title: "Thực lãnh",
      dataIndex: "totalSalary",
      key: "totalSalary",
      render: (value) => (
        <span className="text-lg font-bold text-green-600">
          {value.toLocaleString()} VNĐ
        </span>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Quản lý lương</h2>
            <p className="text-gray-500">
              Quản lý và tính toán lương nhân viên.
            </p>
          </div>
          <Space>
            <Button icon={<FileExcelOutlined />}>Xuất Excel</Button>
            <Button
              type="primary"
              icon={<CalculatorOutlined />}
              onClick={() => setCalculateModalVisible(true)}
            >
              Tính lương
            </Button>
          </Space>
        </div>


        <div className="mb-6">
          <Space>
            <MonthPicker
              placeholder="Chọn tháng"
              onChange={handleMonthChange}
              style={{ width: 200 }}
            />
            
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey="employeeId"
          bordered
          summary={(pageData) => {
            let totalSalary = 0;
            pageData.forEach(({ totalSalary }) => {
              totalSalary += totalSalary || 0;
            });
            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={5}>
                    <strong>Tổng cộng</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    <strong>{totalSalary.toLocaleString()} VNĐ</strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />

        <Modal
          title="Tính lương tháng"
          visible={calculateModalVisible}
          onCancel={() => setCalculateModalVisible(false)}
          footer={[
            <Button key="back" onClick={() => setCalculateModalVisible(false)}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" loading={loading}>
              Tính lương
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

export default PayrollEmployee;