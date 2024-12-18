import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Space,
  message,
  Card,
  Input,
  Select,
  Tag,
  Form,
  Tooltip,
  Dropdown,
  Menu,
  Tabs,
  Modal,
  List,
  Drawer,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  FilterOutlined,
  DownloadOutlined,
  UploadOutlined,
  TeamOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { employeeService } from "../../services/employeeService";

const { Search } = Input;
const { TabPane } = Tabs;

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

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filters] = useState({
    department: "all",
    position: "all",
    status: "all",
  });
  const [form] = Form.useForm();
  const [selectedRows, setSelectedRows] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
        department: {
          departmentCode: item.department?.departmentCode || "",
          departmentName: item.department?.departmentName || "",
        },
        position: {
          positionCode: item.position?.positionCode || "",
          positionName: item.position?.positionName || "",
        },
        status: item.department?.status || "active",
      }));

      setEmployees(transformedData); // Lưu dữ liệu đã chuyển đổi vào trạng thái
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      message.error("Không thể tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  };

  // Tìm kiếm nhân viên theo tên nhân viên, mã nhân viên hoặc chức vụ
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name?.toLowerCase().includes(searchText.toLowerCase()) || // Lọc theo tên nhân viên
      employee.employeeId?.toLowerCase().includes(searchText.toLowerCase()) || // Lọc theo mã nhân viên
      employee.position?.positionName
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) // Lọc theo tên chức vụ
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  // const handleSearch = (value) => {
  //   setSearchText(value);
  // };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setDrawerVisible(true);
  };
  const handleAdd = () => {
    form.resetFields();

    setModalVisible(true);
  };

  const handleSubmit = (values) => {
    const newEmployee = {
      name: values.name,
      department: {
        departmentCode: values.departmentCode,
      },
      position: {
        positionCode: values.positionCode,
      },
    };
    const response = axios.post(
      "http://localhost:8386/management/employees/add",
      newEmployee
    );
    setEmployees([...employees, newEmployee]);
    message.success("Đã thêm chức vụ mới!");
    setModalVisible(false);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa Nhân viên này?",
      content: "Hành động này không thể hoàn tác",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          // Send DELETE request to the backend API
          await axios.delete(
            `http://localhost:8386/management/employees/${id}`
          );

          // Update the positions state by filtering out the deleted position
          setEmployees(employees.filter((item) => item.employeeId !== id));

          // Show success message
          message.success("Đã xóa nhân viên");
        } catch (error) {
          // Handle error (optional)
          message.error("Không thể xóa nhân viên");
          console.error("Error deleting employee:", error);
        }
      },
    });
  };

  const handleBulkAction = (action) => {
    confirm({
      title: `Bạn có chắc chắn muốn ${
        action === "delete" ? "xóa" : "thay đổi trạng thái"
      } các nhân viên đã chọn?`,
      icon: <ExclamationCircleOutlined />,
      content: `Hành động này sẽ ảnh hưởng đến ${selectedRows.length} nhân viên`,
      onOk() {
        if (action === "delete") {
          handleBulkDelete(selectedRows);
        } else {
          handleBulkStatusChange(selectedRows, action);
        }
      },
    });
  };

  const handleBulkDelete = async (ids) => {
    try {
      await Promise.all(ids.map((id) => employeeService.deleteEmployee(id)));
      message.success(`Đã xóa ${ids.length} nhân viên`);
      setEmployees((prev) =>
        prev.filter((emp) => !ids.includes(emp.employeeId))
      ); // Update local state
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa nhân viên");
    }
  };

  const handleBulkStatusChange = async (ids, status) => {
    try {
      await Promise.all(
        ids.map((id) => employeeService.updateEmployee(id, { status }))
      );
      message.success(`Đã cập nhật trạng thái ${ids.length} nhân viên`);
      fetchEmployees();
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật trạng thái");
    }
  };

  const handleImport = () => {
    // Handle import
  };

  const handleExport = () => {
    // Handle export
  };

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  const showEmployeeDetail = async (employeeId) => {
    try {
      const response = await axios.get(
        `http://localhost:8386/management/employees/${employeeId}`
      );
      console.log(response.data);
      setDrawerVisible(true);
      setCurrentEmployee(response.data); // Set the employee data in the drawer for display
    } catch (error) {
      message.error("Không thể tải thông tin chi tiết nhân viên");
    }
  };

  const filterMenu = (
    <Menu>
      <Menu.ItemGroup title="Trạng thái">
        <Menu.Item key="Active">Đang làm việc</Menu.Item>
        <Menu.Item key="Inactive">Đã nghỉ việc</Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.ItemGroup title="Phòng ban">
        <Menu.Item key="it">Phòng IT</Menu.Item>
        <Menu.Item key="hr">Phòng HR</Menu.Item>
        {/* Add more departments */}
      </Menu.ItemGroup>
    </Menu>
  );

  const bulkActionMenu = (
    <Menu>
      <Menu.Item key="delete" onClick={() => handleBulkAction("delete")} danger>
        Xóa đã chọn
      </Menu.Item>
      <Menu.Item key="status" onClick={() => handleBulkAction("status")}>
        Thay đổi trạng thái
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Mã NV",

      dataIndex: "employeeId",

      key: "employeeId",

      width: 100,
    },

    {
      title: "Thông tin nhân viên",

      key: "info",

      render: (_, record) => (
        <Space>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <UserOutlined className="text-blue-500" />
          </div>

          <div>
            <div className="font-medium">{record.name}</div>

            <div className="text-gray-500 text-sm">{record.employeeId}</div>
          </div>
        </Space>
      ),
    },

    {
      title: "Phòng Ban",

      dataIndex: ["department", "departmentName"],

      key: "department",

      render: (text) => <Tag color="blue">{text}</Tag>,
    },

    {
      title: "Chức Vụ",

      dataIndex: ["position", "positionName"],

      key: "position",

      render: (text) => <Tag color="purple">{text}</Tag>,
    },

    {
      title: "Trạng thái",

      dataIndex: "status",

      key: "status",

      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === "active" ? "Đang làm việc" : "Đã nghỉ việc"}
        </Tag>
      ),
    },

    {
      title: "Thao Tác",

      key: "actions",

      width: 100,

      render: (_, record) => (
        <Space>
          <Dropdown overlay={actionMenu(record)} trigger={["click"]}>
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const actionMenu = (record) => (
    <Menu>
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleEdit(record.employeeId)}
      >
        Sửa thông tin
      </Menu.Item>
      <Menu.Item
        key="view"
        icon={<TeamOutlined />}
        onClick={() => showEmployeeDetail(record.employeeId)}
      >
        Xem chi tiết
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        danger
        onClick={() => handleDelete(record.employeeId)}
      >
        Xóa nhân viên
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Quản Lý Nhân Viên</h2>

            <p className="text-gray-500">
              Quản lý thông tin và theo dõi nhân viên
            </p>
          </div>

          <Button
            type="primary"
            onClick={handleAdd}
            icon={<PlusOutlined />}
            size="large"
          >
            Thêm Nhân Viên
          </Button>
        </div>

        <div className="flex justify-between mb-6">
          <div className="mb-6">
            {/* Ô tìm kiếm nhân viên */}
            <Search
              placeholder="Tìm kiếm nhân viên, mã nhân viên hoặc vị trí..."
              allowClear
              onSearch={(value) => setSearchText(value)} // Cập nhật giá trị tìm kiếm
              onChange={(e) => setSearchText(e.target.value)} // Đảm bảo tìm kiếm theo từng ký tự
              style={{ width: 300 }}
              prefix={<SearchOutlined className="text-gray-400" />}
            />
          </div>

          {/* Danh sách nhân viên dạng List */}
          <List
            dataSource={filteredEmployees} // Hiển thị danh sách nhân viên đã lọc
            renderItem={(item) => (
              <List.Item>
                <div>
                  <strong>{item.name}</strong> - {item.employeeCode} -{" "}
                  {item.position.positionName} {/* Sửa tại đây */}
                </div>
              </List.Item>
            )}
            locale={{
              emptyText: "Không tìm thấy nhân viên phù hợp",
            }}
            style={{ marginBottom: "20px" }}
          />
          <Dropdown overlay={filterMenu} trigger={["click"]}>
            <Button icon={<FilterOutlined />}>Bộ lọc</Button>
          </Dropdown>

          <Space>
            {selectedRows.length > 0 && (
              <Dropdown overlay={bulkActionMenu}>
                <Button>Thao tác hàng loạt ({selectedRows.length})</Button>
              </Dropdown>
            )}
            <Button icon={<UploadOutlined />} onClick={handleImport}>
              Import
            </Button>
            <Button icon={<DownloadOutlined />} onClick={handleExport}>
              Export
            </Button>
          </Space>
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredEmployees}
          loading={loading}
          rowKey="id"
        />
        <Modal
          title="Thêm Nhân Viên Mới"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="departmentCode"
              label="Mã phòng ban"
              rules={[
                { required: true, message: "Vui lòng nhập Mã phòng ban" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="positionCode"
              label="Mã Vị Trí công việc"
              rules={[
                { required: true, message: "Vui lòng nhậpVị Trí công việc" },
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

        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
        >
          {currentEmployee && (
            <Tabs defaultActiveKey="1">
              <TabPane tab="Thông tin cơ bản" key="1">
                {/* Basic info content */}
              </TabPane>
              <TabPane tab="Chấm công" key="2">
                {/* Timesheet content */}
              </TabPane>
              <TabPane tab="Lương" key="3">
                {/* Salary content */}
              </TabPane>
            </Tabs>
          )}
        </Drawer>
      </Card>
    </div>
  );
};

export default EmployeeList;
