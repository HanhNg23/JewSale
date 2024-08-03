import {
  Space,
  Table,
  Typography,
  Flex,
  Button,
  App,
  Modal,
  Checkbox,
  Form,
  Input,
  Image,
  Row,
  Col,
  Select,
  ConfigProvider,
  InputNumber,
  Switch,
  Descriptions,
} from "antd";
import { useNavigate } from "react-router-dom";

import { useAppStore } from "stores";
import { useEffect, useState } from "react";
import api from "api";
import useFetch from "hooks/useFetch";
import axios from "axios";
import useFetchV2 from "hooks/useFetchV2";
import { render } from "@testing-library/react";
import { formatCurrencyVND, formatDateToDDMMYYYY } from "utils";
import { CropLandscapeOutlined } from "@mui/icons-material";
const MetalsPage = () => {
  const refetch = useAppStore((state) => state.refetch);
  const { notification, message } = App.useApp();
  const [goldPriceToday, setGoldPriceTody] = useState();
  const [silverPriceToday, setSilverPriceTody] = useState();
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const navigate = useNavigate();
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const createMetalGroupName = Form.useWatch("metalGroupName", createForm);
  const createProfitSell = Form.useWatch("profitSell", createForm);
  const createMetalPriceSpot = Form.useWatch("metalPriceSpot", createForm);
  const createProfitBuy = Form.useWatch("profitBuy", createForm);
  const createIsAutoUpdatePrice = Form.useWatch(
    "isAutoUpdatePrice",
    createForm
  );

  const updateMetalGroupName = Form.useWatch("metalGroupName", updateForm);
  const updateProfitSell = Form.useWatch("profitSell", updateForm);
  const updateMetalPriceSpot = Form.useWatch("metalPriceSpot", updateForm);
  const updateProfitBuy = Form.useWatch("profitBuy", updateForm);
  const updateIsAutoUpdatePrice = Form.useWatch(
    "isAutoUpdatePrice",
    updateForm
  );
  const [responseFilterOptions] = useFetchV2({
    fetchFunction: () =>
      axios.get("http://localhost:8080/products/filter-options"),
  });
  const [responseMetals] = useFetchV2({
    fetchFunction: () => axios.get("http://localhost:8080/metals/all"),
  });

  const onFinish = async (values) => {
    console.log("Success:", values);
    const {
      metalTypeName,
      metalPurity,
      metalGroupName,
      isAutoUpdatePrice,
      profitSell,
      profitBuy,
      metalPriceSpot,
    } = values;
    try {
      const payload = {
        metalType: {
          metalTypeName: metalTypeName,
          metalPurity: metalPurity,
          metalGroupName: metalGroupName,
          isAutoUpdatePrice: isAutoUpdatePrice,
          isOnMonitor: false,
        },
        metalPrice: {
          profitSell: profitSell,
          profitBuy: profitBuy,
          metalPriceSpot: metalPriceSpot,
        },
      };
      const res = await axios.post(
        "http://localhost:8080/metals/metal",
        payload
      );
      console.log(res);
      refetch();
      notification.success({ message: "Tạo thành công" });
    } catch (err) {
      if (err.response.data) {
        notification.error({ message: err.response.data });
      } else {
        notification.error({ message: "Tạo bị lỗi" });
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  const onFinishDetail = async (values) => {
    console.log("Success:", values);
    const {
      metalTypeName,
      metalPurity,
      metalGroupName,
      isAutoUpdatePrice,
      profitSell,
      profitBuy,
      metalPriceSpot,
    } = values;
    try {
      const payload = {
        metalType: {
          metalTypeName: metalTypeName,
          metalPurity: metalPurity,
          metalGroupName: metalGroupName,
          isAutoUpdatePrice: isAutoUpdatePrice,
          isOnMonitor: false,
        },
        metalPrice: {
          profitSell: profitSell,
          profitBuy: profitBuy,
          metalPriceSpot: metalPriceSpot,
        },
      };
      const res = await axios.put(
        `http://localhost:8080/metals/${values.metalTypeId}`,
        payload
      );
      console.log(res);
      refetch();
      notification.success({ message: "Tạo thành công" });
    } catch (err) {
      if (err.response.data) {
        notification.error({ message: err.response.data });
      } else {
        notification.error({ message: "Tạo bị lỗi" });
      }
    }
  };
  const onFinishFailedDetail = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  const handleOpenDetail = (item) => {
    console.log(item);
    updateForm.setFieldsValue({
      metalTypeId: item.metalTypeId,
      metalTypeName: item.metalTypeName,
      metalPurity: item.metalPurity,
      metalGroupName: item.metalGroupName,
      isAutoUpdatePrice: item.autoUpdatePrice,
      isOnMonitor: item.onMonitor,
      profitSell: item.currentMetalPriceRate.profitSell,
      profitBuy: item.currentMetalPriceRate.profitBuy,
      metalPriceSpot: item.currentMetalPriceRate.metalPriceSpot,
    });
    setOpenDetail(true);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/metals/${id}`);
      notification.success({ message: "Xóa thành công" });
      refetch();
    } catch (err) {
      notification.success({ message: "Xóa không thành công" });
    }
  };
  const changeIsMonitor = async (item, checked) => {
    console.log(item);
    try {
      const payload = {
        metalType: {
          metalGroupName: item.metalGroupName,
          isAutoUpdatePrice: item.autoUpdatePrice,
          isOnMonitor: checked,
        },
        metalPrice: {
          profitSell: item.currentMetalPriceRate.profitSell,
          profitBuy: item.currentMetalPriceRate.profitBuy,
          metalPriceSpot: item.currentMetalPriceRate.metalPriceSpot,
        },
      };
      console.log(payload);
      const res = await axios.put(
        `http://localhost:8080/metals/${item.metalTypeId}`,
        payload
      );
      console.log(res);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => (
        <Typography.Text>{++index}</Typography.Text>
      ),
      width: 100,
    },
    {
      title: "Tên kim loại",
      dataIndex: "metalTypeName",
      key: "metalTypeName",
    },
    {
      title: "Hàm lượng",
      dataIndex: "metalPurity",
      key: "metalPurity",
    },
    {
      title: "Giá mua(VNĐ/gram)",
      key: "buyingPrice",
      dataIndex: "currentMetalPriceRate",
      render: (_, { currentMetalPriceRate }) =>
        formatCurrencyVND(currentMetalPriceRate.buyingPrice),
    },
    {
      title: "Giá bán(VNĐ/gram)",
      dataIndex: "currentMetalPriceRate",
      key: "sellingPrice",
      render: (_, { currentMetalPriceRate }) =>
        formatCurrencyVND(currentMetalPriceRate.sellingPrice),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "currentMetalPriceRate",
      key: "effectiveDate",
      render: (_, { currentMetalPriceRate }) =>
        formatDateToDDMMYYYY(new Date(currentMetalPriceRate.effectiveDate)),
    },
    {
      title: "Hiện TV",
      dataIndex: "onMonitor",
      key: "onMonitor",
      render: (_, record) => (
        <Switch
          defaultChecked={record.onMonitor}
          onChange={(checked) => changeIsMonitor(record, checked)}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleOpenDetail(record)}>
            Chỉnh sửa
          </Button>
          <Button danger onClick={() => handleDelete(record.metalTypeId)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (createMetalGroupName) {
      if (createMetalGroupName.includes("bạch kim")) {
        console.log("gọi api bạch kim");
      } else if (createMetalGroupName.includes("vàng")) {
        console.log("gọi api vàng");
        axios
          .get("http://localhost:8080/metals/gold-price-rate")
          .then((res) => setGoldPriceTody(res))
          .catch((err) => console.log(err));
      } else if (createMetalGroupName.includes("bạc")) {
        console.log("gọi api bạc");
        axios
          .get("http://localhost:8080/metals/silver-price-rate")
          .then((res) => setSilverPriceTody(res))
          .catch((err) => console.log(err));
      }
    }
  }, [createMetalGroupName]);

  useEffect(() => {
    if (updateMetalGroupName) {
      if (updateMetalGroupName.includes("bạch kim")) {
        console.log("gọi api bạch kim");
      } else if (updateMetalGroupName.includes("vàng")) {
        console.log("gọi api vàng");
        axios
          .get("http://localhost:8080/metals/gold-price-rate")
          .then((res) => setGoldPriceTody(res))
          .catch((err) => console.log(err));
      } else if (updateMetalGroupName.includes("bạc")) {
        console.log("gọi api bạc");
        axios
          .get("http://localhost:8080/metals/silver-price-rate")
          .then((res) => setSilverPriceTody(res))
          .catch((err) => console.log(err));
      }
    }
  }, [updateMetalGroupName]);

  useEffect(() => {
    createForm.setFieldsValue({
      metalTypeName: "Vàng 24K",
      metalPurity: 99.99,
      metalGroupName: "vàng",
      isAutoUpdatePrice: false,
      isOnMonitor: false,
      profitSell: 0.2,
      profitBuy: 0.5,
      metalPriceSpot: 500000,
    });
  }, [createForm]);

  useEffect(() => {
    if (updateProfitSell && updateMetalPriceSpot) {
      updateForm.setFieldValue(
        "sellPrice",
        Number(updateMetalPriceSpot) * Number(updateProfitSell)
      );
    } else {
      updateForm.setFieldValue("sellPrice", 0);
    }
  }, [updateProfitSell, updateMetalPriceSpot, updateForm]);

  useEffect(() => {
    if (createProfitSell && createMetalPriceSpot) {
      createForm.setFieldValue(
        "sellPrice",
        Number(createMetalPriceSpot) * Number(createProfitSell)
      );
    } else {
      createForm.setFieldValue("sellPrice", 0);
    }
  }, [createProfitSell, createMetalPriceSpot, createForm]);

  useEffect(() => {
    if (updateProfitBuy && updateMetalPriceSpot) {
      updateForm.setFieldValue(
        "buyPrice",
        Number(updateMetalPriceSpot) * Number(updateProfitBuy)
      );
    } else {
      updateForm.setFieldValue("buyPrice", 0);
    }
  }, [updateProfitBuy, updateMetalPriceSpot, updateForm]);

  useEffect(() => {
    if (createProfitBuy && createMetalPriceSpot) {
      createForm.setFieldValue(
        "buyPrice",
        Number(createMetalPriceSpot) * Number(createProfitBuy)
      );
    } else {
      createForm.setFieldValue("buyPrice", 0);
    }
  }, [createProfitBuy, createMetalPriceSpot, createForm]);

  useEffect(() => {
    if (
      createIsAutoUpdatePrice !== undefined &&
      createIsAutoUpdatePrice !== null
    ) {
      if (createIsAutoUpdatePrice) {
        if (createMetalGroupName.includes("bạch kim")) {
          createForm.setFieldValue("metalPriceSpot", 0);
        } else if (createMetalGroupName.includes("vàng")) {
          createForm.setFieldValue(
            "metalPriceSpot",
            goldPriceToday ? goldPriceToday.gramInVnd : 0
          );
        } else if (createMetalGroupName.includes("bạc")) {
          createForm.setFieldValue(
            "metalPriceSpot",
            silverPriceToday ? silverPriceToday.silverGramInVnd : 0
          );
        }
      }
    }
  }, [
    createIsAutoUpdatePrice,
    createForm,
    goldPriceToday,
    createMetalGroupName,
    silverPriceToday,
  ]);

  useEffect(() => {
    if (
      updateIsAutoUpdatePrice !== undefined &&
      updateIsAutoUpdatePrice !== null
    ) {
      if (updateIsAutoUpdatePrice) {
        if (updateMetalGroupName.includes("bạch kim")) {
          updateForm.setFieldValue("metalPriceSpot", 0);
        } else if (updateMetalGroupName.includes("vàng")) {
          updateForm.setFieldValue(
            "metalPriceSpot",
            goldPriceToday ? goldPriceToday.gramInVnd : 0
          );
        } else if (updateMetalGroupName.includes("bạc")) {
          updateForm.setFieldValue(
            "metalPriceSpot",
            silverPriceToday ? silverPriceToday.silverGramInVnd : 0
          );
        }
      }
    }
  }, [
    updateIsAutoUpdatePrice,
    updateForm,
    goldPriceToday,
    updateMetalGroupName,
    silverPriceToday,
  ]);
  return (
    <div style={{ padding: "24px" }}>
      <Flex align="center" justify="space-between" gap={20} wrap>
        <Typography.Text strong>Danh sách kim loại</Typography.Text>

        <Button type="primary" size="large" onClick={() => setOpen(true)}>
          Thêm mới kim loại
        </Button>

        <Modal
          title="Thông tin kim loại"
          style={{ top: 20 }}
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          footer={null}
        >
          <Form
            form={createForm}
            name="create_metal"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  label="Tên kim loại"
                  name="metalTypeName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên kim loại",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Hàm lượng %"
                  name="metalPurity"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập hàm lượng",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Nhóm kim loại"
                  name="metalGroupName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn nhóm kim loại",
                    },
                  ]}
                >
                  <Select
                    style={{ width: "100%", zIndex: 9999 }}
                    options={
                      responseFilterOptions
                        ? responseFilterOptions.metalGroup.map((m) => ({
                            label: m,
                            value: m,
                          }))
                        : []
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label="Giá bán ra" name="sellPrice">
                  <InputNumber style={{ width: "100%" }} disabled />
                </Form.Item>
                <Form.Item
                  label="Tỉ lệ lợi nhuận bán"
                  name="profitSell"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tỉ lệ lợi nhuận bán",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Giá mua vào" name="buyPrice">
                  <InputNumber style={{ width: "100%" }} disabled />
                </Form.Item>
                <Form.Item
                  label="Tỉ lệ lợi nhuận mua"
                  name="profitBuy"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tỉ lệ lợi nhuận mua",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Giá spot"
              name="metalPriceSpot"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá spot",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                disabled={createIsAutoUpdatePrice}
              />
            </Form.Item>

            <Space align="center" style={{ width: "100%" }}>
              <Form.Item name="isAutoUpdatePrice" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item>
                <Typography.Text>
                  Tự động cập nhật giá trên thị trường
                </Typography.Text>
              </Form.Item>
            </Space>

            <Typography.Text>Giá kim loại thị trường hôm nay</Typography.Text>
            <Descriptions
              style={{ marginTop: 10 }}
              bordered
              layout="vertical"
              items={[
                {
                  key: "1",
                  label: "Kim loại",
                  children: createMetalGroupName
                    ? createMetalGroupName.charAt(0).toUpperCase() +
                      createMetalGroupName.slice(1)
                    : "Không có gì",
                },
                {
                  key: "2",
                  label: "Giá kim loại (USD/oz",
                  children:
                    createMetalGroupName && (goldPriceToday || silverPriceToday)
                      ? createMetalGroupName.includes("bạch kim")
                        ? "Chưa có"
                        : createMetalGroupName.includes("vàng")
                        ? goldPriceToday?.gramInUsd
                        : createMetalGroupName?.includes("bạc")
                        ? silverPriceToday?.silverGramInVnd
                        : "0 vnđ"
                      : "0 vnđ",
                },
                {
                  key: "3",
                  label: "Tỉ giá USD/VND",
                  children:
                    createMetalGroupName && (goldPriceToday || silverPriceToday)
                      ? createMetalGroupName.includes("bạch kim")
                        ? "Chưa có"
                        : createMetalGroupName.includes("vàng")
                        ? goldPriceToday?.usdToVnd
                        : createMetalGroupName.includes("bạc")
                        ? silverPriceToday?.usdToVnd
                        : "0 vnđ"
                      : "0 vnđ",
                },
              ]}
            />
            <Form.Item style={{ marginTop: 30 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Thông tin kim loại"
          style={{ top: 20 }}
          open={openDetail}
          onOk={() => setOpenDetail(false)}
          onCancel={() => setOpenDetail(false)}
          width={1000}
          footer={null}
        >
          <Form
            form={updateForm}
            name="update_metal"
            onFinish={onFinishDetail}
            onFinishFailed={onFinishFailedDetail}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item name="metalTypeId" hidden>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Tên kim loại"
                  name="metalTypeName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên kim loại",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Hàm lượng %"
                  name="metalPurity"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập hàm lượng",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Nhóm kim loại"
                  name="metalGroupName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn nhóm kim loại",
                    },
                  ]}
                >
                  <Select
                    style={{ width: "100%", zIndex: 9999 }}
                    options={
                      responseFilterOptions
                        ? responseFilterOptions.metalGroup.map((m) => ({
                            label: m,
                            value: m,
                          }))
                        : []
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label="Giá bán ra" name="sellPrice">
                  <InputNumber style={{ width: "100%" }} disabled />
                </Form.Item>
                <Form.Item
                  label="Tỉ lệ lợi nhuận bán"
                  name="profitSell"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tỉ lệ lợi nhuận bán",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Giá mua vào" name="buyPrice">
                  <InputNumber style={{ width: "100%" }} disabled />
                </Form.Item>
                <Form.Item
                  label="Tỉ lệ lợi nhuận mua"
                  name="profitBuy"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tỉ lệ lợi nhuận mua",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Giá spot"
              name="metalPriceSpot"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá spot",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                disabled={updateIsAutoUpdatePrice}
              />
            </Form.Item>

            <Space align="center" style={{ width: "100%" }}>
              <Form.Item name="isAutoUpdatePrice" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item>
                <Typography.Text>
                  Tự động cập nhật giá trên thị trường
                </Typography.Text>
              </Form.Item>
            </Space>

            <Typography.Text>Giá kim loại thị trường hôm nay</Typography.Text>
            <Descriptions
              style={{ marginTop: 10 }}
              bordered
              layout="vertical"
              items={[
                {
                  key: "1",
                  label: "Kim loại",
                  children: "Vàng",
                },
                {
                  key: "2",
                  label: "Giá kim loại (USD/oz",
                  children: "99.99",
                },
                {
                  key: "3",
                  label: "Tỉ giá USD/VND",
                  children: "25.000",
                },
              ]}
            />
            <Form.Item style={{ marginTop: 30 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Flex>
      <Table
        virtual
        scroll={{
          y: 500,
        }}
        rowKey="metalTypeId"
        bordered
        pagination={false}
        columns={columns}
        dataSource={responseMetals ? responseMetals : []}
      />
    </div>
  );
};

export default MetalsPage;
