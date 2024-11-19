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

const { Search } = Input;
const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "error";
    default:
      return "default";
  }
};
const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
        try {
          setLoading(true);
          const apiData = await departmentService.getAllDepartments();
          console.log("Dữ liệu trả về từ API:", apiData);
          const transformedData = apiData.map((item) => ({
            id: item.id,
            departmentCode: item.departmentCode || "",
            foundingYear: item.foundingYear,
            departmentName: item.departmentName || "",
            status: item.status
          }));

          setDepartments(transformedData);
        } catch (error) {
          console.error("Lỗi khi gọi API:", error);
          message.error("Không thể tải danh sách nhân viên");
        } finally {
          setLoading(false);
        }
      };

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.departmentName?.toLowerCase().includes(searchText.toLowerCase()) ||
      dept.code?.toLowerCase().includes(searchText.toLowerCase())
  );
    const handleAdd = () => {

        form.resetFields();

        setModalVisible(true);
      };


  const handleSubmit = (values) => {
        const newDepartment = {
          id: departments.length + 1,
          ...values,
        };


      const response = axios.post(
        "http://localhost:8080/user-management/departments/add",
        newDepartment
      );
      console.log(newDepartment)
      setDepartments([...departments, newDepartment]);
      message.success("Đã thêm chức vụ mới!");
      setModalVisible(false);

    }
const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa Phòng ban này?",
      content: "Hành động này không thể hoàn tác",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          // Send DELETE request to the backend API
          await axios.delete(`http://localhost:8080/user-management/departments/${id}`);

          // Update the positions state by filtering out the deleted position
          setDepartments(departments.filter(item => item.departmentCode !== id));

          // Show success message
          message.success("Đã xóa phòng ban");
        } catch (error) {
          // Handle error (optional)
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
            <div className="font-medium">{record.departmentName}</div>
            <div className="text-gray-500 text-sm">Mã: {record.departmentCode}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Trưởng phòng",
      dataIndex: "manager",
      key: "manager",
      render: (manager) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span>{manager?.name || "Chưa có"}</span>
        </Space>
      ),
    },
    {
      title: "Số nhân viên",
      dataIndex: "employeeCount",
      key: "employeeCount",
      render: (count) => (
        <Tag color="blue" icon={<TeamOutlined />}>
          {count} nhân viên
        </Tag>
      ),
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
               {status === "Active" ? "Đang hoạt động" : "Không hoạt động"}
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
            <p className="text-gray-500">
              Quản lý thông tin các phòng ban trong công ty
            </p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                Thêm Phòng Ban
          </Button>
        </div>

        {/* Thống kê tổng quan */}
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
                value={departments.filter((d) => d.status).length}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng nhân viên"
                value={departments.reduce(
                  (acc, curr) => acc + (curr.employeeCount || 0),
                  0
                )}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <div className="mb-6">
          <Search
            placeholder="Tìm kiếm phòng ban..."
            allowClear
            onSearch={(value) => setSearchText(value)}
            style={{ width: 300 }}
            prefix={<SearchOutlined className="text-gray-400" />}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredDepartments}
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
          title= "Thêm Phòng Ban Mới"
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
                  rules={[{ required: true, message: "Vui lòng trạng thái của phòng ban (Active/Inactive)" }]}
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
