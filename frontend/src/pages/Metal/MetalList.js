import React, { useState, useEffect } from "react";
import { FileAddOutlined } from "@ant-design/icons";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { makeStyles, styled } from "@material-ui/core/styles";
import axios from "axios";
import api from "api";
import useFetch from "../../hooks/useFetch";
// Define styles
const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(4),
    textAlign: "start",
  },
  tableRow: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
      cursor: "pointer",
    },
  },
  table: {
    minWidth: 650,
    borderRadius: theme.shape.borderRadius,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.light,
    "& th": {
      color: theme.palette.common.white,
      fontWeight: "bold",
    },
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  searchField: {
    marginRight: theme.spacing(2),
  },
  button: {
    fontWeight: "bold",
    borderRadius: theme.shape.borderRadius,
  },
  marketPricesContainer: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
  },
  metalPriceSpot: {
    color: theme.palette.warning.main,
    fontWeight: "bold",
  },
  marketPricesGrid: {
    marginBottom: theme.spacing(3),
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: theme.spacing(3),
  },
  dialogActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  detailSection: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    margin: theme.spacing(3, 0),
  },
  detailTitle: {
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  spotPrice: {
    fontWeight: "bold",
    color: theme.palette.primary,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    backgroundColor: "#E0C2FF",
  },
  formControl: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[2],
      background: theme.palette.background.paper,
      transition: "0.3s",
      "&:hover": {
        background: theme.palette.background.default,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
    "& .MuiInputLabel-outlined": {
      color: theme.palette.text.primary,
    },
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[2],
      background: theme.palette.background.paper,
      transition: "0.3s",
      "&:hover": {
        background: theme.palette.background.default,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
    "& .MuiInputLabel-outlined": {
      color: theme.palette.text.primary,
    },
  },
  switch: {
    "& .MuiSwitch-track": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  tableCell: {
    padding: theme.spacing(1, 2),
    textAlign: "center",
  },
  actionButton: {
    margin: theme.spacing(0.5),
    "&.MuiButton-root": {
      transition: "0.3s",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
  },
}));

const MetalList = () => {
  const classes = useStyles();
  const [metals, setMetals] = useState([]);
  const [metalType, setMetalType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [metalGroups, setMetalGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [newMetal, setNewMetal] = useState({
    metalTypeName: "",
    metalPurity: 0,
    metalGroupName: "",
    isAutoUpdatePrice: false,
    isOnMonitor: false,
    profitSell: 0,
    profitBuy: 0,
    metalPriceSpot: 0,
  });
  const [metalData, setMetalData] = useState({
    metalGroupName: "",
    isAutoUpdatePrice: false,
    isOnMonitor: false,
    profitSell: 0,
    profitBuy: 0,
    metalPriceSpot: 0,
  });
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [marketData, setMarketData] = useState([]);
  useEffect(() => {
    axios
      .get("http://157.230.33.37:8080/metals/all")
      .then((response) => {
        console.log(response);
        setMarketData(response);
      })
      .catch((error) => {
        console.error("Error fetching market data:", error);
      });
  }, []);
  useEffect(
    () => {
      fetchMetals();
      if (metalType === "gold" || metalType === "silver") {
        fetchMetalData(metalType);
      }
      fetchMetalGroups();
      calculatePrices();
    },
    [],
    [metalType],
    [metalData.spotPrice, metalData.sellProfitRate, metalData.buyProfitRate]
  );

  const fetchMetalData = async () => {
    try {
      const response = await axios.get("http://157.230.33.37:8080/metals/all"); // Replace with your actual API endpoint
      setMetalData(response);
    } catch (error) {
      console.error("Error fetching metal data:", error);
    }
  };
  const calculatePrices = () => {
    if (!metalData.spotPrice) return;

    const spotPrice = parseFloat(metalData.spotPrice);
    const sellProfitRate = parseFloat(metalData.sellProfitRate);
    const buyProfitRate = parseFloat(metalData.buyProfitRate);

    if (sellProfitRate) {
      const sellPrice = spotPrice * (1 + sellProfitRate);
      setMetalData((prevData) => ({
        ...prevData,
        sellPrice: sellPrice.toFixed(2),
      }));
    }
    const handleCreateMetal = () => {
      setOpenCreateDialog(true);
    };
    if (buyProfitRate && metalData.sellPrice) {
      const sellPrice = parseFloat(metalData.sellPrice);
      const buyPrice = sellPrice / (1 + buyProfitRate);
      setMetalData((prevData) => ({
        ...prevData,
        buyPrice: buyPrice.toFixed(2),
      }));
    }
  };
  const fetchMetals = async () => {
    try {
      const response = await axios.get("http://157.230.33.37:8080/metals/all");
      setMetals(response);
    } catch (error) {
      console.error("Error fetching metals:", error);
    }
  };

  const fetchMetalGroups = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/products/filter-options"
      );
      console.log(response);
      setMetalGroups(response.metalGroup);
    } catch (error) {
      console.error("Error fetching metal groups:", error);
    }
  };
  console.log(metalGroups);
  const handleCreateMetal = () => {
    setOpenCreateDialog(true);
  };
  const handleSaveMetal = async () => {
    try {
      console.log(newMetal);
      let convertedData = {
        metalType: {
          metalTypeName: newMetal.metalTypeName,
          metalPurity: parseFloat(newMetal.metalPurity),
          metalGroupName: newMetal.metalGroupName,
          isAutoUpdatePrice: newMetal.isAutoUpdatePrice,
          isOnMonitor: newMetal.isOnMonitor,
        },
        metalPrice: {
          profitSell: parseFloat(newMetal.profitSell),
          profitBuy: parseFloat(newMetal.profitBuy),
          metalPriceSpot: parseFloat(newMetal.metalPriceSpot),
        },
      };
      await axios.post("http://157.230.33.37:8080/metals/metal", convertedData); // Replace with your actual API endpoint
      fetchMetalData();
      setOpenCreateDialog(false);
    } catch (error) {
      console.error("Error creating metal:", error);
    }
  };
  const handleUpdateMetal = async (metal) => {
    try {
      await axios.put(
        `http://157.230.33.37:8080/metals/${metal.metalTypeId}`,
        metalData
      ); // Replace with your actual API endpoint
      fetchMetalData();
    } catch (error) {
      console.error("Error updating metal data:", error);
    }
  };

  const handleDeleteMetal = async (metal) => {
    try {
      const response = await axios.delete(
        `http://157.230.33.37:8080/metals/${metal.metalTypeId}`
      ); // Replace with your actual API endpoint
      fetchMetalData(response.data);
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting metal:", error);
    }
  };
  const handleAutoUpdateToggle = (event) => {
    setAutoUpdate(event.target.checked);
    if (
      event.target.checked &&
      (metalType === "gold" || metalType === "silver")
    ) {
      setMetalData((prevData) => ({
        ...prevData,
        spotPrice: (
          (marketData.priceUSD * marketData.exchangeRate) /
          31.1035
        ).toFixed(2), // Convert to VND/gram
      }));
    }
  };
  const handleFieldChange = (field, value) => {
    setNewMetal((prevData) => ({
      ...prevData,
      [`${field}`]: value,
    }));
  };
  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleToggleDisplay = async (metal) => {
    try {
      await axios.put(`http://157.230.33.37:8080/metals/${metal.metalTypeId}`, {
        ...metal,
        isOnMonitor: !metal.isOnMonitor,
      });
      fetchMetals();
    } catch (error) {
      console.error("Error updating display status:", error);
    }
  };

  const handleEdit = (metal) => {
    setSelectedMetal(metal);
    setOpen(true);
  };

  const handleDelete = async (metal) => {
    console.log(metal);
    try {
      await axios.delete(
        `http://157.230.33.37:8080/metals/${metal.metalTypeId}`
      );
      fetchMetals();
    } catch (error) {
      console.error("Error deleting metal:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMetal(null);
  };

  const handleSave = async (metal) => {
    try {
      if (selectedMetal) {
        await axios.put(
          `http://157.230.33.37:8080/metals/${metal.metalTypeId}`,
          selectedMetal
        );
      } else {
        await axios.post("http://157.230.33.37:8080/metals/metal", newMetal);
        setNewMetal({
          name: "",
          purity: "",
          buyPrice: "",
          sellPrice: "",
          group: "",
          isOnMonitor: false,
        });
      }
      fetchMetals();
      handleClose();
    } catch (error) {
      console.error("Error saving metal:", error);
    }
  };

  const filteredMetals = metals?.filter((metal) => {
    const matchesKeyword = (metal.name || "").includes(searchKeyword);
    const matchesGroup = selectedGroup ? metal.group === selectedGroup : true;
    return matchesKeyword && matchesGroup;
  });

  return (
    <Container sx={{ marginTop: "3em" }}>
      <div className={classes.header}>
        <Typography variant="h3">Quản lí giá kim loại</Typography>
        <Typography variant="subtitle1">
          Xem và cập nhật tỉ giá kim loại
        </Typography>
      </div>

      <div className={classes.tableHeader}>
        <Typography variant="h6">Danh sách kim loại</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateMetal}
          className={classes.button}
        >
          <FileAddOutlined />
          Thêm mới kim loại
        </Button>
      </div>

      <Grid container spacing={2} alignItems="center">
        <Grid item md={6} className={classes.gridItem}>
          <TextField
            label="Tìm kiếm"
            variant="outlined"
            size="small"
            placeholder="Từ khóa cần tìm"
            value={searchKeyword}
            onChange={handleSearchChange}
            className={classes.searchField}
          />
        </Grid>
        <Grid item md={6} className={classes.gridItem}>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
          >
            <InputLabel>Nhóm Kim loại</InputLabel>
            <Select
              value={selectedGroup}
              onChange={handleGroupChange}
              label="Nhóm Kim loại"
            >
              {metalGroups?.map((group, index) => (
                <MenuItem key={index} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <Table component={Paper} className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên kim loại</TableCell>
              <TableCell>Hàm lượng %</TableCell>
              <TableCell>Giá mua (VNĐ/gam)</TableCell>
              <TableCell>Giá bán (VNĐ/gam)</TableCell>
              <TableCell>Ngày cập nhật</TableCell>
              <TableCell>Hiện trên TV</TableCell>
              <TableCell>Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMetals?.map((metal, index) => (
              <TableRow key={metal.id} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>{index + 1}</TableCell>
                <TableCell className={classes.tableCell}>
                  {metal.metalTypeName}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {metal.metalPurity}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {metal.currentMetalPriceRate?.buyingPrice}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {metal?.currentMetalPriceRate?.sellingPrice}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {new Date(
                    metal.currentMetalPriceRate?.effectiveDate
                  ).toLocaleDateString()}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Switch
                    checked={metal.isOnMonitor}
                    onChange={() => handleToggleDisplay(metal)}
                    color="primary"
                    className={classes.switch}
                  />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Button
                    onClick={() => handleEdit(metal)}
                    color="primary"
                    variant="contained"
                    size="small"
                    className={classes.actionButton}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(metal)}
                    color="secondary"
                    variant="contained"
                    size="small"
                    className={classes.actionButton}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      >
        <DialogTitle>Add New Metal</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Tên kim loại"
            value={newMetal.metalTypeName}
            onChange={(e) => handleFieldChange("metalTypeName", e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Hàm lượng %"
            value={newMetal.metalPurity}
            onChange={(e) => handleFieldChange("metalPurity", e.target.value)}
            variant="outlined"
          />
          <FormControl variant="outlined">
            <InputLabel>Nhóm kim loại</InputLabel>
            <Select
              value={newMetal.metalGroupName}
              onChange={(e) =>
                handleFieldChange("metalGroupName", e.target.value)
              }
              label="metalGroupName"
            >
              {metalGroups?.map((group, index) => (
                <MenuItem key={index} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Giá Spot"
            value={newMetal.metalPriceSpot}
            onChange={(e) =>
              handleFieldChange("metalPriceSpot", e.target.value)
            }
            variant="outlined"
          />
          <TextField
            label="Giá bán"
            value={newMetal.profitSell}
            onChange={(e) => handleFieldChange("profitSell", e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Giá mua"
            value={newMetal.profitBuy}
            onChange={(e) => handleFieldChange("profitBuy", e.target.value)}
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Switch
                checked={newMetal.isOnMonitor}
                onChange={(e) =>
                  handleFieldChange("isOnMonitor", e.target.checked)
                }
              />
            }
            label="On Monitor"
          />
          <FormControlLabel
            control={
              <Switch
                checked={newMetal.isAutoUpdatePrice}
                onChange={(e) =>
                  handleFieldChange("isAutoUpdatePrice", e.target.checked)
                }
              />
            }
            label="Auto Update"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveMetal} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Metal</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {selectedMetal && (
            <>
              <TextField
                label="Tên kim loại"
                value={selectedMetal.metalTypeName}
                onChange={(e) =>
                  setSelectedMetal({
                    ...selectedMetal,
                    metalTypeName: e.target.value,
                  })
                }
                variant="outlined"
              />
              <TextField
                label="Hàm lượng %"
                value={selectedMetal.metalPurity}
                onChange={(e) =>
                  setSelectedMetal({
                    ...selectedMetal,
                    metalPurity: e.target.value,
                  })
                }
                variant="outlined"
              />
              <FormControl variant="outlined">
                <InputLabel>Nhóm kim loại</InputLabel>
                <Select
                  value={selectedMetal.metalGroupName}
                  onChange={(e) =>
                    setSelectedMetal({
                      ...selectedMetal,
                      metalGroupName: e.target.value,
                    })
                  }
                  label="Nhóm kim loại"
                >
                  {metalGroups?.map((group) => (
                    <MenuItem
                      key={group.metalTypeId}
                      value={group.metalTypeName}
                    >
                      {group.metalTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Giá Spot"
                value={
                  selectedMetal?.currentMetalPriceRate?.metalPriceSpot || ""
                }
                onChange={(e) => {
                  const updatedMetalPriceSpot = e.target.value;

                  setSelectedMetal((prevState) => ({
                    ...prevState,
                    currentMetalPriceRate: {
                      ...prevState.currentMetalPriceRate,
                      metalPriceSpot: updatedMetalPriceSpot,
                    },
                  }));
                }}
                variant="outlined"
              />
              <TextField
                label="Tỉ lệ gia tăng giá bán"
                value={selectedMetal?.currentMetalPriceRate?.profitSell || ""}
                onChange={(e) => {
                  const updatedMetalPriceSpot = e.target.value;

                  setSelectedMetal((prevState) => ({
                    ...prevState,
                    currentMetalPriceRate: {
                      ...prevState.currentMetalPriceRate,
                      profitSell: updatedMetalPriceSpot,
                    },
                  }));
                }}
                variant="outlined"
              />
              <TextField
                label="Tỉ lệ gia tăng giá mua"
                value={selectedMetal?.currentMetalPriceRate?.profitBuy || ""}
                onChange={(e) => {
                  const updatedMetalPriceSpot = e.target.value;

                  setSelectedMetal((prevState) => ({
                    ...prevState,
                    currentMetalPriceRate: {
                      ...prevState.currentMetalPriceRate,
                      profitBuy: updatedMetalPriceSpot,
                    },
                  }));
                }}
                variant="outlined"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedMetal.isOnMonitor}
                    onChange={(e) =>
                      setSelectedMetal({
                        ...selectedMetal,
                        isOnMonitor: e.target.checked,
                      })
                    }
                  />
                }
                label="On Monitor"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateMetal}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Metal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this metal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteMetal}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Box className={classes.detailSection}>
        <Typography variant="h6" className={classes.detailTitle}>
          Thông tin kim loại
        </Typography>
        <div className={classes.detailRow}>
          <Typography variant="body1">Tên kim loại:</Typography>
          <Typography variant="body1">{metalData.metalTypeName}</Typography>
        </div>
        <div className={classes.detailRow}>
          <Typography variant="body1">Hàm lượng (%):</Typography>
          <Typography variant="body1">{metalData.metalPurity}</Typography>
        </div>
        <div className={classes.detailRow}>
          <Typography variant="body1">Nhóm kim loại:</Typography>
          <Typography variant="body1">{metalData.metalGroupName}</Typography>
        </div>
        <div className={classes.detailRow}>
          <Typography variant="body1">Giá bán ra:</Typography>
          <Typography variant="body1">
            {metalData?.currentMetalPriceRate?.sellingPrice}
          </Typography>
        </div>
        <div className={classes.detailRow}>
          <Typography variant="body1">Giá mua vào:</Typography>
          <Typography variant="body1">
            {metalData.currentMetalPriceRate?.buyingPrice}
          </Typography>
        </div>
        <div className={classes.detailRow}>
          <Typography variant="body1">Tỉ lệ lợi nhuận bán (%):</Typography>
          <Typography variant="body1">
            {metalData.currentMetalPriceRate?.sellingProfitRate}
          </Typography>
        </div>
        <div className={classes.detailRow}>
          <Typography variant="body1">Tỉ lệ lợi nhuận mua (%):</Typography>
          <Typography variant="body1">
            {metalData.currentMetalPriceRate?.buyingProfitRate}
          </Typography>
        </div>
        <div className={classes.detailRow}>
          <Typography variant="body1" className={classes.metalPriceSpot}>
            Giá spot:
          </Typography>
          <Typography variant="body1">
            {metalData.currentMetalPriceRate?.metalPriceSpot}
          </Typography>
        </div>
        <div className={classes.detailRow}>
          <FormControlLabel
            control={
              <Switch
                checked={autoUpdate}
                onChange={handleAutoUpdateToggle}
                color="primary"
              />
            }
            label="Tự động cập nhật giá thị trường"
          />
        </div>

        <Divider sx={{ my: 3 }} />
        <div className={classes.marketPricesContainer}>
          <Typography variant="h6">Giá kim loại thị trường hôm nay</Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={3} className={classes.marketPricesGrid}>
            {marketData?.map((metal, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper className={classes.paper}>
                  <Typography variant="body1">
                    <strong>Kim loại:</strong> {metal.metalTypeName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Giá kim loại (USD/oz):</strong>{" "}
                    {metal.internationalPrice}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Tỉ giá USD/VNĐ:</strong>{" "}
                    {metal.currentMetalPriceRate?.exchangeRate}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateMetal}
            className={classes.button}
          >
            Tạo mới
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpdateMetal}
            className={classes.button}
          >
            Cập nhật
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDeleteDialog(true)}
            className={classes.button}
          >
            Xóa
          </Button>
        </div>

        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Xóa kim loại</DialogTitle>
          <DialogContent>
            Bạn có chắc chắn muốn xóa kim loại này không?
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
              Hủy bỏ
            </Button>
            <Button onClick={handleDeleteMetal} color="error">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default MetalList;
