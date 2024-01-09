import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TestsList from "./TestList";
import { useState } from "react";

export default function Accordions({ onSampleAdd, onTestAdd }) {
  const [testCount, setTestCount] = useState(0);
  const [sampleInfo, setSampleInfo] = useState({
    sampleNumber: "",
    description: "",
  });

  const handleAddTest = () => {
    // console.log(sampleInfo)
    onSampleAdd(sampleInfo);
    setTestCount(testCount + 1);
    // console.log(testCount);
  };

  const handleDescriptionChange = (e) => {
    setSampleInfo((prevSampleInfo) => ({
      ...prevSampleInfo,
      description: e.target.value,
    }));
  };

  const handleSampleNumberChange = (e) => {
    setSampleInfo((prevSampleInfo) => ({
      ...prevSampleInfo,
      sampleNumber: e.target.value,
    }));
  };

  const tests = Array.from({ length: testCount }, (_, index) => (
    <TestsList key={index} onTestAdd={onTestAdd} />
  ));

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            component="form"
            sx={{
              width: 1250,
              "& > :not(style)": { m: 1, width: "20ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="sampleNumber"
              label="Sample Number"
              variant="standard"
              onChange={handleSampleNumberChange}
            />
            <TextField
              id="Description"
              label="Description"
              variant="standard"
              onChange={handleDescriptionChange}
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {tests}
          </Box>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleAddTest}>
              +
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
