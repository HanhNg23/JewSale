import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import axios from "axios";

const { Option } = Select;

const AccountCreate = ({ visible, onClose, onCreate }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        axios
          .post("http://157.230.33.37:8080/accounts", values)
          .then(() => {
            message.success("Tài khoản được tạo thành công");
            form.resetFields();
            onCreate();
            onClose();
          })
          .catch(() => {
            message.error("Có lỗi xảy ra khi tạo tài khoản");
          });
      })
      .catch((info) => {
        message.error("Vui lòng điền đầy đủ thông tin");
      });
  };

  return (
    <Modal
      title="Tạo tài khoản mới"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Vui lòng nhập username" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[{ required: true, message: "Vui lòng nhập full name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phonenumber"
          label="Phone Number"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Vui lòng nhập password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Vui lòng chọn role" }]}
        >
          <Select>
            <Option value="admin">Admin</Option>
            <Option value="manager">Manager</Option>
            <Option value="staff">Staff</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AccountCreate;
