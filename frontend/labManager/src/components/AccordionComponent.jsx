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

//onSampleAdd and onTestAdd are coming from the AddSample component in the pages folder
export default function AccordionComponent({ onSampleAdd, onTestAdd }) {
  const [testCount, setTestCount] = useState(0);
  const [sampleInfo, setSampleInfo] = useState({
    sampleNumber: "",
    description: "",
  });

  const handleAddTest = () => {
    //Passes the information of sampleInfo to the parent
    onSampleAdd(sampleInfo);
    setTestCount(testCount + 1);
  };

  // Controlled inputs for description and sample number
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

  //Controls how many accordions are going to be rendered
  const tests = Array.from({ length: testCount }, (_, index) => (
    <TestsList key={index} onTestAdd={onTestAdd} />
  ));

  // Construction of the accordion using Material UI
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
