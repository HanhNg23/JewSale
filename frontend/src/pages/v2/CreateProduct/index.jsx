/* eslint-disable no-unused-vars */
import {
  App,
  Button,
  Col,
  Image,
  Row,
  Upload,
  Card,
  Typography,
  Select,
  Form,
  Input,
  InputNumber,
  Flex,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import useFetch from "hooks/useFetch";
import api from "api";
import { useAppStore } from "stores";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  formatCarat,
  formatCurrencyVND,
  parseCarat,
  parseCurrencyVND,
} from "utils";
import { CollectionsOutlined } from "@mui/icons-material";
const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const convertToFormData = (data) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && value.length && value[0] instanceof File) {
      value.forEach((file) => {
        formData.append(`${key}`, file);
      });
    } else if (value instanceof File) {
      formData.append(`${key}`, value);
    } else {
      formData.append(`${key}`, `${value}`);
    }
  }
  return formData;
};
const calculateTotalMetalCost = (metalTypes, responseMetalTypes) => {
  if (!metalTypes || !responseMetalTypes) return 0;

  return metalTypes.reduce((totalCost, metalType) => {
    if (!metalType) return totalCost;
    const responseMetalType = responseMetalTypes.find(
      (response) => response.metalTypeName === metalType.metalTypeName
    );

    if (responseMetalType) {
      const sellingPrice = responseMetalType.currentMetalPriceRate.sellingPrice;
      const materialWeight = metalType.materialWeight;
      return totalCost + sellingPrice * materialWeight;
    }

    return totalCost;
  }, 0);
};
const calculateTotalGemstoneCost = (gemstones) => {
  if (!gemstones) return 0;

  return gemstones.reduce((totalCost, gemstone) => {
    if (!gemstone) return totalCost;
    const { gemstonePrice } = gemstone;
    if (gemstonePrice) {
      return totalCost + gemstonePrice;
    }
    return totalCost;
  }, 0);
};
const CreateProductPage = () => {
  const navigate = useNavigate();
  const refetch = useAppStore((state) => state.refetch);
  const { message, notification } = App.useApp();
  const [createLoading, setCreateLoading] = useState(false);
  const [createForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const {
    loading: loadingFilterOptions,
    error: errorFilterOptions,
    response: responseFilterOptions,
  } = useFetch(api.getAllFilterOptions);

  const {
    loading: loadingMetalTypes,
    error: errorMetalTypes,
    response: responseMetalTypes,
  } = useFetch(api.getAllMetalTypes);

  const productType = responseFilterOptions
    ? responseFilterOptions?.productType
    : [];
  const saleStatus = responseFilterOptions
    ? responseFilterOptions?.saleStatus
    : [];
  const gemstoneType = responseFilterOptions
    ? responseFilterOptions?.gemstoneType
    : [];
  const gemstoneCertType = responseFilterOptions
    ? responseFilterOptions?.gemstoneCertType
    : [];
  console.log(responseMetalTypes);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadImagesProps = {
    type: "select",
    name: "fileImages",
    multiple: true,
    listType: "picture-card",
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }

      return false;
    },
    fileList: fileList,
    onChange: onChange,
    onPreview: onPreview,
  };

  const onFinish = (values) => {
    console.log("Success:", values);

    values.imgFiles = values.imgFiles
      ? values.imgFiles.map((image) => image.originFileObj)
      : undefined;

    const productRequest = { ...values };
    delete productRequest.imgFiles;

    const formData = new FormData();

    formData.append(
      "productRequest",
      new Blob([JSON.stringify(productRequest)], { type: "application/json" })
    );

    values.imgFiles.forEach((file, index) => {
      formData.append("imgFiles", file);
    });
    setCreateLoading(true);
    axios
      .post("http://localhost:8080/products/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        notification.success({ message: "Tạo thành công" });
        console.log("Response:", response.data);
      })
      .catch((error) => {
        if (error.response.data) {
          notification.error({ message: error.response.data });
        } else {
          notification.error({ message: "Tạo bị lỗi" });
        }
      })
      .finally(() => {
        setCreateLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);

    message.error(errorInfo.errorFields[0].errors[0]);
  };
  const metalTypes = Form.useWatch("metalTypes", createForm);
  const gemstones = Form.useWatch("gemstones", createForm);
  const stockQuantity = Form.useWatch("stockQuantity", createForm);
  const laborCost = Form.useWatch(["productPrice", "laborCost"], createForm);
  const markupPercentage = Form.useWatch(
    ["productPrice", "markupPercentage"],

    createForm
  );
  const totalGemstoneCost = useMemo(() => {
    return calculateTotalGemstoneCost(gemstones);
  }, [gemstones]);
  const totalMetalCost = useMemo(() => {
    return calculateTotalMetalCost(metalTypes, responseMetalTypes);
  }, [metalTypes, responseMetalTypes]);

  useEffect(() => {
    if (gemstones && gemstones.length > 0 && stockQuantity > 1) {
      message.warning("Sản phẩm có đá quý nên số lượng bằng 1");
      createForm.setFieldValue("stockQuantity", 1);
    }
  }, [createForm, gemstones, message, stockQuantity]);
  useEffect(() => {
    if (metalTypes) {
      createForm.setFieldValue(
        ["productPrice", "totalMetalCost"],
        totalMetalCost
      );
      createForm.setFieldValue(
        ["productPrice", "totalGemstoneCost"],
        totalGemstoneCost
      );
      createForm.setFieldValue(
        ["productPrice", "salePrice"],
        (totalMetalCost + totalGemstoneCost + laborCost) * markupPercentage
      );
    }
  }, [
    createForm,
    laborCost,
    markupPercentage,
    metalTypes,
    totalGemstoneCost,
    totalMetalCost,
  ]);
  // useEffect(() => {
  //   if (responseMetalTypes)
  //     createForm.setFieldsValue({
  //       name: "Nhẫn vàng",
  //       unitMeasure: "chiếc",
  //       description: "Nhẫn vàng",
  //       productType: "nhẫn",
  //       saleStatus: "sẵn bán",
  //       stockQuantity: 2,
  //       metalTypes: [
  //         {
  //           metalTypeName: responseMetalTypes[0].metalTypeName,
  //           materialWeight: 12,
  //         },
  //         {
  //           metalTypeName: responseMetalTypes[1].metalTypeName,
  //           materialWeight: 12,
  //         },
  //       ],
  //       gemstones: [
  //         {
  //           seriaNumber: "G001",
  //           gemstoneName: "Trang sức nhẫn vàng kim cương",
  //           stoneColor: "F",
  //           stoneCut: "Tròn",
  //           stoneClarity: "WS1",
  //           caratWeight: 200,
  //           gemstonePrice: 500000,
  //           gemstoneType: gemstoneType[0],
  //           certificateNo: null,
  //           certificateType: gemstoneCertType[0],
  //           pieces: 1,
  //         },
  //         {
  //           seriaNumber: "G002",
  //           gemstoneName: "Trang sức nhẫn vàng kim cương",
  //           stoneColor: "F",
  //           stoneCut: "Tròn",
  //           stoneClarity: "WS1",
  //           caratWeight: 200,
  //           gemstonePrice: 500000,
  //           gemstoneType: gemstoneType[0],
  //           certificateNo: null,
  //           certificateType: gemstoneCertType[0],
  //           pieces: 1,
  //         },
  //       ],
  //       productPrice: {
  //         laborCost: 10000,
  //         markupPercentage: 0.5,
  //       },
  //     });
  // }, [createForm, gemstoneCertType, gemstoneType, responseMetalTypes]);

  return (
    <Form
      form={createForm}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ padding: "24px", width: "100%", display: "flex" }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex align="center" justify="flex-start" gap={20} wrap>
            <Button type="primary" size="large" onClick={() => navigate(-1)}>
              Quay lại
            </Button>
          </Flex>
        </Col>
        <Col span={12}>
          <Card className="rounded-3" style={{ height: "100%" }}>
            <Typography.Title level={3}>Upload ảnh</Typography.Title>

            <Form.Item
              name="imgFiles"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ảnh",
                },
              ]}
            >
              <Upload {...uploadImagesProps}>
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </Form.Item>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="rounded-3">
            <Typography.Title level={3}>Thông tin chung</Typography.Title>
            <Form.Item label="Tên sản phẩm" name="name">
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Đơn vị tính" name="unitMeasure">
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Mô tả sản phẩm" name="description">
              <Input.TextArea autoSize={{ minRows: 6 }} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Loại trang sức" name="productType">
                  <Select placeholder="Loại trang sức" allowClear size="large">
                    {productType?.map((cl, index) => (
                      <Select.Option key={index} value={cl}>
                        {cl}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Số lượng" name="stockQuantity">
                  <InputNumber min={1} style={{ width: "100%" }} size="large" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Tình trạng sản phẩm" name="saleStatus">
                  <Select placeholder="Tình trạng sản phẩm" size="large">
                    {saleStatus?.map((cl, index) => (
                      <Select.Option key={index} value={cl}>
                        {cl}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card bordered>
            <Row gutter={16}>
              <Col span={24}>
                <Typography.Title level={3}>
                  Chất liệu sản phẩm
                </Typography.Title>
              </Col>

              <Form.List name="metalTypes">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <>
                        <Col span={8}>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item
                                label="Kim loại"
                                name={[field.name, "metalTypeName"]}
                              >
                                <Select
                                  placeholder="Kim loại"
                                  allowClear
                                  size="large"
                                >
                                  {responseMetalTypes?.map((cl, index) => (
                                    <Select.Option
                                      key={cl.metalTypeName}
                                      // value={JSON.stringify(cl)}
                                    >
                                      {cl.metalTypeName}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                label="Khối lượng(gram)"
                                name={[field.name, "materialWeight"]}
                              >
                                <InputNumber
                                  style={{ width: "100%" }}
                                  size="large"
                                  min={0}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={15}>
                          <Row gutter={16}>
                            <Col span={4}>
                              <Form.Item label="Hàm lượng">
                                <Input
                                  size="large"
                                  disabled
                                  value={
                                    metalTypes &&
                                    metalTypes[index] &&
                                    responseMetalTypes?.find(
                                      (m) =>
                                        m.metalTypeName ===
                                        metalTypes[index].metalTypeName
                                    )?.metalPurity
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={10}>
                              <Form.Item label="Giá kim loại bán ra(VNĐ/gram)">
                                <InputNumber
                                  size="large"
                                  disabled
                                  style={{ width: "100%" }}
                                  value={
                                    metalTypes &&
                                    metalTypes[index] &&
                                    responseMetalTypes?.find(
                                      (m) =>
                                        m.metalTypeName ===
                                        metalTypes[index].metalTypeName
                                    )?.currentMetalPriceRate.sellingPrice
                                  }
                                  formatter={(value) =>
                                    formatCurrencyVND(Number(value))
                                  }
                                  parser={(value) => parseCurrencyVND(value)}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={10}>
                              <Form.Item label="Giá kim loại mua vào(VNĐ/gram)">
                                <InputNumber
                                  size="large"
                                  disabled
                                  style={{ width: "100%" }}
                                  value={
                                    metalTypes &&
                                    metalTypes[index] &&
                                    responseMetalTypes?.find(
                                      (m) =>
                                        m.metalTypeName ===
                                        metalTypes[index].metalTypeName
                                    )?.currentMetalPriceRate.buyingPrice
                                  }
                                  formatter={(value) =>
                                    formatCurrencyVND(Number(value))
                                  }
                                  parser={(value) => parseCurrencyVND(value)}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          span={1}
                          style={{
                            justifyItems: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
                        </Col>
                      </>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm kim loại
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card bordered>
            <Row gutter={16}>
              <Col span={24}>
                <Typography.Title level={3}>Đá quý</Typography.Title>
              </Col>
              <Form.List name="gemstones">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <>
                        <Col span={23}>
                          <Row gutter={16}>
                            <Col span={5}>
                              <Form.Item
                                label="Số seri"
                                {...field}
                                name={[field.name, "seriaNumber"]}
                              >
                                <Input style={{ width: "100%" }} size="large" />
                              </Form.Item>
                            </Col>
                            <Col span={5}>
                              <Form.Item
                                label="Đá quý"
                                {...field}
                                name={[field.name, "gemstoneName"]}
                              >
                                <Input style={{ width: "100%" }} size="large" />
                              </Form.Item>
                            </Col>
                            <Col span={5}>
                              <Form.Item
                                label="Loại đá"
                                {...field}
                                name={[field.name, "gemstoneType"]}
                              >
                                <Select
                                  placeholder="Kim loại"
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
                            <Col span={3}>
                              <Form.Item
                                label="Tổng khối lượng đá"
                                {...field}
                                name={[field.name, "caratWeight"]}
                              >
                                <InputNumber
                                  min={0}
                                  style={{ width: "100%" }}
                                  size="large"
                                  formatter={(value) =>
                                    formatCarat(Number(value))
                                  }
                                  parser={(value) => parseCarat(value)}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item
                                label="Giá đá"
                                {...field}
                                name={[field.name, "gemstonePrice"]}
                              >
                                <InputNumber
                                  min={0}
                                  style={{ width: "100%" }}
                                  size="large"
                                  formatter={(value) =>
                                    formatCurrencyVND(Number(value))
                                  }
                                  parser={(value) => parseCurrencyVND(value)}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item
                                label="Mảnh"
                                {...field}
                                name={[field.name, "pieces"]}
                              >
                                <InputNumber
                                  min={0}
                                  style={{ width: "100%" }}
                                  size="large"
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          span={1}
                          style={{
                            justifyItems: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
                        </Col>
                        <Col span={23}>
                          <Row gutter={16}>
                            <Col span={5}>
                              <Form.Item
                                label="Loại thẩm định"
                                name={[field.name, "certificateType"]}
                              >
                                <Select
                                  placeholder="Loại thẩm định"
                                  allowClear
                                  size="large"
                                >
                                  {gemstoneCertType?.map((cl) => (
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
                            <Col span={5}>
                              <Form.Item
                                label="Mã thẩm định"
                                name={[field.name, "certificateNo"]}
                              >
                                <Input size="large" />
                              </Form.Item>
                            </Col>
                            <Col span={5}>
                              <Form.Item
                                label="Độ trong"
                                name={[field.name, "stoneClarity"]}
                              >
                                <Input size="large" />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item
                                label="Mặt cắt"
                                name={[field.name, "stoneCut"]}
                              >
                                <Input size="large" />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item
                                label="Màu sắc"
                                name={[field.name, "stoneColor"]}
                              >
                                <Input size="large" />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                      </>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm đá quý
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card bordered>
            <Row gutter={16}>
              <Col span={24}>
                <Typography.Title level={3}>Định giá sản phẩm</Typography.Title>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Tổng tiền kim loại"
                  name={["productPrice", "totalMetalCost"]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    size="large"
                    disabled
                    formatter={(value) => formatCurrencyVND(Number(value))}
                    parser={(value) => parseCurrencyVND(value)}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Tổng tiền đá quý"
                  name={["productPrice", "totalGemstoneCost"]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    size="large"
                    disabled
                    formatter={(value) => formatCurrencyVND(Number(value))}
                    parser={(value) => parseCurrencyVND(value)}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Tiền công"
                  name={["productPrice", "laborCost"]}
                >
                  <InputNumber
                    min={10000}
                    style={{ width: "100%" }}
                    size="large"
                    formatter={(value) => formatCurrencyVND(Number(value))}
                    parser={(value) => parseCurrencyVND(value)}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Tỉ lệ phần trăm lợi nhuận"
                  name={["productPrice", "markupPercentage"]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    step={0.1}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Flex justify="flex-end">
            <Form.Item
              label="Giá bán sản phẩm"
              name={["productPrice", "salePrice"]}
            >
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                disabled
                formatter={(value) => formatCurrencyVND(Number(value))}
                parser={(value) => parseCurrencyVND(value)}
              />
            </Form.Item>
          </Flex>
        </Col>
        <Col span={24}>
          <Form.Item>
            <div style={{ textAlign: "right" }}>
              <Button
                type="primary"
                size="large"
                loading={createLoading}
                htmlType="submit"
              >
                Tạo sản phẩm
              </Button>
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateProductPage;
