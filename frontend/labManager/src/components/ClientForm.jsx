import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios';

export default function ClientForm() {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  async function handleSubmit() {
    const formData = {
        "name": clientName,
        "email": email,
        "address": address,
        "contact": contact,
        "phoneNumber": phoneNumber
    }
    try{
        await axios.post("/api/clients/create", formData)
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
        id="client-name"
        label="Client Name"
        variant="outlined"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />
      <TextField
        id="email"
        label="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="address"
        label="Address"
        variant="outlined"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
        id="contact"
        label="Contact"
        variant="outlined"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <TextField
        id="phone-number"
        label="Phone Number"
        variant="outlined"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Save
      </Button>
    </Box>
  );
}