import {
  Button,
  Flex,
  Typography,
  Modal,
  List,
  Space,
  Card,
  Form,
  Input,
  Table,
  Row,
  Col,
  Tag,
  InputNumber,
  App,
} from "antd";
import axios from "axios";
import useFetchV2 from "hooks/useFetchV2";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppStore } from "stores";
import { formatDateToDDMMYYYY } from "utils";

const { Title, Text, Paragraph } = Typography;

const WarrantyProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const refetch = useAppStore((state) => state.refetch);

  const generateQueryString = () => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return new URLSearchParams(params).toString();
  };

  const [responseWarrantyProducts] = useFetchV2(
    {
      fetchFunction: () =>
        axios.get(
          `http://localhost:8080/warranties/products?${generateQueryString()}`
        ),
    },
    generateQueryString()
  );

  const setParams = (params) => {
    const queryParams = new URLSearchParams(searchParams);

    const getParam = (key, defaultValue) => {
      return params[key] !== undefined
        ? params[key]
        : searchParams.get(key) || defaultValue;
    };

    queryParams.set("page", getParam("page", 1));
    queryParams.set("size", getParam("size", 2));

    if (params.warrantyProductId) {
      queryParams.set("warrantyProductId", params.warrantyProductId);
    } else {
      queryParams.delete("warrantyProductId");
    }
    if (params.customer) {
      queryParams.set("customer", params.customer);
    } else {
      queryParams.delete("customer");
    }
    if (params.product) {
      queryParams.set("product", params.product);
    } else {
      queryParams.delete("product");
    }

    setSearchParams(queryParams.toString());
  };
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_, record, index) => (
        <Typography.Text>{++index}</Typography.Text>
      ),
    },
    {
      title: "Mã bảo hành",
      dataIndex: "warrantyProductId",
      key: "warrantyProductId",
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "address",
    },
    {
      title: "Mã sản phẩm",
      key: "productId",
      dataIndex: "productId",
    },
    {
      title: "Tên sản phẩm",
      key: "productName",
      dataIndex: "productName",
    },
    {
      title: "Ngày bắt đầu",
      key: "startDate",
      dataIndex: "startDate",
      render: (startDate) => formatDateToDDMMYYYY(new Date(startDate)),
    },
    {
      title: "Ngày kết thúc",
      key: "endDate",
      dataIndex: "endDate",
      render: (endDate) => formatDateToDDMMYYYY(new Date(endDate)),
    },
    {
      title: "Mã loại bảo hành",
      key: "warrantyTypeId",
      dataIndex: "warrantyTypeId",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => <Button type="link">Xem</Button>,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Quản lý bảo hành sản phẩm</Title>
      <Paragraph style={{ fontSize: "16px" }}>
        Theo dõi các sản phẩm được bảo hành
      </Paragraph>
      <Card>
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log("Success:", values);
            setParams({
              warrantyProductId: values.warrantyProductId,
              customer: values.customer,
              product: values.product,
              page: 1,
            });
          }}
        >
          <Row>
            <Col span={24}>
              <Flex align="flex-end" gap={20}>
                <Form.Item
                  name={"warrantyProductId"}
                  label={<Typography.Text strong>Mã bảo hành</Typography.Text>}
                >
                  <Input
                    placeholder="Nhập mã bảo hành"
                    style={{ width: "200px", fontWeight: "bold" }}
                  />
                </Form.Item>
                <Form.Item
                  name={"customer"}
                  label={
                    <Typography.Text strong>
                      Khách hàng / Mã khách hàng
                    </Typography.Text>
                  }
                >
                  <Input
                    placeholder="Nhập tên hoặc mã khách hàng"
                    style={{ width: "200px", fontWeight: "bold" }}
                  />
                </Form.Item>
                <Form.Item
                  name="product"
                  label={
                    <Typography.Text strong>
                      Tên sản phẩm / Mã sản phẩm
                    </Typography.Text>
                  }
                >
                  <Input
                    placeholder="Nhập tên hoặc mã sản phẩm"
                    style={{ width: "200px", fontWeight: "bold" }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Flex>
            </Col>
          </Row>
        </Form>
      </Card>
      {/* <Button
        style={{
          height: 40,
          borderColor: "#1890ff",
          color: "#1890ff",
          marginTop: 20,
        }}
        type="dashed"
      >
        Xuất phiếu bảo hành từ mã hóa đơn
      </Button> */}
      <Flex
        align="center"
        justify="space-between"
        gap={20}
        wrap
        style={{ marginTop: 20 }}
      >
        <Typography.Text strong>
          Danh sách các sản phẩm được bảo hành
        </Typography.Text>
      </Flex>
      <Table
        columns={columns}
        pagination={{
          current: searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1,
          onChange: (page, pageSize) => {
            setParams({ page, size: pageSize });
          },
          total: responseWarrantyProducts
            ? responseWarrantyProducts.totalElements
            : 0,
          pageSize: searchParams.get("size")
            ? Number(searchParams.get("size"))
            : 2,
        }}
        dataSource={
          responseWarrantyProducts ? responseWarrantyProducts.content : []
        }
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default WarrantyProductsPage;
