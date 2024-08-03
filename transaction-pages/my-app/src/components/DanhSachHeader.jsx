import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faList,
  faBell,
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const DanhSachHeader = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <div>
            <div className="d-flex align-items-center mb-2">
              <FontAwesomeIcon icon={faList} className="me-2" />
              <h4 className="mb-0">Danh sách đơn giao dịch</h4>
            </div>

            <p className="mb-0 text-muted">
              Theo dõi các đơn giao dịch mua bán
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center ms-4">
          <FontAwesomeIcon
            icon={faBell}
            className="me-2"
            size="1.3x"
            id="iconNe"
          />
          <img
            src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
            alt="Avatar"
            width="40"
            height="40"
            className="rounded-circle"
          />
          <div className="d-flex flex-column text-end">
            <span className="fw-bold">Otor John</span>

            <span className="text-muted">Nhân viên</span>
          </div>

          <FontAwesomeIcon icon={faChevronDown} className="ms-1" />
        </div>
      </div>
    </>
  );
};

export default DanhSachHeader;
