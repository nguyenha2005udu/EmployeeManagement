import React, { useState, useEffect } from "react";
import {
  Layout,
  List,
  Card,
  Input,
  Button,
  Avatar,
  Badge,
  Tabs,
  Modal,
  Form,
  Select,
  message,
  Tooltip,
  Space,
} from "antd";
import {
  SendOutlined,
  UserOutlined,
  BellOutlined,
  MessageOutlined,
  TeamOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { messageService } from "../../services/messageService";

const { Sider, Content } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const InboxList = () => {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await messageService.getAllMessages();
      setMessages(data);
    } catch (error) {
      message.error("Không thể tải tin nhắn");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (values) => {
    try {
      await messageService.sendMessage(values);
      message.success("Đã gửi tin nhắn thành công");
      setMessageModalVisible(false);
      fetchMessages();
    } catch (error) {
      message.error("Không thể gửi tin nhắn");
    }
  };

  const handleSendNotification = async (values) => {
    try {
      await messageService.sendNotification(values);
      message.success("Đã gửi thông báo thành công");
      setNotificationModalVisible(false);
    } catch (error) {
      message.error("Không thể gửi thông báo");
    }
  };

  const handleChatSelect = async (userId) => {
    setSelectedChat(userId);
    // Giả lập cuộc trò chuyện
    setCurrentConversation([
      {
        senderId: "currentUser",
        content: "Xin chào, tôi cần hỗ trợ về vấn đề chấm công",
        time: "09:00",
      },
      {
        senderId: userId,
        content: "Vâng, tôi có thể giúp gì cho bạn?",
        time: "09:01",
      },
    ]);
  };

  return (
    <div className="p-6">
      <Card>
        <Layout className="bg-white">
          <Sider width={300} className="bg-gray-50 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Tin nhắn</h2>
              <Space>
                <Tooltip title="Gửi tin nhắn mới">
                  <Button
                    type="primary"
                    icon={<MessageOutlined />}
                    onClick={() => setMessageModalVisible(true)}
                  />
                </Tooltip>
                <Tooltip title="Gửi thông báo">
                  <Button
                    icon={<BellOutlined />}
                    onClick={() => setNotificationModalVisible(true)}
                  />
                </Tooltip>
              </Space>
            </div>

            <Search
              placeholder="Tìm kiếm tin nhắn..."
              onChange={(e) => setSearchText(e.target.value)}
              className="mb-4"
            />

            <List
              dataSource={messages}
              loading={loading}
              renderItem={(item) => (
                <Card
                  className={`mb-2 cursor-pointer hover:bg-gray-100 ${
                    selectedChat === item.senderId ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleChatSelect(item.senderId)}
                  bodyStyle={{ padding: "12px" }}
                >
                  <div className="flex items-center">
                    <Badge dot={!item.read}>
                      <Avatar icon={<UserOutlined />} />
                    </Badge>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.senderName}</span>
                        <span className="text-xs text-gray-500">
                          {item.time}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {item.content}
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            />
          </Sider>

          <Content className="p-4">
            {selectedChat ? (
              <div className="h-full flex flex-col">
                <div className="flex items-center pb-4 border-b">
                  <Avatar icon={<UserOutlined />} />
                  <span className="ml-2 font-medium">
                    {
                      messages.find((m) => m.senderId === selectedChat)
                        ?.senderName
                    }
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                  {currentConversation.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex mb-4 ${
                        msg.senderId === "currentUser" ? "justify-end" : ""
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.senderId === "currentUser"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {msg.content}
                        <div
                          className={`text-xs mt-1 ${
                            msg.senderId === "currentUser"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <TextArea
                    rows={2}
                    placeholder="Nhập tin nhắn..."
                    className="mb-2"
                  />
                  <Button type="primary" icon={<SendOutlined />}>
                    Gửi
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Chọn một cuộc trò chuyện để bắt đầu
              </div>
            )}
          </Content>
        </Layout>
      </Card>

      {/* Modal gửi tin nhắn mới */}
      <Modal
        title="Gửi tin nhắn mới"
        visible={messageModalVisible}
        onCancel={() => setMessageModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleSendMessage} layout="vertical">
          <Form.Item
            name="receiver"
            label="Người nhận"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Chọn người nhận"
              optionFilterProp="children"
            >
              {messages.map((msg) => (
                <Option key={msg.senderId} value={msg.senderId}>
                  {msg.senderName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="content"
            label="Nội dung"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal gửi thông báo */}
      <Modal
        title="Gửi thông báo"
        visible={notificationModalVisible}
        onCancel={() => setNotificationModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleSendNotification} layout="vertical">
          <Form.Item
            name="receivers"
            label="Người nhận"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              showSearch
              placeholder="Chọn người nhận"
              optionFilterProp="children"
            >
              <Option value="all">Tất cả nhân viên</Option>
              {messages.map((msg) => (
                <Option key={msg.senderId} value={msg.senderId}>
                  {msg.senderName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Nội dung"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">
              Gửi thông báo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InboxList;
