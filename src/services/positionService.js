import { positionsData } from "../utils/mockData";

export const positionService = {
  getAllPositions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(positionsData);
      }, 1000);
    });
  },

  getPositionById: async (id) => {
    return new Promise((resolve) => {
      const position = positionsData.find((p) => p.id === id);
      setTimeout(() => {
        resolve(position);
      }, 500);
    });
  },

  createPosition: async (data) => {
    return new Promise((resolve) => {
      const newPosition = {
        id: positionsData.length + 1,
        ...data,
      };
      setTimeout(() => {
        resolve(newPosition);
      }, 500);
    });
  },

  updatePosition: async (id, data) => {
    return new Promise((resolve) => {
      const updatedPosition = { id, ...data };
      setTimeout(() => {
        resolve(updatedPosition);
      }, 500);
    });
  },

  deletePosition: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
};
