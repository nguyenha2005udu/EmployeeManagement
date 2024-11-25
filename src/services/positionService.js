//import { positionsData } from "../utils/mockData";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8386/management/positions/get-all";
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
//   const response = await axios.post("http://localhost:8080/user-management/positions/add", data);
//           return response.data;
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
