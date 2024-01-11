import { useAxios } from "../hooks/useAxios";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../themes/theme";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";

function fetchSamples(url) {
  //storing result of custom hook (useAxios)
  const data = useAxios(url, []);

  // returning array of objects to populate the client selector
  return data;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  return date.toLocaleString('en-US', options);
}

function SamplesList(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const sampleList = fetchSamples("/api/samples/");
  const clientList = fetchSamples("/api/clients");
  const navigate = useNavigate();
  const currentUser = useUserContext();
  console.log(currentUser.currentUser);
  const sampleInfo = sampleList.map((sample, index) => ({
    id: sample.id,
    sampleNumber: sample.sampleNumber,
    description: sample.description,
    chain_of_custody: sample.chain_of_custody,
    client: clientList.find((client) => client.id === sample.client_id)?.name || "Unknown Client",
    createdAt: sample.createdAt,
  }));


  const columns = currentUser.currentUser.role === "Analyst" ? [
    // { field: "id", headerName: "ID" },
    { field: "sampleNumber", headerName: "Sample Number", flex: 0.5},
    {
      field: "description",
      headerName: "Name/Descriptions",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "chain_of_custody", headerName: "Chain of custody", flex: 1 },
    { field: "createdAt", 
    headerName: "Created", 
    flex: 1,
    renderCell: (params) => (
      <div>{formatDate(params.row.createdAt)}</div>
    )
  },
  ] : [
    { field: "sampleNumber", headerName: "Sample Number", flex: 0.5},
    {
      field: "description",
      headerName: "Name/Descriptions",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "chain_of_custody", headerName: "Chain of custody", flex: 1 },
    { field: "client", headerName: "Client", flex: 1 },
    { field: "createdAt", 
    headerName: "Created", 
    flex: 1,
    renderCell: (params) => (
      <div>{formatDate(params.row.createdAt)}</div>
    )
  },
  ]

  const handleRowClick = (params) => {
    const { id, sampleNumber, description } = params.row;
    navigate(`/samples/info/${id}/${sampleNumber}/${description}`);
  }

  useEffect(() => {
      if(!currentUser.currentUser.userName) {
        navigate("/login");
    }
  }, [currentUser, navigate]);


  return (
    <Box m="20px">
      <Header title="Users" subtitle="Managing the users" />
      <Box m="40px 0 0 0" height={"75vh"} sx={{
        "& .MuiDataGrid-root": {
          border: "none"
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none"
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300]
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[600]
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
      }}>
        <DataGrid rows={sampleInfo} columns={columns}
        onRowClick={handleRowClick}
        initialState={{
            ...sampleList.initialState,
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[20, 40, 60]} />
      </Box>
    </Box>
  );
}

export default SamplesList;
