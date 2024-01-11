import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAxios } from "../hooks/useAxios";
import { useState } from 'react';


// returning array of objects to populate the client selector

export default function TestsList({ onTestAdd }) {
  const [requestedTest, setRequestedTest] = useState({ test_id: ''});

  // url from API to set to my custom hook
  const url = "/api/tests/";
  //storing result of custom hook (useAxios)
  const testsList = useAxios(url, []);
  
  const handleAddtest = (event, value) => {
    // add the test id to the parent component
    const testId = {test_id: value.id}
    //save the information in state
    setRequestedTest(testId);
    //Runs the the function for it's parent
    onTestAdd(testId);
  }

  return (
    <Autocomplete
      id="testsList"
      sx={{ width: 300, flexBasis: "30%" }}
      options={testsList}
      autoHighlight
      getOptionLabel={(option) => option.name}
      onChange={handleAddtest}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {/* information to show in options */}
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a test"
          inputProps={{
            ...params.inputProps,
            autoComplete: '', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}