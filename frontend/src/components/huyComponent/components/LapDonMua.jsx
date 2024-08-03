import {
  faChevronDown,
  faMoneyBillAlt,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./LapDon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Input,
  Radio,
  Space,
  Table,
  Image,
  Form,
  Row,
  Col,
  Select,
  Card,
  Typography,
  Collapse,
  App,
  InputNumber,
} from "antd";
import SearchInput from "components/SearchInput";
import api from "api";
import { useEffect, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import useFetch from "hooks/useFetch";
import { formatCurrencyVND } from "utils";
import { CloseOutlined } from "@ant-design/icons";
import { useAppStore, useAuthStore } from "stores";
import { ApiClient, InvoiceApi } from "api/v1/src";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import useFetchV2 from "hooks/useFetchV2";

const { Text } = Typography;
const defaultPageSize = 5;
function LapDonMua() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { notification, message } = App.useApp();
  const [selectedValue, setSelectedValue] = useState(null);
  const [sellForm] = Form.useForm();
  const [searchForm] = Form.useForm();

  const [invoiceItems, setInvoiceItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState("CASH");
  const refetch = useAppStore((state) => state.refetch);
  const accessToken = useAuthStore((state) => state.accessToken);

  const generateQueryString = () => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    searchParams.set("sortBy", "DESC");
    console.log(new URLSearchParams(params).toString());
    return new URLSearchParams(params).toString();
  };
  const [responseFilterOptions] = useFetchV2({
    fetchFunction: () =>
      axios.get("http://localhost:8080/products/filter-options"),
  });
  // const [responseProducts] = useFetchV2(
  //   {
  //     fetchFunction: () =>
  //       axios.get(
  //         `http://localhost:8080/products/all?${generateQueryString()}`
  //       ),
  //   },
  //   generateQueryString()
  // );
  const setParams = (params) => {
    const queryParams = new URLSearchParams(searchParams);

    // const getParam = (key, defaultValue) => {
    //   return params[key] !== undefined
    //     ? params[key]
    //     : searchParams.get(key) || defaultValue;
    // };
    // console.log(queryParams.toString());
    // queryParams.set("pageNo", getParam("pageNo", 1));
    // queryParams.set("pageSize", getParam("pageSize", defaultPageSize));

    if (params.invoiceId) {
      queryParams.set("invoiceId", params.invoiceId);
    } else {
      queryParams.delete("invoiceId");
    }

    setSearchParams(queryParams.toString());
  };
  const productType = responseFilterOptions
    ? responseFilterOptions?.productType
    : [];
  const metalType = responseFilterOptions
    ? responseFilterOptions?.metalType
    : [];
  const metalGroup = responseFilterOptions
    ? responseFilterOptions?.metalGroup
    : [];
  const gemstoneType = responseFilterOptions
    ? responseFilterOptions?.gemstoneType
    : [];
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => (
        <Typography.Text>{++index}</Typography.Text>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "product",
      key: "image",
      render: (_, render) => {
        return (
          <div style={{ minHeight: 100 }}>
            <Image
              width={100}
              src={`http://localhost:8080/uploads/image/${render.product.imageUrls[0]?.url}`}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
            />
          </div>
        );
      },
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "name",
      render: (_, record) => (
        <Typography.Text>{record.product.name}</Typography.Text>
      ),
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unitMeasure",
      key: "unitMeasure",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Loại trang sức",
      dataIndex: "product",
      key: "productType",
      render: (_, record) => (
        <Typography.Text>{record.product.productType}</Typography.Text>
      ),
    },
    {
      title: "Giá bán(VNĐ)",
      dataIndex: "product",
      key: "productPrice",
      render: (_, record) => {
        return formatCurrencyVND(record.product.productPrice?.salePrice);
      },
    },

    {
      title: "Thao tác",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            handleAddToCart(record);
          }}
        >
          Chọn mua
        </Button>
      ),
    },
  ];
  const cart_columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => (
        <Typography.Text>{++index}</Typography.Text>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "name",
      render: (_, record) => (
        <Typography.Text>{record.productName}</Typography.Text>
      ),
    },
    {
      title: "Thành phần mua lại",
      key: "metalTypeOrgemStone",
      render: (_, record) => (
        <Typography.Text>
          {record.metalType
            ? record.metalType.metalTypeName
            : record.gemStone.gemstoneName}
        </Typography.Text>
      ),
    },
    {
      title: "Đơn vị tính",

      key: "unitMeasure",
      render: (_, record) => (
        <Typography.Text>{record.metalType ? "g" : "viên"}</Typography.Text>
      ),
    },
    {
      title: "Mua lại tối đa",

      key: "unitMeasure",
      render: (_, record) => (
        <Typography.Text>{record.materialWeight}</Typography.Text>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleIncreaseQuantity(record.productMaterialId)}
          >
            +
          </Button>
          <InputNumber
            value={record.quantity}
            onChange={(value) =>
              handleQuantityChange(value, record.productMaterialId)
            }
          />

          <Button
            onClick={() => handleDecreaseQuantity(record.productMaterialId)}
          >
            -
          </Button>
        </Space>
      ),
    },
    {
      title: "Đơn giá mua vào",
      key: "buyingPrice",
      render: (_, record) => {
        return formatCurrencyVND(
          record.metalType
            ? record.metalType.currentMetalPriceRate.buyingPrice
            : record.gemStone.gemstonePrice
        );
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "productPrice",
      key: "salePrice",
      render: (_, record) => {
        return formatCurrencyVND(
          record.metalType
            ? record.metalType.currentMetalPriceRate.buyingPrice *
                record.quantity
            : record.gemStone.gemstonePrice
        );
      },
    },
    {
      title: "Mua lại từ mã đơn",
      dataIndex: "invoiceId",
      key: "invoiceId",
      // render: (_, record) => {
      //   return formatCurrencyVND(
      //     record.productPrice.salePrice * record.quantity
      //   );
      // },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<CloseOutlined />}
          onClick={() => handleRemoveItem(record.productMaterialId)}
        />
      ),
    },
  ];
  console.log(cart);

  const handleRemoveItem = (productMaterialId) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) => cartItem.productMaterialId !== productMaterialId
      )
    );
  };

  const handleIncreaseQuantity = (productMaterialId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productMaterialId === productMaterialId &&
        item.quantity < item.materialWeight
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productMaterialId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productMaterialId === productMaterialId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleQuantityChange = (value, productMaterialId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productMaterialId === productMaterialId &&
        value <= item.materialWeight
          ? { ...item, quantity: value }
          : item
      )
    );
  };
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      let newCart = [...prevCart];

      item.product.productMaterials.forEach((material) => {
        const existingItem = newCart.find(
          (cartItem) =>
            cartItem.productMaterialId === material.productMaterialId
        );

        if (existingItem) {
          if (existingItem.quantity < item.quantity) {
            newCart = newCart.map((cartItem) =>
              cartItem.productMaterialId === material.productMaterialId
                ? // ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  { ...cartItem }
                : cartItem
            );
          } else {
            // Optional: Show a message that the item cannot be added more
            message.warning("Không đủ số lượng");
          }
        } else {
          newCart.push({
            ...material,
            componentBuy: item.componentBuy,
            productName: item.productName,
            invoiceId: item.invoiceId,
            quantity: 0,
          });
        }
      });

      return newCart;
    });
  };

  const handleSearchInputChange = (value) => {
    console.log("Selected value:", value);
    setSelectedValue(value);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) =>
        total +
        (item.metalType
          ? item.metalType.currentMetalPriceRate.buyingPrice * item.quantity
          : item.gemStone.gemstonePrice),
      0
    );
  };
  const onFinish = async (values) => {
    if (cart.length === 0) {
      message.error("Vui lòng chọn sản phẩm");
      return;
    }
    try {
      const payload = {
        transactionType: "PURCHASE",
        customerName: values.customerName,
        customerPhone: values.customerPhone,

        invoiceItems: cart?.map((e) => ({
          productId: e.productId,
          unitMeasure: e.metalType ? "g" : "viên",
          quantity: e.quantity,
          invoiceSellId: e.invoiceId,
          componentBuy: e.metalType
            ? e.metalType.metalTypeName
            : e.gemStone.seriaNumber,
          discountPercentage: 0,
          unitPrice: e.metalType
            ? e.metalType.currentMetalPriceRate.buyingPrice
            : e.gemStone.gemstonePrice,
          isMetal: e.metal,
        })),
        paymentMethod: payment,
      };
      console.log(cart);
      console.log(payload);
      await axios.post(
        "http://localhost:8080/invoices/invoice/purchase",
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      notification.success({ message: "Tạo đơn thành công" });
      setCart([]);
      setPayment("CASH");
      setSelectedValue(null);
      refetch();
    } catch (error) {
      if (error.response.data) {
        notification.error({ message: error.response.data });
      } else {
        notification.error({ message: "Tạo bị lỗi" });
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);

    message.error(errorInfo.errorFields[0].errors[0]);
  };
  useEffect(() => {
    if (selectedValue) {
      sellForm.setFieldsValue({
        customerName: JSON.parse(selectedValue)?.fullname,
        customerPhone: JSON.parse(selectedValue)?.phonenumber,
      });
    } else {
      sellForm.resetFields();
    }
  }, [selectedValue, sellForm]);

  useEffect(() => {
    if (searchParams.get("invoiceId")) {
      axios
        .get(`http://localhost:8080/invoices/${searchParams.get("invoiceId")}`)
        .then((res) => {
          if (res.status === "PAID") {
            setInvoiceItems(res.invoiceItems);
          } else {
            message.warning("Đơn hàng chưa thanh toán");
            setInvoiceItems([]);
          }
          console.log(res);
        })
        .catch((err) => setInvoiceItems([]));
    } else {
      setInvoiceItems([]);
    }
  }, [message, searchParams]);
  return (
    <Form
      form={sellForm}
      name="sellForm"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div style={{ padding: 24 }}>
        <Card>
          <h4>Đơn mua hàng</h4>
        </Card>
        {/* Thong tin khach */}
        <Card className="mt-5">
          <Row gutter={[16, 16]}>
            <Col span={14}>
              <h4>
                <FontAwesomeIcon icon={faUser} className="me-3" size="1x" />
                Thông tin khách hàng
              </h4>
            </Col>
            <Col span={10}>
              <Form.Item>
                <SearchInput
                  opts={["username"]}
                  fetchData={api.searchUser}
                  style={{ width: "100%" }}
                  labelField="fullname"
                  placeholder="Tìm kiếm khách hàng"
                  onChange={handleSearchInputChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={5}>
              <Form.Item
                label="Khách hàng"
                name="customerName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên khách hàng",
                  },
                ]}
              >
                <Input size="large" placeholder="Khách hàng" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label="Số điện thoại"
                name="customerPhone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                  },
                ]}
              >
                <Input size="large" placeholder="Khách hàng" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* tim thong tin */}
        <Collapse
          expandIconPosition={"end"}
          ghost
          style={{
            border: "1px solid #d9d9d9",
          }}
          className="w-full mt-5"
          items={[
            {
              key: "1",
              label: (
                <>
                  <h4>
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="me-2"
                      size="1x"
                    />
                    Tìm kiếm thông tin chọn mua
                  </h4>

                  <p className="small">
                    Nhập các trường sau để tìm kiếm thông tin sản phẩm
                  </p>
                </>
              ),
              children: (
                <div>
                  <Form
                    form={searchForm}
                    name="search_product"
                    layout="vertical"
                    autoComplete="off"
                  >
                    <Row gutter={[16, 16]}>
                      <Col span={8}>
                        <Form.Item label="Mã hóa đơn" name="invoiceId">
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Tên sản phẩm" name="searchKeyword">
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                      <Col span={6}>
                        <Form.Item label="Loại trang sức" name="productType">
                          <Select
                            mode="multiple"
                            placeholder="Loại trang sức"
                            allowClear
                            size="large"
                          >
                            {productType?.map((cl) => (
                              <Select.Option
                                key={cl}
                                // value={JSON.stringify(cl)}
                              >
                                {cl}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Nhóm kim loại" name="username">
                          <Select
                            mode="multiple"
                            placeholder="Nhóm kim loại"
                            allowClear
                            size="large"
                          >
                            {metalGroup?.map((cl) => (
                              <Select.Option
                                key={cl}
                                // value={JSON.stringify(cl)}
                              >
                                {cl}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Chất liệu chính" name="username">
                          <Select
                            mode="multiple"
                            placeholder="Chất liệu chính"
                            allowClear
                            size="large"
                          >
                            {metalType?.map((cl) => (
                              <Select.Option
                                key={cl}
                                // value={JSON.stringify(cl)}
                              >
                                {cl}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Loại đá quý" name="username">
                          <Select
                            mode="multiple"
                            placeholder="Loại đá quý"
                            allowClear
                            size="large"
                          >
                            {gemstoneType?.map((cl) => (
                              <Select.Option
                                key={cl}
                                // value={JSON.stringify(cl)}
                              >
                                {cl}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item>
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                          setParams({
                            invoiceId: searchForm.getFieldValue("invoiceId"),
                          });
                        }}
                      >
                        Tìm sản phẩm
                      </Button>
                    </Form.Item>
                  </Form>
                  {/* <div className="row">
                  <p className="brown-paragraph">
                    Không tìm thấy khách hàng khớp với thông tin trên.
                  </p>
                </div> */}
                  <Table
                    columns={columns}
                    pagination={false}
                    dataSource={invoiceItems}
                  />
                </div>
              ),
            },
          ]}
          bordered={false}
          defaultActiveKey={["1"]}
        />
        <Card className="mt-5">
          <Typography.Title level={3}>
            Danh sách sản phẩm chọn mua
          </Typography.Title>
          <Table columns={cart_columns} dataSource={cart} pagination={false} />
        </Card>

        <div className="custom-div">
          <div className="row">
            <h4>
              <FontAwesomeIcon icon={faMoneyBillAlt} className="me-2" />
              Tổng tiền thanh toán
            </h4>
          </div>
          <div className="row mt-3">
            <div className="col-md-9">
              <p>
                Tổng tiền hàng:{" "}
                <strong>{formatCurrencyVND(getTotalPrice())}</strong>
              </p>
              <hr />

              <p>
                Tổng tiền phải trả:{" "}
                <strong>{formatCurrencyVND(getTotalPrice())}</strong>
              </p>
            </div>
            <div className="col-md-3">
              <h5>Chọn phương thức thanh toán</h5>
              <hr />
              <div className="col">
                <Radio.Group
                  onChange={(e) => setPayment(e.target.value)}
                  value={payment}
                >
                  <Space direction="vertical" className="w-full">
                    <Radio value={"CASH"}>
                      <Space>
                        <svg
                          className="flex"
                          width="56"
                          height="28"
                          viewBox="0 0 56 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M56 2.10373V25.8963C55.9991 26.3213 55.8213 26.7287 55.5056 27.0293C55.1899 27.3299 54.762 27.4991 54.3155 27.5H1.68805C1.24097 27.5 0.81214 27.3311 0.49567 27.0305C0.179201 26.7298 0.000939254 26.3219 0 25.8963V2.10373C0.000936982 1.67867 0.178712 1.27127 0.494415 0.970706C0.810118 0.670142 1.23803 0.500892 1.6845 0.5H54.312C54.759 0.499999 55.1879 0.668856 55.5043 0.969517C55.8208 1.27018 55.9991 1.67808 56 2.10373ZM39.6621 14.0051C39.6569 11.3427 38.6133 8.77714 36.7337 6.80593C34.854 4.83473 32.2723 3.59845 29.4894 3.33691C26.7065 3.07537 23.9208 3.80722 21.6726 5.39049C19.4244 6.97376 17.874 9.29558 17.3222 11.9056C16.7704 14.5155 17.2565 17.2276 18.6862 19.5157C20.1158 21.8038 22.3872 23.5048 25.0597 24.2887C27.7321 25.0726 30.6152 24.8835 33.1495 23.7582C35.6838 22.6329 37.6888 20.6515 38.7755 18.1984C39.3641 16.8716 39.6657 15.4454 39.6621 14.0051ZM32.6545 14.3967C33.2714 15.0691 33.6115 15.9315 33.6121 16.8242C33.6097 17.4575 33.4325 18.0791 33.0983 18.6267C32.764 19.1742 32.2845 19.6285 31.7077 19.9439C31.108 20.3054 30.4468 20.5647 29.7537 20.7103V21.9427C29.7537 22.2973 29.6057 22.6373 29.3423 22.8881C29.079 23.1388 28.7218 23.2797 28.3493 23.2797C27.9769 23.2797 27.6197 23.1388 27.3563 22.8881C27.0929 22.6373 26.945 22.2973 26.945 21.9427V20.7272C26.5035 20.6432 26.0721 20.5165 25.6577 20.3491C25.0142 20.0949 24.4448 19.6964 23.998 19.1876C23.8672 19.0566 23.7656 18.9017 23.6995 18.7322C23.6333 18.5628 23.604 18.3823 23.6132 18.2018C23.6224 18.0212 23.67 17.8443 23.753 17.6817C23.8361 17.5192 23.9529 17.3743 24.0964 17.256C24.2399 17.1376 24.4072 17.0482 24.588 16.9931C24.7689 16.938 24.9596 16.9184 25.1486 16.9355C25.3376 16.9526 25.5211 17.006 25.6878 17.0925C25.8545 17.179 26.0011 17.2968 26.1187 17.4387C26.2743 17.6225 26.4737 17.7683 26.7003 17.8641C26.9466 17.9672 27.2033 18.0463 27.4663 18.1005C27.7402 18.1503 28.0175 18.1819 28.2961 18.195C28.9608 18.1966 29.6132 18.0249 30.1828 17.6987C30.8069 17.3138 30.8069 16.9829 30.8069 16.8209C30.8035 16.5762 30.7093 16.3406 30.5409 16.1557C30.3606 15.9621 30.1472 15.7989 29.9097 15.6729C29.6629 15.5523 29.4006 15.4626 29.1295 15.4062C28.8787 15.3572 28.6231 15.3334 28.367 15.3353C27.9464 15.336 27.5265 15.3033 27.1116 15.2374C26.5497 15.1492 26.0047 14.9819 25.4945 14.7411C24.9011 14.4588 24.3776 14.0594 23.959 13.5695C23.3795 12.9045 23.0577 12.0701 23.0476 11.2061C23.061 10.551 23.2514 9.91017 23.6005 9.34543C23.9495 8.78069 24.4455 8.31106 25.0406 7.98181C25.6274 7.63769 26.2713 7.39108 26.945 7.25253V6.06409C26.945 5.70949 27.0929 5.36942 27.3563 5.11868C27.6197 4.86795 27.9769 4.72708 28.3493 4.72708C28.7218 4.72708 29.079 4.86795 29.3423 5.11868C29.6057 5.36942 29.7537 5.70949 29.7537 6.06409V7.28967C30.2051 7.3901 30.6447 7.53376 31.0658 7.71846C31.6075 7.95179 32.1011 8.27537 32.5233 8.67394C32.7681 8.92771 32.9006 9.26165 32.893 9.60612C32.8855 9.95059 32.7386 10.279 32.4829 10.5228C32.2272 10.7667 31.8825 10.9071 31.5207 10.9149C31.1589 10.9227 30.8079 10.7972 30.5409 10.5646C30.3586 10.3944 30.1461 10.2561 29.9132 10.1561C29.6597 10.0431 29.3947 9.95482 29.1224 9.89277L29.0408 9.87589C28.8268 9.82386 28.6085 9.78885 28.3883 9.77123C27.7404 9.76998 27.1039 9.93314 26.5442 10.2439C26.351 10.3328 26.1857 10.4684 26.0649 10.6373C25.9442 10.8062 25.8722 11.0024 25.8562 11.2061C25.8709 11.4547 25.9706 11.6918 26.14 11.8814C26.3067 12.0774 26.5144 12.2384 26.7499 12.3541C27.0101 12.4746 27.2872 12.5588 27.5727 12.6039C27.8353 12.6442 28.101 12.6634 28.367 12.6613C28.8247 12.6603 29.2812 12.7056 29.7288 12.7964C30.2469 12.9042 30.7477 13.0767 31.2183 13.3096C31.7612 13.5876 32.2476 13.9558 32.6545 14.3967Z"
                            fill="black"
                          />
                        </svg>
                        <Text> Tiền mặt</Text>
                      </Space>
                    </Radio>
                    {/* <Radio value={"EWALLET_VNPAY"}>
                      <Space>
                        <svg
                          className="flex"
                          width="52"
                          height="56"
                          viewBox="0 0 52 56"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M33.6093 38.9952C33.9177 39.4185 34.0087 39.5669 34.0435 39.943C34.0674 40.2049 34.05 40.3546 33.9654 40.5991L31.0951 48.9223C30.9609 49.2643 30.6829 49.6423 30.279 50.0094H33.4112C33.179 49.803 33.03 49.5578 32.9758 49.2656C32.9267 48.9985 32.9287 48.8978 32.9867 48.641L33.6235 46.6643H37.2687L37.8364 48.1875C37.8958 48.3469 37.93 48.4952 37.9448 48.6662C37.9951 49.2352 37.8125 49.7036 37.3609 50.034H42.2713C41.7893 49.6049 41.3474 49.1559 41.0977 48.6107L37.5125 38.9952H33.6093V38.9952ZM44.0874 44.8881L40.2287 39.3552L39.8364 38.9952H43.6396L46.2177 43.1778L46.4248 43.0088L47.9829 40.6927C48.3661 40.1236 48.3145 39.463 47.7687 38.9952H51.3629L47.208 44.8869L47.2061 49.161L47.9383 50.032H43.4732L44.1029 49.174C44.1029 47.7494 44.0506 46.3081 44.0874 44.8881V44.8881ZM23.6803 39.0049L26.1474 38.9952H29.1435C30.7919 38.9952 32.1403 40.3436 32.1403 41.9914V42.3604C32.1403 44.0081 30.7913 45.2649 29.1435 45.3152L27.7771 45.3565C28.8758 44.8514 29.3358 43.5752 29.1983 42.4256C29.0887 41.503 28.6132 40.6159 27.8216 40.5991L27.3222 40.5888V48.8011C27.3222 48.9611 27.35 49.0275 27.4338 49.1681C27.568 49.3914 27.7467 49.6146 27.9312 49.8378C27.979 49.8959 28.0274 49.954 28.0751 50.012H23.8254C23.8893 49.934 23.9519 49.8546 24.0112 49.7733C24.1403 49.5978 24.2545 49.4114 24.3403 49.2036C24.3951 49.0707 24.4222 48.972 24.4222 48.8294V40.0075C24.4054 39.5475 23.9487 39.2862 23.6803 39.0049V39.0049ZM36.7338 45.2307H34.1267L35.3906 41.6281L36.7338 45.2307ZM28.3332 11.421L25.1377 14.6165L24.9783 14.774L23.9629 15.7907L21.5906 18.1636L21.4332 18.323H21.4312L19.9338 19.8178V19.8204L19.7771 19.9772C19.328 20.4262 18.8319 20.7946 18.3042 21.0856C18.0371 21.2327 17.7642 21.3591 17.4848 21.4662C16.8629 21.7062 16.2093 21.8469 15.5512 21.8881C15.148 21.9152 14.7383 21.9049 14.3371 21.8552C13.4687 21.752 12.6164 21.4746 11.839 21.0236C11.5061 20.8314 11.1642 20.6307 10.8809 20.3494C10.879 20.3494 10.879 20.3494 10.8771 20.3475C10.8151 20.2875 10.7532 20.2256 10.6912 20.161L4.74867 14.2191C4.64738 14.1075 4.55641 13.9856 4.48028 13.8552C4.28544 13.5262 4.17383 13.1462 4.17383 12.7365C4.17383 12.6727 4.17576 12.6081 4.18222 12.5462C4.1906 12.4507 4.2048 12.3598 4.22351 12.2707C4.23189 12.2359 4.24028 12.201 4.24867 12.1675C4.25254 12.1533 4.25641 12.1385 4.26093 12.1243C4.34351 11.8514 4.47834 11.5927 4.66415 11.361C4.71383 11.301 4.76544 11.243 4.82157 11.1849L4.9248 11.0836L11.1229 4.88298H11.1254L14.8816 1.1275C15.719 0.290079 17.0532 0.25266 17.9319 1.01976L28.3332 11.421Z"
                            fill="#0D5BA9"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M14.3361 42.8124V48.7118C14.3361 48.9511 14.3916 48.9937 14.5387 49.1859L15.2148 50.0666H11.9858C12.1671 49.7892 12.349 49.5118 12.5309 49.2343C12.6716 49.0053 12.7316 48.9272 12.7316 48.6614V40.4195L11.8245 38.9434H15.1703L20.5883 45.9221V40.3608C20.5883 40.095 20.5361 40.0092 20.3954 39.7801C20.2135 39.5027 20.0238 39.233 19.8425 38.9556H23.0683L22.3954 39.8363C22.2483 40.0285 22.1929 40.0711 22.1929 40.3105V50.3485C20.9709 50.1879 19.8329 49.8892 18.8213 48.5956L14.3361 42.8124V42.8124ZM0.638672 38.9434H4.06964L6.94835 47.1995L9.39093 40.3608C9.4348 40.095 9.39673 40.0092 9.29544 39.7801C9.15996 39.5027 9.01545 39.233 8.88061 38.9556H11.4425C11.2909 39.5137 11.0664 40.1266 10.8729 40.6892L7.56448 50.304C6.66125 50.124 5.65416 49.7666 4.87545 49.0285C4.28964 48.473 4.08125 47.8414 3.79222 47.0892L1.02512 39.7621C0.916092 39.473 0.781898 39.2137 0.638672 38.9434V38.9434ZM46.6574 17.4098L46.5 17.5692L39.5258 24.6485L32.2025 32.084C31.969 32.3176 31.7245 32.5285 31.4658 32.7188C31.458 32.7272 31.4477 32.7356 31.4367 32.744C31.4019 32.7685 31.3664 32.7956 31.3296 32.8201C31.3251 32.824 31.3212 32.8266 31.3174 32.8305C30.2129 33.6208 28.858 34.084 27.398 34.084C25.5942 34.084 23.9561 33.3763 22.7445 32.2247C22.7419 32.2227 22.7419 32.2227 22.74 32.2208C22.6845 32.173 22.6303 32.1253 22.5767 32.0756L21.3174 30.8163L17.7787 27.2756L16.4322 25.9285C16.6245 25.9601 16.8187 25.9743 17.0129 25.9743L17.1767 25.9724C17.4019 25.964 17.6277 25.9376 17.849 25.8918C18.2109 25.8169 18.5767 25.693 18.9367 25.5234C19.7103 25.1576 20.2871 24.6505 20.5625 24.3821C20.6696 24.2763 20.7503 24.1872 20.7838 24.1479L23.5058 21.4737L23.5154 21.4859L32.8748 12.2782L32.9238 12.2188L37.4703 7.7453C38.0825 7.14724 39.038 7.06853 39.7329 7.54659L40.8103 8.62401C40.8122 8.62401 40.8122 8.62595 40.8122 8.62595L46.6574 14.4711C46.709 14.5227 46.7587 14.5763 46.8045 14.6324C47.4658 15.4492 47.4161 16.653 46.6574 17.4098ZM10.8013 20.2705C10.8264 20.2956 10.8516 20.3201 10.8767 20.3447C11.16 20.6259 11.5038 20.8285 11.8387 21.0214C12.6161 21.4718 13.4683 21.7492 14.3374 21.8524C14.738 21.9021 15.1477 21.9124 15.5509 21.8853C16.2083 21.844 16.8625 21.7034 17.4851 21.4634C17.7645 21.3563 18.0367 21.2298 18.3038 21.0827C18.8309 20.7918 19.3277 20.4234 19.7767 19.9743L19.9335 19.8176V19.815L21.4309 18.3195H21.4329L21.5903 18.1608L22.0329 17.7182L23.2058 16.5453L23.9625 15.7885L24.978 14.7711L25.1374 14.6137L31.5754 8.17498L34.2316 5.2982C34.2374 5.29175 34.2412 5.28788 34.2477 5.28143L34.3909 5.14143C35.2012 4.33046 36.5167 4.33046 37.3271 5.14143L38.7812 6.59498H38.7832L38.8309 6.64272C38.1877 6.61175 37.538 6.84336 37.0522 7.31885L32.1322 12.1582L32.0825 12.2188L23.52 20.6447L23.5071 20.6343L20.3535 23.7324L20.3329 23.7576C20.3245 23.7679 20.2561 23.844 20.1425 23.9556C19.8942 24.1976 19.3748 24.655 18.6806 24.984C18.3658 25.1324 18.0451 25.2401 17.729 25.3066C17.5406 25.3434 17.3483 25.3685 17.16 25.3769H17.0174C16.5167 25.3769 16.0245 25.2653 15.5529 25.0498L14.3619 23.8608L14.0703 23.5711L14.0206 23.5195L13.4664 22.9653L10.8013 20.2705C10.7645 20.2343 10.7277 20.1969 10.6903 20.1589L10.8013 20.2705V20.2705Z"
                            fill="#EC1F27"
                          />
                          <path
                            d="M26.4124 53.4971C26.4124 53.9384 26.1518 54.1591 25.626 54.1591C25.4215 54.1591 25.2873 54.17 25.2227 54.1894C25.1627 54.2081 25.1311 54.2455 25.1311 54.3029C25.1311 54.3571 25.1627 54.3913 25.2266 54.4094C25.2911 54.4249 25.4253 54.4326 25.626 54.4326C25.9415 54.4326 26.1576 54.4707 26.2763 54.5507C26.3989 54.6262 26.4595 54.7597 26.4595 54.9539C26.4595 55.1707 26.3989 55.3184 26.2724 55.4068C26.1518 55.4939 25.9337 55.5358 25.626 55.5358C25.3105 55.5358 25.0905 55.4939 24.9679 55.4068C24.8511 55.3223 24.7886 55.1894 24.7886 55.0074C24.7886 54.8242 24.8608 54.6868 25.0027 54.6004C24.8995 54.5507 24.8473 54.4668 24.8473 54.3487C24.8473 54.1816 24.9486 54.0823 25.1544 54.052C24.9402 53.9642 24.835 53.7784 24.835 53.4971V53.4513C24.835 53.0365 25.1273 52.7933 25.626 52.7933C25.7737 52.7933 25.9047 52.8197 26.0169 52.8687L26.2356 52.6752C26.2995 52.6184 26.3286 52.6184 26.3911 52.6752L26.4163 52.7016C26.4789 52.7591 26.4789 52.7894 26.4163 52.8507L26.2453 53.0249C26.3563 53.1281 26.4124 53.2681 26.4124 53.4513V53.4971V53.4971ZM36.4679 53.4971C36.4679 53.9384 36.2073 54.1591 35.6815 54.1591C35.4769 54.1591 35.3421 54.17 35.2782 54.1894C35.2182 54.2081 35.1866 54.2455 35.1866 54.3029C35.1866 54.3571 35.2182 54.3913 35.2821 54.4094C35.3466 54.4249 35.4808 54.4326 35.6815 54.4326C35.9969 54.4326 36.2131 54.4707 36.3318 54.5507C36.4544 54.6262 36.515 54.7597 36.515 54.9539C36.515 55.1707 36.4544 55.3184 36.3279 55.4068C36.2073 55.4939 35.9892 55.5358 35.6815 55.5358C35.366 55.5358 35.146 55.4939 35.0234 55.4068C34.906 55.3223 34.844 55.1894 34.844 55.0074C34.844 54.8242 34.9163 54.6868 35.0582 54.6004C34.955 54.5507 34.9021 54.4668 34.9021 54.3487C34.9021 54.1816 35.0034 54.0823 35.2105 54.052C34.9963 53.9642 34.8911 53.7784 34.8911 53.4971V53.4513C34.8911 53.0365 35.1827 52.7933 35.6815 52.7933C35.8292 52.7933 35.9595 52.8197 36.0731 52.8687L36.2911 52.6752C36.355 52.6184 36.3847 52.6184 36.4466 52.6752L36.4718 52.7016C36.5344 52.7591 36.5344 52.7894 36.4718 52.8507L36.3002 53.0249C36.4118 53.1281 36.4679 53.2681 36.4679 53.4513V53.4971V53.4971ZM15.2531 55.0281C15.3015 55.0287 15.3498 55.0468 15.3853 55.0829C15.4576 55.1552 15.4576 55.2765 15.3853 55.3487C15.3498 55.3849 15.3015 55.4029 15.2531 55.4029H15.2518C15.2034 55.4029 15.155 55.3849 15.1189 55.3487C15.0466 55.2765 15.0466 55.1552 15.1189 55.0829C15.155 55.0468 15.2034 55.0281 15.2518 55.0281H15.2531ZM25.2537 54.6642C25.135 54.7216 25.075 54.8281 25.075 54.9758C25.075 55.2236 25.215 55.2887 25.626 55.2887C26.0215 55.2887 26.1731 55.2236 26.1731 54.9655C26.1731 54.7255 26.0331 54.6836 25.626 54.6836C25.4627 54.6836 25.3376 54.6765 25.2537 54.6642ZM35.3092 54.6642C35.1905 54.7216 35.1305 54.8281 35.1305 54.9758C35.1305 55.2236 35.2705 55.2887 35.6815 55.2887C36.0763 55.2887 36.2286 55.2236 36.2286 54.9655C36.2286 54.7255 36.0886 54.6836 35.6815 54.6836C35.5176 54.6836 35.3931 54.6765 35.3092 54.6642ZM39.1047 54.1436C39.1047 54.5655 38.8576 54.7442 38.3079 54.7442C37.8718 54.7442 37.5937 54.5687 37.5937 54.1739C37.5937 53.7784 37.8524 53.6184 38.3705 53.6184H38.8182V53.39C38.8182 53.132 38.6434 53.0442 38.3202 53.0442C38.1524 53.0442 38.0118 53.0597 37.9015 53.0862C37.8118 53.1049 37.7808 53.0823 37.7808 52.9907V52.9604C37.7808 52.8733 37.804 52.8507 37.8956 52.8313C38.0202 52.8049 38.1563 52.7933 38.306 52.7933C38.8376 52.7933 39.1047 52.9907 39.1047 53.39V54.1436V54.1436ZM20.7834 53.9462V53.5913C20.7834 53.0597 21.0595 52.7933 21.6182 52.7933C22.2086 52.7933 22.4479 53.0707 22.4479 53.5913V53.9462C22.4479 54.4784 22.1718 54.7442 21.6182 54.7442C21.0266 54.7442 20.7834 54.4668 20.7834 53.9462ZM19.0382 54.501C19.0382 54.4055 19.0679 54.3829 19.1589 54.4029C19.3382 54.4513 19.5253 54.4784 19.7182 54.4784C20.0118 54.4784 20.1331 54.4249 20.1331 54.2616C20.1331 54.1397 20.0686 54.0752 19.886 53.9881L19.4221 53.7668C19.1789 53.6487 19.0679 53.5352 19.0679 53.272C19.0679 52.9423 19.2821 52.7933 19.7415 52.7933C19.9208 52.7933 20.0763 52.8165 20.2163 52.8649C20.3079 52.8965 20.3311 52.9184 20.3311 53.0068V53.0404C20.3311 53.1358 20.2963 53.1584 20.2086 53.132C20.0608 53.0823 19.9008 53.0597 19.7337 53.0597C19.4569 53.0597 19.3498 53.1204 19.3498 53.272C19.3498 53.3791 19.4182 53.4629 19.5505 53.5236L20.0357 53.7442C20.2924 53.8662 20.415 53.9842 20.415 54.2533C20.415 54.5926 20.1873 54.7442 19.6963 54.7442C19.5176 54.7442 19.3382 54.7223 19.1589 54.672C19.064 54.6462 19.0382 54.6107 19.0382 54.5307V54.501ZM12.7292 54.0333C12.7292 54.3333 12.8544 54.4745 13.2395 54.4745C13.6234 54.4745 13.744 54.3371 13.744 54.0333V52.9526C13.744 52.8584 13.7711 52.8313 13.8666 52.8313H13.9073C14.0111 52.8313 14.0298 52.8584 14.0298 52.9526V54.0333C14.0298 54.4933 13.7989 54.7442 13.2395 54.7442C12.7098 54.7442 12.4453 54.5087 12.4453 54.0333V52.9526C12.4453 52.8584 12.4705 52.8313 12.566 52.8313H12.6066C12.7098 52.8313 12.7292 52.8584 12.7292 52.9526V54.0333V54.0333ZM7.79694 53.9462V53.5913C7.79694 53.0604 8.07372 52.7933 8.63243 52.7933C9.22275 52.7933 9.4621 53.0707 9.4621 53.5913V53.9462C9.4621 54.4784 9.18597 54.7442 8.63243 54.7442C8.04081 54.7442 7.79694 54.4668 7.79694 53.9462ZM16.4447 53.581C16.4447 53.0823 16.7137 52.7933 17.2918 52.7933C17.4182 52.7933 17.5273 52.8087 17.6266 52.8429C17.7182 52.8733 17.7415 52.9004 17.7415 52.9868V53.0249C17.7415 53.1204 17.7182 53.1468 17.6266 53.1165C17.5311 53.0823 17.4221 53.0629 17.2995 53.0629C16.8731 53.0629 16.7292 53.23 16.7292 53.5849V53.9539C16.7292 54.3378 16.9008 54.4745 17.3227 54.4745C17.4518 54.4745 17.5666 54.4591 17.666 54.4249C17.7531 54.3952 17.7789 54.4249 17.7789 54.5203V54.5584C17.7789 54.6384 17.7531 54.6681 17.6582 54.6945C17.5511 54.7287 17.4337 54.7442 17.3034 54.7442C16.7215 54.7442 16.4447 54.4933 16.4447 53.9571V53.581V53.581ZM4.07049 53.7971C4.07049 54.2391 4.25501 54.4668 4.73823 54.4668C4.93694 54.4668 5.11952 54.4326 5.28726 54.3674C5.37501 54.3333 5.40017 54.3571 5.40017 54.4513V54.4971C5.40017 54.5771 5.37888 54.6068 5.28726 54.6487C5.14533 54.7145 4.96404 54.7442 4.74597 54.7442C4.0821 54.7442 3.76855 54.4475 3.76855 53.7971V53.1887C3.76855 52.5313 4.0821 52.2004 4.73823 52.2004C4.9292 52.2004 5.10404 52.2345 5.26791 52.2984C5.35952 52.3326 5.37888 52.3681 5.37888 52.4436V52.4933C5.37888 52.5881 5.34017 52.6152 5.26017 52.5797C5.10081 52.512 4.92146 52.4778 4.72855 52.4778C4.26726 52.4778 4.07049 52.7016 4.07049 53.1887V53.7971V53.7971ZM10.8447 53.581C10.8447 53.0823 11.1131 52.7933 11.6918 52.7933C11.8182 52.7933 11.9273 52.8087 12.0266 52.8429C12.1182 52.8733 12.1415 52.9004 12.1415 52.9868V53.0249C12.1415 53.1204 12.1182 53.1468 12.0266 53.1165C11.9311 53.0823 11.8221 53.0629 11.6995 53.0629C11.2731 53.0629 11.1292 53.23 11.1292 53.5849V53.9539C11.1292 54.3378 11.3002 54.4745 11.7227 54.4745C11.8511 54.4745 11.966 54.4591 12.0653 54.4249C12.1531 54.3952 12.1789 54.4249 12.1789 54.5203V54.5584C12.1789 54.6384 12.1531 54.6681 12.0576 54.6945C11.9505 54.7287 11.8337 54.7442 11.7034 54.7442C11.1215 54.7442 10.8447 54.4933 10.8447 53.9571V53.581V53.581ZM29.8221 53.9462V53.5913C29.8221 53.0604 30.0989 52.7933 30.6576 52.7933C31.0802 52.7933 31.3195 52.9345 31.4266 53.2081C31.4873 53.1816 31.5415 53.1087 31.5415 52.9036C31.5415 52.8468 31.5627 52.8313 31.6273 52.8313H31.6937C31.7576 52.8313 31.7731 52.8468 31.7731 52.9036C31.7731 53.212 31.6505 53.3597 31.4757 53.4133C31.4827 53.47 31.4873 53.5275 31.4873 53.5913V53.9462C31.4873 54.4784 31.2105 54.7442 30.6576 54.7442C30.0653 54.7442 29.8221 54.4668 29.8221 53.9462V53.9462ZM44.5821 53.9462V53.5913C44.5821 53.0604 44.8582 52.7933 45.4176 52.7933C45.8402 52.7933 46.0795 52.9345 46.1866 53.2081C46.2466 53.1816 46.3015 53.1087 46.3015 52.9036C46.3015 52.8468 46.3227 52.8313 46.3873 52.8313H46.4531C46.5176 52.8313 46.5331 52.8468 46.5331 52.9036C46.5331 53.212 46.4105 53.3597 46.2356 53.4133C46.2427 53.47 46.2466 53.5275 46.2466 53.5913V53.9462C46.2466 54.4784 45.9705 54.7442 45.4176 54.7442C44.8253 54.7442 44.5821 54.4668 44.5821 53.9462V53.9462ZM15.2511 52.7933C15.8382 52.7945 16.0769 53.072 16.0769 53.5913V53.9462C16.0769 54.4778 15.8015 54.7429 15.2505 54.7442H15.2473C14.655 54.7442 14.4118 54.4668 14.4118 53.9462V53.5913C14.4118 53.0597 14.6886 52.7933 15.2473 52.7933H15.2511ZM29.7737 52.512C29.7737 52.592 29.746 52.6178 29.6666 52.6178H29.4382V53.95C29.4382 54.4784 29.1621 54.7442 28.6053 54.7442C28.0324 54.7442 27.7737 54.4784 27.7737 53.95V53.5952C27.7737 53.0597 28.0344 52.7933 28.5602 52.7933C28.8524 52.7933 29.0511 52.8849 29.1544 53.0707V52.6178H28.6363C28.5486 52.6178 28.5292 52.592 28.5292 52.512V52.4816C28.5292 52.4016 28.5486 52.3745 28.6363 52.3745H29.1544V52.1662C29.1544 52.0629 29.1718 52.0442 29.275 52.0442H29.3176C29.4111 52.0442 29.4382 52.0629 29.4382 52.1662V52.3745H29.6666C29.746 52.3745 29.7737 52.4016 29.7737 52.4816V52.512V52.512ZM32.1763 54.5849C32.1763 54.6868 32.1569 54.7062 32.0537 54.7062H32.0124C31.9176 54.7062 31.8898 54.6868 31.8898 54.5849V53.5049C31.8898 53.0287 32.1569 52.7933 32.6847 52.7933C33.2453 52.7933 33.4769 53.0442 33.4769 53.5049V54.5849C33.4769 54.6868 33.4576 54.7062 33.3544 54.7062H33.3098C33.2066 54.7062 33.1866 54.6868 33.1866 54.5849V53.5049C33.1866 53.2004 33.0705 53.0629 32.6847 53.0629C32.3008 53.0629 32.1763 53.2042 32.1763 53.5049V54.5849ZM39.7937 54.5849C39.7937 54.6868 39.7744 54.7062 39.6711 54.7062H39.6305C39.535 54.7062 39.5079 54.6868 39.5079 54.5849V53.5049C39.5079 53.0287 39.7744 52.7933 40.3021 52.7933C40.8627 52.7933 41.0944 53.0442 41.0944 53.5049V54.5849C41.0944 54.6868 41.075 54.7062 40.9718 54.7062H40.9273C40.824 54.7062 40.8047 54.6868 40.8047 54.5849V53.5049C40.8047 53.2004 40.6879 53.0629 40.3021 53.0629C39.9182 53.0629 39.7937 53.2042 39.7937 53.5049V54.5849ZM46.9363 54.5849C46.9363 54.6868 46.9169 54.7062 46.8137 54.7062H46.7724C46.6776 54.7062 46.6498 54.6868 46.6498 54.5849V53.5049C46.6498 53.0287 46.9169 52.7933 47.444 52.7933C48.0053 52.7933 48.2369 53.0442 48.2369 53.5049V54.5849C48.2369 54.6868 48.2176 54.7062 48.1144 54.7062H48.0698C47.966 54.7062 47.9466 54.6868 47.9466 54.5849V53.5049C47.9466 53.2004 47.8298 53.0629 47.444 53.0629C47.0608 53.0629 46.9363 53.2042 46.9363 53.5049V54.5849ZM23.1376 54.5849C23.1376 54.6868 23.1176 54.7062 23.015 54.7062H22.9737C22.8782 54.7062 22.8511 54.6868 22.8511 54.5849V53.5049C22.8511 53.0287 23.1176 52.7933 23.6453 52.7933C24.2066 52.7933 24.4382 53.0442 24.4382 53.5049V54.5849C24.4382 54.6868 24.4189 54.7062 24.3156 54.7062H24.2705C24.1679 54.7062 24.1479 54.6868 24.1479 54.5849V53.5049C24.1479 53.2004 24.0311 53.0629 23.6453 53.0629C23.2621 53.0629 23.1376 53.2042 23.1376 53.5049V54.5849V54.5849ZM42.5918 52.1662C42.5918 52.0629 42.6169 52.0449 42.7124 52.0449H42.7557C42.8569 52.0449 42.8763 52.0629 42.8763 52.1662V53.052C42.9911 52.881 43.1879 52.7933 43.4737 52.7933C43.9415 52.7933 44.1769 53.0139 44.1769 53.4591V54.5849C44.1769 54.6868 44.1576 54.7062 44.0563 54.7062H44.0092C43.9086 54.7062 43.8886 54.6868 43.8886 54.5849V53.4933C43.8886 53.1926 43.7544 53.0629 43.4021 53.0629C43.0356 53.0629 42.8763 53.2081 42.8763 53.5571V54.5849C42.8763 54.6868 42.8569 54.7062 42.7557 54.7062H42.7124C42.6169 54.7062 42.5918 54.6868 42.5918 54.5849V52.1662V52.1662ZM5.80533 52.1662C5.80533 52.0629 5.83049 52.0449 5.92597 52.0449H5.96855C6.06984 52.0449 6.08984 52.0629 6.08984 52.1662V53.052C6.20468 52.881 6.40146 52.7933 6.68726 52.7933C7.15501 52.7933 7.38985 53.0139 7.38985 53.4591V54.5849C7.38985 54.6868 7.37049 54.7062 7.2692 54.7062H7.22275C7.12146 54.7062 7.1021 54.6868 7.1021 54.5849V53.4933C7.1021 53.1926 6.96791 53.0629 6.61501 53.0629C6.2492 53.0629 6.08984 53.2081 6.08984 53.5571V54.5849C6.08984 54.6868 6.06984 54.7062 5.96855 54.7062H5.92597C5.83049 54.7062 5.80533 54.6868 5.80533 54.5849V52.1662V52.1662ZM36.9002 52.9526C36.9002 52.8584 36.9176 52.8313 37.0208 52.8313H37.064C37.1569 52.8313 37.1847 52.8584 37.1847 52.9526V54.5849C37.1847 54.6868 37.1569 54.7062 37.064 54.7062H37.0208C36.9176 54.7062 36.9002 54.6868 36.9002 54.5849V52.9526ZM38.8182 53.8429H38.3744C38.0357 53.8429 37.8795 53.9339 37.8795 54.1739C37.8795 54.3907 38.0202 54.4971 38.306 54.4971C38.6544 54.4971 38.8182 54.4171 38.8182 54.132V53.8429V53.8429ZM28.0582 53.9462C28.0582 54.3113 28.1847 54.4745 28.6053 54.4745C29.0202 54.4745 29.1544 54.3113 29.1544 53.9462V53.5913C29.1544 53.2268 29.0202 53.0629 28.6053 53.0629C28.1924 53.0629 28.0582 53.2268 28.0582 53.5913V53.9462ZM22.164 53.5913C22.164 53.2268 22.0331 53.0629 21.6182 53.0629C21.1982 53.0629 21.0673 53.2268 21.0673 53.5913V53.9462C21.0673 54.3107 21.206 54.4745 21.6182 54.4745C22.0331 54.4745 22.164 54.3107 22.164 53.9462V53.5913ZM9.17759 53.5913C9.17759 53.2262 9.04726 53.0629 8.63243 53.0629C8.21178 53.0629 8.08146 53.2262 8.08146 53.5913V53.9462C8.08146 54.3107 8.21759 54.4745 8.63243 54.4745C9.04726 54.4745 9.17759 54.3107 9.17759 53.9462V53.5913ZM31.2027 53.5913C31.2027 53.2262 31.0724 53.0629 30.6576 53.0629C30.2369 53.0629 30.1066 53.2262 30.1066 53.5913V53.9462C30.1066 54.3107 30.2447 54.4745 30.6576 54.4745C31.0724 54.4745 31.2027 54.3107 31.2027 53.9462V53.5913ZM45.9627 53.5913C45.9627 53.2262 45.8318 53.0629 45.4176 53.0629C44.9969 53.0629 44.8666 53.2262 44.8666 53.5913V53.9462C44.8666 54.3107 45.0047 54.4745 45.4176 54.4745C45.8318 54.4745 45.9627 54.3107 45.9627 53.9462V53.5913ZM15.2473 53.0629C14.8266 53.0629 14.6963 53.2262 14.6963 53.5913V53.9462C14.6963 54.3113 14.8344 54.4745 15.2473 54.4745H15.2524C15.6627 54.4733 15.7924 54.3094 15.7924 53.9462V53.5913C15.7924 53.2281 15.6627 53.0642 15.2524 53.0629H15.2473ZM36.1795 53.4513C36.1795 53.1816 36.0124 53.0481 35.6815 53.0481C35.3421 53.0481 35.175 53.1816 35.175 53.4513V53.4971C35.175 53.7707 35.2976 53.9081 35.6815 53.9081C36.0647 53.9081 36.1795 53.7707 36.1795 53.4971V53.4513ZM26.1247 53.4513C26.1247 53.1816 25.9569 53.0481 25.626 53.0481C25.2873 53.0481 25.1195 53.1816 25.1195 53.4513V53.4971C25.1195 53.7707 25.2421 53.9081 25.626 53.9081C26.0092 53.9081 26.1247 53.7707 26.1247 53.4971V53.4513ZM38.3744 52.6178C38.3021 52.6178 38.2944 52.592 38.2827 52.5455C38.2711 52.4397 38.3395 52.3939 38.4544 52.2726C38.4834 52.2423 38.5027 52.2152 38.5027 52.1849C38.5027 52.1204 38.4718 52.0894 38.4344 52.0862C38.3956 52.0823 38.3202 52.0933 38.2673 52.1204C38.2247 52.1352 38.1911 52.1352 38.164 52.0784L38.1485 52.0481C38.1273 51.9907 38.164 51.9713 38.2027 51.9533C38.2944 51.9152 38.355 51.9068 38.4266 51.9068C38.575 51.9068 38.6976 51.9907 38.6937 52.1849C38.6937 52.352 38.4718 52.4204 38.4621 52.5455C38.4621 52.5758 38.4305 52.6113 38.3918 52.6178H38.3744V52.6178ZM21.3498 52.2945C21.4415 52.1545 21.4937 52.1087 21.6182 52.1087C21.7447 52.1087 21.7976 52.1468 21.8892 52.2945L22.0331 52.5197C22.0802 52.5881 22.064 52.6074 21.9847 52.6074H21.9537C21.8737 52.6074 21.8402 52.592 21.7976 52.5197L21.7098 52.372C21.6498 52.2642 21.5892 52.2642 21.5292 52.372L21.4453 52.5197C21.4021 52.592 21.3673 52.6074 21.2879 52.6074H21.2544C21.1744 52.6074 21.1627 52.5836 21.206 52.5197L21.3498 52.2945V52.2945ZM15.2505 52.1087C15.3744 52.1094 15.4273 52.1481 15.5176 52.2945L15.6621 52.5197C15.7086 52.5874 15.6931 52.6068 15.6157 52.6074H15.5821C15.5021 52.6074 15.4692 52.592 15.4266 52.5197L15.3389 52.3713C15.3086 52.3184 15.2789 52.292 15.2492 52.2913H15.2479C15.2182 52.2913 15.1879 52.3178 15.1576 52.3713L15.0737 52.5197C15.0318 52.5913 14.9969 52.6068 14.9182 52.6074H14.8834C14.8034 52.6074 14.7918 52.5836 14.8344 52.5197L14.9789 52.2945C15.0698 52.1545 15.1227 52.1087 15.2473 52.1087H15.2505V52.1087ZM37.2273 52.2462C37.2273 52.3481 37.1473 52.4281 37.0447 52.4281C36.9369 52.4281 36.8537 52.3481 36.8537 52.2462C36.8537 52.1429 36.9369 52.0591 37.0447 52.0591C37.1473 52.0591 37.2273 52.1429 37.2273 52.2462ZM22.3195 52.0668C22.2802 52.1281 22.2279 52.1584 22.1556 52.1584H22.1169C22.0292 52.1584 22.0176 52.1391 22.0602 52.0629L22.2202 51.7552C22.2692 51.6636 22.3079 51.6416 22.4111 51.6416H22.4479C22.5511 51.6416 22.5666 51.6636 22.5086 51.7513L22.3195 52.0668ZM24.0698 9.661C23.9047 9.82422 23.6337 9.82035 23.4686 9.65455C20.7092 6.87519 16.2047 6.85842 13.4247 9.61519C10.6473 12.3745 10.6286 16.8791 13.3879 19.6591L15.5473 21.8365C15.5615 21.8513 15.5757 21.8674 15.584 21.8842C15.5737 21.8842 15.5634 21.8862 15.5531 21.8862C15.1602 21.9133 14.7627 21.9029 14.3724 21.8571L12.786 20.2565C9.69823 17.1462 9.7163 12.1016 12.8273 9.0139C15.9402 5.92616 20.9821 5.94616 24.0698 9.05713L24.0763 9.06293C24.2415 9.22874 24.2376 9.49519 24.0698 9.661V9.661ZM18.3247 21.0733C18.3182 21.0778 18.3124 21.0797 18.306 21.0842C18.0453 21.2268 17.7808 21.3507 17.5079 21.4558L14.5666 18.4907C12.726 16.6352 12.4634 13.7294 13.9402 11.5784C14.0724 11.3862 14.3369 11.3365 14.5292 11.4687C14.724 11.601 14.7711 11.8655 14.6389 12.0604C13.3918 13.8739 13.615 16.3268 15.1686 17.8926L18.3247 21.0733V21.0733ZM23.8221 15.932L23.2221 16.5313L19.9066 13.1894C19.0982 12.3726 17.7744 12.3687 16.9595 13.1771C16.1447 13.9881 16.1382 15.3094 16.9492 16.1242L19.0853 18.2791C19.2511 18.4449 19.2511 18.7139 19.0834 18.8791C18.9182 19.0442 18.6492 19.0423 18.484 18.8771L16.3453 16.7223C15.2079 15.5739 15.2137 13.7145 16.3615 12.5752C17.5098 11.4358 19.3711 11.4436 20.5086 12.592L23.8221 15.932V15.932ZM22.0492 17.7042L21.4498 18.3042L18.126 14.9558C17.9608 14.7907 17.9627 14.5216 18.1279 14.3558C18.2956 14.1907 18.5647 14.1926 18.7279 14.3578L22.0492 17.7042ZM25.5963 14.1571L25.1395 14.6145L24.9969 14.7552L21.6873 11.421C20.4589 10.1842 18.666 9.75003 17.0047 10.2874C16.7834 10.3597 16.5434 10.2378 16.4711 10.0171C16.3989 9.79326 16.5208 9.55326 16.7447 9.481C18.7092 8.84422 20.8356 9.35906 22.2898 10.8236L25.5963 14.1571V14.1571ZM27.3711 12.3829L26.7711 12.9823L25.7182 11.9236C25.5531 11.7558 25.555 11.4874 25.7202 11.3236C25.8879 11.1584 26.155 11.1584 26.3202 11.3262L27.3711 12.3829Z"
                            fill="#00A0DD"
                            stroke="#00A0DD"
                            stroke-width="0.0677419"
                            stroke-miterlimit="10"
                          />
                        </svg>

                        <Text>Ví VNPay</Text>
                      </Space>
                    </Radio> */}
                  </Space>
                </Radio.Group>
              </div>

              <Form.Item className="mt-3">
                <Button type="primary" htmlType="submit" size="large">
                  Lập đơn mua hàng
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
export default LapDonMua;
