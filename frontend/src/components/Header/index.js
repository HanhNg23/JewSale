import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  MdMenuOpen,
  MdOutlineMenu,
  MdOutlineEmail,
  MdDarkMode,
  MdOutlineSettings,
  MdExitToApp,
} from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBox from "components/SearchBox";
import JewelryLogo from "./JewelryLogo ";
import logo from "../../assets/profile.jpg";
import { MyContext } from "App";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotificationDrop, setIsOpenNotificationDrop] = useState(false);
  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpenNotificationDrop);
  const context = useContext(MyContext);

  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const handleOpenNotificationsDrop = () => {
    setIsOpenNotificationDrop(true);
  };

  const handleCloseNotificationsDrop = () => {
    setIsOpenNotificationDrop(false);
  };

  return (
    <AppBar position="static" style={styles.appBar}>
      <Toolbar style={styles.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => context.setIsToggleSidebar(!context.isToggleSidebar)}
          style={styles.menuButton}
        >
          {context.isToggleSidebar ? (
            <MdMenuOpen size={28} />
          ) : (
            <MdOutlineMenu size={28} />
          )}
        </IconButton>
        <Link
          to="/"
          className="d-flex align-items-center"
          style={styles.logoLink}
        >
          <JewelryLogo />
          <Typography variant="h6" style={styles.title}>
            Jewelry Management
          </Typography>
        </Link>
        <div style={styles.searchWrapper}>
          <SearchBox />
        </div>
        <div style={styles.iconWrapper}>
          <Tooltip title="Toggle Theme">
            <IconButton
              onClick={() => context.setThemeMode(!context.themeMode)}
            >
              {context.themeMode ? (
                <MdDarkMode size={24} />
              ) : (
                <CiLight size={24} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Cart">
            <IconButton>
              <IoCartOutline size={24} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Messages">
            <IconButton>
              <MdOutlineEmail size={24} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton onClick={handleOpenNotificationsDrop}>
              <FaRegBell size={24} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={isOpenNotificationDrop}
            open={openNotifications}
            onClose={handleCloseNotificationsDrop}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Typography variant="h6" style={styles.menuHeader}>
              Order Notifications (12)
            </Typography>
            <Divider />
            <div style={styles.notificationsContainer}>
              {[...Array(5)].map((_, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseNotificationsDrop}
                  style={styles.menuItem}
                >
                  <div className="d-flex align-items-center">
                    <Avatar src={logo} style={styles.avatar} />
                    <div style={styles.notificationText}>
                      <Typography variant="body1">
                        <strong>Product sold!</strong>
                        Just now
                      </Typography>
                    </div>
                  </div>
                </MenuItem>
              ))}
            </div>
            <Button fullWidth style={styles.viewAllButton}>
              View All Notifications
            </Button>
          </Menu>
          <Tooltip title="Account">
            <IconButton onClick={handleOpenMyAccDrop}>
              <Avatar alt="Admin" src={logo} style={styles.avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={openMyAcc}
            onClose={handleCloseMyAccDrop}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleCloseMyAccDrop}>
              <MdOutlineSettings size={24} /> Settings
            </MenuItem>
            <MenuItem onClick={handleCloseMyAccDrop}>
              <MdExitToApp size={24} /> Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  appBar: {
    backgroundColor: "#ffeb3b", // Primary color
    color: "#333",
    padding: "0 20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButton: {
    marginRight: "20px",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#333",
  },
  title: {
    marginLeft: "10px",
    fontWeight: "bold",
    color: "#ff4081",
  },
  searchWrapper: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
  },
  menuHeader: {
    padding: "10px 15px",
    fontWeight: "bold",
  },
  notificationsContainer: {
    maxHeight: "200px",
    overflowY: "auto",
  },
  menuItem: {
    padding: "10px 15px",
  },
  notificationText: {
    marginLeft: "10px",
  },
  viewAllButton: {
    backgroundColor: "#ff4081",
    color: "#fff",
    padding: "10px 0",
    fontWeight: "bold",
  },
  avatar: {
    marginRight: "10px",
  },
};

export default Header;
