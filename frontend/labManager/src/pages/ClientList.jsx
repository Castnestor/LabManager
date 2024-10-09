import { useAxios } from "../hooks/useAxios";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../themes/theme";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import Header from "../components/Header";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import EditToolbar from "../components/EditToolBar";
import ModalInput from "../components/ModalInput";

function fetchSamples(url) {
  //storing result of custom hook (useAxios)
  const data = useAxios(url, []);

  // returning array of objects to populate the client selector
  return data;
}

// set the format stored as a timestamp yo the local time
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return date.toLocaleString("en-US", options);
}

function ClientList(props) {
  // crating theme, colors from theme and current user from context
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentUser = useUserContext();
  const navigate = useNavigate();
  // Fetch information from the clients using a custom hook
  const ClientList = fetchSamples("/api/clients/");
  // console.log(ClientList);

  //Describes the column fields ans sets specific settings and names for them
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Client",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "email", headerName: "E-mail", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      // render the cell with a new format of date
      renderCell: (params) => <div>{formatDate(params.row.createdAt)}</div>,
    },
  ];

  // Used to protect the route from not logged-in users nad sends them to the login page
  useEffect(() => {
    if (!currentUser.currentUser.userName) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Box m="20px">
        <Header title="Users" subtitle="Managing the users" />
        <Box
          m="40px 0 0 0"
          height={"75vh"}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[600],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
          }}
        >
          <DataGrid
            rows={ClientList}
            columns={columns}
            initialState={{
              ...ClientList.initialState,
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[20, 40, 60]}
          />
        </Box>
      </Box>
      <ModalInput
        backgroundColor={colors.greenAccent[300]}
        fontcolor={colors.greenAccent[900]}
        inputType={"client"}
        buttonName={"ADD CLIENT"}
      />
    </>
  );
}

export default ClientList;
