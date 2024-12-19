import React, { useState } from "react";

import {
  Calendar,
  Card,
  Select,
  Button,
  Modal,
  Form,
  TimePicker,
  Input,
  Row,
  Col,
  Tag,
  Space,
} from "antd";

import {
  PlusOutlined,
  CalendarOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { dateUtils } from "../../utils/dateUtils";

const { Option } = Select;

const ScheduleList = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  const [form] = Form.useForm();

  // Dữ liệu mẫu

  const schedules = [
    {
      id: 1,

      date: "2024-03-20",

      shift: "morning",

      department: "IT",

      employees: [
        { id: 1, name: "Nguyễn Văn A" },

        { id: 2, name: "Trần Thị B" },
      ],
    },

    {
      id: 2,

      date: "2024-03-20",

      shift: "afternoon",

      department: "HR",

      employees: [{ id: 3, name: "Lê Văn C" }],
    },
  ];

  const handleDateSelect = (date) => {
    if (dateUtils.isValidDate(date)) {
      setSelectedDate(dateUtils.toAPIDate(date));
      form.setFieldsValue({
        date: date,
        shift: "morning",
        department: "IT",
      });
      setModalVisible(true);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Lịch Làm Việc</h2>

          <p className="text-gray-500">Quản lý lịch làm việc của nhân viên</p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          Thêm lịch
        </Button>
      </div>

      {/* Bộ lọc */}

      <div className="mb-6">
        <Space>
          <Select defaultValue="all" style={{ width: 200 }}>
            <Option value="all">Tất cả phòng ban</Option>

            <Option value="it">Phòng IT</Option>

            <Option value="hr">Phòng HR</Option>
          </Select>

          <Select defaultValue="all" style={{ width: 200 }}>
            <Option value="all">Tất cả ca làm việc</Option>

            <Option value="morning">Ca sáng</Option>

            <Option value="afternoon">Ca chiều</Option>
          </Select>
        </Space>
      </div>

      <Calendar
        onSelect={(date) => {
          if (dateUtils.isValidDate(date)) {
            setSelectedDate(dateUtils.toAPIDate(date));
            form.setFieldsValue({
              date: date,
              shift: "morning",
              department: "IT",
            });
            setModalVisible(true);
          }
        }}
        dateCellRender={(date) => {
          if (!dateUtils.isValidDate(date)) return null;
          const daySchedules = schedules.filter(
            (s) => dateUtils.toAPIDate(s.date) === dateUtils.toAPIDate(date)
          );
          return (
            <ul className="events">
              {daySchedules.map((schedule, index) => (
                <li key={index}>
                  <Tag
                    color={schedule.shift === "morning" ? "green" : "orange"}
                  >
                    {schedule.shift === "morning" ? "Ca sáng" : "Ca chiều"}
                  </Tag>
                  <div className="text-sm">
                    {schedule.employees.length} nhân viên
                  </div>
                </li>
              ))}
            </ul>
          );
        }}
      />

      {/* Modal thêm lịch */}

      <Modal
        title={
          <Space>
            <CalendarOutlined />

            {selectedDate
              ? `Thêm lịch làm việc ngày ${selectedDate.format("DD/MM/YYYY")}`
              : "Thêm lịch làm việc"}
          </Space>
        }
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="shift"
                label="Ca làm việc"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="morning">Ca sáng</Option>

                  <Option value="afternoon">Ca chiều</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="department"
                label="Phòng ban"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="IT">Phòng IT</Option>

                  <Option value="HR">Phòng HR</Option>

                  <Option value="Marketing">Phòng Marketing</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="timeRange"
            label="Thời gian làm việc"
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="employees"
            label="Nhân viên"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn nhân viên"
              style={{ width: "100%" }}
            >
              <Option value="1">Nguyễn Văn A</Option>

              <Option value="2">Trần Thị B</Option>

              <Option value="3">Lê Văn C</Option>
            </Select>
          </Form.Item>

          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item className="text-right">
            <Space>
              <Button onClick={() => setModalVisible(false)}>Hủy</Button>

              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ScheduleList;
