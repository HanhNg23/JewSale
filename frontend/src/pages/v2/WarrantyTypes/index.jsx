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
  Select,
  Row,
  Col,
  DatePicker,
  InputNumber,
  App,
} from "antd";
import React, { useEffect, useState } from "react";
import { CiBoxList } from "react-icons/ci";
import useFetchV2 from "hooks/useFetchV2";
import axios from "axios";
import dayjs from "dayjs";
import { useAppStore } from "stores";
import { useSearchParams } from "react-router-dom";

const WarrantyTypesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { notification, message } = App.useApp();
  const refetch = useAppStore((state) => state.refetch);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const generateQueryString = () => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return new URLSearchParams(params).toString();
  };
  const [responseWarrantyTypes] = useFetchV2(
    {
      fetchFunction: () =>
        axios.get(
          `http://localhost:8080/warranties/types?${generateQueryString()}`
        ),
    },
    generateQueryString()
  );
  const [responseFilterOptions] = useFetchV2({
    fetchFunction: () =>
      axios.get("http://localhost:8080/products/filter-options"),
  });

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setCreateLoading(true);
      const payload = {
        warrantyName: values.warrantyName,
        specificConditions: values.specificConditions,
        repairInformation: values.repairInformation,
        jewelryTypes: values.jewelryTypes,
        metalGroups: values.metalGroups,
        gemstoneGroups: values.gemstoneGroups,
        effectiveDate: values.effectiveDate.format("YYYY-MM-DD"),
        duration: values.duration,
      };
      const res = await axios.post(
        `http://localhost:8080/warranties/types`,
        payload
      );
      console.log(res);
      refetch();
      notification.success({ message: "Tạo thành công" });
    } catch (error) {
      if (error.response.data) {
        notification.error({ message: error.response.data });
      } else {
        notification.error({ message: "Tạo bị lỗi" });
      }
    } finally {
      setCreateLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  const onFinishUpdate = async (values) => {
    console.log("Success:", values);
    try {
      setUpdateLoading(true);
      const payload = {
        warrantyName: values.warrantyName,
        specificConditions: values.specificConditions,
        repairInformation: values.repairInformation,
        jewelryTypes: values.jewelryTypes,
        metalGroups: values.metalGroups,
        gemstoneGroups: values.gemstoneGroups,
        effectiveDate: values.effectiveDate.format("YYYY-MM-DD"),
        duration: values.duration,
      };
      const res = await axios.put(
        `http://localhost:8080/warranties/types/${values.warrantyTypeId}`,
        payload
      );
      console.log(res);
      refetch();
      notification.success({ message: "Tạo thành công" });
    } catch (error) {
      if (error.response.data) {
        notification.error({ message: error.response.data });
      } else {
        notification.error({ message: "Tạo bị lỗi" });
      }
    } finally {
      setUpdateLoading(false);
    }
  };
  const onFinishFailedUpdate = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/warranties/types/${id}`);
      notification.success({ message: "Xóa thành công" });
      refetch();
    } catch (err) {
      notification.success({ message: "Xóa không thành công" });
    }
  };
  const handleOpenUpdate = (item) => {
    console.log(item);
    updateForm.setFieldsValue({
      warrantyTypeId: item.warrantyTypeId,
      warrantyName: item.warrantyName,
      specificConditions: item.specificConditions,
      repairInformation: item.repairInformation,
      jewelryTypes: item.jewelryTypes,
      metalGroups: item.metalGroups,
      gemstoneGroups: item.gemstoneGroups,
      duration: item.duration,
      effectiveDate: dayjs(item.effectiveDate),
    });
    setOpenUpdate(true);
  };

  const setParams = (params) => {
    const queryParams = new URLSearchParams(searchParams);

    const getParam = (key, defaultValue) => {
      return params[key] !== undefined
        ? params[key]
        : searchParams.get(key) || defaultValue;
    };

    queryParams.set("page", getParam("page", 1));
    queryParams.set("size", getParam("size", 2));

    if (Array.isArray(params.jewelryTypes) && params.jewelryTypes.length > 0) {
      queryParams.delete("jewelryTypes");
      params.jewelryTypes.forEach((value) => {
        queryParams.append("jewelryTypes", value);
      });
    } else if (
      params.jewelryTypes === undefined ||
      params.jewelryTypes.length === 0
    ) {
      queryParams.delete("jewelryTypes");
    } else {
      queryParams.set("jewelryTypes", params.jewelryTypes);
    }

    if (params.warrantyName) {
      queryParams.set("warrantyName", params.warrantyName);
    } else {
      queryParams.delete("warrantyName");
    }

    if (Array.isArray(params.metalGroups) && params.metalGroups.length > 0) {
      queryParams.delete("metalGroups");
      params.metalGroups.forEach((value) => {
        queryParams.append("metalGroups", value);
      });
    } else if (
      params.metalGroups === undefined ||
      params.metalGroups.length === 0
    ) {
      queryParams.delete("metalGroups");
    } else {
      queryParams.set("metalGroups", params.metalGroups);
    }

    if (
      Array.isArray(params.gemstoneGroups) &&
      params.gemstoneGroups.length > 0
    ) {
      queryParams.delete("gemstoneGroups");
      params.gemstoneGroups.forEach((value) => {
        queryParams.append("gemstoneGroups", value);
      });
    } else if (
      params.gemstoneGroups === undefined ||
      params.gemstoneGroups.length === 0
    ) {
      queryParams.delete("gemstoneGroups");
    } else {
      queryParams.set("gemstoneGroups", params.gemstoneGroups);
    }

    setSearchParams(queryParams.toString());
  };
  useEffect(() => {
    createForm.setFieldsValue({
      warrantyName: " Bảo hành trang sức nhẫn",
      specificConditions: "Bao gồm các lỗi sản xuất trong hai năm",
      repairInformation:
        "Bảo hành này cung cấp bảo hiểm cho bất kỳ lỗi sản xuất nào trong thời gian hai năm kể từ ngày mua.",
      jewelryTypes: ["nhẫn", "vòng"],
      metalGroups: ["vàng", "vàng trắng"],
      gemstoneGroups: [],
      effectiveDate: dayjs("2024-07-04"),
      duration: 24,
    });
  }, [createForm]);
  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log("Success:", values);
            setParams({
              warrantyName: values.warrantyName,
              jewelryTypes: values.jewelryTypes,
              metalGroups: values.metalGroups,
              gemstoneGroups: values.gemstoneGroups,
            });
          }}
        >
          <Row>
            <div>
              <Typography.Title
                level={2}
                style={{ alignItems: "center", display: "flex", gap: 10 }}
              >
                <CiBoxList style={{ color: "blue" }} />
                Thông tin các loại bảo hành
              </Typography.Title>
              <Typography.Text strong>
                Quản lý thông tin các loại bảo hành
              </Typography.Text>
            </div>
            <Col span={24} style={{ marginTop: 50 }}>
              <Flex align="flex-end" gap={10}>
                <Form.Item
                  label={
                    <Typography.Text strong>Tên loại bảo hành</Typography.Text>
                  }
                  name="warrantyName"
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Flex>
            </Col>
            <Col span={24}>
              <Flex vertical gap={10}>
                <Typography.Text strong>
                  Lọc loại bảo hành theo nhóm
                </Typography.Text>
                <Space>
                  <Form.Item name="jewelryTypes">
                    <Select
                      placeholder="Nhóm trang sức"
                      allowClear
                      mode="multiple"
                      style={{ width: 200 }}
                      options={
                        responseFilterOptions
                          ? responseFilterOptions.productType.map((f) => ({
                              label: f,
                              value: f,
                            }))
                          : []
                      }
                    />
                  </Form.Item>

                  <Form.Item name="metalGroups">
                    <Select
                      allowClear
                      mode="multiple"
                      placeholder="Nhóm kim loại"
                      style={{ width: 200 }}
                      options={
                        responseFilterOptions
                          ? responseFilterOptions.metalGroup.map((f) => ({
                              label: f,
                              value: f,
                            }))
                          : []
                      }
                    />
                  </Form.Item>
                  <Form.Item name="gemstoneGroups">
                    <Select
                      allowClear
                      mode="multiple"
                      placeholder="Nhóm đá quý"
                      style={{ width: 200 }}
                      options={
                        responseFilterOptions
                          ? responseFilterOptions.gemstoneType.map((f) => ({
                              label: f,
                              value: f,
                            }))
                          : []
                      }
                    />
                  </Form.Item>
                </Space>
              </Flex>
            </Col>
          </Row>
        </Form>
      </Card>
      <Flex
        align="center"
        justify="space-between"
        gap={20}
        wrap
        style={{ marginTop: 20 }}
      >
        <Typography.Text strong>Danh sách loại bảo hành</Typography.Text>

        <Button type="primary" size="large" onClick={() => setOpen(true)}>
          Thêm mới
        </Button>
        <Modal
          forceRender
          style={{ top: 20 }}
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          footer={null}
        >
          <Form
            form={createForm}
            name="create_warranty_type"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Typography.Title level={3}>Tên bảo hành</Typography.Title>
            <Form.Item
              name="warrantyName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên bảo hành",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Row gutter={[32, 32]}>
              <Col span={12}>
                <Typography.Title level={3}>
                  Thông tin bảo hành
                </Typography.Title>
                <Form.Item
                  label="Mô tả điều kiện bảo hành"
                  name="specificConditions"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mô tả điều kiện bảo hành",
                    },
                  ]}
                >
                  <Input.TextArea autoSize={{ minRows: 6 }} />
                </Form.Item>
                <Form.Item
                  label="Thông tin bảo hành"
                  name="repairInformation"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin bảo hành",
                    },
                  ]}
                >
                  <Input.TextArea autoSize={{ minRows: 6 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Typography.Title level={3}>
                  Nhóm sản phẩm áp dụng
                </Typography.Title>
                <Form.Item label="Nhóm trang sức" name="jewelryTypes">
                  <Select
                    placeholder="Nhóm trang sức"
                    mode="multiple"
                    allowClear
                    options={
                      responseFilterOptions
                        ? responseFilterOptions.productType.map((f) => ({
                            label: f,
                            value: f,
                          }))
                        : []
                    }
                  />
                </Form.Item>
                <Form.Item label="Nhóm kim loại" name="metalGroups">
                  <Select
                    placeholder="Nhóm kim loại"
                    mode="multiple"
                    allowClear
                    options={
                      responseFilterOptions
                        ? responseFilterOptions.metalGroup.map((f) => ({
                            label: f,
                            value: f,
                          }))
                        : []
                    }
                  />
                </Form.Item>
                <Form.Item label="Nhóm đá" name="gemstoneGroups">
                  <Select
                    placeholder="Nhóm đá"
                    mode="multiple"
                    allowClear
                    options={
                      responseFilterOptions
                        ? responseFilterOptions.gemstoneType.map((f) => ({
                            label: f,
                            value: f,
                          }))
                        : []
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Ngày áp dụng"
                  name="effectiveDate"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập ngày áp dụng",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Thời gian áp dụng (tháng)"
                  name="duration"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thời gian áp dụng",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={createLoading}>
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          forceRender
          style={{ top: 20 }}
          open={openUpdate}
          onOk={() => setOpenUpdate(false)}
          onCancel={() => setOpenUpdate(false)}
          width={1000}
          footer={null}
        >
          <Form
            form={updateForm}
            name="update_warranty_type"
            onFinish={onFinishUpdate}
            onFinishFailed={onFinishFailedUpdate}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item name="warrantyTypeId" hidden>
              <Input />
            </Form.Item>
            <Typography.Title level={3}>Tên bảo hành</Typography.Title>
            <Form.Item
              name="warrantyName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên bảo hành",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Row gutter={[32, 32]}>
              <Col span={12}>
                <Typography.Title level={3}>
                  Thông tin bảo hành
                </Typography.Title>
                <Form.Item
                  label="Mô tả điều kiện bảo hành"
                  name="specificConditions"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mô tả điều kiện bảo hành",
                    },
                  ]}
                >
                  <Input.TextArea autoSize={{ minRows: 6 }} />
                </Form.Item>
                <Form.Item
                  label="Thông tin bảo hành"
                  name="repairInformation"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin bảo hành",
                    },
                  ]}
                >
                  <Input.TextArea autoSize={{ minRows: 6 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Typography.Title level={3}>
                  Nhóm sản phẩm áp dụng
                </Typography.Title>
                <Form.Item label="Nhóm trang sức" name="jewelryTypes">
                  <Select
                    placeholder="Nhóm trang sức"
                    mode="multiple"
                    allowClear
                    options={
                      responseFilterOptions
                        ? responseFilterOptions.productType.map((f) => ({
                            label: f,
                            value: f,
                          }))
                        : []
                    }
                  />
                </Form.Item>
                <Form.Item label="Nhóm kim loại" name="metalGroups">
                  <Select
                    placeholder="Nhóm kim loại"
                    mode="multiple"
                    allowClear
                    options={
                      responseFilterOptions
                        ? responseFilterOptions.metalGroup.map((f) => ({
                            label: f,
                            value: f,
                          }))
                        : []
                    }
                  />
                </Form.Item>
                <Form.Item label="Nhóm đá" name="gemstoneGroups">
                  <Select
                    placeholder="Nhóm đá"
                    mode="multiple"
                    allowClear
                    options={
                      responseFilterOptions
                        ? responseFilterOptions.gemstoneType.map((f) => ({
                            label: f,
                            value: f,
                          }))
                        : []
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Ngày áp dụng"
                  name="effectiveDate"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập ngày áp dụng",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Thời gian áp dụng (tháng)"
                  name="duration"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thời gian áp dụng",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={updateLoading}>
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Flex>
      <List
        itemLayout="vertical"
        size="large"
        style={{ marginTop: 20 }}
        pagination={{
          current: searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1,
          onChange: (page, pageSize) => {
            setParams({ page, size: pageSize });
          },
          total: responseWarrantyTypes
            ? responseWarrantyTypes.totalElements
            : 0,
          pageSize: searchParams.get("size")
            ? Number(searchParams.get("size"))
            : 2,
        }}
        dataSource={responseWarrantyTypes ? responseWarrantyTypes.content : []}
        renderItem={(item) => (
          <List.Item
            key={item.warrantyTypeId}
            style={{ padding: 0, marginBottom: 20, border: "none" }}
          >
            <Card>
              <Typography.Text strong style={{ fontSize: 18 }}>
                {/* [Tên bảo hành] Bảo hành trang sức nhẫn */}
                {item.warrantyName}
              </Typography.Text>
              <Typography.Paragraph>
                Ngày hiệu lực áp dụng: {item.effectiveDate}
              </Typography.Paragraph>
              <Typography.Paragraph>
                <Typography.Text strong>Mã loại bảo hành:</Typography.Text>{" "}
                {item.warrantyTypeId}
                <br />
                <Typography.Text strong>Thời hạn áp dụng:</Typography.Text>{" "}
                {`${item.duration} Tháng`}
                <br />
                <Typography.Text strong>Nhóm sản phẩm áp dụng</Typography.Text>
                <ul>
                  <li>
                    <Typography.Text strong>Nhóm trang sức:</Typography.Text>{" "}
                    {item.jewelryTypes.join(", ")}
                  </li>
                  <li>
                    <Typography.Text strong>Nhóm kim loại:</Typography.Text>{" "}
                    {item.metalGroups.join(", ")}
                  </li>
                  <li>
                    <Typography.Text strong>Nhóm đá quý:</Typography.Text>{" "}
                    {item.gemstoneGroups.join(", ")}
                  </li>
                </ul>
              </Typography.Paragraph>
            </Card>
            <Flex align="center" justify="flex-end" style={{ marginTop: 10 }}>
              <Space>
                <Button type="primary" onClick={() => handleOpenUpdate(item)}>
                  Chỉnh sửa
                </Button>
                <Button onClick={() => handleDelete(item.warrantyTypeId)}>
                  Xóa
                </Button>
              </Space>
            </Flex>
          </List.Item>
        )}
      />
    </div>
  );
};

export default WarrantyTypesPage;
