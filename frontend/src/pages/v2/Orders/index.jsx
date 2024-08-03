import React from "react";
import { Button, Space, Table, Tag, Typography } from "antd";
import { ApiClient, InvoiceApi } from "api/v1/src";
import useFetch from "hooks/useFetch";
import { useAuthStore } from "stores";
import api from "api";
import { formatCurrencyVND } from "utils";
import { formatDateToDDMMYYWithTime } from "../../../utils";
import { useNavigate } from "react-router-dom";
import useFetchV2 from "hooks/useFetchV2";
import axios from "axios";

const OrdersPage = () => {
  const navigate = useNavigate();

  const [response] = useFetchV2({
    fetchFunction: () =>
      axios.get(
        "http://localhost:8080/invoices/?transactionStatus=&sortBy=DESC&pageNo=1&pageSize=10000"
      ),
  });

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "mo",
      render: (_, record, index) => (
        <Typography.Text>{++index}</Typography.Text>
      ),
    },
    {
      title: "Mã đơn",
      dataIndex: "invoiceId",
      key: "invoiceId",
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Ngày giao dịch",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (text) => {
        return formatDateToDDMMYYWithTime(new Date(text));
      },
    },
    {
      title: "Loại đơn",
      dataIndex: "transactionType",
      key: "transactionType",
      render: (text) => {
        if (text === "SELL") {
          return (
            <Typography.Text style={{ color: "#FF8164" }}>
              ĐƠN BÁN
            </Typography.Text>
          );
        } else {
          return (
            <Typography.Text style={{ color: "blue" }}>ĐƠN MUA</Typography.Text>
          );
        }
      },
    },
    {
      title: "Tổng tiền thanh toán (VNĐ)",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => {
        return <Typography.Text>{formatCurrencyVND(text)}</Typography.Text>;
      },
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text === "PENDING_PAYMENT") {
          return (
            <Typography.Text style={{ color: "#C1AF0E" }}>
              Chưa thanh toán
            </Typography.Text>
          );
        }
        if (text === "PAID") {
          return (
            <Typography.Text style={{ color: "#10A142" }}>
              Đã thanh toán
            </Typography.Text>
          );
        }
        if (text === "CANCELLED") {
          return (
            <Typography.Text style={{ color: "#EE4439" }}>
              Hủy thanh toán
            </Typography.Text>
          );
        }
      },
    },

    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(`${record.invoiceId}`)}>
          Xem
        </Button>
      ),
    },
  ];
  return (
    <div style={{ padding: 24 }}>
      <Typography.Title>Danh sách hóa đơn</Typography.Title>
      <Table columns={columns} dataSource={response ? response.content : []} />
    </div>
  );
};
export default OrdersPage;
