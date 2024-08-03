import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faMoneyBillAlt,
  faSearch,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./DanhSach.css";

const data = [
  {
    id: 1,
    orderId: "001",
    customer: "Nguyễn Văn A",
    transactionDate: "2023-06-10",
    orderType: "Đơn bán",
    totalAmount: "2.000.000",
    status: "Chưa thanh toán",
  },
  {
    id: 2,
    orderId: "002",
    customer: "Trần Thị B",
    transactionDate: "2023-06-11",
    orderType: "Đơn mua lại",
    totalAmount: "1.500.000",
    status: "Đã thanh toán",
  },
  {
    id: 3,
    orderId: "003",
    customer: "Lê Văn C",
    transactionDate: "2023-06-12",
    orderType: "Đơn bán",
    totalAmount: "3.000.000",
    status: "Chưa thanh toán",
  },
  {
    id: 4,
    orderId: "004",
    customer: "Phạm Thị D",
    transactionDate: "2023-06-13",
    orderType: "Đơn mua lại",
    totalAmount: "2.500.000",
    status: "Đã thanh toán",
  },
  {
    id: 5,
    orderId: "005",
    customer: "Hoàng Văn E",
    transactionDate: "2023-06-14",
    orderType: "Đơn bán",
    totalAmount: "4.000.000",
    status: "Chưa thanh toán",
  },
  {
    id: 6,
    orderId: "006",
    customer: "Đặng Thị F",
    transactionDate: "2023-06-15",
    orderType: "Đơn mua lại",
    totalAmount: "1.000.000",
    status: "Đã thanh toán",
  },
  {
    id: 7,
    orderId: "007",
    customer: "Nguyễn Văn G",
    transactionDate: "2023-06-16",
    orderType: "Đơn bán",
    totalAmount: "2.800.000",
    status: "Chưa thanh toán",
  },
  {
    id: 8,
    orderId: "008",
    customer: "Trần Thị H",
    transactionDate: "2023-06-17",
    orderType: "Đơn mua lại",
    totalAmount: "3.200.000",
    status: "Đã thanh toán",
  },
  {
    id: 9,
    orderId: "009",
    customer: "Lê Văn I",
    transactionDate: "2023-06-18",
    orderType: "Đơn bán",
    totalAmount: "1.700.000",
    status: "Chưa thanh toán",
  },
  {
    id: 10,
    orderId: "010",
    customer: "Phạm Thị J",
    transactionDate: "2023-06-19",
    orderType: "Đơn mua lại",
    totalAmount: "2.900.000",
    status: "Đã thanh toán",
  },
];

function DanhSach() {
  return (
    <>
      <div className="custom-div">
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Mã đơn</label>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Mã đơn"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Khách hàng</label>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Khách hàng"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Nhân viên</label>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Nhân viên"
            />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button className="btn search-button">Tìm kiếm</button>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Bộ lọc</label>
            <select className="form-control search-input">
              <option value="">Loại đơn</option>
              <option value="donban">Đơn bán</option>
              <option value="donmua">Đơn mua lại</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">-</label>
            <input
              type="datetime-local"
              className="form-control search-input"
              placeholder="Ngày giao dịch"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">-</label>
            <select className="form-control search-input">
              <option value="">Trạng thái đơn hàng</option>
              <option value="chuathanhtoan">Chưa thanh toán</option>
              <option value="dathanhtoan">Đã thanh toán</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label className="form-label col-md-2">Đang lọc theo:</label>
          <div className="col-md-10 d-flex align-items-center">
            <span className="filter-tag">
              Đơn mua
              <FontAwesomeIcon icon={faTimes} className="ms-1" />
            </span>
            <span className="filter-tag">
              Chưa thanh toán
              <FontAwesomeIcon icon={faTimes} className="ms-1" />
            </span>
          </div>
        </div>
      </div>

      <div className="custom-div">
        <div className="row">
          <div className="col-md-4">
            <h4>Danh sách đơn giao dịch</h4>
          </div>
        </div>

        <div className="row">
          <table className="table custom-table">
            <thead>
              <tr>
                <th scope="col">S/N</th>
                <th scope="col">Mã đơn</th>
                <th scope="col">Khách Hàng</th>
                <th scope="col">Ngày giao dịch</th>
                <th scope="col">Loại đơn</th>
                <th scope="col">Tổng tiền (VNĐ)</th>
                <th scope="col">Tình trạng</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.orderId}</td>
                  <td>{item.customer}</td>
                  <td>{item.transactionDate}</td>
                  <td>
                    <span
                      style={{
                        color: item.orderType === "Đơn bán" ? "red" : "green",
                      }}
                    >
                      {item.orderType}
                    </span>
                  </td>
                  <td>{item.totalAmount}</td>
                  <td>
                    <span
                      style={{
                        color:
                          item.status === "Đã thanh toán" ? "green" : "orange",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        color: "blue",
                      }}
                    >
                      Xem
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DanhSach;
