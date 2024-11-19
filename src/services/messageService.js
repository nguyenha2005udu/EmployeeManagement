//import axios from "axios";
//
//import { messagesData, notificationsData } from "../utils/mockData";
//
//const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
//
//export const messageService = {
//  getAllMessages: async () => {
//    return new Promise((resolve) => {
//      setTimeout(() => {
//        resolve(messagesData);
//      }, 1000);
//    });
//  },
//
//  getNotifications: async () => {
//    return new Promise((resolve) => {
//      setTimeout(() => {
//        resolve(notificationsData);
//      }, 1000);
//    });
//  },
//
//  getMessageById: async (id) => {
//    return new Promise((resolve) => {
//      const message = messagesData.find((m) => m.id === id);
//
//      setTimeout(() => {
//        resolve(message);
//      }, 500);
//    });
//  },
//
//  sendMessage: async (data) => {
//    return new Promise((resolve) => {
//      setTimeout(() => {
//        resolve({ success: true, message: "Gửi tin nhắn thành công" });
//      }, 500);
//    });
//  },
//
//  getConversation: async (userId) => {
//    return new Promise((resolve) => {
//      setTimeout(() => {
//        resolve([]);
//      }, 500);
//    });
//  },
//
//  markAsRead: async (messageId) => {
//    return new Promise((resolve) => {
//      setTimeout(() => {
//        resolve({ success: true });
//      }, 500);
//    });
//  },
//
//  sendNotification: async (data) => {
//    return new Promise((resolve) => {
//      setTimeout(() => {
//        resolve({ success: true, message: "Gửi thông báo thành công" });
//      }, 500);
//    });
//  },
//};
