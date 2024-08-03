import React, { useState, useEffect } from "react";
import { Table, Button, Space, message } from "antd";
import PromotionModal from "./PromotionModal";
import axios from "axios";
// import "./PromotionManagement.css";

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [mode, setMode] = useState("create");

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get("/api/promotions");
      setPromotions(response.data);
    } catch (error) {
      message.error("Failed to fetch promotions");
    }
  };

  const handleCreate = () => {
    setMode("create");
    setSelectedPromotion(null);
    setVisible(true);
  };

  const handleEdit = (record) => {
    setMode("edit");
    setSelectedPromotion(record);
    setVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(`/api/promotions/${record.promotionCodeId}`);
      message.success("Promotion deleted successfully");
      fetchPromotions();
    } catch (error) {
      message.error("Failed to delete promotion");
    }
  };

  const handleSave = async (data) => {
    try {
      if (mode === "create") {
        await axios.post("/api/promotions", data);
        message.success("Promotion created successfully");
      } else {
        await axios.put(
          `/api/promotions/${selectedPromotion.promotionCodeId}`,
          data
        );
        message.success("Promotion updated successfully");
      }
      setVisible(false);
      fetchPromotions();
    } catch (error) {
      message.error("Failed to save promotion");
    }
  };

  const columns = [
    {
      title: "Mã giảm giá",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên",
      dataIndex: "promotionName",
      key: "promotionName",
    },
    {
      title: "Loại",
      dataIndex: "discountType",
      key: "discountType",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button type="danger" onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="promotion-management">
      <h1>Quản lý mã giảm giá</h1>
      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginBottom: 16 }}
      >
        Tạo mới
      </Button>
      <Table
        columns={columns}
        dataSource={promotions}
        rowKey="promotionCodeId"
      />
      <PromotionModal
        visible={visible}
        onSave={handleSave}
        onCancel={() => setVisible(false)}
        promotion={selectedPromotion}
        mode={mode}
      />
    </div>
  );
};

export default PromotionManagement;
