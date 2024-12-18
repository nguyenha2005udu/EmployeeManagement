import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Space,
  message,
  Card,
  Modal,
  Input,
  Tag,
  Form,
  Tooltip,
  Dropdown,
  Menu,
  Statistic,
  Row,
  Col,
  Avatar,
  List
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  BankOutlined,
  TeamOutlined,
  CalendarOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { departmentService } from "../../services/departmentService";
import { employeeService } from "../../services/employeeService";

const { Search } = Input;

const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "success";
    case "inactive":
      return "error";
    default:
      return "default";
  }
};

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const apiData = await departmentService.getAllDepartments();
      const transformedData = apiData.map((item) => ({
        id: item.id,
        departmentCode: item.departmentCode || "",
        foundingYear: item.foundingYear,
        departmentName: item.departmentName || "",
        status: item.status,
      }));
      setDepartments(transformedData);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      message.error("Không thể tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const apiData = await employeeService.getAllEmployees();
      const transformedData = apiData.map((item) => ({
        employeeId: item.employeeId || "",
        name: item.name || "",
        department: {
          departmentCode: item.department?.departmentCode || "",
          departmentName: item.department?.departmentName || "",
        },
        position: {
          positionCode: item.position?.positionCode || "",
          positionName: item.position?.positionName || "",
        },
        status: item.department?.status || "inactive",
      }));
      setEmployees(transformedData); // Lưu dữ liệu đã chuyển đổi vào trạng thái
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      message.error("Không thể tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  };
// Tìm kiếm phòng ban theo tên hoặc mã phòng ban
  const filteredDepartments = departments.filter(
    (department) =>
      department.departmentName
        .toLowerCase()
        .includes(searchText.toLowerCase()) || // Lọc theo tên phòng ban
      department.departmentCode.toLowerCase().includes(searchText.toLowerCase()) // Lọc theo mã phòng ban
  );

  const handleAdd = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      const newDepartment = {
        id: departments.length + 1,
        ...values,
      };

      await axios.post(
        "http://localhost:8386/management/departments/add",
        newDepartment
      );

      setDepartments([...departments, newDepartment]);
      message.success("Đã thêm phòng ban mới!");
      setModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi thêm phòng ban:", error);
      message.error("Không thể thêm phòng ban mới");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa Phòng ban này?",
      content: "Hành động này không thể hoàn tác",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8386/management/departments/${id}`);
          setDepartments(departments.filter((item) => item.departmentCode !== id));
          message.success("Đã xóa phòng ban");
        } catch (error) {
          message.error("Không thể xóa Phòng ban");
          console.error("Error deleting department:", error);
        }
      },
    });
  };

  const columns = [
    {
      title: "Thông tin phòng ban",
      key: "info",
      render: (_, record) => (
        <Space>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <BankOutlined className="text-blue-500" />
          </div>
          <div>
            <a href="http://localhost:3000/department-positions">
            <div className="font-medium">{record.departmentName}</div>
            <div className="text-gray-500 text-sm">Mã: {record.departmentCode}</div>
            </a>
          </div>
        </Space>
      ),
    },
    {
      title: "Trưởng phòng",
      dataIndex: "managerCode",
      key: "managerCode",
      render: (managerCode, record) => {
        const manager = employees.filter(
          (emp) =>
            emp.position.positionCode === "T" &&
            emp.department.departmentCode === record.departmentCode
        );
        const departmentCodes = manager.map((d) => d.name);
        return (
          <Space>
            <Avatar icon={<UserOutlined />} />
            {departmentCodes.length > 0 ? departmentCodes.join(" - ") : "Chưa có phòng ban"}
          </Space>
        );
      },
    },


    {
      title: "Số nhân viên",
      dataIndex: "employeeCount",
      key: "employeeCount",
      render: (employeeCount, record) => {
        // Tìm số lượng nhân viên trong phòng ban hiện tại
        const count = employees.filter(
          (emp) => emp.department.departmentCode === record.departmentCode
        ).length;

        return (
          <Space>
            <Tag color="blue" icon={<TeamOutlined />}>
              {count} nhân viên
            </Tag>
          </Space>
        );
      },
    },

    {
      title: "Năm thành lập",
      dataIndex: "foundingYear",
      key: "foundingYear",
      render: (year) => <Tag icon={<CalendarOutlined />}>{year}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === "active" ? "Đang hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Xóa">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.departmentCode)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Quản Lý Phòng Ban</h2>
            <p className="text-gray-500">Quản lý thông tin các phòng ban trong công ty</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm Phòng Ban
          </Button>
        </div>

        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng số phòng ban"
                value={departments.length}
                prefix={<BankOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Phòng ban đang hoạt động"
                value={departments.filter((d) => d.status === "active").length}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng nhân viên"
                value={employees.length}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <div className="mb-6">
          {/* Ô tìm kiếm */}
          <Search
            placeholder="Tìm kiếm phòng ban..."
            allowClear
            onSearch={(value) => setSearchText(value)} // Cập nhật giá trị tìm kiếm
            onChange={(e) => setSearchText(e.target.value)} // Đảm bảo tìm kiếm theo từng ký tự
            style={{ width: 300 }}
            prefix={<SearchOutlined className="text-gray-400" />}
          />
        </div>
         {/* Danh sách phòng ban dạng List */}
        <List
          dataSource={filteredDepartments} // Hiển thị danh sách đã lọc
          renderItem={(item) => (
            <List.Item>
              <div>
                <strong>{item.departmentName}</strong> - {item.departmentCode}
              </div>
            </List.Item>
          )}
          locale={{
            emptyText: "Không tìm thấy phòng ban phù hợp",
          }}
          style={{ marginBottom: "20px" }}
        />

        <Table
          columns={columns}
          dataSource={departments}
          loading={loading}
          rowKey="id"
          pagination={{
            total: departments.length,
            pageSize: 10,
            showTotal: (total) => `Tổng ${total} phòng ban`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />

        <Modal
          title="Thêm Phòng Ban Mới"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="departmentCode"
              label="Mã phòng ban"
              rules={[{ required: true, message: "Vui lòng nhập mã phòng ban gồm 3 kí tự" }]}
            >
              <Input />
            </Form.Item>

              <Form.Item
                  name="departmentName"
                  label="Tên phòng ban"
                  rules={[{ required: true, message: "Vui lòng nhập tên phòng ban" }]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                name="foundingYear"
                label="Năm thành lập"
                rules={[{ required: true, message: "Vui lòng nhập năm thành lập phòng ban" }]}
            >
                <Input />
              </Form.Item>
              <Form.Item
                  name="status"
                  label="Trạng thái"
                  rules={[{ required: true, message: "Vui lòng trạng thái của phòng ban (active/inactive)" }]}
              >
                  <Input />
              </Form.Item>


              <Form.Item className="text-right">
                  <Space>
                      <Button onClick={() => setModalVisible(false)}>Hủy</Button>

                      <Button type="primary" htmlType="submit">
                          Thêm mới
                      </Button>
                  </Space>
              </Form.Item>
          </Form>
      </Modal>
      </Card>
    </div>
  );
};

export default DepartmentList;
