import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Paper } from "@mui/material";
import axios from "axios";
import MetalChart from "./MetalChart ";
import MetalColumn from "./MetalColumn ";

const MetalDetail = () => {
  const [goldData, setGoldData] = useState([]);
  const [silverData, setSilverData] = useState([]);
  const [otherMetals, setOtherMetals] = useState([]);

  const fetchGoldData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/metals/gold-price-rate"
      );
      const { gramInVnd, gmtVndUpdated } = response;
      const goldDate = gmtVndUpdated;
      const goldPrice = gramInVnd;
      setGoldData([{ date: goldDate, price: goldPrice }]);
    } catch (error) {
      console.error("Error fetching gold data:", error);
    }
  };

  const fetchSilverData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/metals/silver-price-rate"
      );
      const { silverGramInVnd, gmtVndUpdated } = response;
      const silverDate = gmtVndUpdated;
      const silverPrice = silverGramInVnd;
      setSilverData([{ date: silverDate, price: silverPrice }]);
    } catch (error) {
      console.error("Error fetching silver data:", error);
    }
  };

  useEffect(() => {
    fetchGoldData();
    fetchSilverData();

    // Fetching other metals
    axios
      .get("http://localhost:8080/metals/all")
      .then((response) => {
        const filteredMetals = response.filter(
          (metal) => metal.group !== "Vàng" && metal.group !== "Bạc"
        );
        setOtherMetals(filteredMetals);
      })
      .catch((error) => console.error("Error fetching other metals:", error));
  }, []);

  return (
    <Container style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom>
        Metal Details
      </Typography>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Gold Price Trends</Typography>
            <MetalChart metalName="Gold" data={goldData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Silver Price Trends</Typography>
            <MetalChart metalName="Silver" data={silverData} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Other Metals</Typography>
            <MetalColumn metals={otherMetals} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MetalDetail;
