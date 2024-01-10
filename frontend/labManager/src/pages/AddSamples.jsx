import ClientList from "../components/ClientList";
import Accordions from "../components/Accordions";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import axios from "axios";

function AddSamples(props) {
  const [sampleCount, setsampleCount] = useState(1);
  const [sampleArray, setSampleArray] = useState([]);
  const [client, setClient] = useState({});
  const [chain, setChain] = useState("");
  const navigate = useNavigate();
  const currentUser = useUserContext();

  const addSample = () => {
    setsampleCount(sampleCount + 1);
    // console.log(sampleCount);
  };

  const handleAddSample = (accordionData, indexId) => {
    console.log(indexId);
    const data = {
      sampleNumber: accordionData.sampleNumber,
      description: accordionData.description,
    };
    const currentSample = sampleArray[indexId];
    if (currentSample) {
      const newSample = { ...currentSample, ...data };
      const updatedSamples = sampleArray.map((sample, index) =>
        indexId == index ? newSample : sample
      );
      setSampleArray(updatedSamples);
    } else {
      setSampleArray([...sampleArray, data]);
    }
  };

  const handleAddTests = (sampleIndex, { test_id }) => {
    console.log(sampleIndex);
    const currentSample = sampleArray[sampleIndex];
    console.log(currentSample);
    const newArray = currentSample.testList ? currentSample.testList : [];
    newArray.push(test_id);
    currentSample.testList = newArray;
    setSampleArray(
      sampleArray.map((sample, index) =>
        index == sampleIndex ? currentSample : sample
      )
    );
    console.log(newArray);
    console.log(currentSample);
  };

  const handleSubmit = () => {
    console.log(sampleArray);
    const json = sampleArray.map((sample) => ({
      ...sample,
      client_id: client.id,
      chain_of_custody: chain,
    }));
    console.log(json);
    axios.post("/api/samples/create", json);
    window.location.reload();
  };

  const handleClientData = (client) => {
    setClient(client);
    console.log(client);
  };

  const samples = Array.from({ length: sampleCount }, (_, index) => (
    <Accordions
      key={index}
      onSampleAdd={(accordionData) => handleAddSample(accordionData, index)}
      onTestAdd={(test_id) => handleAddTests(index, { test_id })}
    />
  ));

  useEffect(() => {
    if (!currentUser.currentUser.userName) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <ClientList onChange={(clientData) => handleClientData(clientData)} />
      <TextField
        label="Chain of custody"
        value={chain}
        onChange={(e) => setChain(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      {samples}
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={addSample}>
          Add sample
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </div>
  );
}

export default AddSamples;
