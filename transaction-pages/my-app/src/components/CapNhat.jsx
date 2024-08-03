import {
  faChevronDown,
  faMoneyBillAlt,
  faSearch,
  faTicketAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./CapNhat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CapNhat() {
  const data = [
    {
      id: 1,
      image:
        "https://didongviet.vn/dchannel/wp-content/uploads/2022/01/cute-didongviet.jpg",
      jewelryType: "Vòng",
      jewelryId: "45454",
      material: "Vàng 24K",
      price: "2,000,000 VNĐ",
      status: "Còn hàng",
    },
    {
      id: 2,
      image:
        "https://didongviet.vn/dchannel/wp-content/uploads/2022/01/cute-didongviet.jpg",
      jewelryType: "Nhẫn",
      jewelryId: "45455",
      material: "Bạc",
      price: "1,500,000 VNĐ",
      status: "Hết hàng",
    },
    {
      id: 3,
      image:
        "https://didongviet.vn/dchannel/wp-content/uploads/2022/01/cute-didongviet.jpg",
      jewelryType: "Dây chuyền",
      jewelryId: "45456",
      material: "Bạc",
      price: "3,500,000 VNĐ",
      status: "Còn hàng",
    },
    {
      id: 4,
      image:
        "https://didongviet.vn/dchannel/wp-content/uploads/2022/01/cute-didongviet.jpg",
      jewelryType: "Bông tai",
      jewelryId: "45457",
      material: "Vàng 18K",
      price: "1,800,000 VNĐ",
      status: "Còn hàng",
    },
  ];

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
  ];

  return (
    <>
      <div className="custom-div">
        <div className="row">
          <h4>Cập nhật đơn hàng</h4>
        </div>

        <div className="row mb-3 mt-3 me-2">
          <h5 className="col-md-2">Mã đơn | 01</h5>
          <button className="btn btn-borderless col-md-2">
            Chưa thanh toán
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
          <div className="col-md-5"></div>

          <div className="col-md-4">
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Họ tên hoặc số điện thoại"
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
            <p className="brown-paragraph">
              Không tìm thấy khách hàng khớp với thông tin trên.
            </p>
          </div>
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
          <div className="col-md-1"></div>
          <div className="col-md-3">
            <p className="note-paragraph">
              Note: Search with dropdown -- select one -- auto fit to customer
              info
            </p>
          </div>
        </div>
      </div>

      {/* tim thong tin */}
      <div className="custom-div">
        <div className="row">
          <div className="col-md-4">
            <h4>
              <FontAwesomeIcon icon={faSearch} className="me-2" size="1x" />
              Tìm kiếm thông tin sản phẩm bán ra
            </h4>
            <p className="small">
              Nhập các trường sau để tìm kiếm thông tin sản phẩm
            </p>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-2">
            <h5>
              <FontAwesomeIcon
                icon={faChevronDown}
                size="1.5x"
                className="me-2"
              />{" "}
              Thu gọn
            </h5>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-3">
            <p>Mã ID sản phẩm</p>
            <div className="search-bar">
              <input type="text" className="search-input" placeholder="00001" />
            </div>
          </div>

          <div className="col-md-1"></div>
          <div className="col-md-3">
            <p>Tên sản phẩm</p>
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="035678543"
                value={"Tên sản phẩm"}
              />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-2 rounded">
            <select className="form-select form-select-md">
              <option defaultValue>Loại trang sức</option>
              <option value="1">Danh mục 1</option>
              <option value="2">Danh mục 2</option>
              <option value="3">Danh mục 3</option>
              <option value="4">Danh mục 4</option>
            </select>
          </div>{" "}
          <div className="col-md-1"></div>
          <div className="col-md-2 rounded">
            <select className="form-select form-select-md">
              <option defaultValue>Nhóm kim loại</option>
              <option value="1">Danh mục 1</option>
              <option value="2">Danh mục 2</option>
              <option value="3">Danh mục 3</option>
              <option value="4">Danh mục 4</option>
            </select>
          </div>{" "}
          <div className="col-md-1"></div>
          <div className="col-md-2 rounded">
            <select className="form-select form-select-md">
              <option defaultValue>Chất liệu chính</option>
              <option value="1">Danh mục 1</option>
              <option value="2">Danh mục 2</option>
              <option value="3">Danh mục 3</option>
              <option value="4">Danh mục 4</option>
            </select>
          </div>{" "}
          <div className="col-md-1"></div>
          <div className="col-md-2 rounded">
            <select className="form-select form-select-md">
              <option defaultValue>Loại đá quý</option>
              <option value="1">Danh mục 1</option>
              <option value="2">Danh mục 2</option>
              <option value="3">Danh mục 3</option>
              <option value="4">Danh mục 4</option>
            </select>
          </div>{" "}
        </div>

        <div className="row mt-3">
          <button className="col-md-2  mx-2 custom-button orange">
            Tìm sản phẩm
          </button>
          <button className="col-md-1  custom-button">Refresh</button>
        </div>

        <div className="row">
          <p className="brown-paragraph">
            Không tìm thấy khách hàng khớp với thông tin trên.
          </p>
        </div>

        <div className="row">
          <table className="table custom-table">
            <thead>
              <tr>
                <th scope="col">S/N</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Trang sức</th>
                <th scope="col">Mã ID</th>
                <th scope="col">Loại trang sức</th>
                <th scope="col">Chất liệu chính</th>
                <th scope="col">Giá bán</th>
                <th scope="col">Tình trạng</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img
                      src={item.image}
                      alt="Jewelry"
                      style={{
                        width: "50px",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                  </td>
                  <td>{item.jewelryType}</td>
                  <td>{item.jewelryId}</td>
                  <td>{item.jewelryType}</td>
                  <td>{item.material}</td>
                  <td>{item.price}</td>
                  <td>
                    <span
                      style={{
                        color: item.status === "Còn hàng" ? "green" : "brown",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        color: "green",
                      }}
                    >
                      Chọn mua
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* danh sanh */}
      <div className="custom-div">
        <div className="row">
          <h4>Danh sách sản phẩm bán ra</h4>
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
                <th scope="col"></th>
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
                  <td>{item.discountPercentage}</td>
                  <td>{item.totalPriceAfterDiscount.toLocaleString()}</td>
                  <td>{item.totalPrice.toLocaleString()}</td>
                  <td>X</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="custom-div" id="tongtien">
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
          </div>
        </div>
        <br />
        <div className="d-flex float-right">
          <button className="btn btn-primary me-2">Cập nhật đơn </button>
          <button className="btn btn-danger">Hủy đơn hàng</button>
        </div>
      </div>
    </>
  );
}
export default CapNhat;
