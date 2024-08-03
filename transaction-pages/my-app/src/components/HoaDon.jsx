import {
  faChevronDown,
  faMoneyBillAlt,
  faSearch,
  faUser,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./HoaDon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HoaDon() {
  const data2 = [
    {
      id: 1,
      productName: "Đồng hồ Casio",
      unit: "Cái",
      quantity: 2,
      unitPrice: 500000,
      discountPercentage: 10,
      totalPriceAfterDiscount: 450000,
      totalPrice: 900000,
    },
    {
      id: 2,
      productName: "Tai nghe Bluetooth",
      unit: "Cái",
      quantity: 1,
      unitPrice: 800000,
      discountPercentage: 5,
      totalPriceAfterDiscount: 760000,
      totalPrice: 800000,
    },
    {
      id: 3,
      productName: "Balo laptop",
      unit: "Cái",
      quantity: 3,
      unitPrice: 300000,
      discountPercentage: 0,
      totalPriceAfterDiscount: 300000,
      totalPrice: 900000,
    },
    {
      id: 4,
      productName: "Bút bi Thiên Long",
      unit: "Chiếc",
      quantity: 10,
      unitPrice: 5000,
      discountPercentage: 15,
      totalPriceAfterDiscount: 4250,
      totalPrice: 50000,
    },
    {
      id: 5,
      productName: "Laptop Dell",
      unit: "Cái",
      quantity: 1,
      unitPrice: 15000000,
      discountPercentage: 7,
      totalPriceAfterDiscount: 13950000,
      totalPrice: 15000000,
    },
    {
      id: 6,
      productName: "Máy ảnh Canon",
      unit: "Cái",
      quantity: 1,
      unitPrice: 12000000,
      discountPercentage: 12,
      totalPriceAfterDiscount: 10560000,
      totalPrice: 12000000,
    },
    {
      id: 7,
      productName: "Điện thoại Samsung",
      unit: "Cái",
      quantity: 2,
      unitPrice: 7000000,
      discountPercentage: 10,
      totalPriceAfterDiscount: 6300000,
      totalPrice: 14000000,
    },
    {
      id: 8,
      productName: "Ổ cứng SSD",
      unit: "Cái",
      quantity: 5,
      unitPrice: 2000000,
      discountPercentage: 20,
      totalPriceAfterDiscount: 1600000,
      totalPrice: 10000000,
    },
    {
      id: 9,
      productName: "Chuột Logitech",
      unit: "Cái",
      quantity: 4,
      unitPrice: 300000,
      discountPercentage: 5,
      totalPriceAfterDiscount: 285000,
      totalPrice: 1200000,
    },
    {
      id: 10,
      productName: "Bàn phím cơ",
      unit: "Cái",
      quantity: 3,
      unitPrice: 800000,
      discountPercentage: 10,
      totalPriceAfterDiscount: 720000,
      totalPrice: 2400000,
    },
  ];

  return (
    <>
      <div className="custom-div">
        <div className="row">
          <h4>Thanh toán đơn hàng</h4>
        </div>

        <div className="row mb-3 mt-3 me-2">
          <h5 className="col-md-2">Mã đơn | 01</h5>
          <button className="btn btn-borderless col-md-2">
            Chưa thanh toán
          </button>
          <div className="col-md-2"></div>
          <button className="btn btn-custom-yellow col-md-3 me-3">
            Chỉnh sửa đơn mua hàng
          </button>
          <button className="btn btn-primary col-md-2 text-white">
            In hóa đơn
          </button>
        </div>
      </div>

      {/* Thong tin khach */}

      <div className="custom-div">
        <div className="row">
          <h4 className="col-md-3">
            {" "}
            <FontAwesomeIcon icon={faUser} className="me-3" size="1x" />
            Thông tin khách hàng
          </h4>
        </div>

        <div className="row">
          <div className="col-md-3">
            <p>Họ tên khách hàng</p>
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Nguyễn Văn A"
              />
            </div>
          </div>

          <div className="col-md-1"></div>
          <div className="col-md-3">
            <p>Số điện thoại</p>
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="035678543"
              />
            </div>
          </div>
        </div>
      </div>

      {/* danh sanh */}
      <div className="custom-div">
        <div className="row">
          <h4>Danh sách sản phẩm chọn mua</h4>
        </div>
        <div className="row">
          <table className="table">
            <thead className="">
              <tr>
                <th scope="col">S/N</th>
                <th scope="col">Sản phẩm</th>
                <th scope="col">Đơn vị tính</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Đơn giá (VNĐ)</th>
                <th scope="col">Phần trăm giảm (%)</th>
                <th scope="col">Đơn giá sau giảm (VNĐ)</th>
                <th scope="col">Thành tiền (VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              {data2.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{item.unit}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice.toLocaleString()}</td>
                  <td className="text-green">{item.discountPercentage}</td>
                  <td>{item.totalPriceAfterDiscount.toLocaleString()}</td>
                  <td>{item.totalPrice.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="custom-div">
        <div className="row">
          <h4>
            <FontAwesomeIcon icon={faMoneyBillAlt} className="me-2" />
            Tổng tiền thanh toán
          </h4>
        </div>
        <div className="row mt-3">
          <div className="col-md-8">
            <p>
              Tổng tiền hàng:
              <strong className="float-right">1.444.000.000đ</strong>
            </p>

            <hr />
            <p>
              Tổng giảm giá trên sản phẩm:{" "}
              <strong className="float-right text-orange">-80.000.000đ</strong>
            </p>
            <hr />
            <h5>Voucher khuyến mãi</h5>
            <button className="btn btn-voucher">
              <FontAwesomeIcon icon={faTicketAlt} className="me-2" />
              SAVEMORE(-10%)
            </button>
            <strong className="float-right text-orange">-136.000.000đ</strong>
            <br />
            <button className="btn btn-voucher">
              <FontAwesomeIcon icon={faTicketAlt} className="me-2" />
              SAVEMORE(-10%)
            </button>
            <strong className="float-right text-orange">-210.000.000đ</strong>
            <hr />
            <h5>
              Số tiền cần thanh toán:{" "}
              <strong className="float-right">1.101.600.000đ</strong>
            </h5>
          </div>
          <div className="col-md-4">
            <h5>Phương thức thanh toán</h5>
            <br />
            <h4>Chuyển khoản ngân hàng</h4>
            <br />
            <div className="d-flex align-items-center mb-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                alt="Ví VNPAY"
                width="50"
                height="50"
                className="me-2 rounded"
              />
              <span>Ví VNPAY</span>
            </div>
            <div className="d-flex">
              <button className="btn btn-primary me-2">
                Tạo mã thanh toán
              </button>
              <button className="btn btn-orange">Kiểm tra đã thanh toán</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HoaDon;
