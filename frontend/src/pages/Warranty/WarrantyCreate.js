import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  FormHelperText,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { jsPDF } from "jspdf";
import { styled } from "@mui/system";

// Styled components for better aesthetics
const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.primary,
  fontWeight: "bold",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#f9f9f9",
  borderRadius: theme.shape.borderRadius,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  height: "56px",
}));

const WarrantyCreatePage = () => {
  const [warrantyCode, setWarrantyCode] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    username: "",
    password: "",
    role: "USER",
    fullname: "",
    phonenumber: "",
    email: "",
  });
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const validateProductId = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const response = await axios.get(
        `http://157.230.33.37:8080/products/${productId}`
      );
      setProductName(response.data.productName);
      setErrors({ ...errors, productId: "" });
    } catch (error) {
      setProductName("");
      setErrors({ ...errors, productId: "Invalid Product ID" });
      setFetchError("Failed to fetch product name. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      validateProductId();
    }
  }, [productId]);

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await axios.post("http://157.230.33.37:8080/warranties", {
          warrantyCode,
          productId,
          productName,
          customerName,
          customerDetails,
          details,
        });
        alert("Warranty created successfully!");
      } catch (error) {
        alert("Failed to create warranty. Please try again.");
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!warrantyCode) newErrors.warrantyCode = "Warranty Code is required";
    if (!productId) newErrors.productId = "Product ID is required";
    if (!productName) newErrors.productName = "Product Name is required";
    if (!customerName) newErrors.customerName = "Customer Name is required";
    if (!customerDetails.username) newErrors.username = "Username is required";
    if (!customerDetails.fullname) newErrors.fullname = "Full Name is required";
    if (!customerDetails.phonenumber)
      newErrors.phonenumber = "Phone Number is required";
    if (!details) newErrors.details = "Details are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Warranty Code: ${warrantyCode}`, 10, 10);
    doc.text(`Product ID: ${productId}`, 10, 20);
    doc.text(`Product Name: ${productName}`, 10, 30);
    doc.text(`Customer Name: ${customerName}`, 10, 40);
    doc.text(`Details: ${details}`, 10, 50);
    doc.save("warranty.pdf");
  };

  return (
    <FormContainer maxWidth="md">
      <FormTitle variant="h4">Create Warranty Card</FormTitle>
      <StyledPaper elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {fetchError && <Alert severity="error">{fetchError}</Alert>}
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Warranty Code"
              variant="outlined"
              fullWidth
              required
              value={warrantyCode}
              onChange={(e) => setWarrantyCode(e.target.value)}
              error={!!errors.warrantyCode}
              helperText={errors.warrantyCode}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Product ID"
              variant="outlined"
              fullWidth
              required
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              error={!!errors.productId}
              helperText={errors.productId}
            />
            {loading && <CircularProgress size={24} />}
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              error={!!errors.productName}
              helperText={errors.productName}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Customer Name"
              variant="outlined"
              fullWidth
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              error={!!errors.customerName}
              helperText={errors.customerName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={customerDetails.username}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  username: e.target.value,
                })
              }
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              required
              value={customerDetails.fullname}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  fullname: e.target.value,
                })
              }
              error={!!errors.fullname}
              helperText={errors.fullname}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              required
              value={customerDetails.phonenumber}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  phonenumber: e.target.value,
                })
              }
              error={!!errors.phonenumber}
              helperText={errors.phonenumber}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={customerDetails.email}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  email: e.target.value,
                })
              }
            />
            <FormHelperText>(Optional)</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Details"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              error={!!errors.details}
              helperText={errors.details}
            />
          </Grid>
          <Grid item xs={6}>
            <ActionButton
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Create Warranty
            </ActionButton>
          </Grid>
          <Grid item xs={6}>
            <ActionButton
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleExportPDF}
            >
              Export to PDF
            </ActionButton>
          </Grid>
        </Grid>
      </StyledPaper>
    </FormContainer>
  );
};

export default WarrantyCreatePage;
