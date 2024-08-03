import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const WarrantyListPage = () => {
  const [query, setQuery] = useState("");
  const [warranties, setWarranties] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const handleSearch = async () => {
    const response = await axios.get(
      `http://157.230.33.37:8080/warranties?search=${query}&filter=${filter}&sort=${sort}`
    );
    setWarranties(response.data);
  };

  useEffect(() => {
    handleSearch();
  }, [filter, sort]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        ["Warranty Code", "Product Name", "Customer Name", "Details", "Status"],
      ],
      body: warranties.map((warranty) => [
        warranty.warrantyCode,
        warranty.productName,
        warranty.customerName,
        warranty.details,
        warranty.status,
      ]),
    });
    doc.save("warranties.pdf");
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Warranty List
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              label="Search Warranties"
              variant="outlined"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Filter By</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter By"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="username">Username</MenuItem>
                <MenuItem value="fullname">Full Name</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Warranty Code</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warranties.map((warranty) => (
              <TableRow key={warranty.id}>
                <TableCell>{warranty.warrantyCode}</TableCell>
                <TableCell>{warranty.productName}</TableCell>
                <TableCell>{warranty.customerName}</TableCell>
                <TableCell>{warranty.details}</TableCell>
                <TableCell>{warranty.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 3 }}
        onClick={handleExportPDF}
      >
        Export to PDF
      </Button>
    </Container>
  );
};

export default WarrantyListPage;
