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

import { employeeService } from "../../services/employeeService.js";
import { positionService } from "../../services/positionService.js";

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm();

    const fetchPositionsData = async () => {
      try {
          setLoading(true);
          const [employees, positionsData] = await Promise.all([
              employeeService.getAllEmployees(),
              positionService.getAllPositions(),
          ]);

          console.log("Employees Data:", employees);
          console.log("Positions Data:", positionsData);

          // Lấy danh sách các mã chức vụ mà nhân viên đã sử dụng
          const employeePositionIds = employees.map((employee) => employee.position.id);
          // Hiển thị dữ liệu nhân viên trước
          const formattedEmployees = employees.map((item) => ({
              id: item.id,
              positionCode: item.position.positionCode,
              positionName: item.position.positionName,
              department: {
                 departmentId: item.department?.id || "",
                 departmentName: item.department?.departmentName || "",
              },
              basicSalary: item?.basicSalary || 0,
              status: item.department?.status || false,
          }));

          setPositions(formattedEmployees);

          // Loại bỏ các chức vụ đã có nhân viên sử dụng (dựa trên mã chức vụ)
          const filteredPositions = positionsData.filter(
              (position) => !employeePositionIds.includes(position.id)

          );
            console.log("Employees position trùng:", filteredPositions);
          // Hiển thị các chức vụ còn lại
          const formattedPositions = filteredPositions.map((item) => ({
              id: item.id,
              positionCode: item.positionCode,
              positionName: item.positionName,
             department: {
                       departmentId: item.department?.id || "",
                       departmentName: item.department?.departmentName || "",
                     },
              status: item.department.status
          }));

          // Cập nhật danh sách các chức vụ còn lại
          setPositions((prevPositions) => [
              ...prevPositions,
              ...formattedPositions,
          ]);

      } catch (error) {
          console.error("Lỗi khi tải dữ liệu:", error);
          message.error("Không thể tải dữ liệu");
      } finally {
          setLoading(false);
      }
    };
    useEffect(() => {
     fetchPositionsData();
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
      onOk: async () => { // Make onOk async
        try {
          // Send DELETE request to the backend API
          await axios.delete(`http://localhost:8080/user-management/positions/${id}`);

          // Update the positions state by filtering out the deleted position
          setPositions(positions.filter(item => item.positionCode !== id));

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
        department: {
           id:values.departmentId
        },

         basicSalary: 0,
      };


    const response = axios.post(
      "http://localhost:8080/user-management/positions/add",
      newPosition
    );
    setPositions([...positions, newPosition]);
    message.success("Đã thêm chức vụ mới!");
    setModalVisible(false);

  }


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
      key: "department",
      render: (department) => (
        <Tag color="blue" icon={<BankOutlined />}>
          {department.departmentName}
        </Tag>
      ),
    },

    {
      title: "Lương cơ bản",

      dataIndex: "basicSalary",

      key: "basicSalary",

      render: (value) => (
         <span className="text-green-600 font-medium">
           { !isNaN(value) ? value.toLocaleString("vi-VN") + " VNĐ" : "0VNĐ"}
         </span>
       )

    },



    {
      title: "Số nhân viên",

      dataIndex: "employeeCount",

      key: "employeeCount",

      render: (count) => (
        <Tag color="purple" icon={<TeamOutlined />}>
          {count} người
        </Tag>
      ),
    },

    {
      title: "Trạng thái",

      dataIndex: "status",

      key: "status",

      render: (status) => (
        <Tag color={status ? "success" : "error"}>
          {status ? "Đang sử dụng" : "Ngừng sử dụng"}
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
                                          ? (positions.reduce((acc, curr) => acc + (curr.basicSalary || 0), 0) / positions.length).toLocaleString("vi-VN")
                                          : 0
                                  }
                                  prefix={<DollarOutlined />}
                                  suffix="VNĐ"
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
                      title= "Thêm Chức Vụ Mới"
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
                              name="departmentId"
                              label="Mã phòng ban"
                              rules={[{ required: true, message: "Vui lòng nhập Mã phòng ban" }]}
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