import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  message,
  Card,
  Input,
  Select,
  Tag,
  Tooltip,
  Dropdown,
  Menu,
  Tabs,
  Modal,
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
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { employeeService } from "../../services/employeeService";

const { Search } = Input;
const { TabPane } = Tabs;

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

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filters] = useState({
    department: "all",
    position: "all",
    status: "all",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const apiData = await employeeService.getAllEmployees();
      console.log("Dữ liệu trả về từ API:", apiData);

      // Chuyển đổi dữ liệu API sang định dạng cần thiết
      const transformedData = apiData.map((item) => ({
        id: item.id,
        code: item.employeeId || "",
        fullName: item.name || "",
        email: "", // Giả định email không có trong dữ liệu gốc
        department: {
          id: item.department?.id || "",
          name: item.department?.departmentName || "",
        },
        position: {
          id: item.position?.id || "",
          name: item.position?.positionName || "",
        },
        status: item.department?.status || "Inactive", // Giả định trạng thái dựa trên department
      }));

      setEmployees(transformedData); // Lưu dữ liệu đã chuyển đổi vào trạng thái
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      message.error("Không thể tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setDrawerVisible(true);
  };

  const handleDelete = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa nhân viên này?",
      icon: <ExclamationCircleOutlined />,
      content: "Hành động này không thể hoàn tác",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await employeeService.deleteEmployee(id);
          message.success("Xóa nhân viên thành công");
          fetchEmployees();
        } catch (error) {
          message.error("Có lỗi xảy ra khi xóa nhân viên");
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
      fetchEmployees();
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

  const showEmployeeDetail = (employee) => {
    setCurrentEmployee(employee);
    setDrawerVisible(true);
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

      dataIndex: "code",

      key: "code",

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
            <div className="font-medium">{record.fullName}</div>

            <div className="text-gray-500 text-sm">{record.email}</div>
          </div>
        </Space>
      ),
    },

    {
      title: "Phòng Ban",

      dataIndex: ["department", "name"],

      key: "department",

      render: (text) => <Tag color="blue">{text}</Tag>,
    },

    {
      title: "Chức Vụ",

      dataIndex: ["position", "name"],

      key: "position",

      render: (text) => <Tag color="purple">{text}</Tag>,
    },

    {
      title: "Trạng thái",

      dataIndex: "status",

      key: "status",

      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === "Active" ? "Đang làm việc" : "Đã nghỉ việc"}
        </Tag>
      ),
    },

    {
      title: "Thao Tác",

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

  const actionMenu = (record) => (
    <Menu>
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleEdit(record)}
      >
        Sửa thông tin
      </Menu.Item>
      <Menu.Item
        key="view"
        icon={<EditOutlined />}
        onClick={() => showEmployeeDetail(record)}
      >
        Xem chi tiết
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        danger
        onClick={() => handleDelete(record.id)}
      >
        Xóa nhân viên
      </Menu.Item>
    </Menu>
  );

  const filteredEmployees = employees.filter((emp) => {
    const matchSearch =
      (emp.fullName?.toLowerCase().includes(searchText.toLowerCase()) || false) ||
      (emp.code?.toLowerCase().includes(searchText.toLowerCase()) || false);
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

          <Button type="primary" icon={<PlusOutlined />} size="large">
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
          rowKey="id"
        />

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