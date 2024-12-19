import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Card,
  Tag,
  Tooltip,
  Badge,
  Dropdown,
  Menu,
  Modal,
  message,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const LeaveRequestList = ({ data }) => {
  const [loading, setLoading] = useState(false);

  const handleApprove = (record) => {
    Modal.confirm({
      title: "Xác nhận phê duyệt",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn phê duyệt đơn xin nghỉ phép của ${record.employeeName}?`,
      onOk() {
        message.success("Đã phê duyệt đơn xin nghỉ phép");
      },
    });
  };

  const handleReject = (record) => {
    Modal.confirm({
      title: "Xác nhận từ chối",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn từ chối đơn xin nghỉ phép của ${record.employeeName}?`,
      okType: "danger",
      onOk() {
        message.success("Đã từ chối đơn xin nghỉ phép");
      },
    });
  };

  const actionMenu = (record) => (
    <Menu>
      <Menu.Item key="approve" onClick={() => handleApprove(record)}>
        <CheckOutlined /> Phê duyệt
      </Menu.Item>
      <Menu.Item key="reject" onClick={() => handleReject(record)} danger>
        <CloseOutlined /> Từ chối
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Nhân viên",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Loại nghỉ phép",
      dataIndex: "leaveType",
      key: "leaveType",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Từ ngày",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Đến ngày",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Số ngày",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "approved") color = "success";
        if (status === "rejected") color = "error";
        if (status === "pending") color = "processing";
        return <Badge status={color} text={status} />;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
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
            <h2 className="text-2xl font-bold mb-2">
              Quản Lý Đơn Xin Nghỉ Phép
            </h2>
            <p className="text-gray-500">
              Xem và phê duyệt các đơn xin nghỉ phép
            </p>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          pagination={{
            total: data?.length,
            pageSize: 10,
            showTotal: (total) => `Tổng ${total} đơn`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default LeaveRequestList;
