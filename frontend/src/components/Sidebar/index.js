import { Button, Link } from "@mui/material";
import React, { useState } from "react";
import {
  MdDashboard,
  MdSecurity,
  MdPriceChange,
  MdOutlineBuild,
} from "react-icons/md";
import {
  FaAngleRight,
  FaProductHunt,
  FaUser,
  FaGift,
  FaShoppingCart,
  FaChartLine,
} from "react-icons/fa";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
import { MyContext } from "App";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(-1);

  const handleClick = (index) => {
    setActiveTab(activeTab === index ? -1 : index);
  };

  return (
    <div className="sidebar" style={styles.sidebar}>
      <ul style={styles.ul}>
        {menuItems.map((item, index) => (
          <li key={index} style={styles.li}>
            <Button
              className={`w-100 ${activeTab === index ? "active" : ""}`}
              onClick={() => handleClick(index)}
              style={{
                ...styles.button,
                backgroundColor:
                  activeTab === index ? item.activeColor : item.color,
              }}
            >
              <span className="icon" style={styles.icon}>
                {item.icon}
              </span>
              {item.name}
              <span className="arrow" style={styles.arrow}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === index && (
              <div style={styles.submenuWrapper}>
                <ul style={styles.submenu}>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link href={subItem.link} style={styles.submenuLink}>
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="logoutWrapper" style={styles.logoutWrapper}>
        <div className="logoutBox" style={styles.logoutBox}>
          <Button variant="contained" style={styles.logoutButton}>
            <IoMdLogOut />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

const menuItems = [
  {
    name: "Dashboard",
    icon: <MdDashboard />,
    color: "#FFCDD2",
    activeColor: "#E57373",
    subItems: [
      { name: "Overview", link: "/dashboard/overview" },
      { name: "Analytics", link: "/dashboard/analytics" },
    ],
  },
  {
    name: "Account Management",
    icon: <FaUser />,
    color: "#C5E1A5",
    activeColor: "#AED581",
    subItems: [
      { name: "User Accounts", link: "/account-management/users" },
      { name: "User Infomation", link: "/account-management/info" },
    ],
  },
  {
    name: "Product Management",
    icon: <FaProductHunt />,
    color: "#FFCCBC",
    activeColor: "#FF8A65",
    subItems: [
      { name: "Product List", link: "/products" },
      { name: "Product Upload", link: "/product/upload" },
      { name: "Product Details", link: "/product/details" },
    ],
  },
  {
    name: "Authentication",
    icon: <MdSecurity />,
    color: "#FFF59D",
    activeColor: "#FFF176",
    subItems: [
      { name: "Login Settings", link: "/auth-management/login-settings" },
      { name: "Permissions", link: "/auth-management/permissions" },
    ],
  },
  {
    name: "Promotional Codes",
    icon: <FaGift />,
    color: "#CE93D8",
    activeColor: "#BA68C8",
    subItems: [
      { name: "Code List", link: "/promo-management/codes" },
      { name: "Generate Code", link: "/promo-management/generate" },
    ],
  },
  {
    name: "Checkout Management",
    icon: <FaShoppingCart />,
    color: "#81D4FA",
    activeColor: "#4FC3F7",
    subItems: [
      { name: "Active Checkouts", link: "/checkout-management/active" },
      { name: "Completed Checkouts", link: "/checkout-management/completed" },
    ],
  },
  {
    name: "Dashboard Management",
    icon: <FaChartLine />,
    color: "#A5D6A7",
    activeColor: "#66BB6A",
    subItems: [
      { name: "Overview", link: "/dashboard-management/overview" },
      { name: "Settings", link: "/dashboard-management/settings" },
    ],
  },
  {
    name: "Transaction Management",
    icon: <MdPriceChange />,
    color: "#FFAB91",
    activeColor: "#FF7043",
    subItems: [
      { name: "Transactions List", link: "/transaction-management/list" },
      { name: "New Transaction", link: "/transaction-management/new" },
    ],
  },
  {
    name: "Metal Price Management",
    icon: <MdOutlineBuild />,
    color: "#A1887F",
    activeColor: "#8D6E63",
    subItems: [
      { name: "Metal Prices", link: "/metal-management" },
      { name: "Metal List", link: "/metal-list" },
    ],
  },
  {
    name: "Warranty Management",
    icon: <MdDashboard />,
    color: "#E6EE9C",
    activeColor: "#DCE775",
    subItems: [
      { name: "Warranties List", link: "/warranty-list" },
      { name: "Create Warranties", link: "/warranty-create" },
    ],
  },
  {
    name: "Settings",
    icon: <IoIosSettings />,
    color: "#B3E5FC",
    activeColor: "#29B6F6",
    subItems: [
      { name: "General Settings", link: "/settings/general" },
      { name: "System Settings", link: "/settings/system" },
    ],
  },
];

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#FFFFFF",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    overflowY: "auto",
    padding: "20px",
    boxSizing: "border-box",
  },
  ul: {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  },
  li: {
    marginBottom: "10px",
  },
  link: {
    textDecoration: "none",
    width: "100%",
  },
  button: {
    width: "100%",
    textAlign: "left",
    justifyContent: "flex-start",
    padding: "10px 20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    color: "#333",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "background 0.3s, color 0.3s",
  },
  icon: {
    marginRight: "15px",
    fontSize: "20px",
  },
  arrow: {
    marginLeft: "auto",
    fontSize: "18px",
  },
  submenuWrapper: {
    paddingLeft: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundColor: "#F7F7F7",
    borderRadius: "5px",
    marginTop: "5px",
  },
  submenu: {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  },
  submenuLink: {
    display: "block",
    padding: "10px 0",
    textDecoration: "none",
    color: "#666",
    fontSize: "14px",
    transition: "color 0.3s",
  },
  submenuLinkHover: {
    color: "#000",
  },
  logoutWrapper: {
    marginTop: "auto",
    padding: "20px",
  },
  logoutBox: {
    textAlign: "center",
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "#FF7043",
    color: "#FFFFFF",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "16px",
    transition: "background 0.3s, color 0.3s",
  },
};

export default Sidebar;
