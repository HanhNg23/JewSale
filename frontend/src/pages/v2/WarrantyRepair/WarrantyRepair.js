import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Table,
  Input,
  DatePicker,
  Select,
  Tag,
  Space,
  Typography,
  Form,
  message,
  Divider,
  Row,
  Col,
} from "antd";
import moment from "moment";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const WarrantyRepairManagement = () => {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("create"); // "create", "edit", or "view"
  const [records, setRecords] = useState([
    {
      id: 1,
      requestCode: "REQ-001",
      warrantyCode: "WAR-001",
      customer: "Nguyen Van A",
      productCode: "PRD-001",
      productName: "Vòng tay lấp lánh",
      requestDate: "2023-06-10",
      returnDate: "2023-06-20",
      status: "Đang sửa chữa",
      createdBy: "Admin",
      updateDate: "2023-06-10",
      warrantyType: "Bảo hành vàng",
      requestInfo: "Yêu cầu kiểm tra định kỳ",
      resultInfo: "Đánh bóng toàn bộ",
    },
    {
      id: 2,
      requestCode: "REQ-002",
      warrantyCode: "WAR-002",
      customer: "Tran Thi B",
      productCode: "PRD-002",
      productName: "Lắc tay Disney",
      requestDate: "2023-07-01",
      returnDate: "2023-07-11",
      status: "Đã hoàn thành",
      createdBy: "Admin",
      updateDate: "2023-07-01",
      warrantyType: "Bảo hành bạc",
      requestInfo: "Yêu cầu thêm khối lượng hợp chất",
      resultInfo: "10g vàng đã được thêm",
    },
    {
      id: 3,
      requestCode: "REQ-003",
      warrantyCode: "WAR-003",
      customer: "Le Minh C",
      productCode: "PRD-003",
      productName: "Vòng cổ quý tộc",
      requestDate: "2023-07-15",
      returnDate: "2023-07-25",
      status: "Bị hủy",
      createdBy: "Admin",
      updateDate: "2023-07-15",
      warrantyType: "Bảo hành đồng",
      requestInfo: "Yêu cầu kiểm tra toàn bộ",
      resultInfo: "Yêu cầu bị hủy",
    },
    {
      id: 4,
      requestCode: "REQ-004",
      warrantyCode: "WAR-004",
      customer: "Pham Thi D",
      productCode: "PRD-004",
      productName: "Lắc tay vàng 24K",
      requestDate: "2023-07-20",
      returnDate: "2023-08-01",
      status: "Quá hạn sửa chữa",
      createdBy: "Admin",
      updateDate: "2023-07-20",
      warrantyType: "Bảo hành vàng",
      requestInfo: "Yêu cầu cắt và gia công thêm thành phẩm",
      resultInfo: "Chưa hoàn thành",
    },
    {
      id: 5,
      requestCode: "REE-004",
      warrantyCode: "WAE-004",
      customer: "Pham Thi D",
      productCode: "PRD-004",
      productName: "Charm Ruby",
      requestDate: "2023-07-20",
      returnDate: "2023-08-01",
      status: "Quá hạn sửa chữa",
      createdBy: "Admin",
      updateDate: "2023-07-20",
      warrantyType: "Bảo hành vàng",
      requestInfo: "Yêu cầu đính đá",
      resultInfo: "Chưa hoàn thành",
    },
  ]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [originalRecords] = useState(records); // Lưu trữ bản gốc của records để xóa lọc
  const [form] = Form.useForm(); // Khởi tạo form

  const showModal = (mode, record = null) => {
    setSelectedRecord(record);
    setMode(mode);
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
    setSelectedRecord(null);
    form.resetFields(); // Reset các trường khi đóng modal
  };
  const [currentDate, setCurrentDate] = useState(moment());
  useEffect(() => {
    if (mode === "create") {
      form.setFieldsValue({
        requestDate: currentDate,
        returnDate: currentDate,
      });
    } else if (selectedRecord) {
      form.setFieldsValue({
        ...selectedRecord,
        requestDate: moment(selectedRecord.requestDate),
        returnDate: moment(selectedRecord.returnDate),
      });
    }
  }, [mode, selectedRecord, currentDate, form]);

  const handleSave = (values) => {
    if (mode === "create") {
      const newRecord = {
        id: records.length + 1,
        ...values,
        status: "Đang sửa chữa",
      };
      setRecords([...records, newRecord]);
      message.success("Lập phiếu thành công!");
      setVisible(false);
    } else if (mode === "edit") {
      const updatedRecords = records.map((record) =>
        record.id === selectedRecord.id ? { ...record, ...values } : record
      );
      setRecords(updatedRecords);
      message.success("Cập nhật phiếu thành công!");
      setVisible(false);
    }
  };
  //dành cho API
  //  const handleSave = async (values) => {
  //    try {
  //      if (mode === "create") {
  //        // Gọi hàm API để lưu dữ liệu
  //        // handle API call
  //        message.success("Lập phiếu thành công!");
  //      } else if (mode === "edit") {
  //        // Gọi hàm API để cập nhật dữ liệu
  //        // handle API call
  //        message.success("Cập nhật phiếu thành công!");
  //      }
  //      onSave(values);
  //    } catch (error) {
  //      message.error("Đã xảy ra lỗi, vui lòng thử lại!");
  //    }
  //  };

  const handleDelete = (id) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);
    message.success("Hủy phiếu thành công!");
    setVisible(false);
  };

  const renderProduct = (text) => (
    <span style={{ color: "#1890ff" }}>{text}</span>
  );

  // Trạng thái lưu trữ giá trị tìm kiếm
  const [searchValues, setSearchValues] = useState({
    requestCode: "",
    warrantyCode: "",
    customer: "",
    product: "",
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Hàm tìm kiếm
  const handleSearch = () => {
    const { requestCode, warrantyCode, customer, product } = searchValues;

    if (!requestCode && !warrantyCode && !customer && !product) {
      message.error("Vui lòng nhập ít nhất một giá trị để tìm kiếm.");
      return;
    }

    const filteredRecords = records.filter((record) => {
      return (
        (requestCode && record.requestCode.includes(requestCode)) ||
        (warrantyCode && record.warrantyCode.includes(warrantyCode)) ||
        (customer && record.customer.includes(customer)) ||
        (product &&
          (record.productName.includes(product) ||
            record.productCode.includes(product)))
      );
    });

    if (filteredRecords.length === 0) {
      message.warning("Không tìm thấy kết quả phù hợp.");
    } else {
      setRecords(filteredRecords);
    }
  };

  // Quản lý các trường lọc
  const [filters, setFilters] = useState({
    requestDate: null,
    returnDate: null,
    status: "",
  });

  // Hàm cập nhật các trường lọc
  const handleFilterChange = (key, value) => {
    if (key === "requestDate" || key === "returnDate") {
      // Kiểm tra nếu value là đối tượng Moment hoặc Day.js
      if (value && typeof value.isValid === "function" && value.isValid()) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [key]: value.format("YYYY-MM-DD"),
        }));
      } else {
        // Nếu value không hợp lệ, set giá trị mặc định hoặc null
        setFilters((prevFilters) => ({ ...prevFilters, [key]: null }));
      }
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    }
  };

  // Hàm áp dụng lọc
  const applyFilters = () => {
    const { requestDate, returnDate, status } = filters;

    const filteredRecords = records.filter((record) => {
      return (
        (!requestDate ||
          moment(record.requestDate).isSameOrAfter(requestDate)) &&
        (!returnDate || moment(record.returnDate).isSameOrBefore(returnDate)) &&
        (!status || record.status === status)
      );
    });

    setRecords(filteredRecords);
  };

  // Hàm xóa lọc
  const clearFilters = () => {
    setFilters({
      requestDate: null,
      returnDate: null,
      status: "",
    });
    setRecords([...originalRecords]);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Title level={3} style={{ marginBottom: "20px" }}>
        Quản lý bảo hành sửa chữa
      </Title>
      <Paragraph style={{ fontSize: "16px" }}>
        Theo dõi các sản phẩm bảo hành
      </Paragraph>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "flex-end",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "20%" }}>
          <label strong>Mã yêu cầu</label>
          <Input
            name="requestCode"
            placeholder="Mã yêu cầu"
            style={{ fontWeight: "bold" }}
            onChange={handleSearchChange}
            value={searchValues.requestCode}
          />
        </div>
        <div style={{ width: "20%" }}>
          <label strong>Mã bảo hành</label>
          <Input
            name="warrantyCode"
            placeholder="Mã bảo hành"
            style={{ fontWeight: "bold" }}
            onChange={handleSearchChange}
            value={searchValues.warrantyCode}
          />
        </div>
        <div style={{ width: "20%" }}>
          <label strong>Khách hàng</label>
          <Input
            name="customer"
            placeholder="Khách hàng"
            style={{ fontWeight: "bold" }}
            onChange={handleSearchChange}
            value={searchValues.customer}
          />
        </div>
        <div style={{ width: "20%" }}>
          <label strong>Sản phẩm</label>
          <Input
            name="product"
            placeholder="Tên sản phẩm hoặc mã sản phẩm"
            style={{ fontWeight: "bold" }}
            onChange={handleSearchChange}
            value={searchValues.product}
          />
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
          <Button
            type="primary"
            onClick={handleSearch}
            style={{
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            type="primary"
            onClick={() => showModal("create")}
            style={{
              backgroundColor: "#52c41a",
              borderColor: "#52c41a",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Thêm mới
          </Button>
        </div>
      </div>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <label strong>Ngày yêu cầu</label>
          <DatePicker
            onChange={(date) => {
              // Kiểm tra nếu date là đối tượng Moment hoặc Day.js
              if (
                date &&
                typeof date.isValid === "function" &&
                date.isValid()
              ) {
                handleFilterChange("requestDate", date);
              } else {
                // Xử lý nếu date không hợp lệ hoặc null
                handleFilterChange("requestDate", null);
              }
            }}
            value={filters.requestDate ? moment(filters.requestDate) : null} // Sử dụng đúng đối tượng moment
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={8}>
          <label strong>Ngày trả</label>
          <DatePicker
            onChange={(date) => {
              // Kiểm tra nếu date là đối tượng Moment hoặc Day.js
              if (
                date &&
                typeof date.isValid === "function" &&
                date.isValid()
              ) {
                handleFilterChange("requestDate", date);
              } else {
                // Xử lý nếu date không hợp lệ hoặc null
                handleFilterChange("requestDate", null);
              }
            }}
            value={filters.requestDate ? moment(filters.requestDate) : null} // Sử dụng đúng đối tượng moment
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={8}>
          <label strong>Trạng thái</label>
          <Select
            value={filters.status}
            onChange={(value) => handleFilterChange("status", value)}
            style={{ width: "100%" }}
          >
            <Option value="">Tất cả</Option>
            <Option value="Đang sửa chữa">Đang sửa chữa</Option>
            <Option value="Đã hoàn thành">Đã hoàn thành</Option>
            <Option value="Bị hủy">Bị hủy</Option>
            <Option value="Quá hạn sửa chữa">Quá hạn sửa chữa</Option>
          </Select>
        </Col>
        <Col span={24} style={{ textAlign: "right" }}>
          <Space>
            <Button type="primary" onClick={applyFilters}>
              Áp dụng
            </Button>
            <Button onClick={clearFilters}>Xóa lọc</Button>
          </Space>
        </Col>
      </Row>

      <Divider />

      <Table
        dataSource={records}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        columns={[
          {
            title: "Mã yêu cầu",
            dataIndex: "requestCode",
            key: "requestCode",
            width: "10%",
            sorter: (a, b) => a.requestCode.localeCompare(b.requestCode),
          },
          {
            title: "Mã bảo hành",
            dataIndex: "warrantyCode",
            key: "warrantyCode",
            width: "10%",
            sorter: (a, b) => a.warrantyCode.localeCompare(b.warrantyCode),
          },
          {
            title: "Khách hàng",
            dataIndex: "customer",
            key: "customer",
            width: "10%",
            sorter: (a, b) => a.customer.localeCompare(b.customer),
          },
          {
            title: "Sản phẩm",
            dataIndex: "productName",
            key: "productName",
            render: renderProduct,
            width: "15%",
            sorter: (a, b) => a.productName.localeCompare(b.productName),
          },
          {
            title: "Ngày yêu cầu",
            dataIndex: "requestDate",
            key: "requestDate",
            width: "10%",
            sorter: (a, b) => new Date(a.requestDate) - new Date(b.requestDate),
          },
          {
            title: "Ngày trả",
            dataIndex: "returnDate",
            key: "returnDate",
            width: "10%",
            sorter: (a, b) => new Date(a.returnDate) - new Date(b.returnDate),
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: "10%",
            render: (status) => {
              let color = "";
              switch (status) {
                case "Đang sửa chữa":
                  color = "blue";
                  break;
                case "Đã hoàn thành":
                  color = "green";
                  break;
                case "Bị hủy":
                  color = "red";
                  break;
                case "Quá hạn sửa chữa":
                  color = "orange";
                  break;
                default:
                  color = "grey";
              }
              return <Tag color={color}>{status}</Tag>;
            },
            sorter: (a, b) => a.status.localeCompare(b.status),
          },
          {
            title: "Hành động",
            key: "action",
            width: "25%",
            render: (_, record) => (
              <Space size="middle">
                <Button onClick={() => showModal("view", record)}>Xem</Button>
                <Button onClick={() => showModal("edit", record)}>Sửa</Button>
                <Button type="danger" onClick={() => handleDelete(record.id)}>
                  Hủy
                </Button>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        open={visible}
        title={
          mode === "create"
            ? "Lập phiếu bảo hành sửa chữa"
            : mode === "edit"
            ? "Chỉnh sửa phiếu bảo hành sửa chữa"
            : "Thông tin phiếu bảo hành sửa chữa"
        }
        onCancel={onCancel}
        footer={null}
        width={1000}
        style={{ top: 20 }}
      >
        <Form
          form={form}
          onFinish={handleSave}
          initialValues={selectedRecord}
          layout="vertical"
        >
          <Form.Item
            name="requestCode"
            label="Mã yêu cầu sửa chữa"
            rules={[
              {
                required: mode !== "view",
                message: "Vui lòng nhập mã yêu cầu",
              },
            ]}
          >
            <Input disabled={mode === "view"} />
          </Form.Item>
          <Form.Item
            name="customer"
            label="Khách hàng"
            rules={[
              {
                required: mode !== "view",
                message: "Vui lòng nhập khách hàng",
              },
            ]}
          >
            <Input disabled={mode === "view"} />
          </Form.Item>
          {mode !== "create" && (
            <>
              <Form.Item
                name="warrantyCode"
                label="Mã bảo hành"
                rules={[
                  { required: true, message: "Vui lòng nhập mã bảo hành" },
                ]}
              >
                <Input disabled={mode === "view"} />
              </Form.Item>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[
                  { required: true, message: "Vui lòng chọn trạng thái" },
                ]}
              >
                <Select disabled={mode === "view"}>
                  <Option value="Đang sửa chữa">Đang sửa chữa</Option>
                  <Option value="Đã hoàn thành">Đã hoàn thành</Option>
                  <Option value="Bị hủy">Bị hủy</Option>
                  <Option value="Quá hạn sửa chữa">Quá hạn sửa chữa</Option>
                </Select>
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Space>
              <Text strong>Cập nhật ngày:</Text>
              <Text>{currentDate.format("YYYY-MM-DD HH:mm")}</Text>
              <Text strong>Người lập phiếu:</Text>
              <Text>{/* Thông tin người lập phiếu */}</Text>
            </Space>
          </Form.Item>
          <Title level={4} style={{ textAlign: "left" }}>
            Thông tin sản phẩm
          </Title>
          <Form.Item
            name="productCode"
            label="Mã sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập mã sản phẩm" }]}
          >
            <Input disabled={mode === "view"} />
          </Form.Item>
          <Form.Item
            name="productName"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input disabled={mode === "view"} />
          </Form.Item>
          <Form.Item
            name="warrantyType"
            label="Loại bảo hành"
            rules={[{ required: true, message: "Vui lòng chọn loại bảo hành" }]}
          >
            <Select disabled={mode === "view"}>
              <Option value="Sửa chữa">Sửa chữa</Option>
              <Option value="Thay thế linh kiện">Thay thế linh kiện</Option>
              <Option value="Bảo hành phần mềm">Bảo hành phần mềm</Option>
              <Option value="Bảo hành phần cứng">Bảo hành phần cứng</Option>
            </Select>
          </Form.Item>
          <Title level={4} style={{ textAlign: "left" }}>
            Thông tin yêu cầu
          </Title>
          <Form.Item
            name="requestDetails"
            label="Thông tin tình trạng sản phẩm và yêu cầu sửa chữa"
            rules={[
              { required: mode !== "view", message: "Vui lòng nhập thông tin" },
            ]}
          >
            <Input.TextArea disabled={mode === "view"} />
          </Form.Item>
          <Form.Item
            name="resultDetails"
            label="Kết quả trả về"
            rules={[
              {
                required: mode !== "view",
                message: "Vui lòng nhập kết quả trả về",
              },
            ]}
          >
            <Input.TextArea disabled={mode === "view"} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Text strong>Ngày yêu cầu:</Text>
              <DatePicker
                defaultValue={currentDate}
                format="YYYY-MM-DD"
                disabled
                style={{
                  backgroundColor: "#e6f7ff",
                  border: "1px solid #1890ff",
                }}
              />
              <Text strong>Ngày gửi trả:</Text>
              <DatePicker
                onChange={(date) => {
                  if (date && date.isValid()) {
                    form.setFieldsValue({ returnDate: date });
                  }
                }}
                value={form.getFieldValue("returnDate")}
                format="YYYY-MM-DD"
                disabled={mode === "view"}
              />
            </Space>
          </Form.Item>
          {mode !== "view" && (
            <Form.Item>
              <Space>
                {mode === "create" ? (
                  <>
                    <Button type="primary" htmlType="submit">
                      Lập phiếu
                    </Button>
                    <Button onClick={onCancel}>Hủy</Button>
                  </>
                ) : (
                  <>
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>
                    <Button onClick={onCancel}>Hủy</Button>
                  </>
                )}
              </Space>
            </Form.Item>
          )}
          {mode === "view" && (
            <Form.Item>
              <Button onClick={onCancel}>Thoát</Button>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default WarrantyRepairManagement;
