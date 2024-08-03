import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Select,
  Space,
  message,
  Modal,
  Form,
  Typography,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import api from "api";
import useFetch from "hooks/useFetch";
import { useAppStore } from "stores";
const { Option } = Select;
const { Title } = Typography;

const AccountsPage = () => {
  const refetch = useAppStore((state) => state.refetch);
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);

  const [form] = Form.useForm();
  const [formCreate] = Form.useForm();
  const options = {
    // searchKeyword: "",
    // productType: [],
    // metalGroup: [],
    // metalTypes: [],
    // gemstoneType: [],
    // saleStatus: [],
    // sortBy: "",
    // pageNo: 1,
    // pageSize: 10000,
    sortOrder: "ASC",
  };
  const {
    loading: loadingAccounts,
    error: errorAccounts,
    response: responseAccounts,
  } = useFetch(api.searchUser, options);

  const data = responseAccounts?.accounts ? responseAccounts.accounts : [];
  // responseAccounts !== null &&
  // typeof responseAccounts === "object" &&
  // Object.keys(responseAccounts).length === 0
  //   ? []
  //   : responseAccounts;
  console.log(data);
  const handleSearch = (value) => {
    const filtered = accounts.filter(
      (account) =>
        account.username.includes(value) ||
        account.fullname.includes(value) ||
        account.email.includes(value)
    );
    setFilteredAccounts(filtered);
  };

  const handleRoleFilterChange = (value) => {
    setRoleFilter(value);
    const filtered = accounts.filter((account) => account.role === value);
    setFilteredAccounts(filtered);
  };

  const handleCreateAccount = () => {
    form.resetFields();
    setIsModalVisibleCreate(true);
  };

  const handleModalOkCreate = () => {
    formCreate
      .validateFields()
      .then((values) => {
        console.log("Success:", values);
        axios
          .post(`http://localhost:8080/accounts`, values)
          .then(() => {
            message.success("Tài khoản được tạo thành công");
            formCreate.resetFields();
            setIsModalVisibleCreate(false);
            refetch();
          })
          .catch(() => {
            message.error("Có lỗi xảy ra khi tạo tài khoản");
          });
      })
      .catch(() => {
        message.error("Vui lòng điền đầy đủ thông tin");
      });
  };
  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Success:", values);
        axios
          .put(
            `http://localhost:8080/accounts/${form.getFieldValue("accountId")}`,
            values
          )
          .then(() => {
            message.success("Tài khoản cập nhật thành công");
            form.resetFields();
            setIsModalVisible(false);
            refetch();
          })
          .catch(() => {
            message.error("Có lỗi xảy ra khi tạo tài khoản");
          });
      })
      .catch(() => {
        message.error("Vui lòng điền đầy đủ thông tin");
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  const handleModalCancelCreate = () => {
    setIsModalVisibleCreate(false);
  };

  const handleEditAccount = (record) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeactivateAccount = (record) => {
    axios
      .delete(`http://localhost:8080/accounts/${record.accountId}`)
      .then(() => {
        message.success("Tài khoản đã được xóa");
        refetch();
      })
      .catch(() => {
        message.error("Có lỗi xảy ra khi xóa tài khoản");
      });
  };

  const columns = [
    // {
    //   title: "Ảnh đại diện",
    //   // dataIndex: "avatar",
    //   key: "avatar",
    //   // render: (text, record) => (
    //   //   <img
    //   //     src={record.avatar}
    //   //     alt="Avatar"
    //   //     style={{
    //   //       width: "40px",
    //   //       borderRadius: "50%",
    //   //       border: "2px solid #1890ff",
    //   //     }}
    //   //   />
    //   // ),
    // },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (text) => <span style={{ color: "#4CAF50" }}>{text}</span>,
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      render: (text) => <span style={{ color: "#FF5722" }}>{text}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "admin" },
        { text: "Manager", value: "manager" },
        { text: "Staff", value: "staff" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (text) => (
        <span
          style={{
            color:
              text === "admin"
                ? "#E91E63"
                : text === "manager"
                ? "#2196F3"
                : "#FFC107",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phonenumber",
      key: "phonenumber",
      render: (text) => <span style={{ color: "#009688" }}>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span style={{ color: "#3F51B5" }}>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditAccount(record)}
              style={{ color: "#4CAF50" }}
            />
          </Tooltip>
          <Tooltip title="Deactivate">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDeactivateAccount(record)}
              style={{ color: "#F44336" }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "30px",
        background: "linear-gradient(135deg, #f8cdda, #1d2b64)",
        minHeight: "100vh",
      }}
    >
      <Title
        level={2}
        style={{
          textAlign: "center",
          color: "#fff",
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Quản lý tài khoản
      </Title>
      <div
        style={{
          marginBottom: "16px",
          textAlign: "right",
          padding: "0 20px",
        }}
      >
        <Space>
          <Input
            placeholder="Tìm kiếm tài khoản"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => handleSearch(searchText)}
            style={{
              width: "200px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            suffix={
              <SearchOutlined
                onClick={() => handleSearch(searchText)}
                style={{ color: "#fff" }}
              />
            }
          />
          <Select
            placeholder="Lọc theo vai trò"
            onChange={handleRoleFilterChange}
            style={{
              width: "200px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            allowClear
          >
            <Option value="admin">Admin</Option>
            <Option value="manager">Manager</Option>
            <Option value="staff">Staff</Option>
          </Select>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateAccount}
            style={{
              backgroundColor: "#673AB7",
              borderColor: "#673AB7",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Tạo tài khoản mới
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />

      <Modal
        title="Chi tiết tài khoản"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Cập nhật"
        cancelText="Hủy"
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form form={form} layout="vertical" autoComplete={false}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Vui lòng nhập username" }]}
          >
            <Input
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Form.Item>
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: "Vui lòng nhập full name" }]}
          >
            <Input
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Form.Item>
          <Form.Item
            name="phonenumber"
            label="Phone Number"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Vui lòng chọn role" }]}
          >
            <Select
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Option value="ADMIN">Admin</Option>
              <Option value="MANAGER">Manager</Option>
              <Option value="STAFF">Staff</Option>
              <Option value="CUSTOMER">Customer</Option>
            </Select>
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Tạo tài khoản mới"
        open={isModalVisibleCreate}
        onOk={handleModalOkCreate}
        onCancel={handleModalCancelCreate}
        okText="Tạo"
        cancelText="Hủy"
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form form={formCreate} layout="vertical" autoComplete={false}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Vui lòng nhập username" }]}
          >
            <Input
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Form.Item>
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: "Vui lòng nhập full name" }]}
          >
            <Input
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Form.Item>
          <Form.Item
            name="phonenumber"
            label="Phone Number"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Vui lòng chọn role" }]}
          >
            <Select
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Option value="ADMIN">Admin</Option>
              <Option value="MANAGER">Manager</Option>
              <Option value="STAFF">Staff</Option>
              <Option value="CUSTOMER">Customer</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Vui lòng nhập password" }]}
          >
            <Input.Password
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountsPage;
