import ClientList from "../components/ClientList";
import Accordions from "../components/Accordions";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";

function LandingPage(props) {
  const [sampleCount, setsampleCount] = useState(1);
  const [samplePostData, setSamplePostData] = useState([]);

  const addSample = () => {
    setsampleCount(sampleCount + 1);
    console.log(sampleCount);
  };

  const handleAddSample = (accordionData) => {
    const data = [{sampleNumber: '', description: ''}]
    console.log(accordionData.sampleNumber);
    console.log(accordionData.description);


    return data.sampleNumber = accordionData.sampleNumber, data.description = accordionData.description;
  };

  const handleAddTests = (sampleIndex, { test_id }) => {
    console.log("the test id " + test_id);
  };

  const handleSubmit = (data) => {
    console.log(data)
    setSamplePostData(data);
    console.log(samplePostData);

  };

  const samples = Array.from({ length: sampleCount }, (_, index) => (
    <Accordions
      key={index}
      onSampleAdd={(accordionData) => handleAddSample(accordionData)}
      onTestAdd={(test_id) => handleAddTests(index, { test_id })}
    />
  ));

  return (
    <>
      <ClientList />
      {samples}
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={addSample}>
          Add sample
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </>
  );
}

export default LandingPage;
