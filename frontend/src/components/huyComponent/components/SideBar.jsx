import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBox,
  faExchangeAlt,
  faList,
  faFileAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SideBar.css";

const SideBar = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="sidebar d-flex flex-column p-3 bg-light">
      <div className="text-center mb-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrD1zWJGu3vuv5UH6He1vZp67xwgNmIQTw6A&s"
          alt="Logo"
          width="90"
          height="70"
          className="mb-2"
        />
        <div
          className="company-name"
          style={{ marginBottom: "50px", fontSize: "14px", color: "#0056b3" }}
        >
          Your Company
        </div>
      </div>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a
            href="#"
            className={`nav-link ${
              activeLink === "dashboard" ? "active" : "link-dark"
            }`}
            onClick={() => handleLinkClick("dashboard")}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className={`nav-link ${
              activeLink === "stocks" ? "active" : "link-dark"
            }`}
            onClick={() => handleLinkClick("stocks")}
          >
            <FontAwesomeIcon icon={faBox} className="me-2" />
            Stocks and Inventory
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className={`nav-link ${
              activeLink === "transactions" ? "active" : "link-dark"
            }`}
            onClick={() => handleLinkClick("transactions")}
            data-bs-toggle="collapse"
            data-bs-target="#transactionSubMenu"
            aria-expanded={activeLink === "transactions" ? "true" : "false"}
            aria-controls="transactionSubMenu"
          >
            <FontAwesomeIcon icon={faExchangeAlt} className="me-2" />
            Giao dịch mua bán
          </a>
          <div
            className={`collapse ${
              activeLink === "transactions" ? "show" : ""
            }`}
            id="transactionSubMenu"
          >
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a
                  href="#"
                  className={`nav-link ${
                    activeLink === "list-transactions" ? "active" : "link-dark"
                  }`}
                  onClick={() => handleLinkClick("list-transactions")}
                >
                  <FontAwesomeIcon icon={faList} className="me-2" />
                  Danh sách đơn giao dịch
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`nav-link ${
                    activeLink === "create-transaction" ? "active" : "link-dark"
                  }`}
                  onClick={() => handleLinkClick("create-transaction")}
                >
                  <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                  Lập đơn giao dịch
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`nav-link ${
                    activeLink === "create-sale" ? "active" : "link-dark"
                  }`}
                  onClick={() => handleLinkClick("create-sale")}
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                  Lập đơn mua bán
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
