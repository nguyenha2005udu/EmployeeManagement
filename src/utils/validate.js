const isValidDate = (date) => {
  if (!date) return false;

  // Nếu date là string, chuyển đổi thành Date object

  if (typeof date === "string") {
    date = new Date(date);
  }

  // Kiểm tra xem có phải Date object hợp lệ không

  return date instanceof Date && !isNaN(date.getTime());
};

// Export hàm để sử dụng ở các file khác

export { isValidDate };
