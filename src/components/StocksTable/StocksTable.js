import React from 'react'
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function StocksTable({ rows, columns, getRowClassName }) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        marginTop: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={15}
        getRowClassName={getRowClassName}
        // disableSelectionOnClick
      />
    </Box>
  )
}
