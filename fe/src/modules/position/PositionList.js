import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Space,
  Card,
  Tag,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Tooltip,
  Row,
  Col,
  Statistic,
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  DollarOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { employeeService } from "../../services/employeeService";
import { positionService } from "../../services/positionService.js";

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [departmentPositions, setDepartmentPositions] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm();

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const apiData = await positionService.getAllPositions();
      console.log("Positions Data:", apiData);

      const transformedData = apiData.map((item) => ({
        positionCode: item.positionCode,
        positionName: item.positionName,
        department: {
          departmentCode: item.department?.departmentCode || "",
          departmentName: item.department?.departmentName || "",
        },
        basicSalary: item?.basicSalary || 0,
        status: item.department?.status || false,
      }));
      setPositions(transformedData);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      message.error("Không thể tải dữ liệu");
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
  const fetchDepartmentPositions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/user-management/department-positions/get-all"
      );
      const apiData = response.data;
      console.log("Dữ liệu API trả về:", apiData);
      // Kiểm tra nếu apiData là một mảng
      if (!Array.isArray(apiData)) {
        throw new Error("Dữ liệu trả về không phải là mảng");
      }
      const transformedData = apiData.map((item) => ({
        id: item.id,
        department: {
          departmentCode: item.department?.departmentCode || "",
        },
        position: {
          positionCode: item.position?.positionCode || "",
        },
      }));
      setDepartmentPositions(transformedData);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      message.error("Không thể tải danh sách vị trí các phòng ban");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
    fetchEmployees();
    fetchDepartmentPositions();
  }, []);

  const handleAdd = () => {
    form.resetFields();

    setModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa chức vụ này?",
      content: "Hành động này không thể hoàn tác",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        // Make onOk async
        try {
          // Send DELETE request to the backend API
          await axios.delete(
            `http://localhost:8080/user-management/positions/${id}`
          );

          // Update the positions state by filtering out the deleted position
          setPositions(positions.filter((item) => item.positionCode !== id));

          // Show success message
          message.success("Đã xóa chức vụ");
        } catch (error) {
          // Handle error (optional)
          message.error("Không thể xóa chức vụ");
          console.error("Error deleting position:", error);
        }
      },
    });
  };

  const handleSubmit = (values) => {
    // Nếu thêm mới
    const newPosition = {
      id: positions.length + 1,
      positionCode: values.positionCode,
      positionName: values.positionName,
      basicSalary: values.basicSalary,
    };

    const response = axios.post(
      "http://localhost:8080/user-management/positions/add",
      newPosition
    );
    setPositions([...positions, newPosition]);
    message.success("Đã thêm chức vụ mới!");
    setModalVisible(false);
  };

  const columns = [
    {
      title: "Mã chức vụ",

      dataIndex: "positionCode",

      key: "positionCode",

      width: 120,
    },

    {
      title: "Tên chức vụ",

      dataIndex: "positionName",

      key: "positionName",
    },

    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "allDepartment",
      render: (allDepartment, record) => {
        const departments = departmentPositions.filter(
          (emp) => emp.position.positionCode === record?.positionCode
        );

        const departmentCodes = departments.map(
          (d) => d.department.departmentCode
        );
        return (
          <Space>
            <Tag color="blue" icon={<BankOutlined />}>
              <a href="http://localhost:3000/department-positions">
                {departmentCodes.length > 0
                  ? departmentCodes.join(" - ")
                  : "Chưa có phòng ban"}
              </a>
            </Tag>
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
          (emp) => emp.position.positionCode === record.positionCode
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
      title: "Trạng thái",

      dataIndex: "status",

      key: "status",

      render: (status) => (
        <Tag color={status ? "success" : "error"}>
          {status === true ? "Đang sử dụng" : "Ngừng sử dụng"}
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
              onClick={() => handleDelete(record.positionCode)}
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
            <h2 className="text-2xl font-bold mb-2">Quản Lý Chức Vụ</h2>

            <p className="text-gray-500">
              Quản lý thông tin chức vụ trong công ty
            </p>
          </div>

          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm Chức Vụ
          </Button>
        </div>

        {/* Thống kê */}

        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng số chức vụ"
                value={positions.length}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Mức lương trung bình"
                value={
                  positions.length > 0
                    ? (
                        positions.reduce(
                          (acc, curr) => acc + (curr.basicSalary || 0),
                          0
                        ) / positions.length
                      ).toLocaleString("vi-VN")
                    : 0
                }
                prefix={<DollarOutlined />}
                suffix="VNĐ"
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

        <Table
          columns={columns}
          dataSource={positions}
          loading={loading}
          rowKey="id"
        />

        <Modal
          title="Thêm Chức Vụ Mới"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="positionCode"
              label="Mã chức vụ"
              rules={[{ required: true, message: "Vui lòng nhập mã chức vụ" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="positionName"
              label="Tên chức vụ"
              rules={[{ required: true, message: "Vui lòng nhập tên chức vụ" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="basicSalary"
              label="Lương cơ bản"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lương cơ bản của bạn",
                },
              ]}
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

export default PositionList;
