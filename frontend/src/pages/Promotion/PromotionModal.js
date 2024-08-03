import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Button, message } from "antd";
import moment from "moment";
// import "./PromotionModal.css";

const { Option } = Select;

const PromotionModal = ({ visible, onSave, onCancel, promotion, mode }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (promotion) {
      form.setFieldsValue({
        ...promotion,
        startDate: moment(promotion.startDate),
        endDate: moment(promotion.endDate),
      });
    } else {
      form.resetFields();
    }
  }, [promotion, form]);

  const handleFinish = (values) => {
    const data = {
      ...values,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
    };
    onSave(data);
  };

  return (
    <Modal
      visible={visible}
      title={mode === "create" ? "Tạo mã giảm giá" : "Chỉnh sửa mã giảm giá"}
      onCancel={onCancel}
      footer={null}
      className="coupon-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          discountType: "percentage",
        }}
      >
        <Form.Item
          name="code"
          label="Mã giảm giá"
          rules={[{ required: true, message: "Vui lòng nhập mã giảm giá" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="promotionName"
          label="Tên mã giảm giá"
          rules={[{ required: true, message: "Vui lòng nhập tên mã giảm giá" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="discountType"
          label="Loại"
          rules={[{ required: true, message: "Vui lòng chọn loại giảm giá" }]}
        >
          <Select>
            <Option value="percentage">Phần trăm</Option>
            <Option value="fixed">Cố định</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="discountValue"
          label="Giá trị giảm"
          rules={[{ required: true, message: "Vui lòng nhập giá trị giảm" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="maxDiscountValue" label="Giá trị giảm tối đa">
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Ngày bắt đầu"
          rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="Ngày kết thúc"
          rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item name="usageLimit" label="Giới hạn sử dụng">
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {mode === "create" ? "Tạo" : "Cập nhật"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PromotionModal;
