import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";
import axios from "axios";

const MetalForm = () => {
  const [metal, setMetal] = useState({
    type: "",
    purity: "",
    group: "",
    priceBuy: "",
    priceSell: "",
    profitSell: "",
    profitBuy: "",
    isOnMonitor: false,
    spotPrice: "",
    isAutoUpdate: false,
    marketName: "",
    marketPrice: "",
    exchangeRate: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMetal({
      ...metal,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://157.230.33.37:8080/metals/metal",
        metal
      );
      alert("Metal created successfully!");
    } catch (error) {
      console.error("Error creating metal:", error);
      alert("Failed to create metal.");
    }
  };

  useEffect(() => {
    if (metal.isAutoUpdate) {
      axios
        .get(`http://157.230.33.37:8080/metals/${metal.group}-price-rate`)
        .then((response) => {
          setMetal({
            ...metal,
            spotPrice: response.data.spotPrice,
          });
        })
        .catch((error) => console.error("Error fetching spot price:", error));
    }
  }, [metal.isAutoUpdate, metal.group]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Metal Management
      </Typography>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Metal Type"
              name="type"
              fullWidth
              value={metal.type}
              onChange={handleChange}
            />
            <TextField
              label="Purity"
              name="purity"
              fullWidth
              value={metal.purity}
              onChange={handleChange}
            />
            <TextField
              label="Group"
              name="group"
              fullWidth
              value={metal.group}
              onChange={handleChange}
            />
            <TextField
              label="Selling Price (VND/g)"
              name="priceSell"
              fullWidth
              value={metal.priceSell}
              onChange={handleChange}
            />
            <TextField
              label="Selling Profit (%)"
              name="profitSell"
              fullWidth
              value={metal.profitSell}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={metal.isAutoUpdate}
                  onChange={handleChange}
                  name="isAutoUpdate"
                  color="primary"
                />
              }
              label="Auto Update Price"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Buying Price (VND/g)"
              name="priceBuy"
              fullWidth
              value={metal.priceBuy}
              onChange={handleChange}
            />
            <TextField
              label="Buying Profit (%)"
              name="profitBuy"
              fullWidth
              value={metal.profitBuy}
              onChange={handleChange}
            />
            <TextField
              label="Is On Monitor"
              name="isOnMonitor"
              fullWidth
              value={metal.isOnMonitor}
              onChange={handleChange}
            />
            <TextField
              label="Spot Price (VND/g)"
              name="spotPrice"
              fullWidth
              value={metal.spotPrice}
              onChange={handleChange}
              disabled={metal.isAutoUpdate}
            />
            <TextField
              label="Market Name"
              name="marketName"
              fullWidth
              value={metal.marketName}
              onChange={handleChange}
            />
            <TextField
              label="Market Price (USD/Oz)"
              name="marketPrice"
              fullWidth
              value={metal.marketPrice}
              onChange={handleChange}
            />
            <TextField
              label="Exchange Rate (USD/VND)"
              name="exchangeRate"
              fullWidth
              value={metal.exchangeRate}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Apply
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MetalForm;
