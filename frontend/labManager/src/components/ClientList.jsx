import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAxios } from "../hooks/useAxios";

function fetchClients(props) {

//url from API to snet to my custom hook
const url = "/api/clients/";
//storing result of custom hook (useAxios)
const clients = useAxios(url, []);

// returning array of objects to populate the client selector
return clients;
}

// Function onChange given by Accordion Component
export default function ClientList({ onChange }) {
  const clientsList= fetchClients();

  const handleClientChange = (event, selectedOption) => {
    onChange(selectedOption)
  }


  return (
    <Autocomplete
      id="clientsList"
      sx={{ width: "20%" }}
      options={clientsList}
      autoHighlight
      getOptionLabel={(option) => option.name}
      onChange={handleClientChange}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {/* information to show in options */}
          {option.name} ({option.email}) +{option.address}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a client"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}