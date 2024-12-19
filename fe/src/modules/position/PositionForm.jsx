{
    title: "Trạng thái",

    dataIndex: "status",

    key: "status",

    render: (status) => (
      <Tag color={status ? "success" : "error"}>
        {status === true ? "Đang sử dụng" : "Ngừng sử dụng"}
      </Tag>
    ),
  },




  {
    title: "Lương cơ bản",

    dataIndex: "basicSalary",

    key: "basicSalary",

    render: (value) => (
      <span className="text-green-600 font-medium">
        {!isNaN(value) ? value.toLocaleString("vi-VN") + " VNĐ" : "0VNĐ"}
      </span>
    ),
  },