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
  List,
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
const DepartmentPositions = () => {
  const [departmentPositions, setDepartmentPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchDepartmentPositions();
  }, []);

  const fetchDepartmentPositions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8386/management/department-positions/get-all"
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




    const handleAdd = () => {

        form.resetFields();

        setModalVisible(true);
      };


  const handleSubmit = (values) => {

    const existingRecord = departmentPositions.find(
        (t) => t.department.departmentCode === values.departmentCode &&
        t.position.positionCode === values.positionCode
      );

      if (existingRecord) {
        message.warning('Dữ liệu này đã có trong cơ sở dữ liệu');
        setModalVisible(false);
        return;
      }
    const newDepartmentPositions = {
      id: departmentPositions.length + 1,  // này tăng thêm 1 cho id mới.
      departmentCode: values.departmentCode,
      positionCode: values.positionCode,
    };
    console.log(newDepartmentPositions); // Log xem có đúng format không.
    axios.post("http://localhost:8386/management/department-positions/add", newDepartmentPositions)
    setDepartmentPositions([...departmentPositions, newDepartmentPositions]);
    message.success("Đã thêm chức vụ mới vào trong phòng ban");
    setModalVisible(false);
  }

const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa vị trí trong phòng ban này?",
      content: "Hành động này không thể hoàn tác",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          // Send DELETE request to the backend API
          await axios.delete(`http://localhost:8386/management/department-positions/${id}`);

          // Update the positions state by filtering out the deleted position
          setDepartmentPositions(departmentPositions.filter(item => item.departmentCode !== id));

          // Show success message
          message.success("Đã xóa vị trí trong phòng ban");
        } catch (error) {
          // Handle error (optional)
          message.error("Không thể xóa vị trí trong phòng ban");
          console.error("Không thể xóa vị trí trong phòng ban:", error);
        }
      },
    });
  };


  const columns = [
      {
        title: "Phòng Ban",

        dataIndex: ["department", "departmentCode"],

        key: "department",

        render: (text) => <Tag color="blue">{text}</Tag>,
      },

      {
        title: "Chức Vụ",

        dataIndex: ["position", "positionCode"],

        key: "position",

        render: (text) => <Tag color="purple">{text}</Tag>,
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
              onClick={() => handleDelete(record.id)}
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
                Thêm Vị Trí vào Phòng Ban
          </Button>
        </div>

        

        <Table
           columns={columns}
           dataSource={departmentPositions}
           loading={loading}
           rowKey="id"
           pagination={{
             total: departmentPositions.length,
             pageSize: 10,
             showSizeChanger: true,
             showQuickJumper: true,
           }}
         />

        <Modal
          title= "Thêm vị trí trong phòng ban mới"
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
                name="positionCode"
                label="Mã vị trí"
                rules={[{ required: true, message: "Vui lòng nhập mã vị trí gồm 1 kí tự" }]}
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


export default DepartmentPositions;
