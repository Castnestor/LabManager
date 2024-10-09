import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios';
import { Select, MenuItem } from "@mui/material";

export default function TestForm() {
    const [testName, setTestName] = useState("");
    const [standard, setStandard] = useState("");
    const [category, setCategory] = useState("");

    const options = ["Physicochemical", "Microbiology", "Instrumental analysis", "Chromatography"]
  
    async function handleSubmit() {
      const formData = {
          "name": testName,
          "standard": standard,
          "category": category
      }
      try{
          await axios.post("/api/tests/create", formData)
          window.location.reload();
      }
      catch {
          console.error("An error occurred during the post request:", error); 
      }
    }
  
    return (
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="test-name"
          label="Test Name"
          variant="outlined"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        />
        <TextField
          id="standard"
          label="Standard"
          variant="outlined"
          value={standard}
          onChange={(e) => setStandard(e.target.value)}
        />
        <Select
          id="category"
          label="Category"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
            {options.map((option) => (
            <MenuItem label="Category" key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    );
}