import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Paper } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Dot,
} from "recharts";

const MetalPriceMonitorPage = () => {
  const [metalPrices, setMetalPrices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const goldResponse = await axios.get(
          "http://localhost:8080/metals/gold-price-rate"
        );
        const silverResponse = await axios.get(
          "http://localhost:8080/metals/silver-price-rate"
        );

        const transformedData = [];

        const goldData = goldResponse;
        if (goldData.gmtVndUpdated && goldData.gramInVnd) {
          transformedData.push({
            time: goldData.gmtVndUpdated,
            goldPrice: goldData.gramInVnd,
          });
        }

        const silverData = silverResponse;
        if (silverData.gmtVndUpdated && silverData.silverGramInVnd) {
          transformedData.push({
            time: silverData.gmtVndUpdated,
            silverPrice: silverData.silverGramInVnd,
          });
        }

        setMetalPrices(transformedData);
      } catch (error) {
        console.error("Error fetching metal prices:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container style={{ padding: "24px", backgroundColor: "#f0f4f8" }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Metal Price Monitor
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              borderRadius: "15px",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={metalPrices}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="time"
                  label={{
                    value: "Time",
                    position: "insideBottomRight",
                    offset: -10,
                  }}
                  tick={{ fill: "#666" }}
                />
                <YAxis
                  label={{
                    value: "Price (VND/g)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#666",
                  }}
                  tick={{ fill: "#666" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#666" }}
                  formatter={(value, name) => [`${value} VND`, name]}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                <Line
                  type="monotone"
                  dataKey="goldPrice"
                  stroke="#ff7300"
                  strokeWidth={2}
                  dot={{ r: 6, stroke: "#ff7300", strokeWidth: 2 }}
                  activeDot={{
                    r: 8,
                    stroke: "#ff7300",
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="silverPrice"
                  stroke="#387908"
                  strokeWidth={2}
                  dot={{ r: 6, stroke: "#387908", strokeWidth: 2 }}
                  activeDot={{
                    r: 8,
                    stroke: "#387908",
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MetalPriceMonitorPage;
