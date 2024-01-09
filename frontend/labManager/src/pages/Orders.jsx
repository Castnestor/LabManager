import { useAxios } from "../hooks/useAxios";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../themes/theme";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../components/Header";
import { useState } from "react";

function fetchSamples(url) {
  //storing result of custom hook (useAxios)
  const data = useAxios(url, []);

  // returning array of objects to populate the client selector
  return data;
}

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

function OrderList(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowId, setRowId] = useState();
  const sampleList = fetchSamples(`/api/samples/${rowId}`);
  const invoiceList = fetchSamples("/api/invoices");
  const orderInfo = invoiceList.map((sample, index) => ({
    id: sample.id,
    work_order: sample.work_order,
    createdAt: sample.createdAt,
  }));

  function handleGetId(data) {
    //   const sampleList = fetchSamples(`/api/samples/${data.id}`);
    console.log(sampleList);
    setRowId(data.id);
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "work_order",
      headerName: "Work Order",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "invoice_number", headerName: "Invoice Number", flex: 1 },
    { field: "client", headerName: "Client", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      renderCell: (params) => <div>{formatDate(params.row.createdAt)}</div>,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Work Orders" subtitle="Manage your work orders" />
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
          rows={orderInfo}
          columns={columns}
          onCellClick={handleGetId}
          initialState={{
            ...invoiceList.initialState,
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[20, 40, 60]}
        />
      </Box>
    </Box>
  );
}

export default OrderList;