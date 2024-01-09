import { Box, useTheme, Button, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../themes/theme";
import { DataGrid, GridToolbarContainer, GridRowModes, GridActionsCellItem, } from "@mui/x-data-grid";
import Header from "../components/Header";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import axios from 'axios';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  return date.toLocaleString('en-US', options);
}

function UserList(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    axios("/api/users")
        .then(data =>setRows(data.data.data))
}, [])


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    // try {
      const updatedRow = rows.find((row) => row.id === id);
      // const updatedData = await rows[id].role;
      // console.log(rowModesModel);
      // console.log(updatedRow);
      
      //Still does not work
      // console.log(response.data);
      
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      
      // const updatedData = {role: await rows[id -1].role}
      // const response = await axios.put(`/api/users/${id}`, updatedData)
    // }
  //   catch (error) {
  //   // Handle errors
  //   console.error('Error updating data:', error);
  // }

  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleDeleteClick = (id) => () => {
    console.log(id);
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    const updatedData = {role: newRow.role}
    // console.log(updatedRow.role);
    // console.log(newRow.id)
    axios.put(`/api/users/${newRow.id}`, updatedData)
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "userName",
      headerName: "User",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "email", headerName: "E-mail", flex: 1 },
    { field: "createdAt", 
    headerName: "Created", 
    flex: 1,
    renderCell: (params) => (
      <div>{formatDate(params.row.createdAt)}</div>
    )
  },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["admin", "manager", "QA", "Analyst", "default"],
      renderCell: ({ row: { role } }) => {
        return (
        <Box
          width={"60%"}
          m={"0 auto"}
          p={"5px"}
          display={"flex"}
          justifyContent={"center"}
          backgroundColor={
            role === "admin" ? colors.greenAccent[600] : colors.greenAccent[700]
          }
          borderRadius={"4px"}
        >
          {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
          { role === "manager" && <SecurityOutlinedIcon/>}
          { role === "QA" && <LockOpenOutlinedIcon/>}
          {role}
        </Box>
          )
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

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
        <DataGrid rows={rows} columns={columns} 
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => console.log(error)}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        initialState={{
          ...rows.initialState,
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[20, 40, 60]}/>
      </Box>
    </Box>
  );
}

export default UserList;
