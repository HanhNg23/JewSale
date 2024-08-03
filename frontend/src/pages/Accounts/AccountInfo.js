import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  message,
  Card,
  Typography,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

const AccountInfoPage = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    axios
      .get("http://157.230.33.37:8080/accounts?accountId=1")
      .then((response) => {
        const userData = response.data;
        setUser(userData);
        setAvatarUrl(userData.avatar);
        form.setFieldsValue(userData);
      })
      .catch(() => {
        message.error("Không thể tải thông tin người dùng");
      });
  }, [form]);

  const handleSubmit = (values) => {
    axios
      .put(`http://157.230.33.37:8080/accounts/${user.id}`, values)
      .then(() => {
        message.success("Cập nhật thông tin thành công");
      })
      .catch(() => {
        message.error("Có lỗi xảy ra khi cập nhật thông tin");
      });
  };

  const handleAvatarChange = ({ file }) => {
    if (file.status === "done") {
      setAvatarUrl(file.response.url);
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === "error") {
      message.error(`${file.name} file upload failed.`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(45deg, #6e45e2, #88d3ce)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Avatar
          size={100}
          icon={<UserOutlined />}
          src={avatarUrl}
          style={{
            marginBottom: "16px",
            border: "2px solid #fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        />
        <Upload
          name="avatar"
          action="http://157.230.33.37:8080/upload"
          showUploadList={false}
          onChange={handleAvatarChange}
        >
          <Button icon={<UploadOutlined />} style={{ marginBottom: "24px" }}>
            Thay đổi ảnh đại diện
          </Button>
        </Upload>
        <Title level={3} style={{ color: "#333" }}>
          {user.fullname || "User"}
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: "100%", marginTop: "24px" }}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input disabled style={{ borderRadius: "5px" }} />
          </Form.Item>
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input style={{ borderRadius: "5px" }} />
          </Form.Item>
          <Form.Item
            name="phonenumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input style={{ borderRadius: "5px" }} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input style={{ borderRadius: "5px" }} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password style={{ borderRadius: "5px" }} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                borderRadius: "5px",
                backgroundColor: "#6e45e2",
                borderColor: "#6e45e2",
              }}
            >
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AccountInfoPage;
