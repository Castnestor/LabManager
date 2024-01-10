import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Box } from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../themes/theme';
import { DataGrid, GridToolbarContainer, GridRowModes, GridActionsCellItem, } from '@mui/x-data-grid';
import { useAxios } from '../hooks/useAxios';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditToolbar from "../components/EditToolBar";
import { useUserContext } from '../context/UserContext';
import axios from 'axios'

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  return date.toLocaleString('en-US', options);
}

function SamplePage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentUser = useUserContext();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const { id, description, sampleNumber } = useParams();

  const requested_testsData = useAxios(`/api/requested_tests/${id}`)
  const tests = useAxios('/api/tests');

  const testsInfo = requested_testsData.map((test, index) => ({
    id: test.id,
    name: tests.find((name) => name.id === test.test_id)?.name || "Unknown Client",
    result: test.result,
    approved: test.approved,
    createdAt: test.createdAt,
  }));

  useEffect(() => {
    setRows(testsInfo);
  }, [tests])

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
      const updatedRow = rows.find((row) => row.id === id);
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
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
    const updatedData = {result: newRow.result, approved: newRow.approved}
    axios.put(`/api/requested_tests/${newRow.id}`, updatedData)// .then and catch errors
    console.log(updatedData)
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: "name", headerName: "Test", flex: 1},
    {
      field: "result",
      headerName: "Result",
      flex: 1,
      editable: true,
      cellClassName: "name-column--cell",
    },
    { field: "createdAt", 
    headerName: "Created", 
    flex: 1,
    renderCell: (params) => (
      <div>{formatDate(params.row.createdAt)}</div>
    )
  },
  { field: "approved", headerName: "Is Approved", flex: 1,
    editable: true,
      type: "singleSelect",
      valueOptions: [true, false],
      renderCell: ({ row: { approved } }) => {
        return (
        <Box
          width={"60%"}
          m={"0 auto"}
          p={"5px"}
          display={"flex"}
          justifyContent={"center"}
          backgroundColor={
            approved === false ? colors.redAccent[600] : colors.greenAccent[700]
          }
          borderRadius={"4px"}
        >
          {approved ? "Ready" : "Pending"}
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
    ];
  },
},
  ];

  useEffect(() => {
    if (!currentUser.currentUser.userName) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <Box m="20px">
        {/* Render content based on the fetched data */}
      <Header title={description} subtitle={`# ${sampleNumber}`} />
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
          pageSizeOptions={[20, 40, 60]} />
      </Box>
      </Box>
  );
}

export default SamplePage;