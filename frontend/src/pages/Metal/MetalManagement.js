import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const MetalManagementPage = () => {
  return (
    <Container style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom>
        Metal Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Monitor Metal Prices</Typography>
            <Typography variant="body1">
              View real-time and historical data of metal prices.
            </Typography>
            <Button
              component={Link}
              to="/metal-price-monitor"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Go to Monitor
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Manage Metal Details</Typography>
            <Typography variant="body1">
              Update or create new metals and their exchange rates.
            </Typography>
            <Button
              component={Link}
              to="/metal-prices-details"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Manage Details
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MetalManagementPage;
