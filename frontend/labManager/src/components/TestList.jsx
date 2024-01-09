import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAxios } from "../hooks/useAxios";
import { useState } from 'react';
import { useTestsContext } from '../context/TestContext';

// function fetchTests(props) {

  
//   // returning array of objects to populate the client selector
//   return tests;
// }

export default function TestsList({ onTestAdd }) {
  const [requestedTest, setRequestedTest] = useState({ test_id: ''});
  // const { tests } = useTestsContext();

  // url from API to snet to my custom hook
  const url = "/api/tests/";
  //storing result of custom hook (useAxios)
  const testsList = useAxios(url, []);
  
  // console.log(tests);

  const handleAddtest = (event, value) => {
    // console.log(value.id); add the test id to send it to the API
    const testId = {test_id: value.id}
    setRequestedTest(testId);
    onTestAdd(testId);
    console.log(testId);
  }

  // const testsList= fetchTests();
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