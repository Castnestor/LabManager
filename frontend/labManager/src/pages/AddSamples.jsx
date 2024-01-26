import ClientList from "../components/ClientList";
import AccordionComponent from "../components/AccordionComponent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../themes/theme";
import Header from "../components/Header";

function AddSamples(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sampleCount, setsampleCount] = useState(1);
  const [sampleArray, setSampleArray] = useState([]);
  const [client, setClient] = useState({});
  const [chain, setChain] = useState("");
  const navigate = useNavigate();
  const currentUser = useUserContext();

  //Controls the number of accordions displayed on the page by adding 1 to the sample count
  const addSample = () => {
    setsampleCount(sampleCount + 1);
    // console.log(sampleCount);
  };

  const handleAddSample = (accordionData, indexId) => {
    // console.log(indexId);
    // sets the data to the values inside an object
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
      //saves information into state
      setSampleArray(updatedSamples);
    } else {
      setSampleArray([...sampleArray, data]);
    }
  };

  const handleAddTests = (sampleIndex, { test_id }) => {
    // console.log(sampleIndex); checking for the infomation given by sampleIndex
    // Sets the current sample to the index to be able to add tests to each sample separately
    const currentSample = sampleArray[sampleIndex];
    // console.log(currentSample);
    //Creates an empty array inside the current sample if there isn't one yet
    const newArray = currentSample.testList ? currentSample.testList : [];
    //Push the new test_id into the array for the current sample
    newArray.push(test_id);
    currentSample.testList = newArray;
    // set the information into state with a new map
    setSampleArray(
      sampleArray.map((sample, index) =>
        index == sampleIndex ? currentSample : sample
      )
    );
    //Checking final information
    // console.log(newArray);
    // console.log(currentSample);
  };

  const handleSubmit = async () => {

    // console.log(sampleArray);
    //Using map to create a new array of objects that are easy to read for the API
    const json = sampleArray.map((sample) => ({
      ...sample,
      client_id: client.id,
      chain_of_custody: chain,
    }));
    // console.log(json);

    try {
      //Send json created for the Api to handle
      await axios.post("/api/samples/create", json);
      window.location.reload();
    }
    catch {
      console.error("An error occurred during the post request:", error)
    }
  };

  const handleClientData = (client) => {
    setClient(client);
    console.log(client);
  };

  const samples = Array.from({ length: sampleCount }, (_, index) => (
    <AccordionComponent
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
    <Box
      m="40px 20px 0 20px"
      height={"75vh"}
      sx={{

        }}
    >
      <Header title="Add samples" />
      <Box display={"flex"}>
        <ClientList onChange={(clientData) => handleClientData(clientData)} />
        <TextField
          label="Chain of custody"
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ marginTop: 0, marginLeft: 2, width: "20%" }}
        />
      </Box>
      {samples}
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={addSample}>
          Add sample
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}

export default AddSamples;
