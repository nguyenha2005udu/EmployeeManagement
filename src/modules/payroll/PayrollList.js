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

const PayrollList = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calculateModalVisible, setCalculateModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const fetchTimesheets = async (month, year) => {
    try {
      setLoading(true);
      const apiData = await employeeService.getAllEmployees();
      if (!Array.isArray(apiData)) {
        throw new Error("Dữ liệu trả về không hợp lệ.");
      }

      // Data transformation
      const transformedData = await Promise.all(
        apiData.map(async (item) => {
          const employeeId = item?.employeeId || "N/A";
          const totalHours = await axios.get(
            `http://localhost:8386/management/attendances/total-hours/${employeeId}/${month}/${year}`
          );
          const workingDays = await axios.get(
            `http://localhost:8386/management/attendances/employee/${employeeId}/${month}/${year}`
          );
          return {
            employeeId,
            fullName: item?.name || "Không rõ",
            department: item?.department?.departmentName || "Không rõ",
            workingDays: workingDays.data.length || 0,
            standardDays: item?.standardDays || 22,
            basicSalary: item?.position?.basicSalary || 0,
            allowance: item?.allowance || 0,
            totalHours: totalHours.data || 0,
            overtimePay: item?.overtimePay || 0,
            totalSalary: item?.totalSalary || 0,
          };
        })
      );

      // Tính lương
      const processTotalSalaries = (employeeData) => {
        const { totalHours, basicSalary } = employeeData;
        let totalSalary = basicSalary;
        let overtimePay = 0;

        if (totalHours > 40) {
          overtimePay = 1.5 * (totalHours - 40) * (basicSalary / 40);
          totalSalary += overtimePay; // Adding overtime to the basic salary
        }

        return { totalSalary, overtimePay };
      };
      const enrichedData = transformedData.map((item) => ({
        ...item,
        ...processTotalSalaries(item),
      }));
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
                suffix="/ 150"
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <div className="mb-6">
          <Space>
            <MonthPicker
              placeholder="Chọn tháng"
              onChange={handleMonthChange}
              style={{ width: 200 }}
            />
            <Select defaultValue="all" style={{ width: 200 }}>
              <Option value="all">Tất cả phòng ban</Option>
              <Option value="it">Phòng IT</Option>
              <Option value="hr">Phòng HR</Option>
            </Select>
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

export default PayrollList;
