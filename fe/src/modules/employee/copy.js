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
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { employeeService } from "../../services/employeeService";
import { useNavigate } from "react-router-dom";
import { departmentService } from "../../services/departmentService";
import { positionService } from "../../services/positionService";
import { values } from "@ant-design/plots/es/core/utils";
import moment from "moment";
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
      console.error(
        "Lỗi khi thêm nhân viên:",
        error.response ? error.response.data : error.message
      );
      message.error("Không thể tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  };

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

  const handleEditSubmit = async (values) => {
    // Implement the logic to update the employee information
    try {
      await employeeService.updateEmployee(currentEmployee.employeeId, values);
      message.success("Cập nhật thông tin nhân viên thành công");
      fetchEmployees(); // Refresh the employee list
      setDrawerVisible(false); // Close the modal
    } catch (error) {
      message.error("Cập nhật thông tin nhân viên thất bại");
    }
  };

  const handleAdd = () => {
    form.resetFields();

    setModalVisible(true);
  };

  const handleSubmit = async (values) => {
    // Chuyển đổi tên phòng ban và vị trí thành departmentCode và positionCode
    const convertToCode = (name) => {
      return name
        .split(" ") // Tách chuỗi thành mảng các từ
        .map((word) => word.charAt(0).toUpperCase()) // Lấy chữ cái đầu và viết hoa
        .join(""); // Nối các chữ cái lại với nhau
    };

    const departmentCode = convertToCode(values.departmentCode);
    const positionCode = convertToCode(values.positionCode);

    // Tìm ID của phòng ban và vị trí dựa trên mã
    const department = departments.find(
      (dep) => dep.departmentCode === departmentCode
    );
    const position = positions.find((pos) => pos.positionCode === positionCode);

    if (department && position) {
      const employeeData = {
        name: values.name,
        dob: values.dob.format("YYYY-MM-DD"), // Định dạng ngày tháng
        phone: values.phone,
        address: values.address,
        gender: values.gender,
        hire_date: values.hireDate.format("YYYY-MM-DD"), // Định dạng ngày tháng
        department: {
          departmentCode: departmentCode, // Sử dụng departmentCode
        },
        position: {
          positionCode: positionCode, // Sử dụng positionCode
        },
        basic_salary: values.basicSalary,
        email: values.email,
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/user-management/employees/add-employee",
          employeeData
        );
        console.log("Thêm nhân viên thành công:", response.data);
        setEmployees([...employees, employeeData]);
        setModalVisible(false);
        // Reset form hoặc thực hiện các hành động khác
      } catch (error) {
        console.error("Lỗi khi thêm nhân viên:", error);
      }
    } else {
      console.error("Không tìm thấy phòng ban hoặc chức vụ");
    }
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
            `http://localhost:8080/user-management/employees/${id}`
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
        `http://localhost:8080/user-management/employees/${employeeId}`
      );
      navigate(`/employees/${employeeId}`);
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
          {status === true ? "Đang làm việc" : "Đã nghỉ việc"}
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

  const filteredEmployees = employees.filter((emp) => {
    const matchSearch =
      emp.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      false ||
      emp.employeeId?.toLowerCase().includes(searchText.toLowerCase()) ||
      false;
    const matchDepartment =
      filters.department === "all" || emp.department?.id === filters.department;
    const matchPosition =
      filters.position === "all" || emp.position?.id === filters.position;
    const matchStatus =
      filters.status === "all" || emp.status === filters.status;

    return matchSearch && matchDepartment && matchPosition && matchStatus;
  });

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
          <Space>
            <Search
              placeholder="Tìm kiếm nhân viên..."
              allowClear
              onSearch={handleSearch}
              style={{ width: 300 }}
            />
            <Dropdown overlay={filterMenu} trigger={["click"]}>
              <Button icon={<FilterOutlined />}>Bộ lọc</Button>
            </Dropdown>
          </Space>

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
          rowKey="employeeId"
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
              name="dob"
              label="Ngày sinh"
              rules={[{ required: true, message: "Hãy chọn ngày sinh" }]}
            >
              <DatePicker format="YYYY-MM-DD" placeholder="Chọn ngày sinh" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: "Hãy nhập số điện thoại" }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[{ required: true, message: "Hãy chọn giới tính" }]}
            >
              <Select placeholder="Chọn giới tính">
                <Select.Option value="Nam">Nam</Select.Option>
                <Select.Option value="Nữ">Nữ</Select.Option>
                <Select.Option value="Khác">Khác</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="hireDate"
              label="Ngày vào làm"
              rules={[{ required: true, message: "Hãy chọn ngày vào làm" }]}
            >
              <DatePicker format="YYYY-MM-DD" placeholder="Chọn ngày vào làm" />
            </Form.Item>
            <Form.Item
              name="basicSalary"
              label="Lương cơ bản"
              rules={[{ required: true, message: "Hãy nhập lương cơ bản" }]}
            >
              <Input type="number" placeholder="Nhập lương cơ bản" />
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
              label="Phòng Ban"
              rules={[{ required: true, message: "Hãy chọn phòng ban" }]}
            >
              <Select placeholder="Chọn phòng ban">
                {departments.map((department) => (
                  <Select.Option
                    key={department.id}
                    value={department.departmentCode}
                  >
                    {department.departmentName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="positionCode"
              label="Chức Vụ"
              rules={[{ required: true, message: "Hãy chọn chức vụ" }]}
            >
              <Select placeholder="Chọn chức vụ">
                {positions.map((position) => (
                  <Select.Option
                    key={position.id}
                    value={position.positionCode}
                  >
                    {position.positionName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm Nhân Viên
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
                name="dob"
                label="Ngày sinh"
                initialValue={moment(currentEmployee.dob)} // Assuming dob is in a format compatible with moment
                rules={[{ required: true, message: "Hãy chọn ngày sinh" }]}
              >
                <DatePicker format="YYYY-MM-DD" placeholder="Chọn ngày sinh" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                initialValue={currentEmployee.phone}
                rules={[{ required: true, message: "Hãy nhập số điện thoại" }]}
              >
                <Input placeholder="Nhập số điện thoại" />
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
                name="gender"
                label="Giới tính"
                initialValue={currentEmployee.gender}
                rules={[{ required: true, message: "Hãy chọn giới tính" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Select.Option value="Nam">Nam</Select.Option>
                  <Select.Option value="Nữ">Nữ</Select.Option>
                  <Select.Option value="Khác">Khác</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="hireDate"
                label="Ngày vào làm"
                initialValue={moment(currentEmployee.hire_date)} // Assuming hire_date is in a format compatible with moment
                rules={[{ required: true, message: "Hãy chọn ngày vào làm" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="Chọn ngày vào làm"
                />
              </Form.Item>
              <Form.Item
                name="basicSalary"
                label="Lương cơ bản"
                initialValue={currentEmployee.basic_salary}
                rules={[{ required: true, message: "Hãy nhập lương cơ bản" }]}
              >
                <Input type="number" placeholder="Nhập lương cơ bản" min={0} />
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
                  Cập nhật Nhân Viên
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
