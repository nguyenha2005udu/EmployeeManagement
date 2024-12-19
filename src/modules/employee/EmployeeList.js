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
  DatePicker,
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
import { departmentService } from "../../services/departmentService";
import { positionService } from "../../services/positionService";
import { useNavigate } from "react-router-dom";
const { Search } = Input;
const { TabPane } = Tabs;
import moment from "moment";

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
  const [departments, setDepartments] = useState([]); // Trạng thái để lưu danh sách phòng ban
  const [positions, setPositions] = useState([]); // Trạng thái để lưu danh sách chức vụ

  const navigate = useNavigate();
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
  // Gọi API để lấy danh sách phòng ban
  const fetchDepartments = async () => {
    try {
      const response = await departmentService.getAllDepartments();
      setDepartments(response); // Giả sử response.data là mảng các phòng ban
    } catch (error) {
      console.error("Không thể tải danh sách phòng ban", error);
    }
  };

  // Gọi API để lấy danh sách chức vụ
  const fetchPositions = async () => {
    try {
      const response = await positionService.getAllPositions();
      setPositions(response); // Giả sử response.data là mảng các chức vụ
    } catch (error) {
      console.error("Không thể tải danh sách chức vụ", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchPositions();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setDrawerVisible(true);
  };
  const handleAdd = () => {
    form.resetFields();

    setModalVisible(true);
  };

  const handleSubmit = async (values) => {
    const employeeData = {
      name: values.name,
      dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
      address: values.address,
      dateOfJoining: values.dateOfJoining.format("YYYY-MM-DD"),
      department: {
        departmentCode: values.departmentCode, // Sử dụng mã phòng ban
      },
      position: {
        positionCode: values.positionCode, // Sử dụng mã vị trí
      },
      email: values.email,
    };

    try {
      const response = await axios.post(
        "http://localhost:8386/management/employees/add",
        employeeData
      );
      setEmployees([...employees, employeeData]);
      console.log("Thêm nhân viên thành công:", response.data);
      message.success("Đã thêm nhân viên mới!");
      setModalVisible(false);
      // Reset form hoặc thực hiện các hành động khác
    } catch (error) {
      console.error(
        "Lỗi khi thêm nhân viên:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa nhân viên này?",
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
  const handleEditSubmit = async (values) => {
    // Chuyển đổi dữ liệu thành định dạng JSON mong muốn
    const formattedData = {
      name: values.name,
      dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"), // Định dạng ngày sinh
      address: values.address,
      dateOfJoining: values.dateOfJoining.format("YYYY-MM-DD"), // Định dạng ngày vào làm
      email: values.email,
    };

    // Gửi dữ liệu đã định dạng đến API
    try {
      await employeeService.updateEmployee(
        currentEmployee.employeeId,
        formattedData
      );
      message.success("Cập nhật thông tin nhân viên thành công");
      fetchEmployees(); // Refresh the employee list
      setDrawerVisible(false); // Close the modal
    } catch (error) {
      message.error("Cập nhật thông tin nhân viên thất bại");
    }
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
      navigate(`/admin/employees/${employeeId}`);
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
      title: "Phòng ban",

      dataIndex: ["department", "departmentName"],

      key: "department",

      render: (text) => <Tag color="blue">{text}</Tag>,
    },

    {
      title: "Chức vụ",

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
          {status === "true" ? "Đang làm việc" : "Đã nghỉ việc"}
        </Tag>
      ),
    },

    {
      title: "Thao tác",

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
            <h2 className="text-2xl font-bold mb-2">Quản lý nhân viên</h2>

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
            Thêm nhân viên
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
            locale={{
              emptyText: "Không tìm thấy nhân viên phù hợp",
            }}
            style={{ marginBottom: "20px" }}
          />

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
              label="Tên Nhân Viên"
              rules={[{ required: true, message: "Hãy nhập tên nhân viên" }]}
            >
              <Input placeholder="Nhập tên nhân viên" />
            </Form.Item>
            <Form.Item
              name="dateOfBirth"
              label="Ngày sinh"
              rules={[{ required: true, message: "Hãy chọn ngày sinh" }]}
            >
              <DatePicker format="YYYY-MM-DD" placeholder="Chọn ngày sinh" />
            </Form.Item>
    
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: "Hãy nhập địa chỉ" }]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
          
            <Form.Item
              name="dateOfJoining"
              label="Ngày vào làm"
              rules={[{ required: true, message: "Hãy chọn ngày vào làm" }]}
            >
              <DatePicker format="YYYY-MM-DD" placeholder="Chọn ngày vào làm" />
            </Form.Item>
            
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Hãy nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              name="departmentCode"
              label="Mã phòng ban"
              rules={[{ required: true, message: "Hãy chọn mã phòng ban" }]}
            >
              <Select placeholder="Chọn mã phòng ban">
                {departments.map((department) => (
                  <Select.Option
                    key={department.departmentCode}
                    value={department.departmentCode}
                  >
                    {department.departmentCode} - {department.departmentName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="positionCode"
              label="Mã chức vụ"
              rules={[{ required: true, message: "Hãy chọn mã chức vụ" }]}
            >
              <Select placeholder="Chọn mã chức vụ">
                {positions.map((position) => (
                  <Select.Option
                    key={position.positionCode}
                    value={position.positionCode}
                  >
                    {position.positionCode} - {position.positionName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm nhân viên
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Drawer
          title={
            currentEmployee ? "Sửa Thông Tin Nhân Viên" : "Chi Tiết Nhân Viên"
          }
          width={640}
          placement="right"
          closable={false}
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
        >
          {currentEmployee && (
            <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
              <Form.Item
                name="name"
                label="Tên Nhân Viên"
                initialValue={currentEmployee.name}
                rules={[{ required: true, message: "Hãy nhập tên nhân viên" }]}
              >
                <Input placeholder="Nhập tên nhân viên" />
              </Form.Item>
              <Form.Item
                name="dateOfBirth"
                label="Ngày sinh"
                initialValue={moment(currentEmployee.dateOfBirth)} // Assuming dob is in a format compatible with moment
                rules={[{ required: true, message: "Hãy chọn ngày sinh" }]}
              >
                <DatePicker format="YYYY-MM-DD" placeholder="Chọn ngày sinh" />
              </Form.Item>
              
              <Form.Item
                name="address"
                label="Địa chỉ"
                initialValue={currentEmployee.address}
                rules={[{ required: true, message: "Hãy nhập địa chỉ" }]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
        
              <Form.Item
                name="dateOfJoining"
                label="Ngày vào làm"
                initialValue={moment(currentEmployee.dateOfJoining)} // Assuming hire_date is in a format compatible with moment
                rules={[{ required: true, message: "Hãy chọn ngày vào làm" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="Chọn ngày vào làm"
                />
              </Form.Item>
              
              <Form.Item
                name="email"
                label="Email"
                initialValue={currentEmployee.email}
                rules={[
                  { required: true, message: "Hãy nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Cập nhật nhân viên
                </Button>
              </Form.Item>
            </Form>
          )}
        </Drawer>
      </Card>
    </div>
  );
};

export default EmployeeList;
