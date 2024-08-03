import React, { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

import { useAuthStore } from "stores";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AccountEntity from "api/v1/src/model/AccountEntity";
const drawerWidth = 260;
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AdminLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openSubmenu1, setOpenSubMenu1] = React.useState(true);
  const [openSubmenu2, setOpenSubMenu2] = React.useState(true);

  const user = useAuthStore((state) => state.user);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (item) => {
    console.log(item);
    if (item === "Logout") {
      await axios.post("http://localhost:8080/api/v1/auth/logout", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      logoutUser();
    }
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [location]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {location.pathname === "/dashboard" && "Dashboard"}
            {location.pathname === "/metal-price-monitor" && "Dashboard"}
            {location.pathname === "/metal-prices-details" && "Dashboard"}
            {location.pathname === "/products" && "Danh mục sản phẩm"}
            {location.pathname === "/accounts" && "Danh sách tài khoản"}
          </Typography>
          <div>
            {user.userName}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleClose(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {user.role === AccountEntity.RoleEnum.ADMIN && (
            <>
              <ListItem key={"1"} disablePadding>
                <ListItemButton
                  onClick={() => navigate("dashboard")}
                  selected={lastSegment === "dashboard"}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"2"} disablePadding>
                <ListItemButton
                  onClick={() => navigate("products")}
                  selected={lastSegment === "products"}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Sản phẩm"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"3"} disablePadding>
                <ListItemButton
                  onClick={() => navigate("accounts")}
                  selected={lastSegment === "accounts"}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Tài khoản"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"4"} disablePadding>
                <ListItemButton
                  onClick={() => setOpenSubMenu1(!openSubmenu1)}
                  // onClick={() => navigate("order")}
                  // selected={lastSegment === "order"}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Hóa đơn"} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubmenu1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("order")}
                    selected={lastSegment === "order"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Danh sách hóa đơn" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("create-order")}
                    selected={lastSegment === "create-order"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lập đơn bán hàng" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lập đơn mua hàng" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItem key={"5"} disablePadding>
                <ListItemButton
                  onClick={() => setOpenSubMenu2(!openSubmenu2)}
                  // onClick={() => navigate("order")}
                  // selected={lastSegment === "order"}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Bảo hành sản phẩm"} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubmenu2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("warranty-types")}
                    selected={lastSegment === "warranty-types"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Thông tin loại bảo hành" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("warranty-products")}
                    selected={lastSegment === "warranty-products"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bảo hành sản phẩm" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("warranty-repair")}
                    selected={lastSegment === "warranty-repair"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lập phiếu sửa chữa" />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItem key={"7"} disablePadding>
                <ListItemButton
                  onClick={() => navigate("meterials")}
                  selected={lastSegment === "meterials"}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Vật liệu"} />
                </ListItemButton>
              </ListItem>
            </>
          )}
          {user.role === AccountEntity.RoleEnum.MANAGER && (
            <>
              <ListItem key={"2"} disablePadding>
                <ListItemButton
                  onClick={() => navigate("products")}
                  selected={lastSegment === "products"}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Sản phẩm"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={"4"} disablePadding>
                <ListItemButton
                  onClick={() => setOpenSubMenu1(!openSubmenu1)}
                  // onClick={() => navigate("order")}
                  // selected={lastSegment === "order"}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Hóa đơn"} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubmenu1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("order")}
                    selected={lastSegment === "order"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Danh sách hóa đơn" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("create-order")}
                    selected={lastSegment === "create-order"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lập đơn bán hàng" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("create-buy-order")}
                    selected={lastSegment === "create-buy-order"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lập đơn mua hàng" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItem key={"5"} disablePadding>
                <ListItemButton
                  onClick={() => setOpenSubMenu2(!openSubmenu2)}
                  // onClick={() => navigate("order")}
                  // selected={lastSegment === "order"}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Bảo hành sản phẩm"} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubmenu2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("warranty-types")}
                    selected={lastSegment === "warranty-types"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Thông tin loại bảo hành" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("warranty-products")}
                    selected={lastSegment === "warranty-products"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bảo hành sản phẩm" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("warranty-repair")}
                    selected={lastSegment === "warranty-repair"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lập phiếu sửa chữa" />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItem key={"7"} disablePadding>
                <ListItemButton
                  onClick={() => navigate("meterials")}
                  selected={lastSegment === "meterials"}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Vật liệu"} />
                </ListItemButton>
              </ListItem>
            </>
          )}
          {user.role === AccountEntity.RoleEnum.STAFF && (
            <>
              <ListItem key={"4"} disablePadding>
                <ListItemButton
                  onClick={() => setOpenSubMenu1(!openSubmenu1)}
                  // onClick={() => navigate("order")}
                  // selected={lastSegment === "order"}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Hóa đơn"} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubmenu1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("order")}
                    selected={lastSegment === "order"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Danh sách hóa đơn" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("create-order")}
                    selected={lastSegment === "create-order"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lập đơn bán hàng" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("create-buy-order")}
                    selected={lastSegment === "create-buy-order"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lập đơn mua hàng" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItem key={"5"} disablePadding>
                <ListItemButton
                  onClick={() => setOpenSubMenu2(!openSubmenu2)}
                  // onClick={() => navigate("order")}
                  // selected={lastSegment === "order"}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Bảo hành sản phẩm"} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubmenu2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("warranty-types")}
                    selected={lastSegment === "warranty-types"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Thông tin loại bảo hành" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("warranty-products")}
                    selected={lastSegment === "warranty-products"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bảo hành sản phẩm" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate("warranty-repair")}
                    selected={lastSegment === "warranty-repair"}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lập phiếu sửa chữa" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          )}
        </List>
      </Drawer>
      <Main open={open} style={{ padding: 0 }}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
