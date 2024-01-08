import { useAxios } from '../hooks/useAxios';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../components/Header';



function fetchSamples(props) {
  //url from API to snet to my custom hook
  const url = "/api/samples/";

  //storing result of custom hook (useAxios)
  const samples = useAxios(url, []);

  // returning array of objects to populate the client selector
  return samples;
}

const Tests = () => {
  const samplesList = fetchSamples();
  console.log(samplesList);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "description", headerName: "Name/Description" },
    { field: "chain_of_custody", headerName: "Cadenade custodia"},
  ];

  return (
    <>
    <Box>
        <Header title="Samples" subtitle="Welcome to your Samples" />
        <Box>
          <DataGrid rows={samplesList}
          columns={columns}
          />
        </Box>
    </Box>
    </>
    
  );
};

export default Tests;
