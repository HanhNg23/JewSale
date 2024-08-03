import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateMetalPage = () => {
  const { metalId } = useParams();
  const [metal, setMetal] = useState({});
  const [isOnMonitor, setIsOnMonitor] = useState(false);

  useEffect(() => {
    const fetchMetal = async () => {
      const response = await axios.get(`/api/metals/${metalId}`);
      setMetal(response.data);
      setIsOnMonitor(response.data.is_on_monitor);
    };
    fetchMetal();
  }, [metalId]);

  const handleUpdate = async () => {
    await axios.put(`/api/metals/${metalId}`, { is_on_monitor: isOnMonitor });
    alert("Metal updated successfully!");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Update Metal
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6">{metal.name}</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Purity"
              variant="outlined"
              fullWidth
              value={metal.purity}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Group"
              variant="outlined"
              fullWidth
              value={metal.group}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Display on Monitor</InputLabel>
              <Select
                value={isOnMonitor}
                onChange={(e) => setIsOnMonitor(e.target.value)}
                label="Display on Monitor"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          sx={{ marginTop: 2 }}
        >
          Update Metal
        </Button>
      </Paper>
    </Container>
  );
};

export default UpdateMetalPage;
