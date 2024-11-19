import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  message,
  Card,
  Input,
  Tag,
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

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

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
            code: item.departmentCode || "",
            joinDate: item.foundingYear,
            fullName: item.departmentName || "",

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
      dept.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      dept.code?.toLowerCase().includes(searchText.toLowerCase())
  );

  const actionMenu = () => (
    <Menu>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Sửa thông tin
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
        Xóa phòng ban
      </Menu.Item>
    </Menu>
  );

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
            <div className="font-medium">{record.name}</div>
            <div className="text-gray-500 text-sm">Mã: {record.code}</div>
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
      dataIndex: "establishedYear",
      key: "establishedYear",
      render: (year) => <Tag icon={<CalendarOutlined />}>{year}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "success" : "error"}>
          {status ? "Đang hoạt động" : "Ngừng hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Dropdown overlay={actionMenu(record)} trigger={["click"]}>
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
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
          <Button type="primary" icon={<PlusOutlined />} size="large">
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
      </Card>
    </div>
  );
};

export default DepartmentList;
