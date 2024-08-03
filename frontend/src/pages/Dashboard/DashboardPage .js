import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Card, CardContent } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4000 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 7000 },
];

const pieData = [
  { name: "Gold", value: 40 },
  { name: "Silver", value: 30 },
  { name: "Platinum", value: 20 },
  { name: "Diamonds", value: 10 },
];

const COLORS = ["#FFBB28", "#FF8042", "#00C49F", "#0088FE"];

const DashboardPage = () => {
  return (
    <Box sx={styles.container}>
      <Grid container spacing={3}>
        {/* Overview Section */}
        <Grid item xs={12}>
          <Typography variant="h4" sx={styles.sectionTitle}>
            Overview
          </Typography>
        </Grid>

        {/* Metrics */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={styles.metricCard}>
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="h4" sx={styles.metricValue}>
              $120,000
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={styles.metricCard}>
            <Typography variant="h6">Products</Typography>
            <Typography variant="h4" sx={styles.metricValue}>
              320
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={styles.metricCard}>
            <Typography variant="h6">Users</Typography>
            <Typography variant="h4" sx={styles.metricValue}>
              1,500
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={styles.metricCard}>
            <Typography variant="h6">Orders</Typography>
            <Typography variant="h4" sx={styles.metricValue}>
              200
            </Typography>
          </Paper>
        </Grid>

        {/* Analytics Section */}
        <Grid item xs={12}>
          <Typography variant="h4" sx={styles.sectionTitle}>
            Analytics
          </Typography>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={styles.chartCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#ff4081" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={styles.chartCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12}>
          <Card sx={styles.chartCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Sales
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#ffbb28" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  sectionTitle: {
    color: "#333",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  metricCard: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#ffeb3b",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  metricValue: {
    color: "#ff4081",
    fontWeight: "bold",
  },
  chartCard: {
    padding: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
};

export default DashboardPage;
