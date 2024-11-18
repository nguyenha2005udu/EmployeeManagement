import { companyData, usersData, rolesData } from "../utils/mockData";

export const settingsService = {
  // Company Info

  getCompanyInfo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(companyData);
      }, 1000);
    });
  },

  // User Management

  getAllUsers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(usersData);
      }, 1000);
    });
  },

  // Role Management

  getAllRoles: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(rolesData);
      }, 1000);
    });
  },
};
