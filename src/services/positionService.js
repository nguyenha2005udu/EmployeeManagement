//import { positionsData } from "../utils/mockData";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/user-management/positions/get-all";
export const positionService = {
  getAllPositions: async () => {
    const response = await axios.get(API_URL);
        return response.data;
  },


//  getPositionById: async (id) => {
//    return new Promise((resolve) => {
//      const position = positionsData.find((p) => p.id === id);
//      setTimeout(() => {
//        resolve(position);
//      }, 500);
//    });
//  },
//
//  createPosition: async (data) => {
//    return new Promise((resolve) => {
//      const newPosition = {
//        id: positionsData.length + 1,
//        ...data,
//      };
//      setTimeout(() => {
//        resolve(newPosition);
//      }, 500);
//    });
//  },
//
//  updatePosition: async (id, data) => {
//    return new Promise((resolve) => {
//      const updatedPosition = { id, ...data };
//      setTimeout(() => {
//        resolve(updatedPosition);
//      }, 500);
//    });
//  },
//
//  deletePosition: async (id) => {
//    return new Promise((resolve) => {
//      setTimeout(() => {
//        resolve({ success: true });
//      }, 500);
//    });
//  },
};
